import React from "react";

const PerformanceSection = () => {
  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight mb-6">
            Clean, Conscious,
            <br />
            Performance{" "}
            <span className="italic text-amber-600">Science.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Unreservedly honest products that truly work, be kind to skin and
            the planet — no exceptions.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Large Featured Image */}
          <div className="relative bg-gradient-to-br from-stone-100 to-amber-50 rounded-3xl overflow-hidden aspect-[3/4] group hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 flex items-center justify-center p-12">
              {/* Model placeholder with gradient overlay */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-100/50 to-transparent rounded-3xl" />
                
                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-stone-200/80 to-transparent rounded-b-3xl" />
                
                {/* Product indicator */}
                <div className="absolute top-1/3 right-12 w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                <div className="absolute top-1/3 right-12 w-3 h-3 bg-amber-500 rounded-full animate-ping" />
              </div>
            </div>

            {/* Floating Info Card */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="font-semibold text-gray-900 mb-2">
                Dermatologist Tested
              </h3>
              <p className="text-sm text-gray-600">
                Clinically proven formulas for sensitive skin
              </p>
            </div>
          </div>

          {/* Right Column - Grid of smaller images */}
          <div className="space-y-8">
            {/* Top Section Header */}
            <div className="bg-gradient-to-br from-amber-50 to-stone-100 rounded-3xl p-8">
              <h3 className="text-3xl font-light text-gray-900 mb-4">
                Precisely Formulated
                <br />
                <span className="italic text-amber-600">For Performance</span>
              </h3>
              <p className="text-gray-600 text-sm">
                Every ingredient serves a purpose, backed by clinical research
                and dermatological science.
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Image 1 - Model Portrait */}
              <div className="relative bg-gradient-to-br from-stone-100 to-amber-50 rounded-2xl overflow-hidden aspect-[3/4] group hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-b from-stone-200/50 to-amber-100/50 rounded-2xl" />
                </div>
              </div>

              {/* Image 2 - Application */}
              <div className="relative bg-gradient-to-br from-amber-100 to-stone-100 rounded-2xl overflow-hidden aspect-[3/4] group hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    {/* Face outline */}
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-200/60 to-transparent rounded-full" />
                    
                    {/* Application point */}
                    <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-black rounded-full" />
                    <div className="absolute top-1/3 right-1/3 w-12 h-12 border-2 border-black/20 rounded-full" />
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-black text-white text-xs px-4 py-2 rounded-full">
                  Explore All
                </div>
              </div>

              {/* Image 3 - Product Still Life */}
              <div className="relative bg-gradient-to-br from-stone-200 to-amber-100 rounded-2xl overflow-hidden aspect-square col-span-2 group hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    {/* Product bottle */}
                    <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-16 h-40 bg-gradient-to-b from-amber-400 to-amber-600 rounded-2xl shadow-2xl">
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-10 bg-gray-800 rounded-t-lg" />
                    </div>

                    {/* Natural elements (wood/stone) */}
                    <div className="absolute left-1/4 bottom-1/4 w-32 h-24 bg-stone-400 rounded-lg transform -rotate-12 opacity-40" />
                    <div className="absolute right-1/3 bottom-1/3 w-24 h-20 bg-amber-300 rounded-xl transform rotate-6 opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button className="px-12 py-5 bg-amber-500 text-white text-lg font-medium rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Hear More
          </button>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;