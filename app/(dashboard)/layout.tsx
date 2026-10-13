import Navbar from '@/components/Navbar'
import { ReactNode } from 'react'

export const metadata = { title: 'dhru — dashboard' }

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="bg-gray-900 text-gray-100">
        <Navbar />
        <div className="p-4">{children}</div>
      </body>
    </html>
  )
}
