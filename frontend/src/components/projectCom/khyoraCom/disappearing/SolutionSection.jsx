import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const layers = [
  {
    name: "Top Sheet",
    desc: "Ultra-soft biodegradable surface engineered for rapid absorption and skin comfort.",
    image: "/images/top_sheet.png",
  },
  {
    name: "Distribution Layer",
    desc: "Advanced fibre network designed to evenly channel fluid while maintaining dryness.",
    image: "/images/distribution.png",
  },
  {
    name: "Absorbent Core",
    desc: "High-retention bio-absorbent core powered by natural fibres and bio-superabsorbant technology.",
    image: "/images/core.png",
  },
  {
    name: "Protective Back Sheet",
    desc: "Flexible biodegradable protective layer engineered to safely disintegrate after flushing.",
    image: "/images/back_sheet.png",
  },
];

export function SolutionSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.4 });

  return (
    <section
      id="solution"
      ref={ref}
      className="relative"
      style={{ background: "var(--background)", height: "420vh" }}
    >
      <div aria-hidden className="absolute inset-0 ripple-bg opacity-50 pointer-events-none" />

      {/* Sticky cinematic stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Ambient water lighting */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, oklch(0.9 0.06 200 / 0.35), transparent 55%), radial-gradient(ellipse at 75% 70%, oklch(0.85 0.07 280 / 0.25), transparent 55%)",
          }}
        />

        {/* Floating particles */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(i * 53) % 100}%`,
                bottom: 0,
                width: 3 + (i % 4),
                height: 3 + (i % 4),
                background:
                  "radial-gradient(circle, oklch(0.95 0.04 200 / 0.9), transparent 70%)",
                animation: `rise ${14 + (i % 6)}s linear ${i * 0.7}s infinite`,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>

        {/* Section heading */}
        <div className="relative px-6 md:px-12 lg:px-20 pt-28 pb-6 mx-auto max-w-7xl w-full">
          <div className="max-w-3xl">
            <div className="text-[10px] uppercase tracking-[0.35em] text-foreground/50 mb-4">
              02 — Our solution
            </div>
            <h2 className="text-display text-3xl md:text-5xl lg:text-6xl">
              A pad built to <span className="text-gradient italic">vanish</span>.
            </h2>
            <p className="mt-5 text-foreground/60 max-w-xl text-sm md:text-base">
              Four engineered layers performing in unison — soft on skin, strong under use,
              programmed to disintegrate when flushed.
            </p>
          </div>
        </div>

        {/* Stage: Image zoom stack + content */}
        <div className="relative flex-1 mx-auto max-w-7xl w-full px-6 md:px-12 lg:px-20 grid lg:grid-cols-2 gap-10 items-center pb-12">
          {/* LEFT — Images stacked with zoom effect */}
          <div className="relative h-[55vh] lg:h-[65vh] flex items-center justify-center order-2 lg:order-1 overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl">
            {layers.map((l, i) => {
              const start = i / 4;
              const end = (i + 1) / 4;

              // Fade out at the end of its active scroll window (except the last layer)
              const opacity = useTransform(
                progress,
                [end - 0.05, end],
                [1, 0]
              );

              // Zoom in continually while scrolling through its window
              const scale = useTransform(
                progress,
                [start, end],
                [1, 2]
              );

              const zIndex = 40 - i * 10;

              return (
                <motion.div
                  key={l.name}
                  style={{
                    opacity: i === layers.length - 1 ? 1 : opacity,
                    scale,
                    zIndex,
                  }}
                  className="absolute inset-0 w-full h-full origin-center bg-background"
                >
                  <img
                    src={l.image}
                    alt={l.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.1)] pointer-events-none" />
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT — Active layer content */}
          <div className="relative order-1 lg:order-2 min-h-[260px] lg:min-h-[420px] flex items-center">
            <div className="relative w-full">
              {layers.map((l, i) => {
                const start = i / 4;
                const end = (i + 1) / 4;
                const mid = (start + end) / 2;
                const op = useTransform(
                  progress,
                  [start - 0.04, mid, end + 0.04],
                  [0, 1, 0],
                );
                const ty = useTransform(
                  progress,
                  [start - 0.04, mid, end + 0.04],
                  [20, 0, -20],
                );
                return (
                  <motion.div
                    key={l.name}
                    style={{ opacity: op, y: ty, pointerEvents: "none" }}
                    className="absolute inset-0 glass rounded-3xl p-8 md:p-10"
                  >
                    <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-foreground/50">
                      <span>Layer 0{i + 1}</span>
                      <span className="h-px w-10 bg-foreground/20" />
                      <span>of 04</span>
                    </div>
                    <h3 className="mt-5 text-display text-3xl md:text-4xl lg:text-5xl">
                      {l.name}
                    </h3>
                    <p className="mt-5 text-foreground/70 leading-relaxed text-base md:text-lg max-w-md">
                      {l.desc}
                    </p>
                    <div className="mt-8 flex gap-1.5">
                      {layers.map((_, j) => (
                        <span
                          key={j}
                          className="h-0.5 flex-1 rounded-full"
                          style={{
                            background:
                              j <= i
                                ? "var(--gradient-aqua)"
                                : "oklch(0.7 0.02 230 / 0.2)",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-foreground/40">
          Scroll to explore layers
        </div>
      </div>
    </section>
  );
}
