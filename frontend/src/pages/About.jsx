import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Scale, ShieldCheck } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { FadeUp } from '../components/AboutCom/FadeUp';
import { RotatingText } from '../components/AboutCom/RotatingText';
import { StatusBadge } from '../components/AboutCom/StatusBadge';
import '../components/AboutCom/about.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Data (unchanged) ── */
const methodologyItems = [
  {
    label: 'Real World',
    body: 'The field is the classroom. Fellows learn inside the problem, not at a distance from it. The first thing every fellow does is leave the campus.',
  },
  {
    label: 'Engineering',
    body: 'In the fullest sense: the disciplined application of knowledge to build something that functions. A social worker who founds an NGO that survives is an engineer of institutions. A manager who designs a model that sustains a community cooperative is an engineer of systems. The methodology belongs to every discipline.',
  },
  {
    label: 'Application',
    body: 'Knowledge that cannot act on a real problem is unfinished. Every framework, every session, every mentor conversation at this centre exists in service of something that gets built and tested in the field.',
  },
  {
    label: 'Collaborative',
    body: 'The communities who carry the problem are co-authors of the solution. The cohort builds together. The methodology is designed for this from the ground up.',
  },
  {
    label: 'Transformation',
    body: 'The measure is whether something genuinely changed for the people the work was built for. Everything else is process.',
  },
];

const frameworks = [
  {
    title: 'Domain Intelligence Framework',
    body: 'Nine structured lenses applied to every problem before anything is built. They surface what most practitioners miss: who benefits from the problem remaining unsolved, why previous solutions failed at scale, exactly where intervention can change things. Fellows who complete all nine lenses can diagnose a problem. The specific lenses are proprietary to the centre and are not disclosed externally.',
  },
  {
    title: 'MMD Build Classification',
    body: 'Every solution built at the centre is classified as Material, Method, or Design. This classification is mapped directly to the Indian Patents Act. Fellows understand the intellectual property dimensions of their work from the first day of building.',
  },
  {
    title: 'CALIBRATE Community Assessment',
    body: 'Eighteen structured questions assessed before any fellow enters a community with a proposed solution: readiness, trust, infrastructure, governance, existing interventions. A solution does not arrive until the community is ready to receive it and the fellow has earned the permission to work there.',
  },
];


const qualities = [
  {
    title: 'Problem curiosity',
    body: 'Sitting with complexity long enough to understand it rather than describe it.',
  },
  {
    title: 'Cross-context adaptability',
    body: 'Moving through unfamiliar communities, disciplines, and conditions without losing orientation.',
  },
  {
    title: 'Collaborative drive',
    body: 'A demonstrated track record of building toward a shared goal with other people.',
  },
];

