import React from "react";
import personImg from "../../assets/images/FellowStudent.gif"; 
import courseImg from "../../assets/images/logo.png";

const FellowshipHero = () => {
  return (
    <section className="relative bg-[#e9f6fb] min-h-[650px] flex items-center overflow-hidden font-sans">

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 30 Q 25 20 50 30 T 100 30" fill="none" stroke="#0f766e" strokeWidth="0.4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-12 gap-10 items-center relative">

        {/* LEFT CONTENT */}
        <div className="md:col-span-5 z-10">

          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Your Impact Journey
          </p>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-[#0f172a] leading-tight mb-6">
            Build Solutions <br />
            Where Society <br />
            <span className="text-[#0f766e]">Actually Needs Them</span>
          </h1>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-10 max-w-md">
            The REACT Fellowship is a high-commitment, outcome-driven program that embeds fellows
            in real communities, NGOs, and public systems — where problems are complex, constraints
            are real, and impact truly matters.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="/apply"
              className="inline-flex items-center justify-center bg-[#0f766e] hover:bg-[#115e59] text-white px-8 py-3 rounded-md text-sm font-semibold transition shadow-md"
            >
              Apply Now
            </a>

            <a
              href="/react"
              className="text-sm font-medium text-[#0f766e] hover:underline"
            >
              Read Before You Apply →
            </a>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-7 relative flex justify-center items-end h-full">

          {/* Main Illustration */}
          <div className="relative z-10 translate-y-10">
            <img
              src={personImg}
              alt="REACT Fellow"
              className="h-[420px] md:h-[520px] xl:h-[600px] object-contain"
            />
          </div>

          {/* FIELD IMMERSION LABEL */}
          <div className="absolute top-1/2 left-0 z-20 -translate-x-12 hidden md:block">
            <div className="relative text-right">
              <span className="font-serif italic text-xl text-[#1e3a8a] block leading-none">
                field
              </span>
              <span className="font-serif italic text-xl text-[#1e3a8a] block ml-6 leading-none">
                immersion
              </span>

              <svg
                className="absolute -right-10 top-5 w-10 h-10 text-[#0f766e]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>

          {/* INFO CARD */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-64 bg-white rounded-xl shadow-xl overflow-hidden hidden lg:block">
            <div className="relative">
              <img
                src={courseImg}
                alt="REACT Fellowship"
                className="w-full h-36 object-cover"
              />
              <span className="absolute top-3 right-3 bg-[#0f766e] text-white text-xs font-semibold px-3 py-1 rounded-full">
                Fellowship
              </span>
            </div>

            <div className="p-5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-1">
                6-Month Program
              </p>

              <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-snug">
                Real-world Engineering & Social Impact
              </h3>

              <p className="text-[12px] text-gray-600 leading-relaxed">
                Work with communities, NGOs, and public systems to research, validate,
                and build solutions with measurable real-world outcomes.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FellowshipHero;
