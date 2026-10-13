import { z } from 'zod'
import { NextResponse } from 'next/server'
import { createOtpForEmail } from '@/lib/auth'
import { sendOtpEmail } from '@/lib/email'

const ReqSchema = z.object({ email: z.string().email() })

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = ReqSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  const { email } = parsed.data
  const { user, otp, token } = await createOtpForEmail(email)
  try {
    await sendOtpEmail(email, otp)
  } catch (e) {
    // email may fail in dev; log and continue
    console.warn('email failed', e)
  }
  return NextResponse.json({ ok: true, token })
}
