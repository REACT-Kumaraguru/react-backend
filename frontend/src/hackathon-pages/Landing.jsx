import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';


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
  const [toggleOn, setToggleOn] = useState(false);
  const [cardsRevealed, setCardsRevealed] = useState(false);

  // Reset cards when toggle is turned off
  if (!toggleOn && cardsRevealed) {
    setCardsRevealed(false);
  }

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
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
          {!toggleOn && (
            <>
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
                April 15 – April 17, 2026
              </motion.h2>
              
              <p className="text-slate-500 font-medium mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 shrink-0 text-slate-600" aria-hidden />
                M-Gate, Kumaraguru College of Technology (KCT)
              </p>
            </>
          )}
          
          {!toggleOn ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center lg:items-start mt-6 w-full"
            >
              <div className="bg-[#ff4d4d] border-[4px] border-slate-900 shadow-[8px_8px_0_0_#1e293b] p-6 mb-6 w-full max-md transform rotate-[-2deg] hover:rotate-0 transition-transform">
                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
                  The Winners Are Announced!
                </h3>
                <p className="text-white font-bold text-lg leading-relaxed bg-slate-900/10 p-3 border-2 border-transparent">
                  The event has successfully concluded. Click the toggle switch on the left to reveal the champions.
                </p>
              </div>
              <motion.div 
                animate={{ x: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[#ff4d4d] font-black text-2xl flex items-center gap-3 uppercase tracking-widest drop-shadow-sm bg-white border-[3px] border-slate-900 px-4 py-2 shadow-[4px_4px_0_0_#1e293b]"
              >
                 <span className="text-4xl">👈</span> Toggle to View
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center lg:items-start mt-2 pb-16"
            >
              <div 
                className="relative w-full h-[800px] flex items-center justify-center cursor-default"
                onMouseEnter={() => setCardsRevealed(true)}
              >
                {!cardsRevealed && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-50 -top-4 bg-white border-[3px] border-slate-900 shadow-[4px_4px_0_0_#1e293b] px-6 py-2 font-black tracking-widest text-slate-900 uppercase text-sm animate-bounce"
                  >
                    Hover over the stack to reveal!
                  </motion.div>
                )}

                {/* 3rd Place */}
                <motion.div
                  animate={
                    cardsRevealed 
                      ? { y: 280, x: -30, rotate: -2, scale: 1 } 
                      : { y: 0, x: 0, rotate: -6, scale: 0.95 }
                  }
                  whileHover={cardsRevealed ? { scale: 1.05, y: 200 } : {}}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className="absolute bg-[#FF9800] border-[4px] border-slate-900 shadow-[10px_10px_0_0_#1e293b] p-5 w-full max-w-[340px] z-10 hover:z-50 transition-all duration-300"
                >
                  <div className="absolute -top-5 -right-4 text-5xl drop-shadow-[0_4px_0_rgba(30,41,59,1)]">
                    🥉
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <span className="bg-white border-[3px] border-slate-900 shadow-[4px_4px_0_0_#1e293b] px-3 py-1 font-black tracking-widest text-slate-900 uppercase text-[10px]">
                      3rd Place
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">
                    Fuel Your Mind
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-white border-[3px] border-slate-900 p-2.5 shadow-[4px_4px_0_0_#1e293b]">
                      <div className="w-7 h-7 bg-orange-300 border-2 border-slate-900 flex items-center justify-center text-slate-900 font-black text-xs shrink-0">NS</div>
                      <p className="text-slate-900 font-bold text-xs sm:text-sm">25BAU016 – Neethishkumar S</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white border-[3px] border-slate-900 p-2.5 shadow-[4px_4px_0_0_#1e293b]">
                      <div className="w-7 h-7 bg-orange-300 border-2 border-slate-900 flex items-center justify-center text-slate-900 font-black text-xs shrink-0">NS</div>
                      <p className="text-slate-900 font-bold text-xs sm:text-sm">25BEE074 – Neha Sakthivel</p>
                    </div>
                  </div>
                </motion.div>

                {/* 2nd Place */}
                <motion.div
                  animate={
                    cardsRevealed 
                      ? { y: 0, x: 50, rotate: 2, scale: 1 } 
                      : { y: 0, x: 0, rotate: 4, scale: 0.98 }
                  }
                  whileHover={cardsRevealed ? { scale: 1.05, y: -20 } : {}}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className="absolute bg-[#E2E8F0] border-[4px] border-slate-900 shadow-[10px_10px_0_0_#1e293b] p-5 w-full max-w-[340px] z-20 hover:z-50 transition-all duration-300"
                >
                  <div className="absolute -top-5 -right-4 text-5xl drop-shadow-[0_4px_0_rgba(30,41,59,1)]">
                    🥈
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <span className="bg-white border-[3px] border-slate-900 shadow-[4px_4px_0_0_#1e293b] px-3 py-1 font-black tracking-widest text-slate-900 uppercase text-[10px]">
                      2nd Place
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">
                    Sortify
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 bg-white border-[3px] border-slate-900 p-2 shadow-[3px_3px_0_0_#1e293b]">
                      <div className="w-7 h-7 bg-slate-300 border-2 border-slate-900 flex items-center justify-center text-slate-900 font-black text-xs shrink-0">RP</div>
                      <p className="text-slate-900 font-bold text-xs sm:text-sm">25BCS286 – Rajamanisha P</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white border-[3px] border-slate-900 p-2 shadow-[3px_3px_0_0_#1e293b]">
                      <div className="w-7 h-7 bg-slate-300 border-2 border-slate-900 flex items-center justify-center text-slate-900 font-black text-xs shrink-0">PS</div>
                      <p className="text-slate-900 font-bold text-xs sm:text-sm">25BCS263 – Pranavadharshini S</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white border-[3px] border-slate-900 p-2 shadow-[3px_3px_0_0_#1e293b]">
                      <div className="w-7 h-7 bg-slate-300 border-2 border-slate-900 flex items-center justify-center text-slate-900 font-black text-xs shrink-0">SW</div>
                      <p className="text-slate-900 font-bold text-xs sm:text-sm">25BEE128 – Swathi</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white border-[3px] border-slate-900 p-2 shadow-[3px_3px_0_0_#1e293b]">
                      <div className="w-7 h-7 bg-slate-300 border-2 border-slate-900 flex items-center justify-center text-slate-900 font-black text-xs shrink-0">SD</div>
                      <p className="text-slate-900 font-bold text-xs sm:text-sm">25BEE113 – Sharu Dharshini</p>
                    </div>
                  </div>
                </motion.div>

                {/* 1st Place */}
                <motion.div
                  animate={
                    cardsRevealed 
                      ? { y: -280, x: -40, rotate: -3, scale: 1 } 
                      : { y: 0, x: 0, rotate: 0, scale: 1 }
                  }
                  whileHover={cardsRevealed ? { scale: 1.05, y: -300 } : {}}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className={`absolute bg-[#FDE047] border-[4px] border-slate-900 shadow-[10px_10px_0_0_#1e293b] p-6 w-full max-w-[350px] z-30 hover:z-50 transition-all duration-300 ${!cardsRevealed ? 'group-hover:-translate-y-2 group-hover:rotate-1' : ''}`}
                >
                  <motion.div 
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="absolute -top-6 -right-5 text-6xl drop-shadow-[0_4px_0_rgba(30,41,59,1)]"
                  >
                    🏆
                  </motion.div>
                  
                  <div className="flex items-center mb-4">
                    <span className="bg-white border-[3px] border-slate-900 shadow-[4px_4px_0_0_#1e293b] px-3 py-1 font-black tracking-widest text-slate-900 uppercase text-xs flex items-center gap-2">
                      <span className="text-red-500 text-sm">★</span> 1st Place <span className="text-red-500 text-sm">★</span>
                    </span>
                  </div>

                  <h3 className="text-3xl font-black text-slate-900 mb-5 tracking-tight uppercase border-b-4 border-slate-900 pb-2">
                    Soluscout
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-white border-[3px] border-slate-900 p-2.5 shadow-[4px_4px_0_0_#1e293b]">
                      <div className="w-8 h-8 bg-amber-400 border-[3px] border-slate-900 flex items-center justify-center text-slate-900 font-black text-xs shrink-0">MA</div>
                      <p className="text-slate-900 font-bold text-sm">25BAE015 – M. Asma Kousar</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white border-[3px] border-slate-900 p-2.5 shadow-[4px_4px_0_0_#1e293b]">
                      <div className="w-8 h-8 bg-amber-400 border-[3px] border-slate-900 flex items-center justify-center text-slate-900 font-black text-xs shrink-0">SD</div>
                      <p className="text-slate-900 font-bold text-sm">25BAE055 – Sidharthani D</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      </section>
    </main>
  );
}