import { z } from 'zod'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const Schema = z.object({
  userId: z.string().uuid(),
  packId: z.string().uuid(),
})

export async function GET() {
  const packs = await prisma.creditPack.findMany({ where: { active: true }, orderBy: { priceINR: 'asc' } })
  return NextResponse.json({ ok: true, packs })
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = Schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  const { userId, packId } = parsed.data
  const pack = await prisma.creditPack.findUnique({ where: { id: packId } })
  if (!pack) return NextResponse.json({ error: 'pack_not_found' }, { status: 404 })
  const created = await prisma.purchase.create({
    data: { userId, packId: pack.id, amount: pack.priceINR, currency: 'INR', status: 'created', razorpayOrderId: `seed_${Date.now()}` }
  })
  return NextResponse.json({ ok: true, purchase: created })
}
