import { Reveal } from '../animations/Reveal'

export function SectionHeading({ eyebrow, title, text, align = 'center', className = '' }) {
  const centered = align === 'center'

  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-charcoal md:text-6xl">
        {title}
      </h2>
      {text && <p className="mt-5 text-lg leading-8 text-muted md:text-xl">{text}</p>}
    </Reveal>
  )
}
