'use server'
import Razorpay from 'razorpay'
import { prisma } from '@/lib/prisma'

export async function createRazorpayOrder(userId: string, packId: string, amount: number) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || ''
  })
  const receipt = `purchase_${userId}_${Date.now()}`
  const order = await razorpay.orders.create({
    amount: amount * 100, // INR paise
    currency: 'INR',
    receipt,
    notes: { userId, packId }
  })
  // store purchase stub
  const p = await prisma.purchase.create({
    data: {
      userId,
      razorpayOrderId: order.id,
      packId,
      amount,
      status: 'created',
      meta: { receipt }
    }
  })
  return { order, purchase: p }
}
