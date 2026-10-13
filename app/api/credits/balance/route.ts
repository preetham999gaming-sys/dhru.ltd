import { NextResponse } from 'next/server'
import { getBalance } from '@/lib/credits'
import { requireAuth } from '@/lib/auth-guard'

export async function GET(req: Request) {
  const userId = await requireAuth(req)
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const balance = await getBalance(userId)
  return NextResponse.json({ ok: true, balance })
}
