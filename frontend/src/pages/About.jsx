import React, { useState } from "react";
import {Timeline} from '../components/AboutCom/TimeLine'
import {MissionVideo} from '../components/AboutCom/MissionVideo'
export const About = () => {
  const [activeCard, setActiveCard] = useState(null);

  const reactData = [
    {
      letter: "R",
      title: "Real-world",
      color: "text-blue-600",
      desc: "Learning happens in farms, oceans, factories, communities, and ecosystems — not just classrooms.",
    },
    {
      letter: "E",
      title: "Engineering",
      color: "text-green-600",
      desc: "Students turn observations into prototypes, systems, and enterprises.",
    },
    {
      letter: "A",
      title: "Application",
      color: "text-purple-600",
      desc: "Ideas are tested in the field and built for real conditions.",
    },
    {
      letter: "C",
      title: "Collaborative",
      color: "text-orange-600",
      desc: "Solutions are co-created with people, not delivered to them.",
    },
    {
      letter: "T",
      title: "Transformation",
      color: "text-red-600",
      desc: "Learners evolve into system designers, entrepreneurs, and change agents.",
    },
  ];

  const handleCardClick = (index) => {
    // Toggle card on mobile
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <>
      {/* Main Section */}
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://admissions.kct.ac.in/images/dome-new.png')",
        }}
      >
        {/* Light Overlay */}
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="relative z-10 max-w-6xl w-full text-center">
          {/* Title */}
          <h1 className="text-4xl mt-14 md:text-5xl font-bold text-gray-900 mb-4">
            What Is REACT?
          </h1>
          <p className="text-lg text-gray-700 mb-14 max-w-2xl mx-auto">
            REACT stands for an innovative approach that connects real-world
            problems with engineering solutions and collaborative development.
          </p>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-20">
            {reactData.map((item, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`group bg-white shadow-xl rounded-2xl p-8 transition-all duration-500 ease-in-out 
                           md:hover:scale-110 md:hover:shadow-2xl cursor-pointer relative overflow-hidden
                           ${activeCard === index ? 'scale-105 shadow-2xl' : ''}`}
              >
                {/* Letter and Title - Hidden on hover (desktop) or when active (mobile) */}
                <div
                  className={`transition-opacity duration-300 
                             md:group-hover:opacity-0
                             ${activeCard === index ? 'opacity-0' : 'opacity-100'}`}
                >
                  <h2 className={`text-4xl font-bold mb-3 ${item.color}`}>
                    {item.letter}
                  </h2>
                  <p className="font-semibold text-gray-800">
                    {item.title}
                  </p>
                </div>

                {/* Hover/Active Content */}
                <div
                  className={`absolute inset-0 flex items-center justify-center text-center px-4
                             transition-opacity duration-500
                             md:opacity-0 md:group-hover:opacity-100
                             ${activeCard === index ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p className="text-gray-800 text-sm font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Full Form */}
          <div className="bg-white shadow-lg rounded-2xl px-10 py-8 text-center max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              <span className="text-blue-600">REACT</span> – Real-world Engineering
              & Application for{" "}
              <span className="text-cyan-600">
                Collaborative Transformation
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* Next Section Space */}
      <div className="min-h-[70vh] bg-white py-20">
        {/* <MissionVideo /> */}
        <div className="text-center text-gray-500"> <MissionVideo /></div>
      </div>
      <div className="min-h-[70vh] bg-white">
        {/* <Timeline /> */}
        <div className="text-center text-gray-500"><  Timeline /> </div>
      </div>
    </>
  );
};