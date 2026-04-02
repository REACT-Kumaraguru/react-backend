'use client';
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, animate, useAnimationControls } from "framer-motion";
import { Linkedin } from "lucide-react";

// Image Imports
import Aparna from "../../assets/people/Aparna.jpg";
import Jana from "../../assets/people/Jana.jpg";
import Nandeesh from "../../assets/people/Nandeesh.jpg";
import Sangeetha from "../../assets/people/Sangeetha.jpg";
import Sivakeerthana from "../../assets/people/Sivakeerthana.jpg";

const testimonials = [
  {
    name: "Jana",
    title: "Young Innovator (TNSPC)",
    quote: "Working in policy and grassroots innovation, I've always believed in the power of field-based education. REACT is the first program I've seen that truly embodies that vision.",
    img: Jana,
    linkedin: "https://www.linkedin.com/in/connectwithjana/",
  },
  {
    name: "Sivakeerthana",
    title: "R and D Engineer (Zoho Corp)",
    quote: "As someone immersed in applied research, I've been waiting to see a program that connects students to the real world meaningfully. REACT does that with clarity and conviction.",
    img: Sivakeerthana,
    linkedin: "https://www.linkedin.com/in/sivakeerthana/",
  },
  {
    name: "Sangeetha",
    title: "Professor",
    quote: "For years, I've watched students struggle to connect theory with the reality outside. REACT filled that gap in the most profound way. It brings back meaning to education.",
    img: Sangeetha,
    linkedin: "https://www.linkedin.com/in/dr-sangeetha-n-ab397258/",
  },
  {
    name: "Aparna",
    title: "Student",
    quote: "I had never walked through a village and asked, 'How can I help?' REACT made me do that—and it changed how I see engineering forever.",
    img: Aparna,
    linkedin: "https://www.linkedin.com/in/aparnarm2904/",
  },
  {
    name: "Nandeeswaran",
    title: "Student",
    quote: "We built a working prototype with farmers. Not for them, but with them. That experience taught me more than any textbook ever could.",
    img: Nandeesh,
    linkedin: "https://www.linkedin.com/in/nandeeswaran-k/",
  },
];

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Desktop Swiper Logic
  const x = useMotionValue(0);
  const animationRef = useRef(null);
  const cardWidthWithGap = 432; // 400px width + 32px gap
  
  // Triple the array for seamless infinite looping
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- DESKTOP SCROLL LOGIC ---
  const startDesktopScroll = useCallback(() => {
    const totalSetWidth = cardWidthWithGap * testimonials.length;
    
    animationRef.current = animate(x, x.get() - totalSetWidth, {
      duration: 30,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (latest) => {
        // Seamless Loop Logic: If we scroll past one full set, reset to center
        if (latest <= -totalSetWidth) {
          x.set(latest + totalSetWidth);
        }
      }
    });
  }, [x, cardWidthWithGap]);

  useEffect(() => {
    if (!isMobile) {
      startDesktopScroll();
    }
    return () => animationRef.current?.stop();
  }, [isMobile, startDesktopScroll]);

  // --- MOBILE CAROUSEL LOGIC ---
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isMobile]);

  // --- MOBILE RENDER ---
  if (isMobile) {
    return (
      <section className="relative z-20 bg-white py-12 px-6 overflow-hidden">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">
          REACT Through Expert Eyes
        </h2>
        <div className="w-full">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                <div className="bg-slate-50 border border-gray-100 rounded-2xl p-6 shadow-sm mx-auto max-w-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={item.img} alt={item.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-bold text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{item.title}</p>
                    </div>
                    <a href={item.linkedin} target="_blank" rel="noreferrer" className="text-blue-600"><Linkedin size={20} /></a>
                  </div>
                  <p className="text-[15px] italic text-gray-700 leading-relaxed">"{item.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300 w-2'}`} />
          ))}
        </div>
      </section>
    );
  }

  // --- DESKTOP RENDER (With Swipe) ---
  return (
    <section className="relative z-20 bg-white py-20 w-full overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
        REACT Through Expert Eyes
      </h2>

      <div 
        className="w-full cursor-grab active:cursor-grabbing"
        onMouseEnter={() => animationRef.current?.stop()}
        onMouseLeave={() => startDesktopScroll()}
      >
        <motion.div
          className="flex gap-8"
          style={{ x, width: 'max-content' }}
          drag="x"
          // Boundary so you don't drag too far into emptiness
          dragConstraints={{ left: -(cardWidthWithGap * testimonials.length * 2), right: 0 }}
          onDragStart={() => animationRef.current?.stop()}
          onDragEnd={() => startDesktopScroll()}
        >
          {extendedTestimonials.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[400px] bg-slate-50 border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow select-none"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <img src={item.img} alt={item.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <p className="font-bold text-xl text-gray-900 leading-tight">{item.name}</p>
                    <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">{item.title}</p>
                  </div>
                </div>
                <a href={item.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:scale-110 transition-transform">
                  <Linkedin size={24} />
                </a>
              </div>
              <p className="text-lg font-medium text-gray-700 leading-relaxed italic">
                “{item.quote}”
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}