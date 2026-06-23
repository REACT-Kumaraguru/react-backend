import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { images, layers } from '../utils/content'

gsap.registerPlugin(ScrollTrigger)

export function HowItWorks() {
  const sectionRef = useRef(null)
  const layerRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        layerRefs.current,
        { y: 96, opacity: 0, rotateX: -18 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 58%',
            end: 'bottom 62%',
            scrub: 0.8,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="works" ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="How it works"
          title="A thermal stack, simplified into an elegant sheet."
          text="Each layer has a focused role: admit, absorb, reflect, control air, and transfer heat toward preservation."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 md:p-10">
            <div className="absolute inset-x-10 top-1/2 h-px diagram-line" />
            <div className="relative mx-auto flex min-h-[520px] max-w-xl flex-col justify-center gap-5 [perspective:1200px]">
              {layers.map((layer, index) => (
                <div
                  key={layer.title}
                  ref={(node) => {
                    layerRefs.current[index] = node
                  }}
                  className="relative rounded-[1.4rem] border border-white/65 p-5 shadow-lift"
                  style={{
                    background: `linear-gradient(135deg, ${layer.color}, rgba(255,250,240,.72))`,
                    marginLeft: `${index * 18}px`,
                    marginRight: `${(layers.length - index) * 12}px`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.13em] text-charcoal/55">
                        Layer 0{index + 1}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-charcoal">
                        {layer.title}
                      </h3>
                    </div>
                    <span className="size-3 rounded-full bg-white/70 shadow" />
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-6 text-charcoal/70">{layer.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="overflow-hidden rounded-[2rem] border border-charcoal/10 bg-cream shadow-soft">
              <img src={images.architectureLayers} alt="Therbel architecture layer diagram" className="h-full min-h-[320px] w-full object-cover" />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="soft-card rounded-3xl p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-terracotta">Controlled heat</p>
                <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-charcoal">Less machinery. More placement freedom.</p>
              </div>
              <div className="soft-card rounded-3xl p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-olive">Drying surface</p>
                <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-charcoal">A product language people can understand.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
