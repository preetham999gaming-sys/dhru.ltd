import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createRazorpayOrder } from '@/lib/razorpay-order'

const Schema = z.object({
  userId: z.string().uuid(),
  packId: z.string().uuid(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = Schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  const { userId, packId } = parsed.data
  const r = await createRazorpayOrder(userId, packId)
  return NextResponse.json({ ok: true, order: r.order, purchase: r.purchase })
}
