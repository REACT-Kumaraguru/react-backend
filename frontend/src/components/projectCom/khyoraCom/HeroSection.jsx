import React from "react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-amber-100 via-stone-200 to-amber-50">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            <span className="text-white text-xl font-light tracking-wider">
              KHYORA
            </span>
          </div>

          <div className="hidden md:flex gap-8 text-white text-sm">
            <a href="#" className="hover:opacity-70 transition-opacity">
              New Arrivals
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              Collections
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              About
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-white hover:opacity-70 transition-opacity">
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-white hover:opacity-70 transition-opacity">
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="relative text-white hover:opacity-70 transition-opacity">
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full text-xs flex items-center justify-center text-white">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-left">
            <h1 className="text-6xl md:text-7xl font-light text-[#3b2b2b] leading-tight mb-8">
              Clear, Healthy
              <br />
              Skin Backed
              <br />
              By Science.
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-md leading-relaxed">
              Minimal, dermatologist-tested skincare formulated to target real
              skin concerns — without irritation.
            </p>

            <button className="px-8 py-4 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Explore Products
            </button>
          </div>

          {/* Right - Model Image Placeholder */}
          <div className="relative">
            <div className="aspect-[3/4] bg-gradient-to-br from-amber-200/30 to-stone-300/30 rounded-3xl" />

            {/* Floating Product Card */}
            <div className="absolute bottom-12 -left-12 bg-white rounded-2xl shadow-2xl p-6 max-w-xs">
              <div className="absolute -top-3 left-6 bg-black text-white text-xs px-4 py-1 rounded-full">
                New
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-20 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                  <div className="text-3xl">💧</div>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Clarifying Serum
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Reduces acne & congestion
                  </p>
                  <button className="text-sm underline text-gray-900 font-medium hover:text-gray-600 transition-colors">
                    See Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;