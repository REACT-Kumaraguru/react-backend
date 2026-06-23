import React, { useState, useEffect } from 'react';

import Video from '../assets/videos/video-hero.mp4';
import Logo from '../assets/images/Welcome.png';
import RotatingText from './Landing Components/RotatingText';
import AnnouncementSection from './Landing Components/AnnouncementSection';
import Events from './Landing Components/Events';
import Testimonials from './Landing Components/Testimonials';

import CardSwap, { Card } from './Landing Components/CardSwap';
import Pencil from "../assets/images/1.png";
import IMG from "../assets/images/2.png";
import Prism from "../assets/images/3.png";
import ReasonsSection from './Landing Components/ReasonsSection';

export const Hero = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive dimensions for GSAP cards
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setTimeout(() => setShowIntro(false), 1500);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#FEF4EA] font-[Arial,sans-serif]">

      {/* 1. HERO VIDEO SECTION */}
      <div className="relative h-[150vh] md:h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden mt-16 md:mt-20">
          <video 
            src={Video} autoPlay loop muted playsInline
            className={`h-full w-full object-cover transition-all duration-1000 ease-in-out ${
              showIntro ? 'blur-2xl scale-105' : 'blur-0 scale-100'
            }`}
          />
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-1000 ${showIntro ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-all duration-700 ease-in-out ${
            showIntro ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}>
            <img src={Logo} alt="Welcome" className="w-[250px] md:w-[400px] brightness-75" />
          </div>
        </div>
      </div>

      {/* 2. TEXT AFTER VIDEO */}
      <div className="min-h-[40vh] md:h-[50vh] bg-white flex flex-col items-center justify-center text-center px-6 py-12">
        <div className="flex flex-col md:flex-row items-center gap-3 text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          <span className="text-black">Where Education Meets</span>
          <RotatingText
            texts={['Enterprise', 'Learning']}
            mainClassName="px-3 sm:px-4 md:px-5 bg-cyan-600 text-white overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-lg"
            rotationInterval={2000}
          />
        </div>
        <p className='max-w-3xl text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed'>
          REACT is India’s first multi-track experiential learning fellowship that turns real-world challenges into prototypes.
        </p>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">

          {/* EVENTS */}
          <div className="w-full md:w-1/2 md:px-12  bg-white">
            <Events />
          </div>

          {/* ANNOUNCEMENTS */}
          <div className="w-full md:w-1/2 mt-16 px-4 md:px-12 bg-white">
            <AnnouncementSection />
          </div>


        </div>
      </div>



      {/* 4. FELLOWSHIP MODEL SECTION */}
      <div className="bg-white py-16 md:py-24 px-6 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-12 items-start lg:items-center">

          {/* LEFT SIDE: EXPLANATION */}
          <div className="text-left w-full z-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              REACT Fellowship Model
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              REACT is an immersive learning program where students work directly with communities,
              experts, and stakeholders to solve real-world challenges.
            </p>
            <ul className="space-y-4 text-gray-700 text-sm md:text-base mb-8">
              <li className="flex items-start gap-2"><span>✔</span> Live within communities to understand real problems</li>
              <li className="flex items-start gap-2"><span>✔</span> Engage with stakeholders and policy makers</li>
              <li className="flex items-start gap-2"><span>✔</span> Learn from industry and domain experts</li>
              <li className="flex items-start gap-2"><span>✔</span> Co-create practical, scalable solutions</li>
            </ul>

            <button className="bg-black text-white px-8 py-4 rounded-full text-md hover:bg-gray-800 transition-all shadow-lg">
              Know more
            </button>
          </div>

          {/* RIGHT SIDE: CARD SWAP - REDUCED SIZE FOR MOBILE */}
          <div className="relative w-full h-[320px] sm:h-[450px] md:h-[550px] flex items-center justify-start lg:justify-center mt-8 lg:mt-0">
            <CardSwap
              width={isMobile ? 280 : 500} 
              height={isMobile ? 220 : 400}
              cardDistance={isMobile ? 25 : 60} 
              verticalDistance={isMobile ? 35 : 70}
              delay={5000}
              pauseOnHover={false}
            >
              <Card>
                <div className="h-full w-full bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
                  <img src={IMG} alt="Feature 1" className="w-full h-full object-contain p-4" />
                </div>
              </Card>
              <Card>
                <div className="h-full w-full bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
                  <img src={Prism} alt="Feature 2" className="w-full h-full object-contain p-4" />
                </div>
              </Card>
              <Card>
                <div className="h-full w-full bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
                  <img src={Pencil} alt="Feature 3" className="w-full h-full object-contain p-4" />
                </div>
              </Card>
            </CardSwap>
          </div>

        </div>
      </div>

      <Testimonials />
      <ReasonsSection />

    </section>
  );
};