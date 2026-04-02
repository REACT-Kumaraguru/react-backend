import React from "react";
import { Link } from "react-router-dom";
/* ✅ DATA MUST BE HERE — ABOVE THE COMPONENT */
const announcements = [
  {
    title: "REACT Citizen Fellow — Opening Soon",
    description: "A 2-month online leadership cohort open to all.",
  },
  {
    title: "REACT Student Fellow 2025 Cohort Application closed",
    description: "UG and Master’s students — applications are now closed.",
  },
  {
    title: "REACT GLOBE Fellowship — Ongoing (Closes in 10 Days)",
    description: "Round 1: 31st October | Round 2: 10th November.",
  },
];

const AnnouncementSection = () => {
  return (
    <section className="w-full max-h-[520px] bg-white flex flex-col">
      
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Announcements
        </h2>
        <p className="text-gray-600 text-md">
          The information hub for upcoming events.
        </p>
        <hr className="mt-4 border-gray-200" />
      </header>

      {/* Scroll Area */}
      <div className="h-[260px] overflow-hidden relative">
        <div className="animate-vertical-scroll">
          {announcements.slice(0, 3).map((item, index) => (
            <AnnouncementCard key={index} item={item} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/80" />
      </div>

      {/* Footer */}

      <Link to="/announcements">
        <div className="mt-6">
          <button
            className="bg-black text-white px-8 py-4 rounded-full font-semibold
                      transition-all duration-300 ease-in-out
                      hover:bg-white hover:text-black hover:border hover:border-black
                      active:scale-95"
          >
            More Announcements
          </button>
        </div>
      </Link>

      
    </section>
  );
};


const AnnouncementCard = ({ item }) => (
  <div className="border-b border-gray-200 py-8">
    <h3 className="font-semibold text-lg text-black">
      {item.title}
    </h3>
    <p className="text-gray-600 mt-1 text-sm">
      {item.description}
    </p>
  </div>
);

export default AnnouncementSection;