import { motion } from 'framer-motion'

export default function AnimatedCard({ children }: { children: any }) {
  return (
    <motion.div className="bg-gray-800/60 rounded p-4 shadow-lg" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35 }}>
      {children}
    </motion.div>
  )
}
