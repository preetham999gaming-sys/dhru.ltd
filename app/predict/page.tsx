import { useState } from 'react'
import AnimatedCard from '@/components/AnimatedCard'
import TradingViewEmbed from '@/components/TradingViewEmbed'

export default function PredictionPage() {
  const [symbol, setSymbol] = useState('RELIANCE')
  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState<any>(null)

  async function request() {
    setLoading(true)
    // in real app use authenticated userId
    const res = await fetch('/api/predict', { method: 'POST', body: JSON.stringify({ userId: '00000000-0000-0000-0000-000000000000', symbol }), headers: { 'content-type': 'application/json' } })
    const j = await res.json()
    setPrediction(j.prediction)
    setLoading(false)
  }

  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Predict · Live (1 credit)</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <AnimatedCard>
            <label className="block text-sm text-gray-300">Symbol</label>
            <input value={symbol} onChange={(e) => setSymbol(e.target.value)} className="w-full p-3 rounded bg-gray-900 mt-2" />
            <div className="mt-4">
              <button onClick={request} className="px-4 py-2 bg-primary rounded">Request prediction</button>
            </div>
            {loading && <div className="mt-2 text-sm text-gray-400">Loading…</div>}
            {prediction && <pre className="mt-2 text-xs bg-black/30 p-2 rounded">{JSON.stringify(prediction, null, 2)}</pre>}
          </AnimatedCard>
        </div>
        <div>
          <AnimatedCard>
            <TradingViewEmbed id="tv_small" widgetConfig={{ symbol: `NSE:${symbol}`, width: '100%', height: 320 }} />
          </AnimatedCard>
        </div>
      </div>
    </main>
  )
}
