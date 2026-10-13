import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar({ user }: { user?: any }) {
  return (
    <motion.nav className="flex items-center justify-between p-4 bg-gray-800/60 backdrop-blur" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center font-bold">dh</div>
        <Link href="/" className="font-semibold">dhru.ltd</Link>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/credits" className="text-sm text-gray-300">Credits</Link>
        {user ? <div className="text-sm text-gray-200">{user.email}</div> : <Link href="/login" className="text-sm text-primary">Sign in</Link>}
      </div>
    </motion.nav>
  )
}
