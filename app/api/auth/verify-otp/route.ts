import { z } from 'zod'
import { NextResponse } from 'next/server'
import { verifyOtp } from '@/lib/auth'

const VerifySchema = z.object({ token: z.string(), code: z.string() })

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = VerifySchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  const { token, code } = parsed.data
  const user = await verifyOtp(token, code)
  if (!user) return NextResponse.json({ error: 'invalid_or_expired' }, { status: 400 })
  // create a signed cookie session (simple JWT-free approach for scaffold)
  // In production use secure session cookies or JWTs
  return NextResponse.json({ ok: true, user })
}
