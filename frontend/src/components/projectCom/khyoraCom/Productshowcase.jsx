import React from "react";

const ProductShowcase = () => {
  return (
    <section className="py-24 px-8 bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-sm text-gray-600 mb-4 tracking-wide">
            SUSTAINABLE SKINCARE ROUTINE
          </p>
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight mb-4">
            Explore <span className="italic text-amber-600">Pure Potency</span>
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Unreservedly honest products that truly work, be kind to skin and
            the planet — no exceptions.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Product Card 1 */}
          <div className="group relative bg-gradient-to-br from-amber-100 to-stone-200 rounded-3xl overflow-hidden aspect-[4/5] hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="relative w-full h-full">
                {/* Lavender decoration */}
                <div className="absolute left-8 top-1/4 w-24 h-48 bg-purple-200/30 rounded-full blur-2xl" />

                {/* Product bottle */}
                <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-20 h-48 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full shadow-2xl">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-12 bg-gray-800 rounded-t-lg" />
                </div>

                {/* Dropper */}
                <div className="absolute right-1/3 top-1/3 w-16 h-32 bg-gradient-to-b from-blue-200/80 to-blue-300/80 rounded-full shadow-xl backdrop-blur-sm">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-8 bg-gray-700 rounded-t" />
                </div>

                {/* Decorative circles */}
                <div className="absolute bottom-12 right-12 w-24 h-24 bg-amber-200 rounded-full opacity-60" />
                <div className="absolute top-12 left-12 w-32 h-32 bg-stone-300 rounded-full opacity-40" />
              </div>
            </div>

            <button className="absolute bottom-8 left-8 px-6 py-3 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100">
              Explore Products
            </button>
          </div>

          {/* Product Card 2 */}
          <div className="group relative bg-gradient-to-br from-stone-100 to-amber-100 rounded-3xl overflow-hidden aspect-[4/5] hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="relative w-full h-full">
                {/* Main product bottle */}
                <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-24 h-56 bg-gradient-to-b from-amber-300 to-amber-500 rounded-2xl shadow-2xl">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-16 bg-gray-800 rounded-t-xl" />
                  <div className="absolute top-24 left-1/2 -translate-x-1/2 w-16 h-1 bg-amber-600" />
                </div>

                {/* Geometric shapes */}
                <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-amber-200 rounded-full opacity-50" />
                <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-stone-200 rounded-full opacity-60" />

                {/* Decorative arch */}
                <div className="absolute top-16 right-12 w-48 h-48 border-4 border-amber-300/40 rounded-full" />
              </div>
            </div>

            <button className="absolute bottom-8 left-8 px-6 py-3 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100">
              Explore Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;