import { prisma } from './prisma'
import crypto from 'crypto'

export async function createOtpForEmail(email: string) {
  const otp = (Math.floor(100000 + Math.random() * 900000)).toString()
  const token = crypto.randomBytes(24).toString('hex')
  const expires = new Date(Date.now() + 10 * 60 * 1000) // 10 min
  // upsert user
  let user = await prisma.user.findUnique({ where: { email } })
  if (!user) user = await prisma.user.create({ data: { email } })
  await prisma.session.create({ data: { userId: user.id, expiresAt: expires, device: 'otp' } })
  await prisma.otp.create({ data: { id: token, userId: user.id, otp, expiresAt: expires } })
  return { user, otp, token }
}

export async function verifyOtp(token: string, code: string) {
  const rec = await prisma.otp.findUnique({ where: { id: token } })
  if (!rec) return null
  if (rec.expiresAt < new Date()) return null
  if (rec.otp !== code) return null
  // mark user verified
  await prisma.user.update({ where: { id: rec.userId }, data: { isEmailVerified: true } })
  return await prisma.user.findUnique({ where: { id: rec.userId } })
}
