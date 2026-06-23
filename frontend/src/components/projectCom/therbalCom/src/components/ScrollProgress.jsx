import { motion } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-charcoal/5">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-terracotta via-[#d6a06d] to-olive"
        style={{ scaleX: progress }}
      />
    </div>
  )
}
