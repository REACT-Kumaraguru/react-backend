import React from "react";
import { Rocket, MapPin, Sparkles } from "lucide-react";

const timelineData = [
  {
    year: "2025",
    title: "Pilot Cycle",
    statusLabel: "Started",
    icon: Rocket,
    desc: [
      "6 pioneering Fellows.",
      "1 startup emerged directly from field immersion.",
      "5 Fellows progressed to higher studies and venture work.",
    ],
  },
  {
    year: "2025–26",
    title: "Field Deployment",
    statusLabel: "Present",
    icon: MapPin,
    desc: [
      "120+ students involved.",
      "24 products and prototypes across agriculture, inclusion, and hygiene.",
      "Projects showcased on Prototypes for Humanity, James Dyson Award, MIT Solve.",
    ],
  },
  {
    year: "2026+",
    title: "Vision 2026 and Beyond",
    statusLabel: "Future",
    icon: Sparkles,
    desc: [
      "Centres for REACT at partner universities.",
      "REACT GLOBE platform linking fellows, mentors, and institutions globally.",
      "A global movement for experiential, responsible education.",
    ],
  },
];

export const Timeline = () => {
  return (
    <section className="w-full bg-slate-50 py-16 px-4 md:py-24 md:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-[#20385F] mb-4">
            From Experiment to Movement
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            The journey of REACT evolving into a global experiential learning movement.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 h-full border-l-2 md:border-l-4 border-dashed border-[#8fd1c3]"></div>

          <div className="space-y-12 md:space-y-20">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const Icon = item.icon;

              return (
                <div 
                  key={index} 
                  className="relative flex items-center justify-between md:justify-normal group outline-none"
                  tabIndex={0} // Allows touch/focus on mobile
                >
                  
                  {/* Desktop Alternating Spacer */}
                  <div className={`hidden md:block w-1/2 ${isLeft ? "order-1" : "order-2"}`}></div>

                  {/* Icon Node */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-20">
                    <div className="relative flex flex-col items-center">
                        
                        {/* HOVER/TOUCH LABEL */}
                        {/* We use group-hover for desktop and group-focus/group-active for mobile touch */}
                        <span className="absolute -top-10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-all duration-300 bg-[#20385F] text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg pointer-events-none whitespace-nowrap uppercase tracking-widest translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0">
                            {item.statusLabel}
                        </span>

                        {/* ICON CIRCLE */}
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white border-2 md:border-4 border-[#8fd1c3] flex items-center justify-center shadow-lg text-[#20385F] group-hover:scale-110 group-focus:scale-110 group-hover:bg-[#8fd1c3] group-focus:bg-[#8fd1c3] group-hover:text-white group-focus:text-white transition-all duration-300 cursor-pointer">
                           <Icon className="w-5 h-5 md:w-7 md:h-7" />
                        </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${
                    isLeft ? "md:order-2 md:pl-12" : "md:order-1 md:pr-12 md:text-right"
                  }`}>
                    <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 md:p-8 transition-all duration-300 border border-gray-100 group-hover:border-[#8fd1c3] group-focus:border-[#8fd1c3]">
                      
                      {/* Year Badge */}
                      <div className={`flex items-center gap-3 mb-3 ${!isLeft && 'md:flex-row-reverse'}`}>
                        <span className="bg-[#20385F] text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
                          {item.year}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-[#20385F]">
                          {item.title}
                        </h3>
                      </div>

                      <ul className={`space-y-3 text-gray-600 text-sm md:text-base ${!isLeft ? 'md:list-none' : 'list-none'}`}>
                        {item.desc.map((point, i) => (
                          <li key={i} className={`flex gap-2 ${!isLeft ? 'md:justify-end' : ''}`}>
                            <span className={`text-[#8fd1c3] font-bold ${!isLeft && 'md:hidden'}`}>•</span>
                            <span>{point}</span>
                            <span className={`text-[#8fd1c3] font-bold hidden ${!isLeft && 'md:inline'}`}>•</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};