import React from 'react'
import Ecosystem from '../components/PeopleCom/Ecosystem'
import ImageCard from '../components/PeopleCom/ImageCard'
import LogoLoop from '../components/PeopleCom/LogoLoop'

import brathikan from '../assets/people/brathikan.jpg'
import padhmanand from '../assets/people/padhmanand.jpg'
import krisnan from '../assets/people/krisnan.jpeg'
import sivakumar from '../assets/people/sivakumar.jpg'
import preethi from '../assets/people/preethi.png'
import Kavin from '../assets/people/kavin.jpeg'
import suganthi from '../assets/people/suganthi.jpg'
import aswin from '../assets/people/aswin bharath.jpg'
import chitra from '../assets/people/chitra.jpg'
import aravind from '../assets/people/Aravind.jpg'
import kiranlal from '../assets/people/kiranlal.jpg'
import saravanan from '../assets/people/saravanan.jpg'
import sasikala from '../assets/people/Sasikala.jpeg'

const peopleData = [
  {
    image: brathikan,
    name: "Brathikan V M ",
    role: "Head - React",
    link: "https://www.linkedin.com/in/brathikan/",
  },
    {
    image: krisnan,
    name: "Krisnan K",
    role: "Associate Lead - Research & Innovation",
    link: "https://www.linkedin.com/in/krisnan/",
  },
   {
    image: Kavin,
    name: "Kavin Gokul",
    role: "Program Lead",
    link: "https://www.linkedin.com/in/kavin-gokul-51735859/",
  },
    {
    image: sivakumar,
    name: "Sivakumar S",
    role: "Alumni Coordinator",
    link: "https://www.linkedin.com/in/dr-sivakumar-sadasivam-10834578/",
  },
  
  {
    image: padhmanand,
    name: "Padhmanand",
    role: "Lead - Academic Integration",
    link: "https://www.linkedin.com/in/padhmanand-sudhakar-1789a12a5/",
  }, 
  
  {
    image: sasikala,
    name: "Sasikala S",
    role: "Strategic Lead – Grants Operations",
    link: "https://www.linkedin.com/in/sasikala-s-aa644a76/",
  }, 

];

/* =======================
   MENTORS & ADVISORS DATA
======================= */
const mentorsData = [
    {
    image: saravanan,
    name: "Saravanan C",
    role: "Microcosm Senior Advisor - Agriculture & Smart City",
    link: "#",
  },
    {
    image: kiranlal,
    name: "Kiranlal S",
    role: "Startup Advisor",
    link: "#",
  },
     {
    image: preethi,
    name: "Preethi Meena",
    role: "NGO Coordinator",
    link: "#",
  },
  {
    image: suganthi,
    name: "Suganthi S T",
    role: "EEE - Electrical",
    link: "#",
  },
  {
    image: aswin,
    name: "Aswin Bharath",
    role: "Civil - Structural",
    link: "#",
  },
  {
    image: chitra,
    name: "Chitra S",
    role: "Civil - Environmental",
    link: "#",
  },
    {
    image: aravind,
    name: "Aravind S L ",
    role: "Mechanical",
    link: "#",
  },
 

];

export const People = () => {
  return (
    <div className="bg-white">
      <Ecosystem />

      {/* =======================
          CORE TEAM SECTION
      ======================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <span className="flex justify-center items-center text-2xl sm:text-3xl font-bold text-black tracking-wide mb-8 sm:mb-12">
          Core Team
        </span>     

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 place-items-center">
  {peopleData.map((person, index) => (
    <div
      key={index}
      className={`
        ${peopleData.length % 3 === 1 && index === peopleData.length - 1
          ? "lg:col-span-3 flex justify-center"
          : ""}
        ${peopleData.length % 3 === 2 && index >= peopleData.length - 2
          ? "lg:col-span-1"
          : ""}
      `}
    >
      <ImageCard
        image={person.image}
        name={person.name}
        role={person.role}
        link={person.link}
      />
    </div>
  ))}
</div>

      </section>

      {/* =======================
          MENTORS & ADVISORS SECTION
      ======================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        {/* Title */}
        <span className="flex justify-center items-center text-2xl sm:text-3xl font-bold text-black tracking-wide mb-3 sm:mb-4">
          Mentors & Advisors
        </span>

        {/* Short Description */}
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base leading-relaxed">
          Theme mentors from agriculture, inclusion, energy, sustainability, and more guide 
          fellows through field immersion, problem analysis, and solution design.
        </p>

        {/* Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 place-items-center">
  {mentorsData.map((person, index) => (
    <div
      key={index}
      className={`
        ${mentorsData.length % 3 === 1 && index === mentorsData.length - 1
          ? "lg:col-span-3 flex justify-center"
          : ""}
        ${mentorsData.length % 3 === 2 && index >= mentorsData.length - 2
          ? "lg:col-span-1"
          : ""}
      `}
    >
      <ImageCard
        image={person.image}
        name={person.name}
        role={person.role}
      />
    </div>
  ))}
</div>

      </section>

      {/* =======================
          FIELD & PARTNERS SECTION
      ======================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        {/* Title */}
        <span className="flex justify-center items-center text-2xl sm:text-3xl font-bold text-black tracking-wide mb-3 sm:mb-4">
          Field & Institutional Partners 
        </span>

        {/* Short Description */}
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base leading-relaxed">
          REACT works with a growing network of partners who provide authentic challenges and real contexts for implementation.
        </p>

        {/* Logo Loop */}
        <div className="overflow-hidden">
          <LogoLoop />
        </div>

      </section>
    </div>
  );
};
