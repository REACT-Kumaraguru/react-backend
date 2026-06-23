import React from "react";
import HeroImage from '../../assets/images/hero-image-explore.jpg'
import ShinyText from '../FooterCom/ShinyText';

const ExploreHero = () => {
  return (
    <section className="bg-gradient-to-r from-white via-purple-50 to-pink-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT IMAGE */}
          <div className="relative">
            <img
              src={HeroImage}
              alt="Tech Event"
              className="rounded-3xl shadow-xl w-full h-[420px] object-cover"
            />

            {/* Decorative Shapes */}
            <div className="absolute -top-4 -left-4 text-purple-400 text-3xl">✦</div>
            <div className="absolute -bottom-4 -right-4 text-pink-400 text-3xl">✦</div>
          </div>

          {/* RIGHT CONTENT */}
<div>
  <p className="text-sm text-purple-600 font-semibold mb-2">
    Explore Us
  </p>

  <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
    Learning by <span className="text-purple-600">Living</span>, <br />
    Creating Real Impact
  </h1>

  <p className="text-slate-600 mt-4 max-w-xl">
    See how learning by living unfolds every day — through stories, videos,
    social updates, and events. Explore how students, mentors, and communities
    collaborate to turn real-world challenges into meaningful change.
  </p>

  {/* HIGHLIGHT TAGLINE */}
  <div className="mt-6">
    <ShinyText
      text="Real-world Engineering & Application for Collaborative Transformation"
      speed={2}
      color="black"
      shineColor="#ffffff"
      spread={120}
    />
  </div>
</div>

        </div>
      </div>
    </section>
  );
};

export default ExploreHero;
