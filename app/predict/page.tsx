'use client'

import { useEffect, useState } from 'react'

const defaultSymbol = 'RELIANCE'

export default function MarketPage({ params }: { params: { symbol?: string } }) {
  const initialSymbol = params?.symbol || defaultSymbol
  const [symbol, setSymbol] = useState(initialSymbol)

  useEffect(() => {
    const target = symbol || defaultSymbol
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = () => {
      const container = document.getElementById('chart-container')
      if (!container) return
      container.innerHTML = ''
      if ((window as any).TradingView) {
        new (window as any).TradingView.widget({
          container_id: 'chart-container',
          symbol: `NSE:${target}`,
          interval: 'D',
          timezone: 'Asia/Kolkata',
          theme: 'dark',
          style: '1',
          locale: 'en',
          width: '100%',
          height: 520,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          studies: ['MACD@tv-basicstudies', 'RSI@tv-basicstudies'],
        })
      }
      const newsContainer = document.getElementById('news-container')
      if (newsContainer && (window as any).TradingView) {
        new (window as any).TradingView.MediumWidget({
          container_id: 'news-container',
          symbols: [{ title: target, symbol: `NSE:${target}` }],
          colorTheme: 'dark',
          isTransparent: true,
          width: '100%',
          height: 260,
        })
      }
    }
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [symbol])

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Market</div>
            <h1 className="mt-2 text-3xl font-black">{symbol}</h1>
          </div>
          <div className="flex gap-3">
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-cyan-400 md:w-48"
              placeholder="Symbol"
            />
            <button onClick={() => setSymbol(symbol || defaultSymbol)} className="rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-900">Load</button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-3 shadow-2xl shadow-cyan-950/20">
            <div id="chart-container" className="min-h-[520px]" />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="mb-4 text-xs uppercase tracking-[0.2em] text-cyan-300">Quick actions</div>
              <div className="space-y-3">
                <button className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-900">Live Analysis • 2 credits</button>
                <button className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-semibold text-white">Prediction • 1 credit</button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="mb-4 text-xs uppercase tracking-[0.2em] text-cyan-300">News timeline</div>
              <div id="news-container" className="min-h-[260px]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

