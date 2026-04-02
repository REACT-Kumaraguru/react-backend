import React, { useState } from "react";

export const MissionVideo = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="w-full bg-[#20385F] py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl font-bold text-[#8fd1c3] mb-6">
            Vision & Mission
          </h2>

          {/* Vision */}
          <h3 className="text-xl font-semibold text-[#8fd1c3] mb-2">Vision</h3>
          <p className="text-white leading-relaxed mb-6">
            To transform education from knowing about the world to changing the
            world through knowledge — by anchoring learning in real problems,
            real places, and real outcomes.
          </p>

          {/* Mission */}
          <h3 className="text-xl font-semibold text-[#8fd1c3] mb-2">Mission</h3>
          <p className="text-white leading-relaxed mb-6">
            REACT exists to bring truth back into learning. It creates graduates
            who don’t wait for opportunities but design them — by integrating
            academic depth, field immersion, and enterprise development into one
            living framework.
          </p>

          {/* Subtext */}
          <div className="space-y-3 text-white">
            <p>
              Instead of studying problems from a distance, REACT sends Fellows
              to live within them.
            </p>
            <p>
              They learn root cause analysis through people, stories, and systems
              — not just surveys.
            </p>
            <p>
              The result: solutions that communities ask for, not just accept.
            </p>
            <p className="font-semibold text-[#8fd1c3]">
              REACT turns observation into empathy, and empathy into enterprise.
            </p>
          </div>
        </div>

        {/* RIGHT VIDEO SECTION */}
        <div className="relative w-full h-[350px] rounded-2xl overflow-hidden shadow-2xl">

          {/* Background Image */}
          <img
            src="https://admissions.kct.ac.in/images/dome-new.png"
            alt="KCT Campus"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-white/70"></div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setShowVideo(true)}
              className="w-20 h-20 rounded-full bg-[#20385F] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-[#8fd1c3] ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* 🔽 BOTTOM CAPTION BAR */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#20385F]/95 text-white px-6 py-4">
            <h4 className="text-lg font-semibold text-[#8fd1c3] mb-1">
              Meet the Architect of REACT
            </h4>
            <p className="text-sm">
              Brathikan Vijayamohan Mankayarkarasi, Principal Architect at the
              Centre for REACT, Kumaraguru Institutions.
            </p>
            <p className="text-sm italic text-[#8fd1c3] mt-1">
              “REACT turned my curiosity into a company.” – 2025 Fellow
            </p>
          </div>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="relative bg-white rounded-xl overflow-hidden w-full max-w-4xl">

            {/* Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 text-gray-700 text-2xl font-bold hover:text-red-500"
            >
              ✕
            </button>

            {/* Video Frame */}
            <div className="w-full h-[300px] md:h-[500px]">
              <iframe
                className="w-full h-full"
                src=""
                title="Mission Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
