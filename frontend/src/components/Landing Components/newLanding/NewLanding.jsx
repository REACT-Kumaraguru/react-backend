import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  ClipboardCheck,
  Microscope,
  Users,
  Scale,
  ShoppingCart,
  Rocket,
} from "lucide-react";
import ShinyText from "../../FooterCom/ShinyText";
import RotatingText from "../RotatingText";
import Testimonials from "../Testimonials";
import KhsLogo from "../../../assets/logos/KHS.png";
import WwoofLogo from "../../../assets/logos/wwoof.webp";

const easeOut = [0.22, 1, 0.36, 1];

export default function NewLanding() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    reduceMotion
      ? {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay, ease: easeOut },
          viewport: { once: true, margin: "-48px" },
        }
      : {
          initial: { opacity: 0, rotateX: 11, y: 44 },
          whileInView: { opacity: 1, rotateX: 0, y: 0 },
          transition: { duration: 0.78, delay, ease: easeOut },
          viewport: { once: true, margin: "-72px" },
        };

  const heroMotion = reduceMotion
    ? {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: easeOut },
      }
    : {
        initial: { opacity: 0, rotateX: 9, y: 28 },
        animate: { opacity: 1, rotateX: 0, y: 0 },
        transition: { duration: 0.95, ease: easeOut },
      };

  const cardMotion = (i) =>
    reduceMotion
      ? {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: i * 0.05, ease: easeOut },
          viewport: { once: true, margin: "-32px" },
        }
      : {
          initial: { opacity: 0, rotateX: 9, y: 36, z: -28 },
          whileInView: { opacity: 1, rotateX: 0, y: 0, z: 0 },
          transition: { duration: 0.68, delay: i * 0.07, ease: easeOut },
          viewport: { once: true, margin: "-40px" },
        };
  const tracks = [
    { label: "Undergraduates", href: "/programmes" },
    { label: "Postgraduates", href: "/programmes" },
    { label: "School students", href: "/programmes" },
    { label: "Professionals", href: "/programmes" },
  ];

  const pipeline = [
    { title: "Field", subtitle: "Identifying sector friction", Icon: Search },
    { title: "Validation", subtitle: "Demand signal testing", Icon: ClipboardCheck },
    { title: "Research", subtitle: "Deep technical audit", Icon: Microscope },
    { title: "Engineering", subtitle: "Scalable MVP builds", Icon: Users },
    { title: "IP", subtitle: "Legal moat strategy", Icon: Scale },
    { title: "Market", subtitle: "Go-to-market execution", Icon: ShoppingCart },
    { title: "Venture", subtitle: "Series A readiness", Icon: Rocket },
  ];

  const trackCards = [
    {
      audience: "For Undergraduates · KCT, Coimbatore",
      title: "The Venture Fellowship",
      intro:
        "Two years inside your engineering degree. One real problem. One registered startup at the end of it.",
      meta: [
        { label: "Duration", value: "2 Years" },
        { label: "Credits", value: "40 Credits" },
        { label: "Cohort", value: "24 Fellows" },
        { label: "Next Intake", value: "June 2026" },
      ],
      detail:
        "A 40-credit diploma alongside your B.E. or B.Tech degree. A two-year structured journey from field immersion to a patent filing, tested MVP, and registered startup.",
      bullets: [
        "Publication-ready research paper",
        "Patent filing",
        "Working MVP",
        "Registered startup",
      ],
      footnote: "Open to KCT students",
      ctaLabel: "Explore the Fellowship →",
      accent: "#E46F47",
      ctaBg: "#E46F47",
    },
    {
      audience: "For Postgraduates · KCLAS, Coimbatore",
      title: "The Social Innovation Fellowship",
      intro:
        "The only MSW that ends with a venture. Two years. One community. Something permanent left behind.",
      meta: [
        { label: "Duration", value: "2 Years" },
        { label: "Degree", value: "MSW (BU)" },
        { label: "Track", value: "MSW-REACT" },
        { label: "Next Intake", value: "2026 Batch" },
      ],
      detail:
        "MSW-REACT blends community development practice with venture-building methodology. You graduate with social work depth and startup execution.",
      bullets: [
        "Research paper to publication standard",
        "Working proof of concept + MVP",
        "Verified social impact report",
        "Registered entity",
      ],
      footnote: "Open to MSW students at KCLAS",
      ctaLabel: "Explore the Fellowship →",
      accent: "#7D5BBE",
      ctaBg: "#7D5BBE",
    },
    {
      audience: "For School Students · Grade 7-12",
      title: "The Young Builders Programme",
      intro:
        "Six years to build your entrepreneurial identity and a university admissions portfolio that proves it.",
      meta: [
        { label: "Duration", value: "6 Years" },
        { label: "Grades", value: "7 to 12" },
        { label: "Curriculum", value: "IB / Cambridge" },
        { label: "Format", value: "Hybrid" },
      ],
      detail:
        "The Young Builders Programme gives Grade 7 to 12 students tools, mentorship, and structured pathways to identify and solve real-world problems.",
      bullets: [
        "Documented research project",
        "Working prototype",
        "International university portfolio",
        "REACT Young Builders Certificate",
      ],
      footnote: "Open to Grade 7-12 students on IB or Cambridge",
      ctaLabel: "Explore the Programme →",
      accent: "#13B58C",
      ctaBg: "#13B58C",
    },
    {
      audience: "For Independent Professionals",
      title: "The Founders Track",
      intro:
        "One year. One real problem you already know exists. The structure, mentorship, and community to build the answer.",
      meta: [
        { label: "Duration", value: "1 Year" },
        { label: "Format", value: "Hybrid" },
        { label: "Credential", value: "Fellowship" },
        { label: "Entry", value: "Rolling" },
      ],
      detail:
        "For people already working in government, NGO, or community systems who want to convert persistent problems into validated solutions.",
      bullets: [
        "Validated problem statement",
        "Working MVP",
        "Grant application submitted",
        "Registered entity",
      ],
      footnote: "Open to post-degree professionals, any background",
      ctaLabel: "Explore the Track →",
      accent: "#F2A11C",
      ctaBg: "#F2A11C",
    },
  ];

  const whyReactPillars = [
    {
      num: "01",
      title: "Field First",
      body:
        "Fellows spend their first weeks in real communities, not classrooms. Problems are validated before anything is built. You cannot design a solution for a reality you have never been inside.",
    },
    {
      num: "02",
      title: "Mentored by Practitioners",
      body:
        "Every team is guided by people who have filed patents, built products, and worked in the field. Not professors who study entrepreneurship. People who have done it.",
    },
    {
      num: "03",
      title: "Partners in the Real World",
      body:
        "We work with organisations operating on the ground. Fellows do not simulate problems — they solve real ones.",
    },
  ];

  const fieldPartnerLines = [
    {
      org: "Keystone Foundation, The Nilgiris",
      detail: "field partner, biodiversity and tribal livelihood domain",
    },
    {
      org: "WWOOF India",
      detail: "field partner, sustainable agriculture and rural community domain",
    },
  ];

  const admissionSteps = [
    {
      num: "01",
      title: "Apply",
      body:
        "Tell us about yourself and a problem you have noticed. Ten minutes.",
    },
    {
      num: "02",
      title: "Connect",
      body:
        "We reach out within 7 days. Meet the team. Ask everything you want to know.",
    },
    {
      num: "03",
      title: "Build",
      body:
        "Join your cohort. Start your journey. Leave with something real.",
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0F2A44] text-white [perspective:1600px]">
      {/* HERO */}
      <motion.section
        {...heroMotion}
        style={{ transformStyle: "preserve-3d", transformOrigin: "50% 0%" }}
        className="relative flex flex-col overflow-hidden"
      >
        {/* background texture */}
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />

        {/* pt clears fixed Navbar (py-6 + logo ~72–96px) */}
        <div className="relative pt-32 pb-10 px-6 sm:pt-36 md:pt-40">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-white/70">
                REACT Programmes · Find Your Path
              </p>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight font-serif">
                <span className="block text-white">Every kind of builder.</span>
                <span className="mt-1 block italic text-[#FF6B5C]">
                  One movement.
                </span>
              </h1>

              <p className="max-w-3xl pt-1 text-sm sm:text-base text-white/70 leading-relaxed">
                Whether you are in school, in college, in a career, or between
                two — REACT has a structured path that meets you where you are
                and takes you somewhere worth going.
                <br />
                <br />
                Four tracks. One standard. Real outputs at the end of every one.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-full bg-[#FF6B5C] text-white px-7 py-3 text-sm sm:text-base hover:bg-[#ff5a49] transition-colors"
                >
                  Apply Now
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-transparent text-white px-7 py-3 text-sm sm:text-base border border-white/70 hover:border-white hover:bg-white/10 transition-colors"
                >
                  Book a Call with Our Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* DARK SEPARATOR BAR (tracks) */}
      <motion.section
        {...reveal(0)}
        style={{ transformStyle: "preserve-3d" }}
        className="bg-[#0B2238] text-white"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="border-t border-white/10 py-4">
            <nav className="flex flex-wrap gap-x-10 gap-y-3 text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/60">
              {tracks.map((t) => (
                <a
                  key={t.label}
                  className="hover:text-white transition-colors"
                  href={t.href}
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </motion.section>

      {/* BETWEEN-THE-TRACKS CONTENT (brand colors) */}
      <section className="bg-[#F4F6F8] text-[#0F172A]">
        <motion.div
          {...reveal(0)}
          style={{ transformStyle: "preserve-3d" }}
          className="mx-auto max-w-6xl px-6 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex flex-col items-center gap-3 text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-slate-900">Where Education Meets</span>
              <RotatingText
                texts={["Learning", "Enterprise"]}
                mainClassName="px-3 sm:px-4 md:px-5 bg-cyan-600 text-white overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-lg"
                rotationInterval={2000}
              />
            </div>
            <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed">
              REACT is India&apos;s first multi-track experiential learning
              fellowship that turns real-world challenges into prototypes.
            </p>
          </div>
        </motion.div>

        {/* methodology / pipeline */}
        <motion.div
          {...reveal(0.06)}
          style={{ transformStyle: "preserve-3d" }}
          className="border-t border-slate-200 bg-white"
        >
          <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
            <div className="text-center">
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-cyan-700/80">
                The methodology
              </p>
              <h2 className="mt-3 font-sans text-2xl sm:text-3xl font-semibold text-slate-900">
                The{" "}
                <span className="inline-block">
                  <ShinyText
                    text="REACT"
                    speed={3}
                    color="#FF6B5C"
                    shineColor="#ffffff"
                    spread={120}
                  />
                </span>{" "}
                Pipeline
              </h2>
            </div>

            {/* Pipeline: one continuous line; desktop = horizontal, mobile = vertical */}
            <div className="mt-12">
              {/* Desktop — 7 equal columns; line at fixed y through icon centers (h-12 → center 24px) */}
              <div className="relative hidden w-full lg:grid lg:grid-cols-7 lg:gap-x-3">
                <div
                  className="pointer-events-none absolute left-0 right-0 top-[23px] z-0 h-[2px] bg-[#E5E7EB]"
                  aria-hidden
                />
                {pipeline.map(({ title, subtitle, Icon }, idx) => {
                  const isLast = idx === pipeline.length - 1;
                  return (
                    <div
                      key={title}
                      className="group relative z-10 flex min-w-0 flex-col items-center text-center"
                    >
                      <div className="flex h-12 w-full items-center justify-center">
                        <div
                          className={[
                            "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                            isLast
                              ? "border-[#2F80ED] bg-[#2F80ED] text-white shadow-sm"
                              : "border-slate-200 bg-slate-100 text-slate-600 group-hover:border-[#FF6B5C] group-hover:bg-white group-hover:text-[#FF6B5C] group-hover:shadow-sm",
                          ].join(" ")}
                        >
                          <Icon size={18} strokeWidth={1.75} />
                        </div>
                      </div>
                      <p className="mt-4 text-xs font-semibold text-slate-900">
                        {title}
                      </p>
                      <p className="mt-1 max-w-[9rem] text-[11px] leading-snug text-slate-500 group-hover:text-slate-600">
                        {subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Mobile / tablet — one vertical line through icon centers */}
              <div className="relative pl-1 lg:hidden">
                <div
                  className="pointer-events-none absolute bottom-6 left-[23px] top-6 z-0 w-[2px] bg-[#E5E7EB]"
                  aria-hidden
                />
                <ul className="relative z-10">
                  {pipeline.map(({ title, subtitle, Icon }, idx) => {
                    const isLast = idx === pipeline.length - 1;
                    return (
                      <li
                        key={title}
                        className="group flex gap-4 pb-10 last:pb-0 sm:gap-5"
                      >
                        <div className="relative z-10 flex w-12 shrink-0 justify-center">
                          <div
                            className={[
                              "flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200",
                              isLast
                                ? "border-[#2F80ED] bg-[#2F80ED] text-white shadow-sm"
                                : "border-slate-200 bg-slate-100 text-slate-600 group-hover:border-[#FF6B5C] group-hover:bg-white group-hover:text-[#FF6B5C] group-hover:shadow-sm",
                            ].join(" ")}
                          >
                            <Icon size={18} strokeWidth={1.75} />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 pt-1">
                          <p className="text-xs font-semibold text-slate-900">
                            {title}
                          </p>
                          <p className="mt-1 text-[11px] leading-snug text-slate-500 group-hover:text-slate-600">
                            {subtitle}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* tracks section */}
        <motion.div
          {...reveal(0.1)}
          style={{ transformStyle: "preserve-3d" }}
          className="border-t border-slate-200 bg-[#F8F9FB]"
        >
          <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
            <div className="mb-8 sm:mb-10">
              <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900">
                Find your path.
              </h3>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
              {trackCards.map((card, index) => (
                <motion.article
                  key={card.audience}
                  {...cardMotion(index)}
                  style={{
                    borderTop: `3px solid ${card.accent}`,
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom",
                  }}
                  className="flex h-full min-h-[760px] flex-col overflow-hidden rounded-sm border border-slate-200 bg-white"
                >
                  <div className="flex min-h-[220px] flex-col px-6 py-6">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                      {card.audience}
                    </p>
                    <h4 className="mt-3 font-serif text-3xl font-semibold text-slate-900 leading-tight">
                      {card.title}
                    </h4>
                    <p className="mt-3 text-[18px] text-slate-700 leading-relaxed">
                      {card.intro}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 px-6 py-5">
                    <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-4 sm:gap-x-4">
                      {card.meta.map((item) => (
                        <div key={item.label}>
                          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                            {item.label}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 border-t border-slate-200 px-6 py-6">
                    <p className="text-base text-slate-700 leading-relaxed">
                      {card.detail}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {card.bullets.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-[15px] text-slate-800">
                          <span
                            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: card.accent }}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto border-t border-slate-200 px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="min-h-[44px] text-sm text-slate-500">{card.footnote}</p>
                    <a
                      href="/programmes"
                      className="inline-flex min-w-[168px] items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                      style={{ backgroundColor: card.ctaBg }}
                    >
                      {card.ctaLabel}
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why REACT Works — dark split + grid (after Find your path) */}
      <motion.section
        {...reveal(0.12)}
        style={{ transformStyle: "preserve-3d" }}
        className="border-t border-white/10 bg-[#0B1D33] text-white"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-0 lg:grid-cols-12 lg:items-stretch">
            <div className="border-b border-white/15 pb-12 lg:col-span-5 lg:border-b-0 lg:border-r lg:border-white/15 lg:pb-0 lg:pr-10 xl:pr-14">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF6B5C]">
                Why REACT Works
              </p>
              <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl md:text-[2.6rem] md:leading-[1.15]">
                Built differently. For a reason.
              </h3>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
                Every track shares the same standard: start in the field, learn from
                practitioners, and build with partners who operate where the problem
                actually lives.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-2 sm:divide-x sm:divide-y">
                {whyReactPillars.map((pillar) => (
                  <div key={pillar.num} className="px-6 py-10 sm:px-8 sm:py-10">
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#FF6B5C]">
                      {pillar.num}
                    </p>
                    <h4 className="mt-3 font-serif text-xl font-semibold leading-snug sm:text-2xl">
                      {pillar.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {pillar.body}
                    </p>
                  </div>
                ))}

                <div className="px-6 py-10 sm:px-8 sm:py-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">
                    Field partners
                  </p>
                  <div className="mt-4 flex gap-3">
                    <div className="h-14 flex-1 rounded-sm bg-white/[0.06] ring-1 ring-inset ring-white/10">
                      <img
                        src={KhsLogo}
                        alt="Keystone Human Services logo"
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div className="h-14 flex-1 rounded-sm bg-white/[0.06] ring-1 ring-inset ring-white/10">
                      <img
                        src={WwoofLogo}
                        alt="WWOOF India logo"
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 text-left">
                    {fieldPartnerLines.map((line) => (
                      <p
                        key={line.org}
                        className="text-[13px] leading-snug text-white/65"
                      >
                        <span className="font-medium text-white/85">{line.org}</span>
                        {" — "}
                        {line.detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Entrepreneur Index Bridge Section */}
      <motion.section
        {...reveal(0.14)}
        style={{ transformStyle: "preserve-3d" }}
        className="bg-[#F4F6F8] px-4 py-14 sm:px-6 sm:py-16"
      >
        <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-[#ECEFF5] px-6 py-14 text-center sm:px-10 sm:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#9BB3FF]">
            Self-Assessment
          </p>
          <h3 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-5xl">
            Find out how you think.
          </h3>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-xl">
            The Entrepreneur Index is a 30-question orientation tool built on
            entrepreneurship research. It tells you how you naturally engage
            with problems, people, and systems — and what kind of builder you
            are. Taken by thousands. Shared by many.
          </p>
          <div className="mt-9">
            <a
              href="/entrepreneur-index"
              className="inline-flex items-center justify-center rounded-full bg-[#2C3240] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#202531]"
            >
              Take the Index →
            </a>
          </div>
        </div>
      </motion.section>

      {/* Social proof (from old landing testimonials) */}
      <motion.section
        {...reveal(0.16)}
        style={{ transformStyle: "preserve-3d" }}
        className="bg-white py-14 sm:py-16"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 text-center sm:mb-10">
            <h3 className="font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
              Do not take our word for it.
            </h3>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              Hear from the people building inside REACT right now.
            </p>
          </div>
        </div>
        <Testimonials />
      </motion.section>

      {/* Admission steps */}
      <motion.section
        {...reveal(0.18)}
        style={{ transformStyle: "preserve-3d" }}
        className="bg-[#F4F6F8] py-14 sm:py-16"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h3 className="font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
              Three steps. No complexity.
            </h3>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {admissionSteps.map((step) => (
              <article
                key={step.num}
                className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6"
              >
                <span className="pointer-events-none absolute right-4 top-2 text-5xl font-bold tracking-tight text-slate-200">
                  {step.num}
                </span>
                <h4 className="relative z-10 text-2xl font-semibold text-slate-900">
                  {step.title}
                </h4>
                <p className="relative z-10 mt-3 text-base leading-relaxed text-slate-600">
                  {step.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <p className="text-sm sm:text-base text-slate-600">
              Admission process varies by programme. We will walk you through
              everything personally.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/apply"
                className="inline-flex items-center justify-center rounded-full bg-[#FF6B5C] px-7 py-3 text-sm sm:text-base font-semibold text-white hover:bg-[#ff5a49] transition-colors"
              >
                Apply Now
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm sm:text-base font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                Book a Call First
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

