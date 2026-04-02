import React from 'react'
import ProjectCard from '../components/ProgrammesCom/ProjectCard'

export const Projects = () => {

  // Data for Field Projects Section
  const projectData = [
    {
      title: "Agriculture Innovation",
      imgageUrl: "https://img.freepik.com/free-photo/detail-rice-plant-sunset-valencia-with-plantation-out-focus-rice-grains-plant-seed_181624-25838.jpg?semt=ais_hybrid&w=740&q=80",
      tagline: "Optimizing the Agrarian Lifecycle",
      who: "Sulur, Hyderabad & Mysuru Clusters",
      duration: "Ongoing Field Testing",
      format: "Farmer-Partner Collaboration",
      description: "Developing precision water-flow systems and ergonomic post-harvest tools to address soil and market inefficiencies directly with farmer partners.",
      postedDate: "LATEST OUTCOME"
    },
    {
      title: "Health & Inclusion",
      tagline: "Design for Dignity & Independence",
      who: "Senjolai Trust, Coimbatore",
      duration: "Pilot Phase",
      format: "Co-creation / Assistive Tech",
      description: "Co-creating assistive devices and adaptive workspaces with individuals with spinal-cord injuries to restore economic independence and livelihoods.",
      postedDate: "IN REVIEW"
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
            Field Projects
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-slate-600 leading-relaxed">
            Explore our <span className="text-blue-600 font-semibold">field projects</span> where innovation meets real-world challenges. From agriculture to health & inclusion, discover how REACT is making a tangible difference.
          </p>
          <div className="mt-12 w-24 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        {/* --- FIELD PROJECTS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projectData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  )
}
