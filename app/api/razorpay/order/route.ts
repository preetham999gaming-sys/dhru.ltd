import { NextResponse } from 'next/server'
import { z } from 'zod'
import Razorpay from 'razorpay'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CreateOrderSchema = z.object({ userId: z.string().uuid(), packId: z.string().uuid() })

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = CreateOrderSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  const { userId, packId } = parsed.data
  const pack = await prisma.creditPack.findUnique({ where: { id: packId } })
  if (!pack) return NextResponse.json({ error: 'pack_not_found' }, { status: 404 })
  const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID || '', key_secret: process.env.RAZORPAY_KEY_SECRET || '' })
  const receipt = `purchase_${userId}_${Date.now()}`
  const order = await razorpay.orders.create({ amount: pack.priceINR * 100, currency: 'INR', receipt, notes: { userId, packId } })
  const purchase = await prisma.purchase.create({ data: { userId, razorpayOrderId: order.id, packId: pack.id, amount: pack.priceINR, currency: 'INR', status: 'created' } })
  return NextResponse.json({ ok: true, order, purchase })
}
