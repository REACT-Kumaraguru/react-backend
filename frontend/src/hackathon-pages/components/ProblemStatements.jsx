import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProblemStatements() {
  return (
    <section id="problem-statements" className="relative z-10 py-16 md:py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Top Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#006428] font-semibold text-lg mb-4"
        >
          Problem Statements
        </motion.p>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-[#222] mb-6 tracking-tight"
        >
          Tackle real-world challenges
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto text-gray-700 text-lg md:text-xl leading-relaxed mb-10"
        >
          Work on real-world challenges sourced directly from MSMEs. Your innovation 
          can drive meaningful change and shape the future of sustainable industries.
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Link
            to="/solve4purpose/problems"
            className="inline-flex items-center px-10 py-4 bg-[#E65100] text-white font-bold text-xl rounded-full hover:bg-[#004d1f] transition-all shadow-lg hover:shadow-xl"
          >
            refer Problem Statements
          </Link>
        </motion.div>

        {/* Bottom Slogan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 mt-10"
        >
          <h3 className="text-[#004d1f] font-black text-3xl md:text-5xl tracking-tighter italic">
            THINK DIFFERENTLY...
          </h3>
          <h3 className="text-[#004d1f] font-black text-3xl md:text-5xl tracking-tighter italic">
            ...SOLVE SMART
          </h3>
        </motion.div>
      </div>
    </section>
  );
}