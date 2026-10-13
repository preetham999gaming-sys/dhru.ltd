import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'dhru.ltd',
  description: 'Indian markets analysis with TradingView charts and AI predictions',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 antialiased">{children}</body>
    </html>
  )
}
