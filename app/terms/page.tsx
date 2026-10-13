import React from 'react'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#07111f] p-8 text-slate-100">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-black">Terms of Service</h1>
        <p className="text-sm text-slate-300">Welcome to dhru.ltd. These Terms of Service (&quot;Terms&quot;) govern your use of our website and services. By using dhru.ltd you agree to these Terms. Please read them carefully.</p>

        <section>
          <h2 className="text-lg font-semibold">1. Services</h2>
          <p className="text-sm text-slate-300">dhru.ltd provides market charts via TradingView widgets and paid AI analysis and predictions (the &quot;Services&quot;). Charts and real-time market data are provided by TradingView and other licensed data providers. The paid product is AI analysis and predictions sold as credits.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">2. No investment advice</h2>
          <p className="text-sm text-slate-300">The information provided by dhru.ltd is for informational purposes only and does not constitute financial or investment advice. We do not place trades or manage portfolios, and we are not a broker. Do not rely solely on our predictions for trading decisions.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">3. Credits and payments</h2>
          <p className="text-sm text-slate-300">Credits are sold via Razorpay. All credit ledger entries are append-only and transactions are idempotent where possible. Refunds are processed according to our refund policy.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">4. Model honesty & disclaimers</h2>
          <p className="text-sm text-slate-300">Our AI models are evaluated with walk-forward testing and purged labels. If a model does not beat a baseline out-of-sample it is labelled "not_validated" and will not issue directional signals. We provide probabilities, confidence measures and calibration information but make no guarantees.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">5. Limitations</h2>
          <p className="text-sm text-slate-300">We may use third-party data providers. If a provider is not configured the site will run in a preview mode labelled clearly. We never invent market prices or headlines.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">6. Governing law</h2>
          <p className="text-sm text-slate-300">These Terms are governed by applicable laws. For users in India, please consult local regulations including SEBI rules.</p>
        </section>

        <p className="text-xs text-slate-500">Last updated: 2026-10-13</p>
      </div>
    </main>
  )
}
