import { NextResponse } from 'next/server'
import { verifySessionToken } from '@/lib/auth'

export async function requireAuth(req: Request) {
  const cookie = req.headers.get('cookie') || ''
  const token = cookie.split('session=')[1]?.split(';')[0]
  if (!token) {
    return null
  }
  const payload = verifySessionToken(token)
  if (!payload) {
    return null
  }
  return payload.sub as string
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}
