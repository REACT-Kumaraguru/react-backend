import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Mail, ArrowUp } from 'lucide-react';
import { CONTACT_EMAIL, SOCIALS, NAV_LINKS } from '../utils/constants';
import { scrollToId } from '../hooks/useLenis';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 pt-24">
      {/* animated waves */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden">
        <svg
          className="absolute bottom-0 h-full w-[200%] animate-[gradient-x_12s_linear_infinite]"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,160 L0,160 Z"
            fill="rgba(34,211,238,0.06)"
          />
          <path
            d="M0,100 C240,40 480,160 720,100 C960,40 1200,160 1440,100 L1440,160 L0,160 Z"
            fill="rgba(45,212,191,0.05)"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-12 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 font-display text-2xl font-extrabold">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyanic to-teal text-abyss shadow-glow">
                T
              </span>
              Thynk<span className="text-aqua">.</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Precise multi-direction feed splitting for efficient, sustainable
              shrimp farming — less waste, cleaner water, healthier harvests.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-white/70 transition-colors hover:text-aqua"
            >
              <Mail size={16} /> {CONTACT_EMAIL}
            </a>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-white/70">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.slice(0, 6).map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="text-sm text-white/50 transition-colors hover:text-aqua"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-white/70">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map((s) => {
                const Icon = Icons[s.icon] || Icons.Globe;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl glass text-white/60 transition-all hover:scale-110 hover:text-aqua hover:shadow-glow"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Thynk — Smart Shrimp Feed Splitting
            System. All rights reserved.
          </p>
          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => scrollToId('hero')}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyanic to-teal px-4 py-2 text-xs font-semibold text-abyss shadow-glow"
          >
            Back to top <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
