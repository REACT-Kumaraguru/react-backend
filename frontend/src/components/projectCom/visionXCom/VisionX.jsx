import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import { Eye, Sparkles, Play, ArrowRight, Gamepad2, Headphones, BarChart3, GraduationCap, ShieldCheck, Zap, Activity, Cpu } from "lucide-react";

/* ---------- Mouse parallax hook ---------- */
function useMouseParallax(strength = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });
  useEffect(() => {
    const onMove = (e) => {
      x.set((e.clientX / window.innerWidth - 0.5) * strength);
      y.set((e.clientY / window.innerHeight - 0.5) * strength);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y, strength]);
  return { x: sx, y: sy };
}

/* ---------- Grid + light streaks background ---------- */
function GridBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 vx-grid" />
      <div className="absolute inset-0 vx-vignette" />
      {/* light streaks */}
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="vx-streak"
          style={{
            left: `${(i * 17 + 10) % 100}%`,
            animationDelay: `${i * 1.4}s`,
            animationDuration: `${8 + (i % 4) * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function NeonAccents() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full opacity-40 blur-[120px]"
           style={{ background: "#1e40af" }} />
      <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full opacity-40 blur-[120px]"
           style={{ background: "#7c3aed" }} />
      <div className="absolute bottom-0 left-10 h-[400px] w-[400px] rounded-full opacity-30 blur-[120px]"
           style={{ background: "#0891b2" }} />
    </div>
  );
}

/* ---------- VR Headset SVG ---------- */
function VRHeadset() {
  const { x, y } = useMouseParallax(40);
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[560px]"
      style={{ x, y }}
      animate={{ y: [0, -14, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 -z-10 blur-3xl opacity-60"
           style={{ background: "radial-gradient(circle at 50% 50%, #22D3EE, transparent 65%)" }} />
      <svg viewBox="0 0 560 360" className="w-full">
        <defs>
          <linearGradient id="hbody" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0b1a33" />
            <stop offset="50%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0b1a33" />
          </linearGradient>
          <linearGradient id="hlens" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="hstrap" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* outer ring */}
        <circle cx="280" cy="180" r="170" stroke="#1e3a8a" strokeWidth="1" fill="none" opacity="0.6" />
        <circle cx="280" cy="180" r="140" stroke="#3B82F6" strokeWidth="1" fill="none" opacity="0.35" strokeDasharray="4 6" />

        {/* strap */}
        <path d="M40 180 Q280 90 520 180" stroke="url(#hstrap)" strokeWidth="3" fill="none" />

        {/* body */}
        <rect x="100" y="120" width="360" height="170" rx="50" fill="url(#hbody)" stroke="#22D3EE" strokeOpacity="0.35" />
        <rect x="100" y="120" width="360" height="170" rx="50" fill="none" stroke="#3B82F6" strokeOpacity="0.2" strokeWidth="1" />

        {/* lenses */}
        <circle cx="215" cy="205" r="58" fill="url(#hlens)" />
        <circle cx="345" cy="205" r="58" fill="url(#hlens)" />
        <circle cx="215" cy="205" r="58" fill="#07111F" opacity="0.35" />
        <circle cx="345" cy="205" r="58" fill="#07111F" opacity="0.35" />
        <circle cx="215" cy="205" r="40" fill="none" stroke="#22D3EE" strokeWidth="1" opacity="0.8" />
        <circle cx="345" cy="205" r="40" fill="none" stroke="#22D3EE" strokeWidth="1" opacity="0.8" />
        <circle cx="200" cy="190" r="6" fill="#fff" opacity="0.9" />
        <circle cx="330" cy="190" r="6" fill="#fff" opacity="0.9" />

        {/* LED */}
        <circle cx="280" cy="138" r="4" fill="#22D3EE">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* HUD lines */}
        <line x1="20" y1="40" x2="120" y2="40" stroke="#22D3EE" strokeOpacity="0.4" />
        <line x1="440" y1="320" x2="540" y2="320" stroke="#8B5CF6" strokeOpacity="0.5" />
        <text x="20" y="32" fill="#22D3EE" fontSize="10" fontFamily="monospace" opacity="0.7">VX-OPTIC // v2.4</text>
        <text x="540" y="332" fill="#8B5CF6" fontSize="10" fontFamily="monospace" textAnchor="end" opacity="0.7">120Hz · 4K · 6DoF</text>
      </svg>

      {/* floating retinoscope chip */}
      <motion.div
        className="absolute -left-2 top-10 rounded-xl border border-cyan-400/40 bg-[#0b1a33]/80 px-3 py-2 text-[11px] font-mono text-cyan-300 backdrop-blur"
        animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
      >
        <Activity className="inline h-3 w-3 mr-1" /> RETINOSCOPE ONLINE
      </motion.div>
      <motion.div
        className="absolute -right-4 top-28 rounded-xl border border-violet-400/40 bg-[#0b1a33]/80 px-3 py-2 text-[11px] font-mono text-violet-300 backdrop-blur"
        animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }}
      >
        <Cpu className="inline h-3 w-3 mr-1" /> NEURAL LINK · 98%
      </motion.div>
      <motion.div
        className="absolute -left-4 bottom-4 rounded-xl border border-blue-400/40 bg-[#0b1a33]/80 px-3 py-2 text-[11px] font-mono text-blue-300 backdrop-blur"
        animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity }}
      >
        <Zap className="inline h-3 w-3 mr-1" /> LATENCY 8ms
      </motion.div>
    </motion.div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-24 px-6">
      <GridBackdrop />
      <NeonAccents />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-400/30 bg-[#0b1a33] text-cyan-300">
            <Eye className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-wide text-white">VISION<span className="text-cyan-400">X</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-cyan-300 transition">Features</a>
          <a href="#experience" className="hover:text-cyan-300 transition">Experience</a>
          <a href="#stats" className="hover:text-cyan-300 transition">Impact</a>
          <a href="#cta" className="hover:text-cyan-300 transition">Demo</a>
        </div>
        <button className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-400/20 transition">
          Sign In
        </button>
      </nav>

      <div className="relative z-10 mx-auto mt-10 grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-cyan-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Next-Gen VR Simulator
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-7xl sm:text-8xl lg:text-[8.5rem] font-black leading-[0.9] tracking-tight text-white"
          >
            VISION
            <br />
            <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(120deg,#22D3EE,#3B82F6 50%,#8B5CF6)" }}>
              X
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-slate-300"
          >
            Immersive VR Retinoscopy Training Simulator
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-3 max-w-lg text-base text-slate-400"
          >
            Train safely. Practice repeatedly. Improve confidently.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button className="group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:shadow-[0_0_50px_rgba(34,211,238,0.55)] transition"
                    style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}>
              Explore Product
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
              <Play className="h-4 w-4 fill-current" />
              Watch Demo
            </button>
          </motion.div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
            {[["120Hz","Refresh"],["4K","Per Eye"],["8ms","Latency"]].map(([v,l]) => (
              <div key={l}>
                <div className="text-2xl font-bold text-white">{v}</div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}
        >
          <VRHeadset />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Tilt card ---------- */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 14 });
  const sry = useSpring(ry, { stiffness: 140, damping: 14 });
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10); rx.set(-py * 10);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div
      ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Features ---------- */
const FEATURES = [
  { icon: Eye, title: "Realistic Retinoscopy", desc: "Photoreal virtual eyes that respond to your scope like the real thing.", color: "cyan" },
  { icon: Headphones, title: "VR Learning Experience", desc: "Step into a fully immersive examination room engineered for focus.", color: "blue" },
  { icon: BarChart3, title: "Performance Tracking", desc: "Granular metrics, session replays and progression curves.", color: "violet" },
  { icon: Gamepad2, title: "Interactive Training", desc: "Hands-on scenarios with realistic haptics and natural inputs.", color: "cyan" },
  { icon: GraduationCap, title: "Skill Development", desc: "Structured paths from first attempt to clinical confidence.", color: "blue" },
  { icon: ShieldCheck, title: "Safe Clinical Practice", desc: "Make mistakes risk-free and iterate until precision becomes instinct.", color: "violet" },
];

const COLOR_MAP = {
  cyan:   { ring: "border-cyan-400/30",   glow: "group-hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]",  icon: "text-cyan-300",   grad: "from-cyan-500/20 to-transparent" },
  blue:   { ring: "border-blue-400/30",   glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]",  icon: "text-blue-300",   grad: "from-blue-500/20 to-transparent" },
  violet: { ring: "border-violet-400/30", glow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.35)]",  icon: "text-violet-300", grad: "from-violet-500/20 to-transparent" },
};

function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-28 px-6">
      <GridBackdrop />
      <NeonAccents />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-cyan-300">
            <Sparkles className="h-3 w-3" /> Capabilities
          </span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-tight text-white">
            Built for the next generation of <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(120deg,#22D3EE,#8B5CF6)" }}>medical training</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const c = COLOR_MAP[f.color];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <TiltCard className={`group relative h-full rounded-2xl border ${c.ring} bg-[#0b1729]/80 p-7 backdrop-blur transition hover:-translate-y-1 ${c.glow}`}>
                  <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${c.grad} opacity-0 group-hover:opacity-100 transition`} />
                  <div className="relative">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${c.ring} bg-white/5 ${c.icon}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                    <div className="mt-6 text-[11px] font-mono uppercase tracking-widest text-slate-500">
                      0{i + 1} / 06
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience scroll sequence ---------- */
const SCENES = [
  { title: "Student enters VR", desc: "Boot up the simulator and step into a calibrated examination room.", icon: Headphones },
  { title: "Retinoscope interaction", desc: "Pick up the virtual scope with intuitive, low-latency tracking.", icon: Activity },
  { title: "Optical simulation", desc: "Observe reflexes and refractive behavior on photoreal virtual eyes.", icon: Eye },
  { title: "Analytics feedback", desc: "Receive instant scoring across accuracy, technique and timing.", icon: BarChart3 },
  { title: "Skill improvement", desc: "Track your curve as repetition turns precision into instinct.", icon: GraduationCap },
];

function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section id="experience" ref={ref} className="relative overflow-hidden py-28 px-6">
      <GridBackdrop />
      <NeonAccents />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/5 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-violet-300">
            <Cpu className="h-3 w-3" /> Product Experience
          </span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-tight text-white">
            From first attempt to <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(120deg,#3B82F6,#8B5CF6)" }}>clinical confidence</span>
          </h2>
        </div>

        <div className="relative mt-16">
          {/* center spine */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
               style={{ background: "linear-gradient(180deg, transparent, rgba(34,211,238,0.4), rgba(139,92,246,0.4), transparent)" }} />
          <div className="space-y-10">
            {SCENES.map((s, i) => {
              const start = i / SCENES.length;
              const end = (i + 1) / SCENES.length;
              const y = useTransform(scrollYProgress, [start, end], [60, -20]);
              const opacity = useTransform(scrollYProgress, [Math.max(0, start - 0.1), start + 0.05, end, end + 0.1], [0.35, 1, 1, 0.7]);
              const Icon = s.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={s.title} style={{ y, opacity }} className="grid items-center gap-6 md:grid-cols-2">
                  <div className={isLeft ? "md:order-1" : "md:order-2"}>
                    <div className="rounded-2xl border border-white/10 bg-[#0b1729]/80 p-7 backdrop-blur hover:border-cyan-400/40 transition">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500">Step 0{i + 1}</div>
                      </div>
                      <h3 className="mt-5 text-2xl font-bold text-white">{s.title}</h3>
                      <p className="mt-2 text-slate-400">{s.desc}</p>
                    </div>
                  </div>
                  <div className={`relative ${isLeft ? "md:order-2" : "md:order-1"}`}>
                    <div className="relative mx-auto h-44 w-full max-w-sm rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1729] to-[#0f1f3a] p-5 overflow-hidden">
                      <div className="absolute inset-0 vx-grid opacity-50" />
                      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-40 blur-2xl"
                           style={{ background: i % 2 ? "#8B5CF6" : "#22D3EE" }} />
                      <div className="relative flex h-full items-center justify-center">
                        <Icon className="h-20 w-20 text-white/80" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const STATS = [
  { value: 40, suffix: "%", label: "Accuracy Improvement", sub: "30–40% measured uplift" },
  { value: 40, suffix: "%", label: "Confidence Increase", sub: "Self-reported by trainees" },
  { value: 100, suffix: "+", label: "Students Trained", sub: "Across pilot programs" },
  { value: 1, suffix: "x", label: "Affordable Deployment", sub: "Plug-and-play setup" },
];

function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden py-28 px-6">
      <GridBackdrop />
      <NeonAccents />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/5 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-blue-300">
            <BarChart3 className="h-3 w-3" /> Measured Impact
          </span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-tight text-white">
            Numbers from <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(120deg,#22D3EE,#3B82F6)" }}>real cohorts</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-white/10 bg-[#0b1729]/80 p-7 backdrop-blur hover:border-cyan-400/40 transition"
            >
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500">0{i + 1}</div>
              <div className="mt-4 text-6xl font-black bg-clip-text text-transparent"
                   style={{ backgroundImage: "linear-gradient(120deg,#22D3EE,#8B5CF6)" }}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-base font-semibold text-white">{s.label}</div>
              <div className="mt-1 text-sm text-slate-400">{s.sub}</div>
              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: `${60 + i * 8}%` }} viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="h-full"
                  style={{ background: "linear-gradient(90deg,#22D3EE,#8B5CF6)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden py-32 px-6">
      <div className="absolute inset-0 -z-10 vx-grid opacity-80" />
      <div className="absolute inset-0 -z-10"
           style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.25), transparent 60%)" }} />
      {/* moving light lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="vx-streak"
          style={{
            left: `${(i * 13 + 6) % 100}%`,
            animationDelay: `${i * 0.9}s`,
            animationDuration: `${7 + (i % 5)}s`,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight"
        >
          Future Medical Training <br />
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(120deg,#22D3EE,#3B82F6,#8B5CF6)" }}>
            Starts Here
          </span>
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
          className="mt-10 inline-flex items-center gap-2 rounded-md px-8 py-4 text-base font-semibold text-white shadow-[0_0_50px_rgba(34,211,238,0.5)]"
          style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
        >
          Request Demo
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
export default function VisionX() {
  return (
    <main className="vx-page relative min-h-screen overflow-x-hidden text-white">
      <Hero />
      <Features />
      <Experience />
      <Stats />
      <FinalCTA />
      <footer className="relative border-t border-white/10 py-8 px-6 text-center text-xs font-mono uppercase tracking-widest text-slate-500">
        © {new Date().getFullYear()} VISION X · Immersive Training Systems
      </footer>
    </main>
  );
}
