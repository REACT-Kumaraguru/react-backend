import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { images, solutions } from '../utils/content'

gsap.registerPlugin(ScrollTrigger)

export function ExistingSolutions() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        const distance = track.scrollWidth - window.innerWidth + 96
        gsap.to(track, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${distance}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Existing systems"
          title="Drying exists, but access is uneven."
          text="Therbel is positioned between informal exposure and capital-heavy industrial infrastructure."
        />
      </div>

      <div className="mt-14 overflow-hidden pl-[max(1rem,calc((100vw-1180px)/2))]">
        <div ref={trackRef} className="horizontal-track pr-8">
          <article className="relative h-[420px] w-[78vw] max-w-[520px] overflow-hidden rounded-[2rem] border border-charcoal/10 bg-cream shadow-soft">
            <img src={images.existingSolutions} alt="Existing drying solution references" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-cream">
              <p className="text-sm uppercase tracking-[0.16em]">A familiar landscape</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">From mats to machines</h3>
            </div>
          </article>

          {solutions.map((solution, index) => (
            <article
              key={solution.title}
              className="soft-card group flex h-[420px] w-[76vw] max-w-[380px] flex-col justify-between rounded-[2rem] p-7 transition duration-300 hover:-translate-y-2 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-charcoal/10 bg-white/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-terracotta">
                  {solution.tag}
                </span>
                <ArrowUpRight className="text-charcoal/35 transition group-hover:text-terracotta" size={20} />
              </div>
              <div>
                <p className="font-serif text-7xl text-charcoal/10">0{index + 1}</p>
                <h3 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-charcoal">{solution.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted">{solution.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
