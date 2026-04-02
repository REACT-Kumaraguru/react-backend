import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WLD from "./world-map.svg";
import TN from "./tamilnadu_map.png";
import KCT from "./kct.png";

export default function Earth() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ================================
  // 🌍 SECTION 1: WORLD / INDIA (0% - 35%)
  // ================================
  const worldScale = useTransform(scrollYProgress, [0, 0.3], [1, 5]);
  const worldOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // India text
  const indiaOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.35],
    [1, 1, 0]
  );
  const indiaY = useTransform(
    scrollYProgress,
    [0.25, 0.35],
    [0, -20]
  );

  // ================================
  // 🌐 SECTION 2: TAMIL NADU / COIMBATORE (35% - 70%)
  // ================================
  const tnScale = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.65],
    [0.6, 1, 1.2]
  );
  const tnOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.35, 0.65, 0.7],
    [0, 1, 1, 0]
  );

  const cbeY = useTransform(
    scrollYProgress,
    [0.35, 0.45],
    [40, 0]
  );
  const cbeOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.65, 0.7],
    [0, 1, 1, 0]
  );

  // ================================
  // 🏫 SECTION 3: KCT (70% - 100%)
  // ================================
  const kctScale = useTransform(scrollYProgress, [0.75, 0.9], [0.7, 1]);
  const kctOpacity = useTransform(scrollYProgress, [0.7, 0.75, 1], [0, 1, 1]);

  const kctTextY = useTransform(scrollYProgress, [0.75, 0.85], [40, 0]);
  const kctTextOpacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-white text-black font-sans">
      
      {/* ===== Sticky Viewport ===== */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-6">
        
        {/* ===== MAP + TEXT GRID ===== */}
        <div className="relative w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* 🗺️ VISUAL COLUMN */}
          <div className="relative flex justify-center items-center h-[300px] md:h-[500px]">
            
            {/* Ambient Glow */}
            <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-50 blur-[100px] rounded-full" />

            {/* World Map */}
            <motion.img
              src={WLD}
              alt="World Map"
              style={{ scale: worldScale, opacity: worldOpacity }}
              className="absolute w-full max-w-lg object-contain"
            />

            {/* Tamil Nadu Map */}
            <motion.img
              src={TN}
              alt="Tamil Nadu Map"
              style={{ scale: tnScale, opacity: tnOpacity }}
              className="absolute w-full max-w-md object-contain"
            />

            {/* KCT Image */}
            <motion.img
              src={KCT}
              alt="Kumaraguru Institutions"
              style={{ scale: kctScale, opacity: kctOpacity }}
              className="absolute w-full max-w-md object-contain"
            />
          </div>

          {/* 📝 TEXT COLUMN */}
          <div className="relative h-[400px] flex flex-col justify-center">

            {/* 🇮🇳 INDIA CONTENT */}
            <motion.div
              style={{ opacity: indiaOpacity, y: indiaY }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                Why <span className="text-blue-600">India?</span>
              </h2>
              <ul className="space-y-4 text-gray-600 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">●</span>
                  A young country with one of the world’s largest student populations.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">●</span>
                  Complex, interconnected challenges across sectors — agriculture, energy, health, education, sanitation, and more.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">●</span>
                    India is where the next generation of problem solvers must learn by living reality, not reading about it.
                </li>
              </ul>
            </motion.div>

            {/* 📍 COIMBATORE CONTENT */}
            <motion.div
              style={{ opacity: cbeOpacity, y: cbeY }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                Why <span className="text-blue-600">Coimbatore?</span>
              </h2>
              <ul className="space-y-4 text-gray-600 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">●</span>
                  Known as the “Manchester of South India” — an industrial and entrepreneurial hub.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">●</span>
                	Close to farmlands, villages, and ecosystems that mirror many of India’s core challenges.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">●</span>
                	A city that naturally connects education, industry, and community                
                </li>
              </ul>
            </motion.div>

            {/* 🏫 KUMARAGURU CONTENT */}
            <motion.div
              style={{ opacity: kctTextOpacity, y: kctTextY }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                Why <span className="text-blue-600">Kumaraguru?</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Kumaraguru Institutions, founded in 1984, nurture over 10,000 students
                annually across engineering, sciences, liberal arts, and management. For four decades, KI has integrated knowledge,
                work, and life through rural innovation, sustainability programs, and global collaborations.
              </p>
              <p className="mt-6 text-gray-800 text-lg font-medium">
                REACT is the next evolution—embedding experiential learning 
                at the heart of the academic fabric.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
