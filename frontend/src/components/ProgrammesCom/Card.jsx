import { Link } from "react-router-dom";
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Card = ({ 
  title, 
  tagline, 
  who, 
  duration, 
  format, 
  description, 
  ctaText = "Apply as a Student",
  comingSoon = false,
  link
}) => {
  return (
    <div className="relative group max-w-4xl w-full font-poppins">

      {/* 🔖 Coming Soon Badge */}
      {comingSoon && (
        <div className="absolute top-6 right-6 z-10 bg-slate-200 text-slate-700 text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow">
          Coming Soon
        </div>
      )}
      
      {/* Background Glow */}
      <div className={`
        absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-[2.5rem] blur-2xl 
        transition-opacity duration-500 -z-10
        ${comingSoon ? "opacity-10" : "opacity-0 group-hover:opacity-30"}
      `} />

      {/* Main Card */}
      <div className={`
        w-full rounded-[2.5rem] p-8 backdrop-blur-md border shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]
        ${comingSoon
          ? "bg-slate-50/90 border-dashed border-slate-300"
          : "bg-white/90 border-slate-100 hover:bg-white/100"}
      `}>
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-6">
          <div>
            <h2 className={`text-2xl font-bold tracking-tight leading-none transition-colors duration-300
              ${comingSoon ? "text-slate-500" : "text-slate-900 group-hover:text-blue-600"}
            `}>
              {title}
            </h2>
            <p className="text-sm text-blue-600 font-medium italic mt-2 tracking-wide">
              {tagline}
            </p>
          </div>

          <button className="text-slate-400 hover:text-slate-900 hover:bg-slate-50 p-2 rounded-full transition-all">
            <ChevronDown size={24} className="group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left */}
          <div className="flex-shrink-0 space-y-3 w-full lg:w-1/2">
            <div className="flex gap-3">
              <div className="bg-slate-50/80 p-4 rounded-2xl flex-1 border border-slate-100 group-hover:border-blue-100 transition-colors">
                <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest mb-1">Who</p>
                <p className="text-sm font-semibold text-slate-700 leading-tight">{who}</p>
              </div>
              <div className="bg-slate-50/80 p-4 rounded-2xl w-36 border border-slate-100 group-hover:border-blue-100 transition-colors">
                <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest mb-1">Duration</p>
                <p className="text-sm font-semibold text-slate-700 leading-tight">{duration}</p>
              </div>
            </div>
            
            <div className="bg-slate-50/80 p-4 rounded-2xl w-full border border-slate-100 group-hover:border-blue-100 transition-colors">
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest mb-1">Format</p>
              <p className="text-sm font-semibold text-slate-700 leading-tight">{format}</p>
            </div>
          </div>

          {/* Right */}
          <div className="lg:w-1/2 flex items-center">
            <p className="text-sm leading-relaxed text-slate-600 font-medium italic lg:not-italic">
              {description}
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
{/* CTA Buttons */}
<div className="flex flex-wrap gap-4 mt-10">

  {/* Primary CTA */}
  {link && !comingSoon ? (
    <Link
      to={link}
      className={`
        text-[11px] font-bold uppercase tracking-widest py-4 px-10 rounded-2xl transition-all active:scale-95 shadow-lg
        bg-slate-950 text-white hover:bg-blue-600 hover:shadow-blue-200
      `}
    >
      {ctaText} →
    </Link>
  ) : (
    <button
      disabled
      className={`
        text-[11px] font-bold uppercase tracking-widest py-4 px-10 rounded-2xl
        bg-slate-200 text-slate-500 cursor-not-allowed shadow-none
      `}
    >
      {comingSoon ? "Coming Soon" : `${ctaText} →`}
    </button>
  )}
</div>

      </div>
    </div>
  );
};

export default Card;
