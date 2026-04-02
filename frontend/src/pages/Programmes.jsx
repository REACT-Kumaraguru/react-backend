import React from 'react'
import Card from '../components/ProgrammesCom/Card'
import { useNavigate } from "react-router-dom";


export const Programmes = () => {

  const navigate = useNavigate();
  // Professional Educational Copy for Main Programs
  const programData = [
    {
      title: "REACT Fellowship",
      tagline: "Bridging the Gap Between Classroom and Community",
      who: "Undergraduate & Postgraduate Students",
      duration: "6 Months (Credit-Aligned)",
      format: "Hybrid: Academic Modules + Field Immersion",
      description: "An intensive residency designed for students to tackle systemic challenges using proprietary innovation tools. Earn an 18-credit equivalent through real-world discovery.",
      ctaText: "Apply as Student",
      comingSoon: false,
      link: "/fellowship"
    },
    {
      title: "REACT Globe Fellow",
      tagline: "The World as Your Living Laboratory",
      who: "Graduates & Early-Career Professionals",
      duration: "6–12 Months",
      format: "Global Immersive / Hybrid",
      description: "An advanced leadership track for international innovators. Embed within rural enterprises to act as system-thinkers, bridging grassroots practice with global policy research.",
      ctaText: "Apply as Professional",
      comingSoon: false
    },
    {
      title: "REACT Volunteering Fellow",
      tagline: "Operational Excellence for Social Impact",
      who: "Aspiring Leaders & Recent Graduates",
      duration: "6 Months",
      format: "Hybrid / On-Site",
      description: "The strategic engine of the REACT movement. Master the documentation, analytics, and operational design required to scale large-scale educational and community-impact systems.",
      ctaText: "Closed",
      comingSoon: true
    },
    {
      title: "REACT Citizen Fellow",
      tagline: "Hyper-Local Action, Global Mentorship",
      who: "Educators, Entrepreneurs & Lifelong Learners",
      duration: "3–6 Months",
      format: "Online / Hybrid (Flexible)",
      description: "A flexible track to innovate within your own workplace. Use REACT tools like PULSE and Infinity WHY to design scalable solutions supported by global mentors.",
      ctaText: "Closed ",
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-32 pb-20 px-6 relative overflow-hidden font-poppins">

      {/* --- BACKGROUND ORBITS & GLOWS --- */}
      <div className="absolute top-[5%] left-[-10%] w-[800px] h-[800px] border border-slate-100 rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] border border-blue-50 rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-50/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* --- HERO SECTION --- */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)] mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-slate-950">
            REACT Programs
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-slate-600 leading-relaxed">
            Choose your path to create <span className="text-blue-600 font-semibold"> real-world impact</span>. Whether you're a student, graduate, professional, or global citizen — there's a place for you in the REACT movement.
          </p>
          <div className="mt-12 w-24 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        {/* --- MAIN PROGRAMS GRID (2 Columns) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {programData.map((prog, index) => (
            <Card key={index} {...prog} />
          ))}
        </div>
      </div>
    </div>
  )
}