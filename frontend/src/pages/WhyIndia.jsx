import React from 'react'
import Earth from '../components/WhyIndiaCom/Earth'

const WhyIndia = () => {
  return (
    <div className="pt-24 "> {/* Space for navbar */}
  
      {/* Intro Text */}
      <div className=" max-w-4xl mx-auto text-center py-12 px-4 mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
          REACT is rooted in <span className="text-blue-600">India</span> for a reason.
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
          Our greatest challenges — in{" "}
          <span className="italic text-gray-800">
            agriculture, environment, health, and inclusion
          </span>{" "}
          — are also our greatest classrooms.
        </p>
      </div>

      {/* Earth Section */}
      <div className="mt-16">
        <Earth />
      </div>

    </div>
  )
}

export default WhyIndia
