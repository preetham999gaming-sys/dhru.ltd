import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'enter'|'verify'|'done'>('enter')

  async function requestOtp(e: any) {
    e.preventDefault()
    const r = await fetch('/api/auth/request-otp', { method: 'POST', body: JSON.stringify({ email }), headers: { 'content-type': 'application/json' } })
    const j = await r.json()
    if (j.ok) {
      setToken(j.token)
      setStep('verify')
    }
  }
  async function verify(e: any) {
    e.preventDefault()
    const r = await fetch('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ token, code }), headers: { 'content-type': 'application/json' } })
    const j = await r.json()
    if (j.ok) {
      setStep('done')
      // in real app set cookie and redirect
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Sign in to dhru.ltd</h1>
          <p className="text-sm text-gray-400">Email OTP sign-in (demo)</p>
        </div>
        {step === 'enter' && (
          <form onSubmit={requestOtp} className="space-y-4">
            <input className="w-full p-3 rounded bg-gray-900 border border-gray-700" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
            <button className="w-full py-3 bg-primary rounded text-black font-semibold">Send code</button>
          </form>
        )}
        {step === 'verify' && (
          <form onSubmit={verify} className="space-y-4">
            <input className="w-full p-3 rounded bg-gray-900 border border-gray-700" value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" />
            <button className="w-full py-3 bg-primary rounded text-black font-semibold">Verify</button>
          </form>
        )}
        {step === 'done' && (
          <div className="p-4 bg-gray-800 rounded">Signed in. <Link href="/">Go home</Link></div>
        )}
      </div>
    </main>
  )
}
