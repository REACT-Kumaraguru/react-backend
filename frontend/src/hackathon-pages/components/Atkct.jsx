import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';

export default function Atkct() {
  return (
    <section id="launch" className="relative z-10 py-16 md:py-24 px-6 bg-white border-t-4 border-[#2E7D32]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#388E3C] font-semibold text-sm uppercase tracking-wider mb-2"
        >
          Solve4Purpose at KCT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight"
        >
          Ready to Launch Your Innovation from KCT?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-slate-700 text-base md:text-lg leading-relaxed mb-8"
        >
          Solve4Purpose is KCT&apos;s innovation launchpad for student changemakers, powered by{' '}
            <a
              href="https://react.kct.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2E7D32] font-semibold hover:underline"
            >
              React
            </a>
            , driving sustainable, real-world solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="mb-8"
        >
          <p className="flex items-center justify-center gap-2 text-[#2E7D32] font-semibold mb-3">
            <Globe className="w-5 h-5 text-[#2E7D32]" aria-hidden />
            Focus Areas
          </p>
          <ul className="space-y-2 text-slate-700 text-base text-left max-w-sm mx-auto">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] shrink-0" aria-hidden />
              India&apos;s MSME sectors
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] shrink-0" aria-hidden />
              UN Sustainable Development Goals (SDGs)
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#2E7D32] font-semibold rounded-lg border-2 border-[#2E7D32] hover:bg-[#2E7D32] hover:text-white transition-colors shadow-sm"
          >
            Learn More
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
          
        </motion.div>
      </div>
    </section>
  );
}
