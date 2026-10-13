import { NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { grantCredits } from "@/lib/credits";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";
  const secret = process.env.RAZORPAY_KEY_SECRET || "";
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  if (signature !== expected) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }
  const payload = JSON.parse(body);
  const event = payload.event;
  if (event === "payment.captured") {
    const payment = payload.payload.payment.entity;
    // Idempotency: ensure purchase record updated only once
    const orderId = payment.order_id;
    const razorpayPaymentId = payment.id;
    // Lookup purchase by razorpay order id
    const purchase = await prisma.purchase.findUnique({ where: { razorpayOrderId: orderId } });
    if (!purchase) {
      // log & return 404 so you can inspect
      return NextResponse.json({ error: "order_not_found" }, { status: 404 });
    }
    if (purchase.razorpayPaymentId) {
      return NextResponse.json({ ok: true }); // already handled
    }
    await prisma.$transaction(async (tx) => {
      await tx.purchase.update({
        where: { id: purchase.id },
        data: {
          razorpayPaymentId,
          status: "paid",
          meta: { ...purchase.meta, razorpay: payment },
        },
      });
      // grant credits according to pack
      const pack = await tx.creditPack.findUnique({ where: { id: purchase.packId } });
      if (!pack) throw new Error("pack_not_found");
      await grantCredits(purchase.userId, pack.credits, `purchase:${purchase.id}`);
    });
  }
  return NextResponse.json({ ok: true });
}
