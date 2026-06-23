import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from '../animations/Reveal'
import { images } from '../utils/content'

export function CoreIdea() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -70])
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 90])

  return (
    <section id="idea" ref={ref} className="relative overflow-hidden py-24 md:py-36">
      <div className="thermal-blob left-1/2 top-32 -translate-x-1/2" />
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <Reveal>
          <span className="eyebrow">Core idea</span>
          <h2 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-charcoal md:text-7xl">
            What if drying infrastructure could deploy like fabric?
          </h2>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-muted">
            Instead of transporting produce toward fixed equipment, Therbel imagines preservation
            as a soft, movable surface. Unroll it, orient it, layer it, and let sunlight do useful work.
          </p>
        </Reveal>

        <div className="relative min-h-[560px]">
          <motion.div style={{ y: y1 }} className="absolute left-0 top-4 w-[72%] overflow-hidden rounded-[2rem] border border-white/70 shadow-soft">
            <img src={images.thermalSheet} alt="Thermal sheet concept" className="aspect-[4/5] w-full object-cover" />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="glass-panel absolute bottom-4 right-0 w-[68%] rounded-[2rem] p-4 md:p-5"
          >
            <img src={images.prototypeFolded} alt="Folded Therbel prototype" className="aspect-[4/3] rounded-[1.4rem] object-cover" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-terracotta">Portable by design</p>
            <p className="mt-2 leading-7 text-muted">
              A deployable sheet means the preservation surface can follow harvest rhythms.
            </p>
          </motion.div>
          <motion.div
            animate={{ opacity: [0.45, 0.9, 0.45], scale: [1, 1.05, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-[18%] top-[38%] h-28 w-28 rounded-full border border-terracotta/25 bg-terracotta/10"
          />
        </div>
      </div>
    </section>
  )
}
