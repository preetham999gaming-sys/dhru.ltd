import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const SpendCreditsSchema = z.object({
  userId: z.string().uuid(),
  cost: z.number().int().positive(),
  reason: z.string().min(1),
  requestId: z.string().optional() // idempotency
});

export async function getBalance(userId: string) {
  const last = await prisma.credit.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return last?.balance ?? 0;
}

// Atomic spend: transactionally append a ledger row with negative change
export async function spendCredits({ userId, cost, reason, requestId }: z.infer<typeof SpendCreditsSchema>) {
  return await prisma.$transaction(async (tx) => {
    // Idempotency: if we already have a ledger row with this requestId, return it
    if (requestId) {
      const existing = await tx.credit.findFirst({
        where: { userId, meta: { path: ["requestId"], equals: requestId } },
      });
      if (existing) return existing;
    }

    const last = await tx.credit.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    const currentBalance = last?.balance ?? 0;
    if (currentBalance < cost) {
      throw new Error("INSUFFICIENT_CREDITS");
    }
    const newBalance = currentBalance - cost;
    const row = await tx.credit.create({
      data: {
        userId,
        change: -cost,
        balance: newBalance,
        reason,
        meta: { requestId },
      },
    });
    return row;
  });
}

export async function grantCredits(userId: string, amount: number, reason = "grant") {
  return await prisma.$transaction(async (tx) => {
    const last = await tx.credit.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    const currentBalance = last?.balance ?? 0;
    const newBalance = currentBalance + amount;
    const row = await tx.credit.create({
      data: {
        userId,
        change: amount,
        balance: newBalance,
        reason,
      },
    });
    return row;
  });
}
