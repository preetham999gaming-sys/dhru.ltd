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
    const orderId = payment.order_id;
    const razorpayPaymentId = payment.id;
    // Lookup purchase by razorpay order id
    const purchase = await prisma.purchase.findUnique({ where: { razorpayOrderId: orderId } });
    if (!purchase) {
      // Create a purchase record if missing (defensive)
      await prisma.purchase.create({ data: { userId: payment.notes?.userId || '', razorpayOrderId: orderId, razorpayPaymentId, packId: payment.notes?.packId || '', amount: payment.amount || 0, currency: payment.currency || 'INR', status: 'paid', meta: { razorpay: payment } } });
      // can't grant without pack mapping
      return NextResponse.json({ ok: true });
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
          meta: { ...(purchase.meta || {}), razorpay: payment },
        },
      });
      const pack = await tx.creditPack.findUnique({ where: { id: purchase.packId } });
      if (!pack) {
        // log and return
        return;
      }
      await grantCredits(purchase.userId, pack.credits, `purchase:${purchase.id}`);
    });
  }
  return NextResponse.json({ ok: true });
}
