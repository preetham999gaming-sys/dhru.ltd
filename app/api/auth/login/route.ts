import { z } from 'zod'
import { NextResponse } from 'next/server'
import { loginUser, createSessionToken } from '@/lib/auth'

const LoginSchema = z.object({ identifier: z.string().min(3), password: z.string().min(6) })

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = LoginSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  const { identifier, password } = parsed.data
  try {
    const user = await loginUser(identifier, password)
    const token = createSessionToken(user.id)
    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, mobile: user.mobile } })
    res.headers.set('Set-Cookie', `session=${token}; Path=/; HttpOnly; Max-Age=${60*60*24*7}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`)
    return res
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'failed' }, { status: 400 })
  }
}
