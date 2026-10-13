import { z } from 'zod'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { spendCredits } from '@/lib/credits'

const SpendSchema = z.object({ userId: z.string().uuid(), cost: z.number().int().positive(), reason: z.string() })

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = SpendSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  const { userId, cost, reason } = parsed.data
  try {
    const row = await spendCredits({ userId, cost, reason })
    return NextResponse.json({ ok: true, row })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'failed' }, { status: 400 })
  }
}
