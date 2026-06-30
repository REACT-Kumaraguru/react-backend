import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Globe, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Renderer, Geometry, Program, Mesh } from 'ogl';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   DATA  (unchanged)
───────────────────────────────────────────── */

const frameworks = [
  {
    id: 'dif',
    name: 'Domain Intelligence Framework',
    description:
      'Nine structured lenses applied to every problem before anything is built. They surface what most practitioners miss — who benefits from the problem remaining unsolved, why previous solutions failed at scale, where the genuine leverage point lies, and what kind of intervention can realistically change things. A fellow who has worked through all nine lenses can diagnose a problem. The specific lenses are proprietary to the centre and are not disclosed externally.',
    active: 'Phase 0 and Phase 1',
  },
  {
    id: 'mmd',
    name: 'MMD Build Classification',
    description:
      'Every solution built at the centre is classified as Material, Method, or Design — mapped directly to the Indian Patents Act. Material is a substance, compound, or formulation that is physically distinct and novel. Method is a process, protocol, or sequence that produces a repeatable outcome. Design is a device, system, software, or architecture that integrates components into a functioning whole. This classification is determined before building begins and anchors the entire IP strategy.',
    active: 'Phase 2 onward',
  },
  {
    id: 'calibrate',
    name: 'CALIBRATE Community Assessment',
    description:
      'Eighteen structured questions assessed before any fellow enters a community with a proposed solution — readiness, trust, infrastructure, governance, and the existing intervention landscape. A solution does not arrive until the community is ready to receive it and the fellow has earned the social permission to work there.',
    active: 'Phase 1 and Phase 3',
  },
];

const phaseCards = [
  { number: 0, id: 'phase-0', designation: 'Civic Fellow', duration: '14 Days', focus: 'Community Immersion' },
  { number: 1, id: 'phase-1', designation: 'Researcher', duration: 'Months 1 to 6', focus: 'Problem Validation' },
  { number: 2, id: 'phase-2', designation: 'Engineer', duration: 'Months 7 to 12', focus: 'Proof of Concept' },
  { number: 3, id: 'phase-3', designation: 'Builder', duration: 'Months 13 to 18', focus: 'Minimum Viable Product' },
  { number: 4, id: 'phase-4', designation: 'Venture Founder', duration: 'Months 19 to 24', focus: 'Venture Registration' },
];

const phases = [
  {
    id: 'phase-0',
    number: 0,
    tag: 'PHASE 0  ·  14 DAYS',
    designation: 'Civic Fellow',
    subtitle: 'Community Immersion',
    paragraphs: [
      'Before any building. Before any research. Before any framework. Every fellow begins in the field — living inside the communities they will eventually build for. They eat there. They listen there. They sit with people who have carried the weight of a problem for years, sometimes for generations.',
      'The Civic Fellow phase is for unlearning. Most fellows arrive with assumptions about how communities work and what they need. Fourteen days of structured immersion across five reality tracks in the Coimbatore region dismantles those assumptions at the root. This is proximity — physical, daily, unavoidable — to realities that most fellows have spent their entire lives insulated from.',
      'The five reality tracks: smallholder agriculture, water and sanitation infrastructure, government school systems, primary health access, informal labour.',
      'Fellows are observers with a discipline and a mission — to find the unsaid story. The story that does not appear in any survey because it requires trust to surface. The story a farmer will tell on Day 4, not Day 1.',
    ],
    coursesLabel: 'Course in this phase',
    courses: [
      {
        name: 'Civic Fellow Immersion',
        description:
          'Structured field observation across all five reality tracks using the Domain Intelligence Framework as the diagnostic lens. Fellows produce Domain Intelligence Cards for each domain encountered.',
      },
    ],
    gateLabel: 'Gate outputs — all three required to advance',
    gates: [
      'Field paper — publication-ready standard, data-supported, containing a genuine insight that could only have been written from inside the immersion',
      'Short documentary — watchable by a general audience, clear editorial point of view, all subjects consented',
      'Validated problem shortlist — at least three field-observed problems, each defensible, each carrying a viable venture lens',
    ],
  },
  {
    id: 'phase-1',
    number: 1,
    tag: 'PHASE 1  ·  MONTHS 1 TO 6',
    designation: 'Researcher',
    subtitle: 'Problem Validation',
    paragraphs: [
      'The problem chosen at the end of Phase 0 is now tested against reality. Fellows validate it against national data, map it against every existing solution, and conduct a minimum of fifteen structured interviews with people who live the problem directly.',
      'The Domain Intelligence Framework is applied in full — all nine lenses completed for the chosen problem. By the end, a fellow can diagnose their problem with systemic depth. CALIBRATE is used for the first time here, assessing the community before any proposed intervention is taken to them.',
    ],
    coursesLabel: 'Courses in this phase',
    courses: [
      {
        name: 'Social Problem Intelligence',
        description:
          'Problem definition against national data, root cause analysis, stakeholder mapping, research paper to publication standard.',
      },
      {
        name: 'Applied Engineering Fundamentals',
        description:
          'Hands-on engineering sprints that give every fellow a working understanding of physical and digital build processes, regardless of academic background.',
      },
      {
        name: 'Technology Gap Analysis',
        description:
          'Full landscape review of existing solutions, TRL scoring, precise identification of the gap by type — material, method, or access.',
      },
      {
        name: 'Expertise Development 1',
        description:
          "Domain-specific deep knowledge in the fellow's chosen impact area, building the specialisation that makes their problem diagnosis sharper than a generalist's.",
      },
    ],
    gateLabel: 'Gate outputs',
    gates: [
      'Research Report — 8 to 12 pages, mentor panel reviewed, publication-ready standard',
      'Technology Gap Analysis — confidential, entered into REACT internal repository',
    ],
  },
  {
    id: 'phase-2',
    number: 2,
    tag: 'PHASE 2  ·  MONTHS 7 TO 12',
    designation: 'Engineer',
    subtitle: 'Proof of Concept',
    paragraphs: [
      'Building begins. Fellows use institutional labs, workshops, and fabrication facilities to construct the first working demonstration that their solution is physically or digitally possible. The MMD Build Classification is applied — the nature of what is being built is determined before the first component is sourced. IP strategy is developed in parallel and filings are prepared.',
      'Every decision made in this phase is grounded in what the field has already taught. The community is not a testing venue — it is a co-author of what gets built.',
    ],
    coursesLabel: 'Courses in this phase',
    courses: [
      {
        name: 'Proof of Concept Development',
        description:
          'PoC scoping, build-test-iterate discipline, fabrication using institutional infrastructure, technical file documentation to IP-compatible standard.',
      },
      {
        name: 'Intellectual Property Strategy',
        description:
          'Patent landscape search, MMD classification in IP context, trade secret decision, provisional filing preparation mapped to the Indian Patents Act.',
      },
      {
        name: 'Expertise Development 2',
        description:
          "Advancing domain specialisation — deepening the fellow's knowledge of existing interventions, field partners, and technical approaches specific to their impact area.",
      },
      {
        name: 'Expertise Development 3',
        description:
          "Applied domain knowledge in the context of the fellow's specific problem and build — mentored by domain practitioners with field experience.",
      },
    ],
    gateLabel: 'Gate outputs',
    gates: [
      'Working proof of concept with documented test results across a minimum of two complete build-test-iterate cycles',
      'IP filing or formally documented trade secret strategy',
    ],
  },
  {
    id: 'phase-3',
    number: 3,
    tag: 'PHASE 3  ·  MONTHS 13 TO 18',
    designation: 'Builder',
    subtitle: 'Minimum Viable Product',
    paragraphs: [
      'The proof of concept becomes a product. Fellows develop a minimum viable product or functional prototype and test it with real users in real conditions. CALIBRATE is applied again before the MVP is taken to the community — readiness, trust, and permission are reassessed for the intervention stage.',
      'Iteration continues until evidence exists that the solution works and under exactly what conditions it works. The field, not the lab, is the client throughout. User testing. Affinity mapping. Iteration records. Unit cost modelling. This phase is where the fellow crosses from proving something is possible to proving something is usable.',
    ],
    coursesLabel: 'Courses in this phase',
    courses: [
      {
        name: 'Product Development and Scale',
        description:
          'MVP specification, user testing protocols, affinity mapping, design for manufacturing, unit economics across three production scenarios.',
      },
      {
        name: 'Grant Writing and Advocacy',
        description:
          'Grant application to a live scheme, Theory of Change with measurable indicators, impact writing to investor and funder standard.',
      },
      {
        name: 'Expertise Development 4',
        description:
          'Domain specialisation applied to the MVP context — what does best practice look like for products or services in this domain at scale.',
      },
      {
        name: 'Expertise Development 5',
        description:
          "Venture landscape in the fellow's domain — key players, remaining gaps, how the fellow's venture is positioned within the ecosystem.",
      },
    ],
    gateLabel: 'Gate outputs',
    gates: [
      'User-tested MVP or prototype — minimum five users, documented observation logs, V1 to V2 comparison',
      'Unit cost model — three scenarios at 10, 100, and 1,000 units',
      'Grant application formally submitted to at least one live scheme, receipt required',
    ],
  },
  {
    id: 'phase-4',
    number: 4,
    tag: 'PHASE 4  ·  MONTHS 19 TO 24',
    designation: 'Venture Founder',
    subtitle: 'Venture Registration',
    paragraphs: [
      'The fellow becomes a founder. A business model is built. A ten-slide investor pitch deck is prepared and presented at a public Demo Day — before investors, industry, faculty, NGO partners, and community members.',
      'The venture is registered during the final semester. A company, an LLP, or an NGO — directly connected to the REACT project, built for the community the fellow spent two years understanding. Registration is the gate. The impact report is verified by that community.',
    ],
    coursesLabel: 'Courses in this phase',
    courses: [
      {
        name: 'Venture Architecture',
        description:
          'Entity structure and registration, business model canvas, revenue model with unit economics, equity structure, GTM plan for first 100 users, DPIIT startup recognition.',
      },
      {
        name: 'Financial Modelling and Economics',
        description:
          'Three-year financial model, cap table mechanics, funding round modelling, unit economics across scenarios.',
      },
      {
        name: 'Communication and Brand Strategy',
        description:
          'Ten-slide pitch deck, brand brief, origin story with community as hero, Demo Day preparation and rehearsal, SDG alignment documentation.',
      },
    ],
    gateLabel: 'Gate outputs',
    gates: [
      'Investor pitch deck — ten slides, presented at public Demo Day, written feedback from cohort and external reviewer',
      'Registered venture — company or NGO, documents submitted to REACT programme office during the final semester',
      'Social Impact Report — 2,000 to 3,000 words, NGO-verified evidence of measurable change',
    ],
  },
];

