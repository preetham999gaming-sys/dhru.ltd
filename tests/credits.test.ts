import { describe, it, expect, beforeEach } from "vitest";
import { PrismaClient } from "@prisma/client";
import { grantCredits, spendCredits, getBalance } from "@/lib/credits";

const prisma = new PrismaClient();

describe("credit ledger", () => {
  let userId: string;
  beforeEach(async () => {
    await prisma.credit.deleteMany({});
    await prisma.user.deleteMany({});
    const u = await prisma.user.create({ data: { email: `t+${Date.now()}@example.test` } });
    userId = u.id;
  });

  it("grants and spends atomically", async () => {
    await grantCredits(userId, 5, "test grant");
    const b = await getBalance(userId);
    expect(b).toBe(5);
    const spend = await spendCredits({ userId, cost: 2, reason: "test spend" });
    expect(spend.change).toBe(-2);
    const b2 = await getBalance(userId);
    expect(b2).toBe(3);
  });

  it("prevents overspend", async () => {
    await grantCredits(userId, 1, "test");
    await expect(spendCredits({ userId, cost: 2, reason: "overspend" })).rejects.toThrow("INSUFFICIENT_CREDITS");
  });
});
