import React from 'react'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#07111f] p-8 text-slate-100">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-black">Privacy Policy</h1>
        <p className="text-sm text-slate-300">This Privacy Policy explains how dhru.ltd collects, uses, and protects your personal information.</p>

        <section>
          <h2 className="text-lg font-semibold">1. Information we collect</h2>
          <p className="text-sm text-slate-300">We collect email addresses, optional mobile numbers, and usage data. Payment processing is handled by Razorpay and we do not store card details.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">2. How we use data</h2>
          <p className="text-sm text-slate-300">We use data to provide the Services, process purchases, and improve our models. We may use anonymized data for research and model evaluation.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">3. Data retention</h2>
          <p className="text-sm text-slate-300">We retain personal data as required to provide services, for legal compliance, and as described in account settings. Users can request data deletion subject to legal requirements.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">4. Security</h2>
          <p className="text-sm text-slate-300">We use industry-standard security practices, environment variables for secrets, secure cookies, and rate limits. However, no system is completely secure.</p>
        </section>

        <p className="text-xs text-slate-500">Last updated: 2026-10-13</p>
      </div>
    </main>
  )
}