const ventureTypes = [
  {
    name: 'Commercial Venture',
    definition:
      'A market-facing entity that solves a problem through a product or service and is financially self-sustaining. It grows because it earns. It earns because it works.',
    registeredAs: 'Startup — private limited, LLP, or sole proprietorship',
    examples: ['AgriTech product', 'Health diagnostic device', 'Artisan marketplace platform'],
  },
  {
    name: 'Social Venture',
    definition:
      'A community-facing organisation that addresses a problem through coordinated action, services, or advocacy. Social impact is the primary metric. Earned revenue sustains the mission.',
    registeredAs: 'NGO · Section 8 Company · Self-Help Group · Cooperative',
    examples: ['Community health programme', 'Farmer cooperative', 'Livelihood collective'],
  },
  {
    name: 'Civic Venture',
    definition:
      'A systemic intervention that organises people around a structural problem to create durable public change.',
    registeredAs: 'Movement · Residents Association · Think Tank · Policy Institute · Collective',
    examples: ['Urban governance coalition', 'District-level water forum', 'Cultural preservation body'],
  },
];

const gateColumns = [
  {
    title: 'What a gate assesses',
    body: 'Whether the fellow produced the required work to the required standard. The question is always the same: is this real enough to build on?',
  },
  {
    title: 'What happens when a gate is passed',
    body: 'The fellow earns their new designation and advances to the next phase. Written mentor feedback documents what was strong and what to carry forward.',
  },
  {
    title: 'What happens when resubmission is required',
    body: 'A structured seven-day revision window with written feedback on exactly what is missing. A resubmission reviewed by the same panel. If further work is required, a direct conversation with the Programme Director. A fellow is never removed without that conversation.',
  },
];

const weeklyAnchors = [
  {
    name: 'Mentor Review',
    description:
      'One-on-one with the assigned domain mentor. Progress, blockers, next steps. The highest-leverage hour of the week. Three unexcused absences trigger a formal notice. Five trigger a probationary review.',
  },
  {
    name: 'Documentation Log',
    description:
      'A brief structured weekly submission — what was accomplished, what was learned, what is blocked, what the next week requires. Filed on the programme platform. Builds the documentation discipline that every researcher and founder needs before they need it.',
  },
  {
    name: 'Cohort Share',
    description:
      'A five-minute update to the full cohort every week. What was built, what was tested, what the next milestone is. Creates the culture of shared progress that makes a cohort more than a collection of individuals working in parallel.',
  },
];

const portfolioLayers = [
  {
    number: 1,
    name: 'Identity',
    content: 'Domain specialisation, problem statement, venture type, one-page fellow profile.',
  },
  {
    number: 2,
    name: 'Evidence of Thinking',
    content: 'Field paper from the Civic Fellow phase, research report, technology gap analysis.',
  },
  {
    number: 3,
    name: 'Evidence of Building',
    content: 'Proof of concept documentation, IP filing record, MVP or prototype evidence, user testing feedback, iteration records.',
  },
  {
    number: 4,
    name: 'Evidence of Venturing',
    content: 'Business model, grant proposal, pitch deck, venture documentation, impact report.',
  },
  {
    number: 5,
    name: 'Evidence of Leadership',
    content: 'Gate assessment records and written mentor evaluations at each phase transition.',
  },
  {
    number: 6,
    name: 'Community Voice',
    content: "Statements from field partners and community members who witnessed the fellow's work and can speak to its impact.",
  },
  {
    number: 7,
    name: 'Recognition',
    content: 'Competition results, pitching records, module certifications, domain specialisation credential.',
  },
  {
    number: 8,
    name: 'The Fellow Statement',
    content: 'A 500-word personal reflection written at graduation — what the fellow believed at entry, what the field changed, what comes next. Sealed at graduation and never edited.',
  },
];

const cohortTypes = [
  {
    label: 'Freshly directed',
    description:
      'Graduates who arrive with clear intent. They know what they want to build. REACT provides the structure, the field access, and the institutional backing to make that intent real. Their ambition drives the cohort forward.',
  },
  {
    label: 'Field-experienced',
    description:
      'Practitioners who carry intelligence no classroom produces. From NGO work, government implementation, community practice, development research. Their presence grounds the cohort in consequence. They know what a problem actually resists.',
  },
];

const domainKeywords = [
  'Three Frameworks', 'The Identity Arc', 'The Five Phases in Full', 'Three Venture Types', 'The Gate System',
  'Weekly Rhythm', 'The REACT Portfolio', 'The Cohort', 
];

