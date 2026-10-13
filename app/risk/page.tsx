import React from 'react'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#07111f] p-8 text-slate-100">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-black">Risk Disclosure</h1>
        <p className="text-sm text-slate-300">Trading financial instruments carries risk. Past performance is not indicative of future results. Our AI outputs are probabilistic and should not be treated as guarantees.</p>

        <section>
          <h2 className="text-lg font-semibold">Model limitations</h2>
          <p className="text-sm text-slate-300">Models are trained on historical technical features and may not capture regime changes or fundamental events. We evaluate models using strict walk-forward testing and purging to reduce look-ahead bias.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">No brokerage relationship</h2>
          <p className="text-sm text-slate-300">dhru.ltd does not execute trades, handle custody, or provide brokerage services.</p>
        </section>

        <p className="text-xs text-slate-500">Last updated: 2026-10-13</p>
      </div>
    </main>
  )
}
