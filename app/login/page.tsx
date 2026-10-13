'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [mode, setMode] = useState<'login'|'register'>('login')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [msg, setMsg] = useState('')

  async function submit(e: any) {
    e.preventDefault()
    setMsg('')
    if (mode === 'login') {
      const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ identifier, password }), headers: { 'content-type': 'application/json' } })
      const j = await res.json()
      if (j.ok) {
        setMsg('Signed in')
        // redirect to home
        window.location.href = '/'
      } else {
        setMsg(j.error || 'failed')
      }
    } else {
      const res = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ email: identifier, password, mobile }), headers: { 'content-type': 'application/json' } })
      const j = await res.json()
      if (j.ok) {
        setMsg('Registered and signed in')
        window.location.href = '/'
      } else {
        setMsg(j.error || 'failed')
      }
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">{mode === 'login' ? 'Sign in to dhru.ltd' : 'Create your dhru.ltd account'}</h1>
          <p className="text-sm text-gray-400">Use email + password or mobile number + password</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input className="w-full p-3 rounded bg-gray-900 border border-gray-700" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder={mode === 'login' ? 'email or mobile' : 'email'} />
          {mode === 'register' && <input className="w-full p-3 rounded bg-gray-900 border border-gray-700" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="mobile (optional)" />}
          <input type="password" className="w-full p-3 rounded bg-gray-900 border border-gray-700" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password (min 8 chars)" />
          <div className="flex gap-2">
            <button type="submit" className="w-full py-3 bg-primary rounded text-black font-semibold">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
            <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="w-full py-3 bg-gray-700 rounded">{mode === 'login' ? 'Switch to register' : 'Switch to login'}</button>
          </div>
        </form>
        {msg && <div className="mt-4 text-sm text-amber-300">{msg}</div>}
      </div>
    </main>
  )
}
