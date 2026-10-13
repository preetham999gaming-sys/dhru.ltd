import { z } from 'zod'
import { NextResponse } from 'next/server'
import { registerUser, createSessionToken } from '@/lib/auth'

const RegisterSchema = z.object({ email: z.string().email(), password: z.string().min(8), mobile: z.string().optional() })

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = RegisterSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  const { email, password, mobile } = parsed.data
  try {
    const user = await registerUser(email, password, mobile)
    const token = createSessionToken(user.id)
    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, mobile: user.mobile } })
    res.headers.set('Set-Cookie', `session=${token}; Path=/; HttpOnly; Max-Age=${60*60*24*7}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`)
    return res
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'failed' }, { status: 400 })
  }
}
