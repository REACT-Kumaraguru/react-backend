import React from 'react';
import { ArrowUpRight, MapPin, Calendar, Briefcase } from 'lucide-react';

const ProjectCard = ({ 
  title, 
  tagline, 
  who, 
  duration, 
  format, 
  description, 
  postedDate = "LATEST OUTCOME" 
}) => {
  return (
    <div className="relative group w-full max-w-[380px] font-poppins mx-auto">
      
      {/* 1. Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
      
      {/* 2. ID Card Body */}
      <div className="w-full bg-white rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
        
        {/* Top Header Section (The "Wave" Photo Area) */}
        <div className="relative h-39 bg-gradient-to-br from-blue-600 to-indigo-600 flex flex-col items-center justify-center overflow-hidden">
          {/* Decorative Slot for ID Lanyard */}
          <div className="absolute top-4 w-12 h-1.5 bg-white/30 rounded-full" />
          
          {/* Project Title / Icon in Photo Spot */}
          <div className="z-10 text-center px-4">
             <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mx-auto mb-3 border-2 border-white/50 flex items-center justify-center">
                <span className="text-3xl font-black text-white">{title.charAt(0)}</span>
             </div>
             <h3 className="text-white font-bold text-lg leading-tight tracking-tight">{title}</h3>
          </div>

          {/* Curved Wave Bottom (SVG) */}
          
        </div>

        {/* Info Section (Formatted like ID Fields) */}
        <div className="px-8 pb-8 pt-2  -mt-2">
          <div className="text-center mb-6">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">{postedDate}</p>
            <p className="text-slate-400 text-[11px] italic mt-1">{tagline}</p>
          </div>

          {/* ID Fields */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4">
              <MapPin size={16} className="text-blue-500" />
              <div>
                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Location / Who</p>
                <p className="text-xs font-bold text-slate-700">{who}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Calendar size={16} className="text-blue-500" />
              <div>
                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Duration</p>
                <p className="text-xs font-bold text-slate-700">{duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Briefcase size={16} className="text-blue-500" />
              <div>
                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Focus / Format</p>
                <p className="text-xs font-bold text-slate-700">{format}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 mb-6">
            <p className="text-[12px] leading-relaxed text-slate-500 text-center px-2 italic">
              "{description}"
            </p>
          </div>

          {/* Bottom Action (QR Code vibe) */}
          {/* <button className="w-full bg-slate-950 text-white text-[11px] font-black uppercase tracking-[0.2em] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-100">
            VIEW <ArrowUpRight size={14} />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;