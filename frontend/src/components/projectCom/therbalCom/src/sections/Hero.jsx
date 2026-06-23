import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { MagneticButton } from '../components/MagneticButton'
import { ThermalSheetScene } from '../components/ThermalSheetScene'

export function Hero() {
  const { scrollYProgress } = useScroll()
  const sheetY = useTransform(scrollYProgress, [0, 0.25], [0, 120])
  const imageScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.06])

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pb-16 pt-32 md:pt-36">
      <div className="thermal-blob left-[-8rem] top-24" />
      <div className="thermal-blob olive-blob right-[-9rem] top-36" />

      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <span className="eyebrow">
            <Sparkles size={14} />
            Deployable preservation architecture
          </span>
          <h1 className="mt-6 max-w-4xl text-balance text-6xl font-semibold leading-[0.95] tracking-[-0.06em] text-charcoal md:text-8xl">
            Making Thermal Transformation Accessible
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-muted">
            Therbel is a rollable thermal-sheet system for distributed agricultural drying,
            helping communities protect moisture-sensitive produce before value is lost.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="#idea">Explore Innovation</MagneticButton>
            <MagneticButton href="#validation" variant="light">
              View Research
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div style={{ y: sheetY }} className="relative h-[520px] min-h-[420px]">
          <motion.div
            style={{ scale: imageScale }}
            className="absolute inset-x-8 bottom-14 top-24 rounded-[2rem] border border-charcoal/10 bg-gradient-to-br from-white/50 via-[#fff8ea]/45 to-[#edf0e5]/55 shadow-soft backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 top-8 h-[390px]">
            <ThermalSheetScene />
          </div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass-panel absolute bottom-10 left-0 max-w-[17rem] rounded-3xl p-5"
          >
            <p className="text-sm font-semibold text-charcoal">Passive solar thermal transfer</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Layered sheet geometry turns sunlight, airflow, and material selectivity into
              accessible drying capacity.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#problem"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-charcoal/10 bg-white/45 px-4 py-2 text-sm text-muted backdrop-blur md:flex"
      >
        Scroll the story
        <ChevronDown size={15} />
      </a>
    </section>
  )
}
