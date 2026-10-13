import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const health: any = { ok: true }
  // DB check
  try {
    await prisma.$queryRaw`SELECT 1`
    health.db = 'ok'
  } catch (e: any) {
    health.ok = false
    health.db = 'error'
    health.dbError = String(e.message || e)
  }

  // ML service ping if configured
  const mlUrl = process.env.ML_SERVICE_URL
  if (mlUrl) {
    try {
      const resp = await fetch(`${mlUrl}/health`, { method: 'GET', timeout: 5000 })
      health.ml = resp.ok ? 'ok' : `error:${resp.status}`
    } catch (e: any) {
      health.ok = false
      health.ml = `error:${String(e.message)}`
    }
  } else {
    health.ml = 'not_configured'
  }

  return NextResponse.json({ ok: health.ok, health })
}
