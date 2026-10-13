import React from 'react'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#07111f] p-8 text-slate-100">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-black">Refund Policy</h1>
        <p className="text-sm text-slate-300">We issue refunds for failed paid analyses or where the ML service returns an explicit failure. Refunds are processed by issuing credits to the user account rather than direct chargebacks where appropriate.</p>

        <section>
          <h2 className="text-lg font-semibold">Conditions</h2>
          <p className="text-sm text-slate-300">Refunds are considered when: the ML service returns an error; there's an unresolvable data provider failure; or an internal processing error prevents delivering the paid analysis. Refunds are not provided for user error or misuse.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Process</h2>
          <p className="text-sm text-slate-300">To request a refund, contact support@example.com with your purchase id. Refunds are issued as credit ledger entries and recorded in the purchase record.</p>
        </section>

        <p className="text-xs text-slate-500">Last updated: 2026-10-13</p>
      </div>
    </main>
  )
}
