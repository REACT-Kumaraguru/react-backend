import React, { useRef, useState, useEffect } from "react";
import {
  Beaker,
  Globe,
  Leaf,
  Wind,
  Trash2,
  Droplets,
} from "lucide-react";

const BRAND = "#8f5d5d";

export const KhyoraMain = () => {
  // ===== Section Refs =====
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const contactRef = useRef(null);

  // ===== Navbar Scroll State =====
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===== Smooth Scroll Function (FIXED) =====
  const scrollToSection = (ref) => {
    if (!ref.current) return;

    const navbarOffset = 100;
    const elementPosition =
      ref.current.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: elementPosition - navbarOffset,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#fdf9f9] text-[#3b2b2b] font-serif">

      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-[#fdf9f9] shadow-sm" : "bg-transparent"
        }`}
      >
        {/* Shiny animated background */}
        <div 
          className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: 'shimmer 3s infinite',
              transform: 'translateX(-100%)',
            }}
          />
        </div>
        
        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>

        <div
          className={`relative max-w-7xl mx-auto px-6 py-6 flex justify-between items-center ${
            scrolled ? "text-[#3b2b2b]" : "text-white"
          }`}
        >
          <span className="tracking-[0.3em] text-xs uppercase font-medium">
            KHYORA
          </span>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-10 text-[11px] tracking-widest uppercase opacity-90">
            <span
              className="cursor-pointer hover:opacity-100 transition-all duration-200 hover:scale-105"
              onClick={() => scrollToSection(problemRef)}
            >
              Why?
            </span>
            <span
              className="cursor-pointer hover:opacity-100 transition-all duration-200 hover:scale-105"
              onClick={() => scrollToSection(solutionRef)}
            >
              How?
            </span>
            <span className="cursor-pointer hover:opacity-100 transition-all duration-200 hover:scale-105">Impact</span>
            <span
              className="cursor-pointer hover:opacity-100 transition-all duration-200 hover:scale-105"
              onClick={() => scrollToSection(contactRef)}
            >
              Contact
            </span>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden transition-transform duration-200 hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 transition-all duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden bg-[#fdf9f9] border-t border-[#8f5d5d]/20 overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col px-6 py-4 space-y-4 text-[11px] tracking-widest uppercase text-[#3b2b2b]">
            <span
              className="cursor-pointer hover:opacity-70 py-2 transition-opacity"
              onClick={() => {
                scrollToSection(problemRef);
                setMobileMenuOpen(false);
              }}
            >
              Why?
            </span>
            <span
              className="cursor-pointer hover:opacity-70 py-2 transition-opacity"
              onClick={() => {
                scrollToSection(solutionRef);
                setMobileMenuOpen(false);
              }}
            >
              How?
            </span>
            <span 
              className="cursor-pointer hover:opacity-70 py-2 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              Impact
            </span>
            <span
              className="cursor-pointer hover:opacity-70 py-2 transition-opacity"
              onClick={() => {
                scrollToSection(contactRef);
                setMobileMenuOpen(false);
              }}
            >
              Contact
            </span>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #8f5d5d 0%, #b07a7a 50%, #6e4444 100%)",
          }}
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
          <span className="block text-xs tracking-[0.4em] uppercase mb-6 opacity-90">
            The Future of Menstrual Care
          </span>

          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6">
            <span className="block tracking-[0.25em] text-white/50">
              REDEFINING
            </span>
            <span className="italic">menstrual hygiene</span>
          </h1>

          <p className="font-sans max-w-xl mx-auto text-base md:text-lg opacity-95 mb-10">
            Khyora creates biodegradable, flushable sanitary pads designed for
            comfort, dignity, and a cleaner planet.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 font-sans">
            <button
              className="px-10 py-4 bg-white text-[#8f5d5d] rounded-full text-xs tracking-widest uppercase font-medium hover:scale-105 transition"
              onClick={() => scrollToSection(problemRef)}
            >
              Discover Khyora
            </button>
            <button
              className="px-10 py-4 border border-white/50 rounded-full text-xs tracking-widest uppercase font-medium hover:bg-white/10 transition"
              onClick={() => scrollToSection(solutionRef)}
            >
              Learn the Science
            </button>
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <div className="w-px h-16 mx-auto mb-10 bg-[#8f5d5d]/40" />
        <p className="text-2xl md:text-3xl italic font-light text-[#6b4a4a]">
          "Menstrual care should never compromise hygiene, dignity, or the
          environment."
        </p>
      </section>

      {/* ================= PROBLEM ================= */}
      <section ref={problemRef} className="py-24 px-6 bg-[#f7eeee]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <span
              className="font-sans uppercase tracking-widest text-xs font-bold mb-4 block"
              style={{ color: BRAND }}
            >
              01 — The Problem
            </span>
            <h2 className="text-4xl font-light mb-6">
              The Hidden Burden of Sanitary Waste
            </h2>
            <p className="font-sans text-[#6b4a4a]">
              Plastic-based pads create disposal stress, environmental harm,
              and sanitation challenges.
            </p>
          </div>

          <div className="space-y-10 font-sans">
            <div>
              <h4 className="flex items-center gap-3 text-lg font-medium mb-3">
                <Trash2 size={20} /> Environmental Impact
              </h4>
              <p className="text-sm text-[#7a5a5a]">
                Conventional pads take centuries to decompose and clog drains.
              </p>
            </div>

            <div className="p-6 border bg-white/70 italic text-[#6b4a4a]">
              "Menstrual waste is a hygiene, dignity, and environmental issue."
            </div>
          </div>
        </div>
      </section>

      {/* ================= SOLUTION ================= */}
      <section ref={solutionRef} className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] bg-[#f2e6e6] flex items-center justify-center">
            <Droplets size={80} className="text-[#8f5d5d]/40" />
          </div>

          <div>
            <span
              className="font-sans uppercase tracking-widest text-xs font-bold mb-4 block"
              style={{ color: BRAND }}
            >
              02 — Our Solution
            </span>
            <h2 className="text-4xl font-light italic mb-6">
              Gentle on You, Gentle on Earth
            </h2>
            <p className="font-sans text-[#6b4a4a] mb-8">
              Khyora pads use plant-based fibers that safely disintegrate in water
              while staying soft and absorbent.
            </p>

            <ul className="space-y-5 font-sans text-sm">
              {[
                "100% plastic-free layers",
                "Flushable & biodegradable",
                "Dermatologically gentle",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: BRAND }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= LAYERS ================= */}
      <section className="py-24 px-6 bg-[#8f5d5d] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-light italic mb-16">
            Designed for Safe Disintegration
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[Wind, Beaker, Leaf].map((Icon, i) => (
              <div key={i} className="space-y-4 opacity-90">
                <Icon size={32} />
                <h4 className="text-lg">
                  {["Top Sheet", "Absorbent Core", "Back Layer"][i]}
                </h4>
                <p className="text-sm font-sans opacity-80">
                  Plant-based materials engineered for hygiene and comfort.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GLOBAL ================= */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <Globe size={60} className="text-[#8f5d5d]" />
          <div>
            <h2 className="text-4xl font-light mb-4">
              Made in India, For Every Woman
            </h2>
            <p className="font-sans text-[#6b4a4a]">
              Khyora represents India's step toward sustainable menstrual care.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section ref={contactRef} className="py-20 px-6 bg-[#f7eeee]">
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="font-sans uppercase tracking-widest text-xs font-bold mb-4 block"
            style={{ color: BRAND }}
          >
            Get in Touch
          </span>
          <h2 className="text-4xl font-light mb-12">Contact Us</h2>
          
          <div className="grid md:grid-cols-2 gap-8 font-sans text-[#6b4a4a]">
            <div className="bg-white/70 p-8 rounded-lg">
              <h3 className="text-sm uppercase tracking-wider font-medium mb-4" style={{ color: BRAND }}>
                Phone
              </h3>
              <a 
                href="tel:+919976139198" 
                className="text-lg hover:opacity-70 transition"
              >
                +91 99761 39198
              </a>
            </div>

            <div className="bg-white/70 p-8 rounded-lg">
              <h3 className="text-sm uppercase tracking-wider font-medium mb-4" style={{ color: BRAND }}>
                Email
              </h3>
              <div className="space-y-2">
                <a 
                  href="mailto:subhaharinivg@gmail.com" 
                  className="block text-sm hover:opacity-70 transition"
                >
                  subhaharinivg@gmail.com
                </a>
                <a 
                  href="mailto:subhaharini.22ft@kct.ac.in" 
                  className="block text-sm hover:opacity-70 transition"
                >
                  subhaharini.22ft@kct.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 text-center text-[10px] tracking-widest uppercase font-sans text-[#8f5d5d]/70">
        © 2026 Khyora · Sustainable Menstrual Care
      </footer>
    </div>
  );
};