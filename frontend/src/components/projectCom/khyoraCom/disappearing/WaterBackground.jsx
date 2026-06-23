import { useEffect, useRef } from "react";

export function WaterBackground({ variant = "light" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        background:
          variant === "light"
            ? `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), oklch(0.86 0.07 210 / 0.35), transparent 35%)`
            : `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), oklch(0.7 0.1 200 / 0.25), transparent 40%)`,
        transition: "background 0.6s ease",
      }}
    />
  );
}

export function FloatingParticles({ count = 30 }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = 2 + Math.random() * 6;
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const duration = 10 + Math.random() * 12;
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              bottom: 0,
              width: size,
              height: size,
              background: `radial-gradient(circle, oklch(0.95 0.04 200 / 0.9), oklch(0.85 0.06 300 / 0))`,
              animation: `rise ${duration}s linear ${delay}s infinite`,
              filter: "blur(0.5px)",
            }}
          />
        );
      })}
    </div>
  );
}
