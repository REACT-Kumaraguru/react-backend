import { useMemo } from 'react';

/** Fixed ambient backdrop: grid fade, radial aura + drifting CSS particles. */
export default function AmbientBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 1.5,
        delay: Math.random() * 9,
        dur: Math.random() * 7 + 7,
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-abyss" />
      <div className="absolute inset-0 bg-radial-aqua" />
      <div className="absolute inset-0 bg-grid-fade bg-[size:64px_64px] opacity-40 mask-fade-b" />
      <div className="absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-cyanic/10 blur-[140px]" />
      <div className="absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-teal/10 blur-[150px]" />
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-aqua/40 animate-sf-float-slow"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            boxShadow: '0 0 8px rgba(34,211,238,0.5)',
          }}
        />
      ))}
    </div>
  );
}
