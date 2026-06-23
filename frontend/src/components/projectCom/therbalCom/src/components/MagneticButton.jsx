import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function MagneticButton({ href, children, variant = 'dark' }) {
  const dark = variant === 'dark'

  return (
    <motion.a
      href={href}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition md:px-6 ${
        dark
          ? 'border-charcoal bg-charcoal text-cream shadow-lift hover:bg-terracotta hover:border-terracotta'
          : 'border-charcoal/12 bg-white/60 text-charcoal backdrop-blur-xl hover:bg-white'
      }`}
    >
      {children}
      <ArrowRight size={16} />
    </motion.a>
  )
}
