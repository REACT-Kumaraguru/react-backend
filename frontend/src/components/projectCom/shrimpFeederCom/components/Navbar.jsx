import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../utils/constants';
import { scrollToId } from '../hooks/useLenis';
import { cn } from '../utils/cn';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'py-3' : 'py-5'
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 sm:px-7',
            scrolled ? 'glass-strong shadow-glow' : 'bg-transparent'
          )}
          style={{ width: 'calc(100% - 2rem)' }}
        >
          <button
            onClick={() => go('hero')}
            className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyanic to-teal text-abyss shadow-glow">
              T
            </span>
            <span>
              Thynk<span className="text-aqua">.</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => go('team')}
            className="hidden rounded-full bg-gradient-to-r from-cyanic to-teal px-5 py-2.5 text-sm font-semibold text-abyss shadow-glow transition-shadow hover:shadow-glow-lg lg:inline-flex"
          >
            Meet the Team
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl glass lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-abyss/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-2">
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => go(l.id)}
                  className="font-display text-3xl font-bold text-white/80 hover:text-aqua"
                >
                  {l.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * NAV_LINKS.length }}
                onClick={() => go('team')}
                className="mt-6 rounded-full bg-gradient-to-r from-cyanic to-teal px-8 py-3 font-semibold text-abyss shadow-glow"
              >
                Meet the Team
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
