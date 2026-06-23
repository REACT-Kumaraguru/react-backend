import { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

/** Magnetic glowing button. variant: 'primary' | 'ghost'. */
export default function GlowButton({
  children,
  onClick,
  variant = 'primary',
  className,
  icon: Icon,
}) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.96 }}
      className={cn(
        'relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-[transform,box-shadow] duration-300 will-change-transform',
        variant === 'primary'
          ? 'bg-gradient-to-r from-cyanic to-teal text-abyss shadow-glow hover:shadow-glow-lg'
          : 'glass-strong text-white hover:border-aqua/40 hover:shadow-glow',
        className
      )}
    >
      {Icon && <Icon size={18} strokeWidth={2.4} />}
      {children}
    </motion.button>
  );
}