/* ── Sub-components ── */
const SectionLabel = ({ children, tone = 'light' }) => (
  <p
    className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${
      tone === 'dark' ? 'text-[#FFB4AA]' : 'text-[#E76758]'
    }`}
  >
    {children}
  </p>
);

const CtaRow = ({ dark = false }) => (
  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
    <Link
      to="/programme"
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.025] ${
        dark
          ? 'bg-white text-[#0F2A44] hover:bg-white/90'
          : 'bg-[#0F2A44] text-white hover:bg-[#153a5d]'
      }`}
      style={{ willChange: 'transform' }}
    >
      See the Programmes
      <ArrowRight className="about-arrow-icon h-5 w-5" aria-hidden="true" />
    </Link>
    <Link
      to="/apply"
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.025] ${
        dark
          ? 'border border-white/25 text-white hover:bg-white/10'
          : 'border border-slate-300 bg-white text-slate-950 hover:bg-slate-50'
      }`}
      style={{ willChange: 'transform' }}
    >
      Apply Now
    </Link>
  </div>
);

/* ── Spring heading wrapper ── */
const SpringHeading = ({ children, as: Tag = 'h2', className = '', delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div ref={ref} className="about-heading-clip">
      <motion.div
        initial={{ opacity: 0, y: 140 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', damping: 60, stiffness: 350, mass: 1, delay }}
        style={{ willChange: 'transform, opacity' }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
};

/* ── Methodology stacked-card reveal ── */
const MethodologyStack = () => {
  const sectionRef = useRef(null);
  const cardsRef   = useRef([]);
  const N = methodologyItems.length;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const cards   = cardsRef.current.filter(Boolean);
    if (prefersReduced || !section || cards.length < N) return;

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 48,
          scale: 0.94,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 55%',
            scrub: 0.5,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[2fr_3fr] lg:gap-16 lg:items-start">
        {/* Heading — sticky on desktop while cards spread into view on the right */}
        <div className="mb-12 lg:mb-0 lg:sticky lg:top-28">
          <SectionLabel>The Methodology</SectionLabel>
          <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Every word in REACT is a commitment.
          </h2>
          <p className="mt-5 text-xl leading-relaxed text-slate-600">
            Real World. Engineering. Application. Collaborative. Transformation.
          </p>
        </div>

        {/* Cards — each reveals individually as user scrolls */}
        <div className="space-y-5">
          {methodologyItems.map((item, i) => (
            <div
              key={item.label}
              ref={el => cardsRef.current[i] = el}
              className="about-pipeline-card rounded-2xl border border-slate-200 bg-[#F8FAFC] p-8 shadow-md"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#E76758]">
                {String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-[#0F2A44]">{item.label}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


/* ── Frameworks — tilt + spotlight hover cards ── */
const FRAMEWORK_ICONS = [Compass, Scale, ShieldCheck];

const FrameworkCard = ({ framework, index }) => {
  const cardRef = useRef(null);
  const Icon = FRAMEWORK_ICONS[index] ?? Compass;
  const prefersReducedRef = useRef(false);

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el || prefersReducedRef.current) return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.setProperty('--spot-x', `${px}%`);
    el.style.setProperty('--spot-y', `${py}%`);
    gsap.to(el, {
      rotateX: -ny * 7,
      rotateY: nx * 7,
      y: -6,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: true,
    });
  };

  const onMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, y: 0, duration: 0.5, ease: 'power3.out', overwrite: true });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="about-framework-card h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <span className="about-framework-spotlight" aria-hidden="true" />
      <div className="relative z-10 flex items-center justify-between">
        <span className="about-framework-icon flex h-11 w-11 items-center justify-center rounded-xl">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="about-framework-number text-4xl font-black leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="relative z-10 mt-5 text-lg font-semibold leading-tight text-[#0F2A44]">
        {framework.title}
      </h3>
      <p className="relative z-10 mt-3 text-sm leading-relaxed text-slate-600">{framework.body}</p>
    </article>
  );
};

/* Each card flies in from a unique direction */
const CARD_FROM = [
  { x: -220, y: 0,   rotation: -15, scale: 0.80 }, // ← from left, tilted
  { x: 0,   y: 200,  rotation:   0, scale: 0.65 }, // ↑ from below, squished
  { x: 220, y: 0,   rotation:  15, scale: 0.80 }, // → from right, tilted
];

/* ── Who Belongs Here — fly-in / fly-out on every scroll pass ── */
const QualityCard = ({ quality, index, sectionRef }) => {
  const cardRef  = useRef(null);
  const numRef   = useRef(null);
  const titleRef = useRef(null);
  const bodyRef  = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const card = cardRef.current;
    if (prefersReduced || !card) return;

    const delay = index * 0.07;
    const from  = CARD_FROM[index];

    /*
      Trigger off the section heading (sectionRef) so all 3 cards start
      animating the moment the section scrolls into view — not when each
      individual card reaches the viewport.
    */
    const triggerEl = sectionRef?.current ?? card;
    const st = {
      trigger: triggerEl,
      start: 'top 78%',
      end: 'top 5%',
      toggleActions: 'play reverse play reverse',
    };

    const ctx = gsap.context(() => {
      /* Card: flies in from its unique direction with blur + tilt */
      gsap.fromTo(card,
        { opacity: 0, x: from.x, y: from.y, rotation: from.rotation,
          scale: from.scale, filter: 'blur(14px)' },
        { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, filter: 'blur(0px)',
          duration: 0.9, delay, ease: 'power3.out', scrollTrigger: st }
      );

      /* Number: drops in from above and shrinks, low opacity target */
      gsap.fromTo(numRef.current,
        { opacity: 0, scale: 2.2, y: -30 },
        { opacity: 0.07, scale: 1, y: 0,
          duration: 0.75, delay: delay + 0.22, ease: 'power2.out', scrollTrigger: st }
      );

      /* Title: clips up from its own bottom edge */
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 36, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 0.65, delay: delay + 0.34, ease: 'power3.out', scrollTrigger: st }
      );

      /* Body: rises in last */
      gsap.fromTo(bodyRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0,
          duration: 0.6, delay: delay + 0.48, ease: 'power2.out', scrollTrigger: st }
      );
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className={`about-who-card about-who-card--${index + 1} relative h-full overflow-hidden rounded-2xl p-7 shadow-sm`}
    >
      <span ref={numRef} className="about-who-num" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 ref={titleRef} className="relative mt-2 text-xl font-semibold text-[#0F2A44]">
        {quality.title}
      </h3>
      <p ref={bodyRef} className="relative mt-3 text-base leading-relaxed text-slate-600">
        {quality.body}
      </p>
    </article>
  );
};

/* ══════════════════════════════════════════════════
   Main export
   ══════════════════════════════════════════════════ */
export const About = () => {
  const heroRef       = useRef(null);
  const heroTextRef   = useRef(null);
  const whoSectionRef = useRef(null);

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.075,
      syncTouch: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 0.9,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);
    window.addEventListener('load', refresh);

    return () => {
      lenis.destroy();
      window.removeEventListener('resize', refresh);
      window.removeEventListener('load', refresh);
    };
  }, []);

  /* ── Hero page-load reveal (GSAP stagger) ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const targets = heroTextRef.current?.querySelectorAll('.about-hero-el');
      if (!targets?.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y: 26, filter: 'blur(10px)', willChange: 'transform, opacity, filter' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.1,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ── Mouse parallax on hero ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let active = true;
    const textEl = heroTextRef.current;

    const onMove = (e) => {
      if (!active || !textEl) return;
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      gsap.to(textEl, { x: px * -8, y: py * -5, duration: 0.55, ease: 'power3.out' });
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      active = false;
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <main className="about-page min-h-screen bg-[#F5F7FA] text-slate-950">

      {/* ── HERO ── */}
      <section ref={heroRef} className="about-hero-section bg-white px-6 pb-20 pt-32 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <div ref={heroTextRef} style={{ willChange: 'transform' }}>
            <div className="about-hero-el">
              <StatusBadge />
            </div>

            <div className="about-hero-el mt-4">
              <SectionLabel>Centre for REACT</SectionLabel>
            </div>

            <h1 className="about-hero-el mt-6 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-tight text-[#0F2A44] sm:text-6xl lg:text-7xl">
              <span className="block">India has the problems.</span>
              <span className="block text-[#E76758]">
                We build the{' '}
                <RotatingText />
                .
              </span>
            </h1>

            <p className="about-hero-el mt-8 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              REACT is a methodology. This centre is where it runs. This page is why.
            </p>

            <div className="about-hero-el">
              <CtaRow />
            </div>
          </div>
        </div>
      </section>

      {/* ── THE BELIEF ── */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <FadeUp>
              <SectionLabel>The Belief</SectionLabel>
            </FadeUp>
            <SpringHeading
              as="h2"
              className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl"
              delay={0.05}
            >
              Social problems are unmet markets.
            </SpringHeading>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-slate-700">
            <FadeUp delay={0}>
              <p className="about-belief-p">A real need without a solution at scale is a market failure. Market failures can be corrected.</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="about-belief-p">
                The farmer losing produce to postharvest spoilage will pay for something that works. The patient
                travelling hours for a diagnosis will pay when the answer is accurate and close. The family whose child
                cannot read will invest in learning that actually functions.
              </p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="about-belief-p">
                The belief behind REACT is simple and demanding: a significant number of India&apos;s most urgent problems
                can be solved in ways that sustain themselves through the value they create. Solutions built on grants
                collapse when the grant ends. The community is left worse off than before: they experienced something
                better and had it taken away.
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <p className="about-belief-p">
                REACT builds the other kind. The kind that grows because it earns, earns because it works, and works
                because it was built by someone who spent time living inside the problem before touching a solution.
              </p>
            </FadeUp>
            <FadeUp delay={0.32}>
              <blockquote className="about-blockquote border-l-4 border-[#E76758] pl-5 text-2xl font-semibold leading-snug text-[#0F2A44]">
                &ldquo;The ventures outlast the people who build them. That is the standard.&rdquo;
              </blockquote>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY (stacked card reveal) ── */}
      <MethodologyStack />

      {/* ── FRAMEWORKS ── */}
      <section className="bg-white px-6 py-10 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <FadeUp>
              <SectionLabel>The Frameworks</SectionLabel>
            </FadeUp>
            <SpringHeading
              as="h2"
              className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl"
              delay={0.05}
            >
              Three frameworks. One rigorous process.
            </SpringHeading>
            <FadeUp delay={0.1}>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                The REACT methodology is not a philosophy. It is a set of tools that give every fellow a repeatable,
                disciplined process regardless of domain, background, or prior field experience.
              </p>
            </FadeUp>
          </div>

          <div
            className="about-framework-grid mt-8 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3"
            style={{ perspective: '1400px' }}
          >
            {frameworks.map((framework, i) => (
              <FadeUp key={framework.title} delay={i * 0.08} className="h-full">
                <FrameworkCard framework={framework} index={i} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTITUTION ── */}
      <section className="about-institution-section relative overflow-hidden px-6 py-16 sm:py-20">
        <span className="about-institution-blob about-institution-blob--1" aria-hidden="true" />
        <span className="about-institution-blob about-institution-blob--2" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <FadeUp>
              <SectionLabel>The Institution</SectionLabel>
            </FadeUp>
            <SpringHeading
              as="h2"
              className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl"
              delay={0.05}
            >
              Rooted at Kumaraguru Institutions, Coimbatore.
            </SpringHeading>
            <FadeUp delay={0.1}>
              <p className="mt-5 text-xl leading-relaxed text-slate-600">
                One of India&apos;s leading private institutions for engineering, management, and liberal arts.
              </p>
            </FadeUp>

          </div>
          <div className="space-y-6 text-lg leading-relaxed text-slate-700">
            <FadeUp delay={0}>
              <p className="about-institution-p">
                The Centre for REACT operates within Kumaraguru Institutions, based in Coimbatore, Tamil Nadu. The centre
                draws on its laboratories, fabrication facilities, academic mentors, and decades of industry and civil
                society relationships built across the region and beyond.
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="about-institution-p">
                Kumaraguru Institutions has held one position consistently: the purpose of education is not merely
                employment. The REACT methodology is the most direct expression of that position: a structured system that
                places students inside real problems and expects them to contribute meaningfully to their solution.
              </p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="about-institution-p">
                The programmes run at this centre are academically accredited through partner Master&apos;s degrees across
                three academic units within Kumaraguru Institutions.
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <a
                href="https://kct.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="about-institution-link group inline-flex items-center gap-2 rounded-full border border-[#E76758]/30 bg-white px-6 py-3 text-base font-semibold text-[#E76758]"
              >
                Visit Kumaraguru Institutions
                <ArrowRight className="about-arrow-icon h-4 w-4" aria-hidden="true" />
              </a>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── WHO BELONGS HERE ── */}
      <section className="bg-white px-6 py-16 sm:py-20" ref={(el) => { whoSectionRef.current = el; }}>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <FadeUp>
              <SectionLabel>Who Belongs Here</SectionLabel>
            </FadeUp>
            <SpringHeading
              as="h2"
              className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl"
              delay={0.05}
            >
              Three qualities. Every fellow,{' '}
              <span className="whitespace-nowrap">every time.</span>
            </SpringHeading>
            <FadeUp delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-slate-700">
                Fellows come from every discipline. What matters is how they engage with a problem they have never
                encountered before.
              </p>
            </FadeUp>
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
            {qualities.map((quality, i) => (
              <QualityCard key={quality.title} quality={quality} index={i} sectionRef={whoSectionRef} />
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK CTA ── */}
      <section className="about-dark-section bg-black px-6 py-18 text-white sm:py-24">
        <div className="relative z-10 mx-auto max-w-6xl">
          <FadeUp>
            <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">
              One outcome. Everything serves it.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/76">
              The methodology, the frameworks, the field immersion, the cohort, the gate system, the partner network. All
              of it is designed for one result: ventures that outlast the people who built them. Organisations that
              continue serving communities after graduation. Change that does not collapse when the programme ends.
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <CtaRow dark />
          </FadeUp>
        </div>
      </section>
    </main>
  );
};
