import { motion } from 'framer-motion'
import { fadeUp, staggerParent } from '../animations/variants'
import { SectionHeading } from '../components/SectionHeading'
import { useMouseTilt } from '../hooks/useMouseTilt'
import { images, productFeatures } from '../utils/content'

export function ProductShowcase() {
  const tilt = useMouseTilt(9)

  return (
    <section id="product" className="relative overflow-hidden py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Product showcase"
          title="A lightweight architecture for serious preservation work."
          text="Therbel combines soft deployment with layered thermal control, giving rural producers a new kind of drying infrastructure."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
            className="relative min-h-[560px] overflow-hidden rounded-[2.2rem] border border-charcoal/10 bg-cream p-4 shadow-soft"
          >
            <img src={images.prototypeSheet} alt="Rollable Therbel thermal sheet prototype" className="h-full min-h-[528px] w-full rounded-[1.7rem] object-cover" />
            <div className="absolute inset-4 rounded-[1.7rem] bg-gradient-to-t from-[#f8f6f1]/86 via-transparent to-transparent" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-panel absolute bottom-8 left-8 right-8 rounded-3xl p-5 md:right-auto md:max-w-sm"
            >
              <p className="text-3xl font-semibold tracking-[-0.05em] text-charcoal">Roll. Carry. Deploy.</p>
              <p className="mt-3 leading-7 text-muted">
                A sheet-based system keeps the product language humble, familiar, and flexible.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-4"
          >
            {productFeatures.map(({ icon: Icon, title, text }) => (
              <motion.article
                key={title}
                variants={fadeUp}
                className="soft-card group rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-olive/12 text-olive transition group-hover:bg-terracotta/10 group-hover:text-terracotta">
                  <Icon size={21} />
                </span>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-charcoal">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
