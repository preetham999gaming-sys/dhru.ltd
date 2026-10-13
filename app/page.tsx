import Link from 'next/link'
import { motion } from 'framer-motion'

const marketCards = [
  { name: 'Nifty 50', value: '24,532', change: '+0.82%', tone: 'up' },
  { name: 'Bank Nifty', value: '52,614', change: '+1.04%', tone: 'up' },
  { name: 'Sensex', value: '80,124', change: '+0.77%', tone: 'up' },
  { name: 'USD/INR', value: '83.12', change: '-0.22%', tone: 'down' },
  { name: 'Gold', value: '72,460', change: '+0.31%', tone: 'up' },
  { name: 'Crude', value: '4,116', change: '+0.48%', tone: 'up' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.22),_transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-orange-400 text-sm font-black text-slate-950">dh</div>
              <div>
                <div className="text-lg font-bold tracking-tight">dhru.ltd</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Indian equity intelligence</div>
              </div>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              <Link href="/" className="hover:text-white">Markets</Link>
              <Link href="/market/RELIANCE" className="hover:text-white">Market</Link>
              <Link href="/predict" className="hover:text-white">Prediction</Link>
              <Link href="/credits" className="hover:text-white">Credits</Link>
              <Link href="/login" className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-cyan-200 hover:bg-cyan-500/20">Sign in</Link>
            </nav>
          </header>

          <div className="grid items-center gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Live Indian markets • TradingView</div>
              <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">Smart Indian market analysis with clear signals, not hype.</h1>
              <p className="mt-5 max-w-lg text-base text-slate-300">Track Nifty, Bank Nifty, Sensex and key sectors with live charting, market screening and honest AI predictions sold as credits.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/market/NIFTY" className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-900 transition hover:brightness-110">Explore markets</Link>
                <Link href="/predict" className="rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 font-semibold text-white transition hover:border-slate-500">View prediction</Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300">
                <div><span className="block text-2xl font-bold text-white">2</span> credits live analysis</div>
                <div><span className="block text-2xl font-bold text-white">1</span> credit prediction</div>
                <div><span className="block text-2xl font-bold text-white">15m</span> free repeat</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.42 }} className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4 shadow-2xl shadow-cyan-950/40">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-slate-400">Market pulse</div>
                <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300">Open</div>
              </div>
              <div className="space-y-3">
                {marketCards.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.name}</div>
                      <div className="mt-1 text-lg font-bold text-white">{item.value}</div>
                    </div>
                    <div className={`rounded-full px-2 py-1 text-xs font-semibold ${item.tone === 'up' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-red-500/10 text-red-300'}`}>
                      {item.change}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Overview</div>
            <h2 className="mt-2 text-2xl font-bold text-white">Live market snapshot</h2>
          </div>
          <Link href="/market/NIFTY" className="text-sm text-cyan-300 hover:text-cyan-200">Open market page →</Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {marketCards.map((stat) => (
            <motion.div key={stat.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="flex items-center justify-between text-slate-400">
                <div className="text-sm font-medium">{stat.name}</div>
                <div className={`rounded-full px-2 py-1 text-[10px] font-semibold ${stat.tone === 'up' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-red-500/10 text-red-300'}`}>{stat.change}</div>
              </div>
              <div className="mt-4 text-3xl font-black text-white">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-amber-300">Free</div>
            <h3 className="mt-2 text-2xl font-bold text-white">Markets</h3>
            <p className="mt-3 text-sm text-slate-300">Ticker tape, market overview, sector benchmarks, heatmap, screener and charting widgets with official TradingView data.</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Paid</div>
            <h3 className="mt-2 text-2xl font-bold text-white">AI analysis</h3>
            <p className="mt-3 text-sm text-slate-300">Honest machine-driven technical outlooks, probabilities, confidence and a clear not-validated fallback when signals lack out-of-sample evidence.</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-emerald-300">Credits</div>
            <h3 className="mt-2 text-2xl font-bold text-white">Fast access</h3>
            <p className="mt-3 text-sm text-slate-300">Buy packs through Razorpay, spend credits on live analysis and predictions, and refund if an analysis fails or the model is not validated.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

