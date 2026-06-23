import { motion } from 'framer-motion';
import { fadeUp, staggerParent, viewportOnce } from '../animations/variants';
import { cn } from '../utils/cn';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <motion.div
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        'mb-16 flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      )}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-aqua"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-aqua shadow-glow" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className="heading-display max-w-4xl text-4xl leading-[1.05] sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
