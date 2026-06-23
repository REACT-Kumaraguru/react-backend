import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** Branded loader: counts to 100 then fades away, unlocking scroll. */
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 14 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 450);
      }
      setProgress(Math.min(p, 100));
    }, 130);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-abyss"
        >
          <div className="relative mb-10 h-24 w-24">
            <span className="absolute inset-0 animate-sf-ripple rounded-full border border-aqua/60" />
            <span className="absolute inset-0 animate-sf-ripple rounded-full border border-teal/40 [animation-delay:1s]" />
            <div className="absolute inset-3 flex items-center justify-center rounded-full bg-gradient-to-br from-cyanic to-teal shadow-glow-lg">
              <span className="font-display text-2xl font-black text-abyss">T</span>
            </div>
          </div>
          <p className="mb-5 font-display text-lg font-bold tracking-[0.35em] text-white/80">
            THYNK
          </p>
          <div className="h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-cyanic to-teal"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          <p className="mt-3 text-xs tabular-nums tracking-widest text-white/40">
            {Math.round(progress)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
