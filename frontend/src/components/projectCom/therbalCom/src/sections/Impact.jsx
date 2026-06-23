import { motion } from 'framer-motion'
import { Reveal } from '../animations/Reveal'
import { fadeUp, staggerParent } from '../animations/variants'
import { SectionHeading } from '../components/SectionHeading'
import { images, impactCards } from '../utils/content'

export function Impact() {
  return (
    <section id="impact" className="relative overflow-hidden py-24 md:py-32">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Human impact"
              title="Preservation can become local power."
              text="Therbel is about more than drying. It is about keeping agency, nutrition, and income closer to the people who grow food."
            />
            <Reveal className="mt-10 overflow-hidden rounded-[2rem] border border-charcoal/10 shadow-soft">
              <img src={images.leavesFresh} alt="Fresh agricultural leaves" className="aspect-[16/10] w-full object-cover" />
            </Reveal>
          </div>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-4 md:grid-cols-2"
          >
            {impactCards.map(({ icon: Icon, title, text, metric, suffix }, index) => (
              <motion.article
                key={title}
                variants={fadeUp}
                className={`soft-card rounded-[2rem] p-6 ${index === 4 ? 'md:col-span-2' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-olive/12 text-olive">
                    <Icon size={21} />
                  </span>
                  <motion.p
                    className="text-3xl font-semibold tracking-[-0.05em] text-terracotta"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + index * 0.06 }}
                  >
                    {metric}
                    {suffix}
                  </motion.p>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-charcoal">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <Reveal className="mt-8 overflow-hidden rounded-[2rem] border border-charcoal/10 shadow-soft">
          <img src={images.leavesDry} alt="Dried preserved leaves" className="max-h-[360px] w-full object-cover" />
        </Reveal>
      </div>
    </section>
  )
}
