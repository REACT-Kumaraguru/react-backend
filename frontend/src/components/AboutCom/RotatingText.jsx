import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const words = ['Builders', 'Innovators', 'Problem-Solvers', 'Change-Makers', 'Fellows'];

export const RotatingText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  const word = words[index];
  const chars = word.split('');

  return (
    <motion.span layout className="inline-flex overflow-hidden" style={{ willChange: 'transform' }}>
      <AnimatePresence mode="wait">
        <motion.span key={word} className="inline-flex">
          {chars.map((ch, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-120%', opacity: 0 }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 400,
                delay: (chars.length - 1 - i) * 0.025,
              }}
              style={{ display: 'inline-block', willChange: 'transform' }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};
