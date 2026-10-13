import { NextResponse } from 'next/server'
import { z } from 'zod'

const CandlesSchema = z.object({ symbol: z.string().min(1), interval: z.string().default('1d'), limit: z.number().optional() })

export async function GET(req: Request) {
  const url = new URL(req.url)
  const parsed = CandlesSchema.safeParse(Object.fromEntries(url.searchParams.entries()))
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  const { symbol, interval, limit } = parsed.data
  if (!process.env.CANDLE_API_URL) return NextResponse.json({ error: 'CANDLE_API_NOT_CONFIGURED' }, { status: 501 })
  const params = new URL(`${process.env.CANDLE_API_URL}/candles`)
  params.searchParams.set('symbol', symbol)
  params.searchParams.set('interval', interval)
  if (limit) params.searchParams.set('limit', String(limit))
  const headers: any = {}
  if (process.env.CANDLE_API_KEY) headers['x-api-key'] = process.env.CANDLE_API_KEY
  const resp = await fetch(params.toString(), { headers })
  if (!resp.ok) return NextResponse.json({ error: 'failed_fetch' }, { status: 502 })
  const data = await resp.json()
  return NextResponse.json({ ok: true, data })
}
