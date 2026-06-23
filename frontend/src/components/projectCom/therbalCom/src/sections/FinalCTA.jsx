import { motion } from 'framer-motion'
import { ArrowUpRight, Leaf } from 'lucide-react'
import { ThermalSheetScene } from '../components/ThermalSheetScene'
import { footerLinks } from '../utils/content'

export function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden px-3 pb-5 pt-20">
      <div className="section-shell relative overflow-hidden rounded-[2.4rem] border border-charcoal/10 bg-gradient-to-br from-[#fff8ea] via-[#f2e7d4] to-[#edf0e5] px-6 py-16 shadow-soft md:px-12 md:py-24">
        <div className="thermal-blob left-[-10rem] top-[-6rem]" />
        <div className="thermal-blob olive-blob bottom-[-10rem] right-[-7rem]" />

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <span className="eyebrow">Ready for the field</span>
            <h2 className="mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-charcoal md:text-7xl">
              Reliable Drying. Made Accessible.
            </h2>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-muted">
              A soft, deployable architecture for communities that need preservation to arrive
              where the harvest is.
            </p>
            <motion.a
              href="mailto:hello@therbel.example"
              whileHover={{ y: -3, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-cream shadow-lift transition hover:bg-terracotta"
            >
              Start a collaboration
              <ArrowUpRight size={16} />
            </motion.a>
          </div>

          <div className="relative h-[320px] rounded-[2rem] border border-white/65 bg-white/30">
            <ThermalSheetScene />
          </div>
        </div>
      </div>

      <footer className="section-shell flex flex-col gap-5 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <a href="#top" className="flex items-center gap-2 font-semibold text-charcoal">
          <span className="grid size-8 place-items-center rounded-full bg-olive/12 text-olive">
            <Leaf size={16} />
          </span>
          Therbel
        </a>
        <div className="flex flex-wrap gap-4">
          {footerLinks.map(([label, href]) => (
            <a key={label} href={href} className="transition hover:text-charcoal">
              {label}
            </a>
          ))}
        </div>
      </footer>
    </section>
  )
}