/* ─────────────────────────────────────────────
   UTILITY: smooth-scroll to element
───────────────────────────────────────────── */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 88;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/* ─────────────────────────────────────────────
   WEBGL WAVE BACKGROUND (OGL)
───────────────────────────────────────────── */
function WaveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const renderer = new Renderer({ canvas, alpha: true, antialias: false });
    const gl = renderer.gl;
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    function resize() {
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      if (program) {
        program.uniforms.uResolution.value = [w, h];
      }
    }

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
    });

    const program = new Program(gl, {
      vertex: /* glsl */`
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `,
      fragment: /* glsl */`
        precision highp float;
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uAmplitude;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform float uDistance;

        vec2 hash2(vec2 p) {
          p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
          return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
        }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
                dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
            mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
                dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y
          );
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution;
          float aspectX = uResolution.x / uResolution.y;
          float uvx = uv.x * aspectX;

          float amp = uAmplitude * (1.0 + (uMouse.y - 0.5) * 0.2);
          float alpha = 0.0;

          for (int i = 0; i < 40; i++) {
            float fi = float(i) / 40.0;
            float n1 = noise(vec2(uvx * 2.5 + uTime * 0.0003, fi * 10.0 + uTime * 0.001));
            float n2 = noise(vec2(uvx * 3.5 - uTime * 0.0002, fi * 7.0 + uTime * 0.0013));
            float lineY = fi + uDistance + (n1 * 0.5 + n2 * 0.3) * amp * 0.085;

            float pixH = 7.0 / uResolution.y;
            float blurH = 10.0 / uResolution.y;
            float dist = abs(uv.y - lineY);
            float line = smoothstep(pixH + blurH, pixH, dist);
            alpha = max(alpha, line * 0.55);
          }

          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      uniforms: {
        uTime:       { value: 0 },
        uColor:      { value: [0.72, 0.72, 0.78] },
        uAmplitude:  { value: 2.1 },
        uResolution: { value: [1, 1] },
        uMouse:      { value: [0.5, 0.5] },
        uDistance:   { value: 0 },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program });

    resize();
    window.addEventListener('resize', resize);

    const mouse = { tx: 0.5, ty: 0.5, cx: 0.5, cy: 0.5 };

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width;
      mouse.ty = (e.clientY - rect.top) / rect.height;
    }
    function onMouseLeave() { mouse.tx = 0.5; mouse.ty = 0.5; }

    canvas.parentElement?.addEventListener('mousemove', onMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', onMouseLeave);

    let rafId;
    function animate(t) {
      rafId = requestAnimationFrame(animate);
      mouse.cx += (mouse.tx - mouse.cx) * 0.05;
      mouse.cy += (mouse.ty - mouse.cy) * 0.05;
      program.uniforms.uTime.value = t;
      program.uniforms.uMouse.value = [mouse.cx, mouse.cy];
      renderer.render({ scene: mesh });
    }
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave);
      try { gl.getExtension('WEBGL_lose_context')?.loseContext(); } catch (_) {}
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.7,
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   FADE-UP (GSAP ScrollTrigger reusable wrapper)
───────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28, willChange: 'transform, opacity' },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
          clearProps: 'willChange',
        }
      );
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(el, { opacity: 1, y: 0 });
    });
    return () => mm.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

// Like FadeUp, but plays in AND reverses back out as the element leaves the
// viewport in either scroll direction — used where items should not just
// appear once and stay, but fly in/out as the user scrolls past them.
function FlyInOut({ children, delay = 0, className = '', as: Tag = 'div', direction = 'left' }) {
  const ref = useRef(null);
  const fromX = direction === 'right' ? 60 : -60;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        el,
        { opacity: 0, x: fromX, willChange: 'transform, opacity' },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'top 90px',
            toggleActions: 'play reverse play reverse',
            invalidateOnRefresh: true,
          },
        }
      );
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(el, { opacity: 1, x: 0 });
    });
    return () => mm.revert();
  }, [delay, fromX]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADING (Framer Motion spring + useInView)
───────────────────────────────────────────── */
function SectionHeading({ eyebrow, eyebrowColor = '#E05C3A', title, subtitle, dark = false, children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const headingSpring = {
    type: 'spring',
    damping: 60,
    stiffness: 350,
    mass: 1,
  };

  return (
    <div ref={ref}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...headingSpring, delay: 0.05 }}
          style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '0.15em', color: eyebrowColor }}
          className="text-xs uppercase font-semibold mb-4 tracking-widest"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 140 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...headingSpring, delay: 0.1 }}
        className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${dark ? 'text-white' : 'text-[#1a2c4e]'}`}
        style={{ willChange: 'transform, opacity' }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...headingSpring, delay: 0.18 }}
          className={`text-base md:text-lg max-w-3xl mb-16 leading-relaxed ${dark ? 'text-white/55' : 'text-[#1a2c4e]/65'}`}
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROTATING TEXT (Framer Motion character animation)
───────────────────────────────────────────── */
function RotatingText({ words, className = '' }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);

  const word = words[index];

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        layout
        className={className}
        style={{ display: 'inline-flex', overflow: 'hidden', verticalAlign: 'bottom' }}
      >
        {word.split('').map((char, i) => {
          const staggerDelay = (word.length - 1 - i) * 0.025;
          return (
            <motion.span
              key={i}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-120%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400, delay: staggerDelay }}
              style={{ display: 'inline-block', willChange: 'transform, opacity' }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          );
        })}
      </motion.span>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   STATUS BADGE (animated pulse indicator)
───────────────────────────────────────────── */
function StatusBadge({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E05C3A]/30 bg-[#E05C3A]/5 mb-10"
      style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '0.12em' }}
    >
      {/* Pulse indicator */}
      <span className="relative inline-flex items-center justify-center w-3 h-3">
        <span
          className="journey-pulse-ring absolute inline-block w-3 h-3 rounded-full bg-[#E05C3A]"
          style={{ opacity: 0.5 }}
        />
        <span
          className="journey-pulse-dot relative inline-block w-1.5 h-1.5 rounded-full bg-[#E05C3A]"
        />
      </span>
      <span className="text-[10px] uppercase font-semibold text-[#E05C3A]">
        {children}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DOMAIN MARQUEE
