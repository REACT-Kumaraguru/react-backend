import { motion } from 'framer-motion'
import { Newspaper, CloudRain, ThermometerSun } from 'lucide-react'
import { Reveal } from '../animations/Reveal'
import { fadeUp, staggerParent } from '../animations/variants'
import { SectionHeading } from '../components/SectionHeading'
import { images, stats } from '../utils/content'

const issues = [
  ['Produce loss', 'Harvest value often fades in the gap between picking and preservation.', Newspaper],
  ['Moisture instability', 'Humidity and rain can turn a narrow drying window into spoilage risk.', CloudRain],
  ['Infrastructure distance', 'Drying systems are too often fixed, expensive, or far from farms.', ThermometerSun],
]

export function Problem() {
  return (
    <section id="problem" className="relative overflow-hidden py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="The preservation gap"
          title="Food is not only grown. It has to survive the hours after harvest."
          text="For moisture-rich produce, a lack of accessible drying capacity can turn abundance into urgent loss."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-charcoal/10 bg-cream shadow-soft">
            <img src={images.problemCollage} alt="Agricultural loss and drying collage" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/35 via-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true }}
              className="glass-panel absolute bottom-6 left-6 right-6 rounded-3xl p-5 md:right-auto md:max-w-xs"
            >
              <p className="font-serif text-2xl leading-tight text-charcoal">Moisture is a clock.</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Drying infrastructure decides whether harvest becomes food, income, or waste.
              </p>
            </motion.div>
          </Reveal>

          <div className="grid content-between gap-6">
            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="grid gap-4 md:grid-cols-3"
            >
              {stats.map((stat) => (
                <motion.article key={stat.value} variants={fadeUp} className="soft-card rounded-3xl p-6">
                  <div className="flex items-end gap-1 text-4xl font-semibold tracking-[-0.05em] text-charcoal">
                    {stat.value}
                    <span className="pb-1 text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted">{stat.label}</p>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-4"
            >
              {issues.map(([title, text, Icon], index) => (
                <motion.article
                  key={title}
                  variants={fadeUp}
                  className="group flex items-start gap-5 rounded-3xl border border-charcoal/10 bg-white/45 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/70"
                  style={{ rotate: index === 1 ? '1deg' : index === 2 ? '-1deg' : '0deg' }}
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-terracotta/10 text-terracotta">
                    <Icon size={21} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-charcoal">{title}</h3>
                    <p className="mt-2 leading-7 text-muted">{text}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
