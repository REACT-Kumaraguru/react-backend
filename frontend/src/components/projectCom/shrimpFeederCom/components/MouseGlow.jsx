import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

/** Soft cursor-following glow. Disabled on touch / reduced-motion. */
export default function MouseGlow() {
  const ref = useRef(null);
  const fine = useMediaQuery('(pointer: fine)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (!fine || reduced) return;
    let raf;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.x - 250}px, ${pos.y - 250}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[500px] w-[500px] rounded-full opacity-50 blur-3xl"
      style={{
        background:
          'radial-gradient(circle, rgba(34,211,238,0.16), rgba(45,212,191,0.06) 45%, transparent 70%)',
      }}
    />
  );
}