───────────────────────────────────────────── */
function DomainMarquee() {
  const doubled = [...domainKeywords, ...domainKeywords];
  return (
    <div
      className="relative overflow-hidden py-5"
      style={{
        maskImage: 'linear-gradient(to right, white 0px, transparent 0px, transparent calc(100% - 80px), white 100%), linear-gradient(to right, #fff 0%, transparent 80px), linear-gradient(to left, #fff 0%, transparent 80px)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0px, white 80px, white calc(100% - 80px), transparent 100%)',
      }}
    >
      <div className="journey-marquee-inner gap-0" style={{ width: 'max-content' }}>
        {doubled.map((word, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-6 py-2 text-xs font-semibold uppercase tracking-widest text-[#1a2c4e]/40 whitespace-nowrap"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            {word}
            <span className="inline-block w-1 h-1 rounded-full bg-[#E05C3A]/40" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────── */
function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`py-24 px-6 md:px-12 lg:px-20 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA BUTTON (enhanced with Framer Motion)
───────────────────────────────────────────── */
function CTAButton({ to, variant = 'primary', children }) {
  const base =
    'inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E05C3A]/60 cursor-pointer';
  const styles =
    variant === 'primary'
      ? 'bg-[#E05C3A] text-white shadow-lg'
      : 'border border-[#1a2c4e] text-[#1a2c4e]';

  return (
    <motion.div
      whileHover={{
        y: -2,
        scale: 1.035,
        boxShadow:
          variant === 'primary'
            ? '0 12px 30px rgba(224,92,58,0.30), 0 1px 0 rgba(255,255,255,0.95) inset'
            : '0 12px 30px rgba(0,0,0,0.13)',
      }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      <Link to={to} className={`${base} ${styles}`}>
        {children}
        <motion.span
          className="inline-flex"
          whileHover={{ x: 2, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight size={15} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PHASE CARD — split left/right, stacked via GSAP
   ScrollTrigger pin (each card pins at the top of
   the viewport while the next one scrolls up and
   covers it — the "stacked cards" scroll effect).
───────────────────────────────────────────── */
function PhaseBlock({ phase, index, total, pinnedOffset = 80 }) {
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    const content = contentRef.current;
    if (!el) return;
    // Card is visible immediately — no fade-in wait. Only the hand-off to the next
    // card (it sliding up to cover this one) gets a quick, short fade so the swap
    // doesn't feel like an abrupt cut, without ever leaving the card blank.
    const mm = gsap.matchMedia();
    let pinTrigger;
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
      if (index < total - 1) {
        pinTrigger = ScrollTrigger.create({
          trigger: el,
          start: `top ${pinnedOffset}px`,
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
          onLeave: () => {
            gsap.to(content, { opacity: 0, scale: 0.97, duration: 0.2, ease: 'power1.in',
              onComplete: () => gsap.set(el, { visibility: 'hidden' }),
            });
          },
          onEnterBack: () => {
            gsap.set(el, { visibility: 'visible' });
            gsap.to(content, { opacity: 1, scale: 1, duration: 0.2, ease: 'power1.out' });
          },
        });
      }
    });
    return () => {
      pinTrigger?.kill();
      mm.revert();
    };
  }, [index, total, pinnedOffset]);

  return (
    <div
      ref={cardRef}
      id={phase.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="phase-stack-card scroll-mt-24 bg-white rounded-2xl p-5 md:p-7 border border-black/5 relative"
      style={{
        zIndex: index + 1,
        height: isMobile ? 'auto' : (index === total - 1 ? 'auto' : `calc(100vh - ${pinnedOffset}px)`),
        overflow: isMobile ? 'visible' : 'hidden',
        transition: 'box-shadow 0.3s ease',
        boxShadow: hovered
          ? '0 28px 60px rgba(0,0,0,0.13), 0 4px 8px rgba(0,0,0,0.07)'
          : '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      <div ref={contentRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 ${isMobile ? '' : 'h-full'}`}>
        {/* Left — phase identity + description */}
        <div className="phase-col-scroll overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <div
                className="text-xs font-bold text-[#E05C3A] mb-1.5"
                style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '0.15em' }}
              >
                {phase.tag}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1a2c4e] leading-tight">
                {phase.designation}
              </h3>
              <p className="text-[#1a2c4e]/55 text-sm mt-1 font-medium">{phase.subtitle}</p>
            </div>
            <div
              className="flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white text-base"
              style={{ background: 'linear-gradient(135deg, #1a2c4e 0%, #2d4a7a 100%)' }}
            >
              {phase.number}
            </div>
          </div>

          <div className="space-y-3">
            {phase.paragraphs.map((para, pi2) => (
              <p key={pi2} className="text-[#1a2c4e]/70 leading-relaxed text-[0.85rem]">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Right — courses + gate outputs */}
        <div className="phase-col-scroll overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
          <div className="mb-5">
            <div
              className="text-xs font-bold uppercase tracking-widest text-[#1a2c4e]/40 mb-3"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {phase.coursesLabel}
            </div>
            <div className="space-y-2.5">
              {phase.courses.map((course, ci) => (
                <div
                  key={ci}
                  className="flex gap-3 p-3 rounded-xl bg-[#f8f6f3] border border-black/5 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5"
                  style={{ willChange: 'transform' }}
                >
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center"
                    style={{ background: '#E05C3A' }}
                  >
                    <span className="text-white text-[9px] font-bold">{ci + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a2c4e] text-sm mb-0.5">{course.name}</p>
                    <p className="text-[#1a2c4e]/60 text-xs leading-relaxed">{course.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-4 border-l-4"
            style={{ background: 'rgba(26,44,78,0.03)', borderColor: '#E05C3A' }}
          >
            <div
              className="text-xs font-bold uppercase tracking-widest text-[#E05C3A] mb-3"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {phase.gateLabel}
            </div>
            <ul className="space-y-2">
              {phase.gates.map((gate, gi) => (
                <li key={gi} className="flex gap-2.5 text-[0.83rem] text-[#1a2c4e]/75 leading-relaxed">
                  <span className="flex-shrink-0 text-[#E05C3A] font-bold mt-0.5">→</span>
                  {gate}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PHASE CARD INNER — layout only, no pinning
───────────────────────────────────────────── */
function PhaseCardInner({ phase, style = {} }) {
  return (
    <div
      className="bg-white rounded-2xl p-5 md:p-7 border border-black/5"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)', ...style }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left — phase identity + description */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <div
                className="text-xs font-bold text-[#E05C3A] mb-1.5"
                style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '0.15em' }}
              >
                {phase.tag}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1a2c4e] leading-tight">
                {phase.designation}
              </h3>
              <p className="text-[#1a2c4e]/55 text-sm mt-1 font-medium">{phase.subtitle}</p>
            </div>
            <div
              className="flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white text-base"
              style={{ background: 'linear-gradient(135deg, #1a2c4e 0%, #2d4a7a 100%)' }}
            >
              {phase.number}
            </div>
          </div>
          <div className="space-y-3">
            {phase.paragraphs.map((para, pi) => (
              <p key={pi} className="text-[#1a2c4e]/70 leading-relaxed text-[0.85rem]">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Right — courses + gate outputs */}
        <div>
          <div className="mb-5">
            <div
              className="text-xs font-bold uppercase tracking-widest text-[#1a2c4e]/40 mb-3"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {phase.coursesLabel}
            </div>
            <div className="space-y-2.5">
              {phase.courses.map((course, ci) => (
                <div
                  key={ci}
                  className="flex gap-3 p-3 rounded-xl bg-[#f8f6f3] border border-black/5"
                >
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center"
                    style={{ background: '#E05C3A' }}
                  >
                    <span className="text-white text-[9px] font-bold">{ci + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a2c4e] text-sm mb-0.5">{course.name}</p>
                    <p className="text-[#1a2c4e]/60 text-xs leading-relaxed">{course.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-4 border-l-4"
            style={{ background: 'rgba(26,44,78,0.03)', borderColor: '#E05C3A' }}
          >
            <div
              className="text-xs font-bold uppercase tracking-widest text-[#E05C3A] mb-3"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {phase.gateLabel}
            </div>
            <ul className="space-y-2">
              {phase.gates.map((gate, gi) => (
                <li key={gi} className="flex gap-2.5 text-[0.83rem] text-[#1a2c4e]/75 leading-relaxed">
                  <span className="flex-shrink-0 text-[#E05C3A] font-bold mt-0.5">→</span>
                  {gate}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FIVE PHASES SECTION
   Heading sticks below the navbar. Each phase
   card scrolls its own content via outer page
   scroll before the next card appears.
───────────────────────────────────────────── */
function FivePhasesSection({ phases }) {
  /* ── Mobile: plain stacked layout, no JS needed ── */
  const MobileLayout = (
    <section id="section-03" className="lg:hidden bg-[#f8f6f3] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="The Five Phases in Full"
          title="Every phase. Every course. Every gate."
        />
        <div className="space-y-6 mt-6">
          {phases.map((phase) => (
            <div key={phase.id} id={phase.id} className="scroll-mt-24">
              <PhaseCardInner phase={phase} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── Desktop: sticky heading + GSAP-driven card scroll ── */
  const sectionRef   = useRef(null);
  const cardRefs     = useRef([]);
  const activeIdxRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const NAV_H = 80;

  useEffect(() => {
    const cleanups = [];
    cardRefs.current.forEach((el) => {
      if (!el) return;
      const handler = (e) => e.preventDefault();
      el.addEventListener('wheel', handler, { passive: false });
      cleanups.push(() => el.removeEventListener('wheel', handler));
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let st;
    const mm = gsap.matchMedia();
    mm.add(
      '(prefers-reduced-motion: no-preference) and (min-width: 1024px)',
      () => {
        const SCROLL_PORTION = 0.72;
        st = ScrollTrigger.create({
          trigger: section,
          start: `top ${NAV_H}px`,
          end: 'bottom bottom',
          scrub: 1,
          onUpdate(self) {
            const raw  = self.progress * phases.length;
            const idx  = Math.min(Math.floor(raw), phases.length - 1);
            const frac = raw - idx;
            const scrollFrac = Math.min(frac / SCROLL_PORTION, 1);

            if (activeIdxRef.current !== idx) {
              const movingForward = idx > activeIdxRef.current;
              activeIdxRef.current = idx;
              setActiveIndex(idx);
              if (movingForward) {
                const newCardEl = cardRefs.current[idx];
                if (newCardEl) newCardEl.scrollTop = 0;
                return;
              }
            }

            const cardEl = cardRefs.current[idx];
            if (cardEl) {
              const maxScroll = cardEl.scrollHeight - cardEl.clientHeight;
              if (maxScroll > 0) cardEl.scrollTop = scrollFrac * maxScroll;
              else cardEl.scrollTop = 0;
            }
          },
        });
        return () => st?.kill();
      }
    );

    return () => mm.revert();
  }, [phases.length]);

  const DesktopLayout = (
    <section
      ref={sectionRef}
      className="hidden lg:block bg-[#f8f6f3]"
      style={{ height: `${Math.round(phases.length * 140 + 100)}vh`, position: 'relative' }}
    >
      <div
        className="px-6 md:px-12 lg:px-20"
        style={{
          position: 'sticky',
          top: `${NAV_H}px`,
          height: `calc(100vh - ${NAV_H}px)`,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 20,
          background: '#f8f6f3',
        }}
      >
        <div className="max-w-7xl w-full mx-auto flex flex-col flex-1 min-h-0">
          <div style={{ flexShrink: 0, paddingTop: '24px', paddingBottom: '12px' }}>
            <p
              className="text-xs uppercase font-semibold mb-2 tracking-widest"
              style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '0.15em', color: '#E05C3A' }}
            >
              The Five Phases in Full
            </p>
            <h2 className="text-2xl font-bold text-[#1a2c4e] leading-tight">
              Every phase. Every course. Every gate.
            </h2>
          </div>

          <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
            {phases.map((phase, i) => (
              <motion.div
                key={phase.id}
                style={{ position: 'absolute', inset: 0 }}
                animate={{
                  opacity: i === activeIndex ? 1 : 0,
                  scale:   i === activeIndex ? 1 : 0.96,
                  y:       i === activeIndex ? 0 : (i < activeIndex ? -32 : 32),
                  filter:  i === activeIndex ? 'blur(0px)' : 'blur(3px)',
                  pointerEvents: i === activeIndex ? 'auto' : 'none',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 70,
                  damping: 18,
                  mass: 0.9,
                  opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  filter:  { duration: 0.45, ease: 'easeOut' },
                }}
              >
                <div
                  ref={(el) => { cardRefs.current[i] = el; }}
                  style={{
                    height: '100%',
                    overflowY: 'scroll',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(26,44,78,0.18) transparent',
                  }}
                >
                  <PhaseCardInner
                    phase={phase}
                    style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div
            style={{ flexShrink: 0, paddingTop: '12px', paddingBottom: '16px' }}
            className="flex items-center gap-4"
          >
            <div className="flex gap-1.5">
              {phases.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === activeIndex ? '28px' : '8px',
                    background: i <= activeIndex ? '#E05C3A' : 'rgba(26,44,78,0.18)',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ height: '4px', borderRadius: '2px' }}
                />
              ))}
            </div>
            <span
              className="text-xs font-bold text-[#1a2c4e]/40 uppercase tracking-widest"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Phase {phases[activeIndex].number} · {phases[activeIndex].designation}
            </span>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {MobileLayout}
      {DesktopLayout}
    </>
  );
}

/* ─────────────────────────────────────────────
   VENTURE CARD (hover: white → navy, text adapts)
───────────────────────────────────────────── */
function VentureCard({ vt, delay = 0, noFade = false }) {
  const [hovered, setHovered] = useState(false);

  const card = (
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -10, scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="venture-card rounded-2xl p-8 flex flex-col cursor-pointer h-full"
        style={{
          background: hovered ? '#1a2c4e' : '#fff',
          border: hovered ? '1px solid #1a2c4e' : '1px solid rgba(0,0,0,0.08)',
          boxShadow: hovered
            ? '0 24px 56px rgba(26,44,78,0.28), 0 4px 12px rgba(0,0,0,0.10)'
            : '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {/* z-index: 1 keeps content above the ::before / ::after corner elements */}
        <div className="flex flex-col flex-1" style={{ position: 'relative', zIndex: 1 }}>
          <h3
            className="text-xl font-bold mb-4"
            style={{ color: hovered ? '#fff' : '#1a2c4e', transition: 'color 0.35s ease' }}
          >
            {vt.name}
          </h3>
          <p
            className="text-sm leading-relaxed mb-6 flex-1"
            style={{
              color: hovered ? 'rgba(255,255,255,0.72)' : 'rgba(26,44,78,0.65)',
              transition: 'color 0.35s ease',
            }}
          >
            {vt.definition}
          </p>
          <div className="space-y-3">
            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-widest text-[#E05C3A]"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Registered as
              </span>
              <p
                className="text-xs mt-0.5"
                style={{
                  color: hovered ? 'rgba(255,255,255,0.82)' : 'rgba(26,44,78,0.70)',
                  transition: 'color 0.35s ease',
                }}
              >
                {vt.registeredAs}
              </p>
            </div>
            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-widest text-[#E05C3A]"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Examples
              </span>
              <p
                className="text-xs mt-0.5"
                style={{
                  color: hovered ? 'rgba(255,255,255,0.65)' : 'rgba(26,44,78,0.60)',
                  transition: 'color 0.35s ease',
                }}
              >
                {vt.examples.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
  );

  if (noFade) return card;
  return <FadeUp delay={delay} className="h-full">{card}</FadeUp>;
}

/* ─────────────────────────────────────────────
   VENTURE CARDS GRID — fan/rotate entry animation
   Cards start fanned from center and unfold to grid.
───────────────────────────────────────────── */
const FAN_INIT = [
  { rotate: -13, x: 30,  y: 18, scale: 0.87, opacity: 0 },
  { rotate:   0, x:  0,  y: 50, scale: 0.90, opacity: 0 },
  { rotate:  13, x: -30, y: 18, scale: 0.87, opacity: 0 },
];

function VentureCardsGrid({ ventureTypes }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.25 });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {ventureTypes.map((vt, i) => (
        <motion.div
          key={i}
          className="h-full"
          style={{ transformOrigin: 'center bottom' }}
          animate={
            inView
              ? { rotate: 0, x: 0, y: 0, scale: 1, opacity: 1 }
              : FAN_INIT[i]
          }
          transition={{
            type: 'spring',
            stiffness: 65,
            damping: 18,
            /* expand: left → center → right stagger
               fold:   right → center → left           */
            delay: inView ? i * 0.09 : (2 - i) * 0.05,
          }}
        >
          <VentureCard vt={vt} noFade />
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   COHORT CARDS GRID — split-apart entry animation
   Both cards start merged at center and tear apart.
───────────────────────────────────────────── */
const SPLIT_INIT = [
  { x: '52%',  scale: 0.92, opacity: 0 },
  { x: '-52%', scale: 0.92, opacity: 0 },
];

function CohortCardsGrid({ cohortTypes }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.25 });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cohortTypes.map((ct, i) => (
        <motion.div
          key={i}
          animate={
            inView
              ? { x: 0, scale: 1, opacity: 1 }
              : SPLIT_INIT[i]
          }
          transition={{
            type: 'spring',
            stiffness: 58,
            damping: 18,
            delay: inView ? i * 0.08 : (1 - i) * 0.05,
          }}
        >
          <motion.div
            whileHover={{ y: -4, scale: 1.012 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className="rounded-2xl p-10 border border-black/5 h-full cursor-default"
            style={{
              background: i === 0 ? '#fff' : '#1a2c4e',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
              className="inline-flex px-3 py-1 rounded-full text-xs font-bold mb-6"
              style={{
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '0.1em',
                background: i === 0 ? 'rgba(224,92,58,0.1)' : 'rgba(224,92,58,0.2)',
                color: '#E05C3A',
                willChange: 'transform',
              }}
            >
              {ct.label}
            </motion.div>
            <p className={`text-base leading-relaxed ${i === 0 ? 'text-[#1a2c4e]/70' : 'text-white/70'}`}>
              {ct.description}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTACT LINKS (same behaviour as Programmes page)
───────────────────────────────────────────── */
const contactItems = [
  {
    label: 'reactfellowship.kumaraguru.in',
    href: 'https://reactfellowship.kumaraguru.in',
    Icon: Globe,
    action: 'link',
  },
  {
    label: 'info.react@kumaraguru.in',
    href: 'mailto:info.react@kumaraguru.in',
    Icon: Mail,
    action: 'copy',
    copyText: 'info.react@kumaraguru.in',
  },
];

function ContactLink({ item }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(item.copyText);
    } catch {
      const el = document.createElement('textarea');
      el.value = item.copyText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2800);
  }

  const base =
    'inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-sm cursor-pointer';

  if (item.action === 'link') {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={base}>
        <item.Icon className="h-4 w-4 opacity-75" aria-hidden="true" />
        <span>{item.label}</span>
        <ExternalLink className="h-3 w-3 opacity-45" aria-hidden="true" />
      </a>
    );
  }

  return (
    <button onClick={handleCopy} className={base} aria-label={`Copy ${item.label} to clipboard`}>
      {copied ? (
        <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
      ) : (
        <item.Icon className="h-4 w-4 opacity-75" aria-hidden="true" />
      )}
      <span className="transition-all">
        {copied ? 'Copied to clipboard!' : item.label}
      </span>
      {!copied && <Copy className="h-3 w-3 opacity-45" aria-hidden="true" />}
    </button>
  );
}

/* ─────────────────────────────────────────────
   WEEKLY RHYTHM CARDS  (stack → expand animation)
───────────────────────────────────────────── */
function WeeklyRhythmCards({ anchors }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.25 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  };

  const cardVariants = {
    hidden: (i) => ({
      x: i === 0 ? 0 : `${-i * 100}%`,
      scale: 1 - i * 0.05,
      opacity: 1 - i * 0.2,
    }),
    visible: {
      x: '0%',
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 60, damping: 20 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {anchors.map((anchor, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={cardVariants}
          whileHover={{
            y: -4,
            scale: 1.018,
            borderColor: 'rgba(224,92,58,0.5)',
            background: 'rgba(255,255,255,0.06)',
            transition: { type: 'spring', stiffness: 260, damping: 20 },
          }}
          className="rounded-2xl p-8 border border-white/8 group h-full"
          style={{
            background: 'rgba(255,255,255,0.03)',
            willChange: 'transform',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-2 h-8 rounded-full" style={{ background: '#E05C3A' }} />
            <h3 className="text-base font-bold text-white">{anchor.name}</h3>
          </div>
          <p className="text-white/55 text-sm leading-relaxed">{anchor.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PHASE ARC CARDS — stacked → expanded on scroll
───────────────────────────────────────────── */
function PhaseArcCards({ cards, activePhaseCard, setActivePhaseCard }) {
  const gridRef = useRef(null);
  const inView  = useInView(gridRef, { once: false, amount: 0.35 });

  const [isLg, setIsLg] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  );
  useEffect(() => {
    const mq      = window.matchMedia('(min-width: 1024px)');
    const handler = (e) => setIsLg(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // In the stacked (out-of-view) state each card is translated toward the
  // centre column (index 2).  The x offset as a % of the card's own width
  // is derived from: step = colWidth + gap ≈ colWidth * 1.07  →  107 % per step.
  const STACKED = [
    { x: '214%',  scale: 0.88, opacity: 0.50, zIndex: 1 },
    { x: '107%',  scale: 0.93, opacity: 0.72, zIndex: 2 },
    { x: '0%',    scale: 1.00, opacity: 1.00, zIndex: 5 },
    { x: '-107%', scale: 0.93, opacity: 0.72, zIndex: 2 },
    { x: '-214%', scale: 0.88, opacity: 0.50, zIndex: 1 },
  ];

  const arcElevations = ['lg:mt-6', 'lg:mt-3', 'lg:mt-0', 'lg:mt-3', 'lg:mt-6'];

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, i) => {
        const isActive       = activePhaseCard === i;
        const distFromCenter = Math.abs(i - 2);

        return (
          <motion.button
            key={card.id}
            id={`arc-card-${card.number}`}
            onClick={() => {
              setActivePhaseCard(isActive ? null : i);
              scrollTo(card.id);
            }}
            aria-label={`Go to Phase ${card.number}: ${card.designation}`}
            /* Desktop: start stacked, animate to grid on enter, stack back on leave */
            initial={
              isLg
                ? { x: STACKED[i].x, scale: STACKED[i].scale, opacity: STACKED[i].opacity, zIndex: STACKED[i].zIndex }
                : { opacity: 0, y: 24 }
            }
            animate={
              isLg
                ? inView
                  ? { x: '0%', scale: 1, opacity: 1, zIndex: 1 }
                  : { x: STACKED[i].x, scale: STACKED[i].scale, opacity: STACKED[i].opacity, zIndex: STACKED[i].zIndex }
                : { opacity: 1, y: 0 }
            }
            transition={
              isLg
                ? {
                    type: 'spring',
                    stiffness: 60,
                    damping: 18,
                    /* expand: centre first then outward; collapse: outer first */
                    delay: inView
                      ? distFromCenter * 0.09
                      : (2 - distFromCenter) * 0.05,
                  }
                : { type: 'spring', stiffness: 150, damping: 24, mass: 0.9, delay: i * 0.07 }
            }
            whileHover={{ y: -6, scale: 1.03, boxShadow: '0 20px 40px rgba(26,44,78,0.22)' }}
            whileTap={{ scale: 0.97 }}
            className={`
              group text-left rounded-2xl p-6 border transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E05C3A]/50
              ${arcElevations[i]}
              ${isActive
                ? 'bg-[#1a2c4e] border-[#1a2c4e] shadow-xl text-white'
                : 'bg-[#f8f6f3] border-black/5 hover:bg-[#1a2c4e] hover:border-[#1a2c4e] hover:text-white'
              }
            `}
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
              position: 'relative',
            }}
          >
            <div
              className="text-xs font-bold mb-4 text-[#E05C3A]"
              style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '0.1em' }}
            >
              PHASE {card.number}
            </div>
            <div className={`text-lg font-bold mb-1 leading-snug ${isActive ? 'text-white' : 'text-[#1a2c4e] group-hover:text-white'}`}>
              {card.designation}
            </div>
            <div
              className={`text-xs mb-3 ${isActive ? 'text-white/60' : 'text-[#1a2c4e]/50 group-hover:text-white/60'}`}
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {card.duration}
            </div>
            <div
              className={`text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-white/70' : 'text-[#1a2c4e]/60 group-hover:text-white/70'}`}
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {card.focus}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FRAMEWORK CARDS GRID
   Cards converge (stacked) when outside the
   viewport and expand to grid when scrolled in.
   Reverses back on scroll-out (once: false).
───────────────────────────────────────────── */
const FW_HOVER_SHADOWS = [
  '0 22px 50px rgba(59,130,246,0.42), 0 -14px 34px rgba(59,130,246,0.28), 18px 0 34px rgba(59,130,246,0.28), -18px 0 34px rgba(59,130,246,0.28)',
  '0 22px 50px rgba(224,92,58,0.45), 0 -14px 34px rgba(224,92,58,0.30), 18px 0 34px rgba(224,92,58,0.30), -18px 0 34px rgba(224,92,58,0.30)',
  '0 22px 50px rgba(139,92,246,0.42), 0 -14px 34px rgba(139,92,246,0.28), 18px 0 34px rgba(139,92,246,0.28), -18px 0 34px rgba(139,92,246,0.28)',
];

/* Converged (stacked) positions for 3 cards.
   Cards 0 & 2 are offset ≈ 1 col-width toward the centre card.
   107 % ≈ col-width + gap relative to the card itself.             */
const FW_STACKED = [
  { x: '107%',  scale: 0.90, opacity: 0.55, zIndex: 1 },
  { x: '0%',    scale: 1.00, opacity: 1.00, zIndex: 3 },
  { x: '-107%', scale: 0.90, opacity: 0.55, zIndex: 1 },
];

function FrameworkCardsGrid({ frameworks }) {
  const gridRef = useRef(null);
  const inView  = useInView(gridRef, { once: false, amount: 0.3 });

  const [isMd, setIsMd] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  );
  useEffect(() => {
    const mq      = window.matchMedia('(min-width: 768px)');
    const handler = (e) => setIsMd(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      style={{ perspective: '1400px' }}
    >
      {frameworks.map((fw, i) => {
        const dist = Math.abs(i - 1); // 0 = centre card, 1 = side cards

        return (
          <motion.div
            key={fw.id}
            className="h-full"
            style={{ position: 'relative' }}
            initial={
              isMd
                ? { x: FW_STACKED[i].x, scale: FW_STACKED[i].scale, opacity: FW_STACKED[i].opacity, zIndex: FW_STACKED[i].zIndex }
                : { opacity: 0, y: 24 }
            }
            animate={
              isMd
                ? inView
                  ? { x: '0%', scale: 1, opacity: 1, zIndex: 1 }
                  : { x: FW_STACKED[i].x, scale: FW_STACKED[i].scale, opacity: FW_STACKED[i].opacity, zIndex: FW_STACKED[i].zIndex }
                : { opacity: 1, y: 0 }
            }
            transition={
              isMd
                ? {
                    type: 'spring',
                    stiffness: 60,
                    damping: 18,
                    /* expand:   centre card first, sides follow */
                    /* converge: sides retract first, centre last */
                    delay: inView ? dist * 0.10 : (1 - dist) * 0.06,
                  }
                : { type: 'spring', stiffness: 150, damping: 24, mass: 0.9, delay: i * 0.08 }
            }
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.03, boxShadow: FW_HOVER_SHADOWS[i] }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm flex flex-col cursor-pointer h-full"
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(224,92,58,0.1)' }}
              >
                <span className="text-[#E05C3A] font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-lg font-bold text-[#1a2c4e] mb-3 leading-snug">{fw.name}</h3>
              <p className="text-[#1a2c4e]/65 text-sm leading-relaxed flex-1">{fw.description}</p>
              <div className="mt-6 pt-5 border-t border-black/5">
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ fontFamily: 'Arial, sans-serif', color: '#E05C3A' }}
                >
                  Active in:
                </span>
                <p className="text-[#1a2c4e] text-sm font-medium mt-0.5">{fw.active}</p>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   GATE COLUMNS GRID — directional clip-path reveal
   useInView + animate is more reliable than whileInView+initial
   because initial always clips the content on mount.
───────────────────────────────────────────── */
const GATE_CLIP_FROM = [
  'inset(0 100% 0 0)',  // panel 0: sweeps left → right
  'inset(0 0 100% 0)',  // panel 1: sweeps top  → bottom
  'inset(0 0 0 100%)',  // panel 2: sweeps right → left
];

function GateColumnsGrid({ gateColumns }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.15 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden"
    >
      {gateColumns.map((col, i) => (
        <motion.div
          key={i}
          animate={
            inView
              ? { clipPath: 'inset(0 0 0 0)', opacity: 1 }
              : { clipPath: GATE_CLIP_FROM[i], opacity: 0.4 }
          }
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
            delay: inView ? i * 0.14 : (2 - i) * 0.06,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.018 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="bg-[#1e3460] p-8 md:p-10 h-full cursor-default"
            style={{ willChange: 'transform' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center mb-6"
              style={{ background: 'rgba(224,92,58,0.2)' }}
            >
              <span className="text-[#E05C3A] font-bold text-xs">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="text-base font-bold text-white mb-4 leading-snug">{col.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{col.body}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   JOURNEY PAGE
───────────────────────────────────────────── */
export function Journey() {
  const [activePhaseCard, setActivePhaseCard] = useState(null);

  const heroRef     = useRef(null);
  const heroTextRef = useRef(null);

  /* ── Lenis smooth scrolling ── */
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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    function onResize() { ScrollTrigger.refresh(); }
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
    };
  }, []);

  /* Hero reveal: handled inline via Framer Motion animate on each hero element. */

  /* ── Hero: Mouse parallax ── */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const textEl = heroTextRef.current;
      if (!textEl) return;

      let inHero = true;
      const heroST = ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        onToggle: (self) => { inHero = self.isActive; },
      });

      function onMouseMove(e) {
        if (!inHero) return;
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        gsap.to(textEl, { x: px * -8, y: py * -5, duration: 0.55, ease: 'power3.out' });
      }

      window.addEventListener('mousemove', onMouseMove);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        heroST.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      style={{ fontFamily: "'Poppins', 'Arial', sans-serif" }}
      className="bg-white text-[#1a2c4e]"
    >
      {/* ═══════════════════════════════════
          SECTION 00  ·  HERO
      ═══════════════════════════════════ */}
      <section
        ref={heroRef}
        id="journey-hero"
        className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        {/* Background radial */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 60% 30%, rgba(224,92,58,0.07) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 10% 80%, rgba(26,44,78,0.05) 0%, transparent 60%)',
          }}
        />
        {/* Grid lines */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(26,44,78,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(26,44,78,0.04) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gradient overlay bottom fade */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,0.9), transparent)',
          }}
        />

        <div ref={heroTextRef} className="relative z-10 max-w-5xl" style={{ willChange: 'transform' }}>
          {/* Eyebrow with status badge */}
          <motion.div
            initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <StatusBadge>Centre for REACT  ·  Journey</StatusBadge>
          </motion.div>

          {/* Headline with rotating text */}
          <motion.h1
            initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a2c4e] leading-[1.05] mb-10"
            style={{ letterSpacing: '-0.02em', willChange: 'transform, opacity, filter' }}
          >
            Two years.<br />
            <span className="text-[#E05C3A]">The structure that turns</span>
            <br className="hidden md:block" />
            <span>a student into a </span>
            <RotatingText
              words={['Researcher.', 'Engineer.', 'Builder.', 'Founder.']}
              className="text-[#E05C3A]"
            />
          </motion.h1>

          {/* Sub-heading lines */}
          <motion.div
            initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
            className="mb-12 space-y-3 max-w-2xl"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            {[
              'Five phases. Three proprietary frameworks. Domain expertise built course by course.',
              'A gate at the end of every phase — real assessment, real standards, real consequences.',
              'Two years that produce a researcher, a builder, a founder, and a venture that continues after graduation.',
            ].map((line, i) => (
              <p
                key={i}
                className="text-[#1a2c4e]/70 text-base md:text-lg leading-relaxed"
                style={{ borderLeft: '2px solid rgba(224,92,58,0.3)', paddingLeft: '1rem' }}
              >
                {line}
              </p>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
            className="flex flex-wrap gap-4"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            <CTAButton to="/apply" variant="primary">
              Apply Now
            </CTAButton>
            <CTAButton to="/programmes" variant="secondary">
              See the Programmes
            </CTAButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          onClick={() => scrollTo('section-01')}
          aria-label="Scroll to next section"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronDown size={22} className="text-[#1a2c4e] animate-bounce" />
        </motion.button>
      </section>

      {/* Domain marquee strip */}
      <div className="bg-[#f8f6f3] border-y border-black/5">
        <DomainMarquee />
      </div>

      {/* ═══════════════════════════════════
          SECTION 01  ·  THREE FRAMEWORKS
      ═══════════════════════════════════ */}
      <Section id="section-01" className="bg-[#f8f6f3]">
        <SectionHeading
          eyebrow="Three Frameworks"
          title={<>Three frameworks.<br />The methodology made operational.</>}
          subtitle="The REACT methodology is built on three proprietary frameworks that run through the programme from the first day of field immersion to the final venture registration. Every fellow uses all three. They are what separates a REACT-trained problem solver from everyone else."
        />

        <FrameworkCardsGrid frameworks={frameworks} />
      </Section>

      {/* ═══════════════════════════════════
          SECTION 02  ·  IDENTITY ARC
      ═══════════════════════════════════ */}
      <Section id="section-02" className="bg-white">
        <SectionHeading
          eyebrow="The Identity Arc"
          title="Five phases. Five identities. One arc."
          subtitle="Across two years, fellows do more than complete tasks. They earn designations that mark a real shift in capability. Each phase has its own focus, its own courses, its own outputs, and its own gate. The arc moves from unlearning to founding."
        />

        {/* Phase cards arc — stacked → expanded scroll animation */}
        <PhaseArcCards
          cards={phaseCards}
          activePhaseCard={activePhaseCard}
          setActivePhaseCard={setActivePhaseCard}
        />
      </Section>

      {/* ═══════════════════════════════════
          SECTION 03  ·  FIVE PHASES IN FULL
      ═══════════════════════════════════ */}
      <FivePhasesSection phases={phases} />

      {/* ═══════════════════════════════════
          SECTION 04  ·  THREE VENTURE TYPES
      ═══════════════════════════════════ */}
      <Section id="section-04" className="bg-white">
        <SectionHeading
          eyebrow="Three Venture Types"
          title="Every venture is one of three types."
          subtitle="The venture type emerges from the nature of the problem and the fellow's chosen approach to creating lasting change. All three are built with equal rigour. All three are expected to demonstrate, with measurable evidence, that the problem they address is genuinely better because the fellow worked on it."
        />

        <VentureCardsGrid ventureTypes={ventureTypes} />

        {/* Credential line */}
        <FadeUp>
          <div
            className="rounded-2xl p-8 border border-[#E05C3A]/20"
            style={{ background: 'rgba(224,92,58,0.04)' }}
          >
            <p className="text-sm text-[#1a2c4e]/60 mb-2 font-medium">Credential line</p>
            <p className="text-[#1a2c4e] text-base md:text-lg leading-relaxed max-w-4xl">
              A fellow's complete credential reads:{' '}
              <strong>Domain · Build Classification · Venture Type.</strong>{' '}
              For example:{' '}
              <span className="text-[#E05C3A] font-semibold">Health and Wellbeing · Method · Social Venture.</span>{' '}
              One line that communicates the depth of the problem understood, the nature of what was built, and the ambition of the outcome created.
            </p>
          </div>
        </FadeUp>
      </Section>

      {/* ═══════════════════════════════════
          SECTION 05  ·  THE GATE SYSTEM
      ═══════════════════════════════════ */}
      <Section id="section-05" className="bg-[#1a2c4e]">
        <SectionHeading
          eyebrow="The Gate System"
          eyebrowColor="#E05C3A"
          dark
          title="Gates are real. Advancement is earned."
          subtitle="Every phase ends with a gate. A panel review of demonstrated work against a published standard — the fellow's assigned mentor and at least one external reviewer with no stake in being lenient."
        />

        <GateColumnsGrid gateColumns={gateColumns} />
      </Section>

      {/* ═══════════════════════════════════
          SECTION 06  ·  WEEKLY RHYTHM
      ═══════════════════════════════════ */}
      <Section id="section-06" className="bg-[#0f1e38]">
        <div>
          <SectionHeading
            eyebrow="Weekly Rhythm"
            eyebrowColor="#E05C3A"
            dark
            title="Three anchors. Every week. Every phase."
            subtitle="Phases change. Problems evolve. Three structures run through every week of the programme without exception. They are the connective tissue of the programme — keeping momentum, accountability, and communication consistent across two years."
          />

          <WeeklyRhythmCards anchors={weeklyAnchors} />
        </div>
      </Section>

      {/* ═══════════════════════════════════
          SECTION 07  ·  REACT PORTFOLIO
      ═══════════════════════════════════ */}
      <Section id="section-07" className="bg-white">
        <SectionHeading
          eyebrow="The REACT Portfolio"
          title={<>The portfolio grows with the fellow.<br className="hidden md:block" /> It does not stop at graduation.</>}
          subtitle="Every fellow builds a REACT Portfolio across the full programme — a structured, verified, living record of what the fellow produced, what the field taught them, and what they went on to do. Presented as a bound physical document at graduation and as a verified digital record with a permanent URL."
        />

        <div className="space-y-px">
          {portfolioLayers.map((layer, i) => (
            <FlyInOut key={i} delay={i * 0.04} direction={i % 2 === 0 ? 'left' : 'right'}>
              <motion.div
                whileHover={{ x: 6, backgroundColor: '#f8f6f3' }}
                transition={{ duration: 0.25 }}
                className="group flex gap-6 md:gap-10 items-start p-6 md:p-8 rounded-xl border border-transparent hover:border-black/6 transition-colors duration-300 cursor-default"
                style={{ willChange: 'transform' }}
              >
                <div className="flex-shrink-0 flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #1a2c4e 0%, #2d4a7a 100%)', willChange: 'transform' }}
                  >
                    {layer.number}
                  </motion.div>
                  {i < portfolioLayers.length - 1 && (
                    <div className="w-px flex-1 bg-black/8 mt-2 min-h-[20px]" />
                  )}
                </div>
                <div className="pb-4">
                  <h3 className="font-bold text-[#1a2c4e] text-base mb-1">
                    <span className="text-[#E05C3A] mr-2">·</span>
                    {layer.name}
                  </h3>
                  <p className="text-[#1a2c4e]/60 text-sm leading-relaxed">{layer.content}</p>
                </div>
              </motion.div>
            </FlyInOut>
          ))}
        </div>

        <FadeUp>
          <div className="mt-10 rounded-2xl p-6 border border-[#1a2c4e]/10 bg-[#f8f6f3]">
            <p className="text-[#1a2c4e] text-base leading-relaxed font-medium">
              When a fellow publishes a paper, wins a competition, or registers a venture after leaving the programme, it is added to the record. The Portfolio grows with the person.
            </p>
          </div>
        </FadeUp>
      </Section>

      {/* ═══════════════════════════════════
          SECTION 08  ·  THE COHORT
      ═══════════════════════════════════ */}
      <Section id="section-08" className="bg-[#f8f6f3]">
        <SectionHeading
          eyebrow="The Cohort"
          title="The cohort is the programme's most powerful resource."
          subtitle="Every cohort is assembled with deliberate diversity — across disciplines, domains, and backgrounds — so that the fellow working on agricultural market access and the fellow working on primary health diagnostics are learning from each other across two years."
        />

        <CohortCardsGrid cohortTypes={cohortTypes} />
      </Section>

      {/* ═══════════════════════════════════
          SECTION 09  ·  CLOSING CTA
      ═══════════════════════════════════ */}
      <section
        id="section-09"
        className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f1e38 0%, #1a2c4e 50%, #0f1e38 100%)' }}
      >
        {/* Background glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(224,92,58,0.12) 0%, transparent 70%)',
          }}
        />
        {/* Gradient overlay top */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(15,30,56,0.4) 0%, transparent 30%, transparent 70%, rgba(15,30,56,0.4) 100%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeUp>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', damping: 60, stiffness: 350, mass: 1, delay: 0.05 }}
              style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '0.15em', color: '#E05C3A' }}
              className="text-xs uppercase font-semibold mb-4 tracking-widest"
            >
              Ready to start?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 140 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', damping: 60, stiffness: 350, mass: 1, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ letterSpacing: '-0.02em', willChange: 'transform, opacity' }}
            >
              Ready to start?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', damping: 60, stiffness: 350, mass: 1, delay: 0.18 }}
              className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            >
              The application window for Cohort 2 is open. Three stages. The first is a 500-word personal statement and a domain choice.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', damping: 60, stiffness: 350, mass: 1, delay: 0.24 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.div
                whileHover={{ y: -2, scale: 1.035 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                style={{ willChange: 'transform' }}
              >
                <Link
                  to="/apply"
                  id="cta-apply-bottom"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E05C3A] text-white font-semibold text-sm shadow-xl transition-colors duration-200 hover:bg-[#c94d2e]"
                  style={{ boxShadow: '0 18px 40px rgba(224,92,58,0.30)' }}
                >
                  Apply Now <ArrowRight size={15} />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -2, scale: 1.025 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                style={{ willChange: 'transform' }}
              >
                <Link
                  to="/programmes"
                  id="cta-programme-bottom"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm transition-all duration-300 hover:bg-white/10"
                >
                  See the Programmes <ArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}

export default Journey;
