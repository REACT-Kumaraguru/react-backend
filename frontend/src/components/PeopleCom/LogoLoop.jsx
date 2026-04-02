import React from "react";

const items = [
  "WWOOF India",
  "Keystone Foundation",
  "Elumin Foundation",
  "Senjolai Trust",
  "Heartfulness Institute",
];

const LogoLoop = () => {
  return (
    <div className="w-full overflow-hidden">

      <div className="relative overflow-hidden">
        <div
          className="flex whitespace-nowrap animate-marquee py-4"
          style={{ willChange: "transform" }}
        >
          {[...items, ...items].map((text, index) => (
            <span
              key={index}
              className="
                mx-2 md:mx-4
                px-4 py-2
                text-sm md:text-base
                font-medium text-black/80
                bg-gray-50 border border-black/10
                rounded-full transition-colors
                active:bg-[#5227ff]/10 active:text-[#5227ff]
              "
            >
              {text}
            </span>
          ))}
        </div>

        {/* Edge fade for mobile polish */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white"></div>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation-play-state: paused;
          }
        }
      `}</style>

    </div>
  );
};

export default LogoLoop;
