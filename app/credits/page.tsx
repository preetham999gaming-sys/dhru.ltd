'use client'

import { useState } from 'react'

const defaultPrediction = {
  status: 'not_validated',
  direction: 'neutral',
  probability_up: 0.5,
  confidence: 'low',
  summary: 'No directional signal is issued because the model did not beat the out-of-sample baseline.',
  data_age: 'Updated on latest available candle',
  disclaimer: 'This is not investment advice. Model outputs are probabilistic and subject to uncertainty. Always validate with your own research.'
}

export default function PredictPage() {
  const [symbol, setSymbol] = useState('RELIANCE')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(defaultPrediction)

  async function requestPrediction() {
    setLoading(true)
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ userId: '00000000-0000-0000-0000-000000000000', symbol })
      })
      const json = await res.json()
      setResult(json?.prediction || defaultPrediction)
    } catch (e) {
      setResult(defaultPrediction)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Prediction</div>
          <h1 className="mt-2 text-3xl font-black">AI technical outlook</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <label className="mb-2 block text-sm text-slate-300">Symbol</label>
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="e.g. RELIANCE"
            />
            <button onClick={requestPrediction} className="mt-5 w-full rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-900 disabled:opacity-60" disabled={loading}>
              {loading ? 'Running model…' : 'Predict • 1 credit'}
            </button>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
              <div className="font-semibold text-white">Model rules</div>
              <ul className="mt-3 space-y-2 text-slate-300">
                <li>• Walk-forward testing with purged labels</li>
                <li>• Baseline comparison using accuracy and Brier score</li>
                <li>• Neutral output when model is not validated</li>
                <li>• No guarantees, no promise of returns</li>
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Result</div>
                <h2 className="mt-2 text-2xl font-black text-white">{result?.direction || 'neutral'}</h2>
              </div>
              <div className={`rounded-full px-3 py-1 text-xs font-semibold ${result?.status === 'not_validated' ? 'bg-amber-500/10 text-amber-300' : 'bg-emerald-500/10 text-emerald-300'}`}>
                {result?.status || 'not_validated'}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Probability up</div>
                <div className="mt-3 text-3xl font-black text-white">{(Number(result?.probability_up ?? 0.5) * 100).toFixed(1)}%</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Confidence</div>
                <div className="mt-3 text-3xl font-black text-white">{result?.confidence || 'low'}</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-sm text-slate-300">{result?.summary || defaultPrediction.summary}</div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Data age</div>
                <div className="mt-3 text-sm text-white">{result?.data_age || defaultPrediction.data_age}</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Disclaimer</div>
                <div className="mt-3 text-xs leading-5 text-slate-300">{result?.disclaimer || defaultPrediction.disclaimer}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

