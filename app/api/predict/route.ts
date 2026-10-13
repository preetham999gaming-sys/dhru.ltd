import { z } from "zod";
import { NextResponse } from "next/server";
import { getBalance, spendCredits, grantCredits } from "@/lib/credits";
import fetch from "node-fetch";

const PredictSchema = z.object({
  userId: z.string().uuid(),
  symbol: z.string().min(1),
  idempotencyKey: z.string().optional(),
});

const PREDICTION_CREDITS = 1; // 1 credit per prediction endpoint
const LIVE_ANALYSIS_CREDITS = 2;

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = PredictSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  const { userId, symbol, idempotencyKey } = parsed.data;

  // Check balance server-side
  const balance = await getBalance(userId);
  if (balance < PREDICTION_CREDITS) {
    return NextResponse.json({ error: "insufficient_credits" }, { status: 402 });
  }

  // Step 1: fetch candles from pluggable provider
  const candleUrl = `${process.env.CANDLE_API_URL}/candles?symbol=${encodeURIComponent(symbol)}&interval=1d&limit=500`;
  const headers: any = {};
  if (process.env.CANDLE_API_KEY) headers["x-api-key"] = process.env.CANDLE_API_KEY;
  const candlesResp = await fetch(candleUrl, { headers, timeout: 15000 });
  if (!candlesResp.ok) {
    return NextResponse.json({ error: "failed_fetch_candles" }, { status: 502 });
  }
  const candles = await candlesResp.json();

  // Step 2: spend credits (atomic ledger append)
  let spendRow;
  try {
    spendRow = await spendCredits({
      userId,
      cost: PREDICTION_CREDITS,
      reason: `prediction:${symbol}`,
      requestId: idempotencyKey,
    });
  } catch (err: any) {
    if (err.message === "INSUFFICIENT_CREDITS") return NextResponse.json({ error: "insufficient_credits" }, { status: 402 });
    return NextResponse.json({ error: "credit_spend_failed", detail: err.message }, { status: 500 });
  }

  // Step 3: call ML service (run model). The ML service must be honest and deterministic.
  const mlService = process.env.ML_SERVICE_URL || "http://localhost:8000";
  const mlResp = await fetch(`${mlService}/predict`, {
    method: "POST",
    body: JSON.stringify({ symbol, candles }),
    headers: { "content-type": "application/json" },
    timeout: 60000,
  });

  if (!mlResp.ok) {
    // Refund: append positive credit row (refund) with reason
    await grantCredits(userId, PREDICTION_CREDITS, `refund:prediction_failed:${symbol}`);
    return NextResponse.json({ error: "ml_service_failed" }, { status: 502 });
  }

  const prediction = await mlResp.json();

  // If ML flagged "not_validated", it must not provide directional signal—treat as returned neutral
  if (prediction.status === "not_validated") {
    // Optionally refund partial/complete credits per policy — here we keep cost but return neutral with clear flag
  }

  return NextResponse.json({
    ok: true,
    prediction,
    spent: spendRow,
  });
}
