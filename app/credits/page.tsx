import AnimatedCard from '@/components/AnimatedCard'
import TradingViewEmbed from '@/components/TradingViewEmbed'

export default function CreditsPage() {
  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Buy Credits</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatedCard>
          <h3 className="font-semibold">Starter</h3>
          <p className="text-sm text-gray-400">10 credits</p>
          <div className="mt-4">
            <button className="px-3 py-2 bg-emerald-600 rounded">Buy — ₹99</button>
          </div>
        </AnimatedCard>
        <AnimatedCard>
          <h3 className="font-semibold">Pro</h3>
          <p className="text-sm text-gray-400">50 credits</p>
          <div className="mt-4">
            <button className="px-3 py-2 bg-emerald-600 rounded">Buy — ₹399</button>
          </div>
        </AnimatedCard>
        <AnimatedCard>
          <h3 className="font-semibold">Enterprise</h3>
          <p className="text-sm text-gray-400">200 credits</p>
          <div className="mt-4">
            <button className="px-3 py-2 bg-emerald-600 rounded">Buy — ₹999</button>
          </div>
        </AnimatedCard>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-medium mb-2">Preview</h2>
        <div className="bg-gray-800 p-4 rounded">
          <TradingViewEmbed id="tv_preview" widgetConfig={{ symbol: 'NSE:NIFTY 50', width: '100%', height: 240 }} />
        </div>
      </section>
    </main>
  )
}
