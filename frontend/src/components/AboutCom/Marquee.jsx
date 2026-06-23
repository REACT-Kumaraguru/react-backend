import { memo, useEffect, useRef } from 'react';

const BASE = [
  'Real World', 'Engineering', 'Application', 'Collaborative', 'Transformation',
  'Domain Intelligence', 'MMD Build', 'CALIBRATE', 'Kumaraguru', 'REACT',
];

/* Two identical copies. The animation moves exactly -50% of the track's
   own width, so copy-A scrolls out exactly as copy-B scrolls in.
   The loop boundary is invisible because both halves are identical. */
const ITEMS = [...BASE, ...BASE];

export const Marquee = memo(() => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let waapi; // Web Animations API handle

    const start = () => {
      if (!trackRef.current) return;

      /*
        Measure AFTER fonts settle. Google Fonts swap changes glyph widths,
        which would shift the loop boundary and cause a visible jump if we
        measured before the swap.
      */
      const halfPx = Math.round(track.scrollWidth / 2);

      /*
        element.animate() runs on the GPU compositor thread — exactly like
        CSS animation-iteration-count:infinite, but JavaScript-controlled.
        iterations:Infinity means the browser handles the loop natively with
        no JS reset frame and no shared GSAP timeline.
      */
      waapi = track.animate(
        [
          { transform: 'translateX(0px)' },
          { transform: `translateX(-${halfPx}px)` },
        ],
        {
          duration: 30_000, // ms — same visual speed as original 30 s CSS
          iterations: Infinity,
          easing: 'linear',
        }
      );
    };

    if (document.fonts.status === 'loaded') {
      start();
    } else {
      document.fonts.ready.then(start);
    }

    return () => waapi?.cancel();
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '1.25rem 0',
        background: '#F5F7FA',
      }}
    >
      {/* left fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: '0 auto 0 0',
          width: '5rem', pointerEvents: 'none', zIndex: 10,
          background: 'linear-gradient(to right, #F5F7FA, transparent)',
        }}
      />
      {/* right fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: '0 0 0 auto',
          width: '5rem', pointerEvents: 'none', zIndex: 10,
          background: 'linear-gradient(to left, #F5F7FA, transparent)',
        }}
      />

      <div
        ref={trackRef}
        style={{ display: 'inline-flex', whiteSpace: 'nowrap', willChange: 'transform' }}
      >
        {ITEMS.map((label, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              flexShrink: 0,
              padding: '0 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: '#94a3b8',
            }}
          >
            {label}
            <span aria-hidden="true" style={{ paddingLeft: '1.25rem', color: '#E76758' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
});
