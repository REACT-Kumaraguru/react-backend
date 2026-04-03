import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Roadmap from './components/Roadmap';
import Atkct from './components/Atkct';
import ProblemStatements from './components/ProblemStatements';

const blockVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

function Block({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      custom={delay}
      variants={blockVariants}
      initial="hidden"
      animate="visible"
      // Added thick black borders and a hard "retro" shadow to mimic the 3D block look
      className={`relative bg-white border-[3px] border-slate-900 px-8 py-4 
                  shadow-[8px_8px_0_0_#1e293b] text-5xl md:text-7xl font-black 
                  uppercase tracking-tighter text-slate-900 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function HackathonLanding() {
  const [toggleOn, setToggleOn] = useState(true);

  return (
    <main className="relative bg-[#f8f9fa] font-sans pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Background squares */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-[10%] left-[5%] w-24 h-24 md:w-32 md:h-32 bg-white/60 border-[3px] border-slate-900/20 shadow-[6px_6px_0_0_rgba(30,41,59,0.15)] rotate-12"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-[25%] right-[8%] w-16 h-16 md:w-20 md:h-20 bg-pink-100/70 border-[3px] border-slate-900/25 shadow-[4px_4px_0_0_rgba(30,41,59,0.12)] -rotate-6"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-[20%] left-[12%] w-20 h-20 md:w-28 md:h-28 bg-red-500/10 border-[3px] border-slate-900/20 shadow-[5px_5px_0_0_rgba(30,41,59,0.1)] -rotate-[8deg]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-[15%] right-[15%] w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] bg-slate-200/80 border-[3px] border-slate-900/20 shadow-[4px_4px_0_0_rgba(30,41,59,0.12)] rotate-[15deg]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute top-[60%] left-[3%] w-12 h-12 bg-white/50 border-[2px] border-slate-900/15 rotate-[-12deg]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="absolute top-[12%] right-[25%] w-10 h-10 bg-pink-100/50 border-[2px] border-slate-900/15 rotate-6"
        />
      </div>

      <div className="relative z-10 max-w-6xl w-full flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: The Animated Block Stack */}
        <div className="flex flex-col items-start -space-y-1">
          <Block delay={0} className="z-40">SOLVE</Block>
          
          {/* Staggered blocks to mimic the "staircase" layout in the image */}
          <div className="flex items-start">
             <div className="w-12 h-1" /> {/* Spacer */}
             <Block delay={1} className="z-30 !bg-pink-100 flex items-center gap-4">
               <span className="text-red-500 text-4xl"></span> 4
             </Block>
          </div>
          
          <Block delay={2} className="z-20 ml-20">Purpose</Block>
          
          <div className="flex items-center gap-0">
            <Block delay={3} className="z-10">2026</Block>
            {/* The red toggle switch element from the bottom right of the image */}
            <motion.button
              type="button"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
              onClick={() => setToggleOn((prev) => !prev)}
              className="h-24 w-40 bg-red-500 border-[3px] border-slate-900 shadow-[8px_8px_0_0_#1e293b] ml-[-3px] flex items-center justify-center hover:bg-red-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              title={toggleOn ? 'On (click to turn off)' : 'Off (click to turn on)'}
              aria-pressed={toggleOn}
              aria-label={toggleOn ? 'Toggle is on' : 'Toggle is off'}
            >
               <div className={`w-20 h-10 bg-slate-900 rounded-full flex items-center px-2 ${toggleOn ? 'justify-end' : 'justify-start'}`}>
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="w-7 h-7 bg-red-500 rounded-full shrink-0"
                    aria-hidden
                  />
               </div>
            </motion.button>
          </div>
        </div>

        {/* Right Side: Typography & CTA */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-light text-slate-900 mb-2"
          >
            <span className="font-bold underline decoration-red-500">Ideathon</span> 2026
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl md:text-3xl font-bold text-slate-700 mb-6"
          >
            April 15 – April 18, 2026
          </motion.h2>
          
          <p className="text-slate-500 font-medium mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 shrink-0 text-slate-600" aria-hidden />
            M-Gate, Kumaraguru College of Technology (KCT)
          </p>
          
          <p className="max-w-md text-slate-600 leading-relaxed mb-10">
            Solve 4 Purpose is an innovation-driven Ideathon designed to encourage students to create meaningful solutions for real-world problems. The event challenges participants to think beyond ideas and focus on purpose-driven impact.
          </p>

          <Link to="/solve4purpose/register">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 bg-[#ff4d4d] text-white font-black uppercase tracking-widest text-lg 
                         border-[3px] border-slate-900 shadow-[6px_6px_0_0_#1e293b] 
                         hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
              Register
            </motion.span>
          </Link>
        </div>
      </div>
      </section>

      <Roadmap />
      <Atkct />
      <ProblemStatements />
    </main>
  );
}