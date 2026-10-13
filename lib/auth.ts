import bcrypt from 'bcrypt'
import { prisma } from './prisma'
import jwt from 'jsonwebtoken'

const JWT_EXPIRY_SECONDS = 60 * 60 * 24 * 7 // 7 days

export async function registerUser(email: string, password: string, mobile?: string) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) throw new Error('user_exists')
  const hash = await bcrypt.hash(password, 12)
  try {
    const user = await prisma.user.create({ data: { email, passwordHash: hash, mobile } })
    return user
  } catch (e: any) {
    // handle unique constraint on mobile
    if (e?.code === 'P2002') throw new Error('unique_constraint')
    throw e
  }
}

export async function loginUser(identifier: string, password: string) {
  // identifier can be email or mobile
  let user = null
  if (identifier.includes('@')) {
    user = await prisma.user.findUnique({ where: { email: identifier } })
  } else {
    user = await prisma.user.findUnique({ where: { mobile: identifier } })
  }
  if (!user) throw new Error('user_not_found')
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) throw new Error('invalid_credentials')
  return user
}

export function createSessionToken(userId: string) {
  const secret = process.env.JWT_SECRET || 'dev_secret'
  const payload = { sub: userId, iat: Math.floor(Date.now() / 1000) }
  const token = jwt.sign(payload, secret, { expiresIn: JWT_EXPIRY_SECONDS })
  return token
}

export function verifySessionToken(token: string) {
  try {
    const secret = process.env.JWT_SECRET || 'dev_secret'
    return jwt.verify(token, secret) as any
  } catch (e) {
    return null
  }
}
