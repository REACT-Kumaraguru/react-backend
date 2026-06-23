import { motion } from 'framer-motion'
import { Activity, Beaker, LineChart } from 'lucide-react'
import { Reveal } from '../animations/Reveal'
import { fadeUp, staggerParent } from '../animations/variants'
import { SectionHeading } from '../components/SectionHeading'
import { validationCards } from '../utils/content'

const chartValues = [44, 62, 58, 73, 82, 76, 88, 92]

export function SimulationValidation() {
  return (
    <section id="validation" className="relative overflow-hidden py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Simulation & validation"
          title="A research story told with clarity."
          text="Therbel’s promise is grounded in layer behavior, prototype observation, and measurable thermal performance."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="glass-panel rounded-[2rem] p-7">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-terracotta/10 text-terracotta">
                <LineChart size={21} />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.13em] text-muted">Thermal curve</p>
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-charcoal">Steady usable gain</h3>
              </div>
            </div>

            <div className="mt-10 flex h-72 items-end gap-3 rounded-3xl border border-charcoal/10 bg-white/45 p-5">
              {chartValues.map((value, index) => (
                <motion.div
                  key={value + index}
                  className="chart-bar flex-1 rounded-t-full bg-gradient-to-t from-terracotta to-[#efc28a]"
                  initial={{ scaleY: 0.12, opacity: 0.35 }}
                  whileInView={{ scaleY: value / 100, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: '100%' }}
                />
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/50 p-4">
                <Activity size={18} className="text-olive" />
                <p className="mt-3 text-sm leading-6 text-muted">Responsive to solar intensity and air movement.</p>
              </div>
              <div className="rounded-2xl bg-white/50 p-4">
                <Beaker size={18} className="text-terracotta" />
                <p className="mt-3 text-sm leading-6 text-muted">Built to connect material choices with drying outcomes.</p>
              </div>
            </div>
          </Reveal>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-5 md:grid-cols-3"
          >
            {validationCards.map((card) => (
              <motion.article key={card.title} variants={fadeUp} className="soft-card overflow-hidden rounded-[2rem]">
                <div className="overflow-hidden">
                  <motion.img
                    src={card.image}
                    alt={card.title}
                    className="aspect-[4/3] w-full object-cover"
                    whileHover={{ scale: 1.045 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-charcoal">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{card.text}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
