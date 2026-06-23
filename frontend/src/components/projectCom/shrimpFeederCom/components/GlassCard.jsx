import { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

/**
 * Glassmorphism card with optional 3D-tilt + glow on hover.
 * `glow` adds an animated gradient border halo.
 */
export default function GlassCard({
  children,
  className,
  tilt = true,
  glow = true,
  ...rest
}) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        'group relative rounded-3xl glass p-6 shadow-inset transition-transform duration-300 will-change-transform',
        glow &&
          'before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-500 before:[background:radial-gradient(220px_circle_at_var(--mx,50%)_var(--my,0%),rgba(34,211,238,0.18),transparent_70%)] group-hover:before:opacity-100',
        glow &&
          'after:pointer-events-none after:absolute after:inset-[-1px] after:rounded-3xl after:bg-gradient-to-br after:from-aqua/30 after:via-transparent after:to-teal/30 after:opacity-0 after:transition-opacity after:duration-500 after:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] after:[-webkit-mask-composite:xor] after:[mask-composite:exclude] after:p-px group-hover:after:opacity-100',
        className
      )}
      {...rest}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
