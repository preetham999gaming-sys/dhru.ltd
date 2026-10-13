'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MarketPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params
  const router = useRouter()

  useEffect(() => {
    // TradingView script
    const s = document.createElement('script')
    s.src = 'https://s3.tradingview.com/tv.js'
    s.async = true
    document.body.appendChild(s)
    s.onload = () => {
      if ((window as any).TradingView) {
        try {
          new (window as any).TradingView.widget({
            container_id: 'tv_chart',
            width: '100%',
            height: 520,
            symbol: symbol.includes(':') ? symbol : `NSE:${symbol}`,
            interval: 'D',
            timezone: 'Asia/Kolkata',
            theme: 'dark',
            style: '1',
            toolbar_bg: '#1f2937',
            hide_side_toolbar: false,
            allow_symbol_change: true,
            studies: ['MACD@tv-basicstudies','RSI@tv-basicstudies']
          })

          // News timeline
          new (window as any).TradingView.MediumWidget({
            container_id: 'tv_news',
            symbols: [{title: symbol, symbol: symbol.includes(':') ? symbol : `NSE:${symbol}`}],
            colorTheme: 'dark',
            isTransparent: true,
            width: '100%',
            height: 200
          })
        } catch (e) {
          console.error('tradingview init', e)
        }
      }
    }
    return () => { }
  }, [symbol])

  return (
    <main className="min-h-screen p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">{symbol} · Market</h1>
      <div id="tv_chart" className="w-full bg-black/40 rounded mb-6" />
      <div id="tv_news" className="w-full bg-black/40 rounded" />

      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-emerald-600 rounded">Request Prediction (1 credit)</button>
        <button className="px-4 py-2 bg-amber-600 rounded">Live Analysis (2 credits)</button>
      </div>
    </main>
  )
}
