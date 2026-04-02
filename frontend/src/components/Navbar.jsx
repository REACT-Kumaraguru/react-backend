import React, { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "People", path: "/people" },
    { name: "Programmes", path: "/programmes" },
    { name: "Projects", path: "/projects" },
    { name: "Why India?", path: "/why-india?" },
    { name: "Explore Us", path: "/explore-us" },
    { name: "Work With Us", path: "/work" },
    { name: "Contact", path: "/contact" }
  ];

  // Helper function to handle active link styling
  const activeStyle = ({ isActive }) =>
    `relative transition-all duration-200 hover:text-black ${isActive
      ? "text-black font-bold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-black"
      : "text-gray-500 font-medium"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 font-[Arial,sans-serif]">
      <div
        className={`
          flex items-center justify-between transition-all duration-500 ease-in-out
          ${isScrolled
            ? 'mt-4 w-[95%] max-w-7xl rounded-full border border-black/5 bg-white/70 backdrop-blur-xl shadow-xl px-6 py-3'
            : 'w-full rounded-none border-b border-black/5 bg-white/70 backdrop-blur-2xl px-8 py-6'
          }
        `}
      >

        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <div className="flex h-10 w-auto items-center justify-center">
            <img src={Logo} alt="Logo" width={80} height={70} className=" object-contain brightness-0" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] uppercase tracking-widest">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={activeStyle}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Action + Hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
  <Link to="/solve4purpose">
    <button
      className="
        hidden lg:block
        bg-[#FF4D4D]
        text-white
        font-bold
        px-8 py-3
        rounded-xl
        transition-all
        duration-300
        shadow-md
        hover:shadow-[6px_6px_0px_#1E293B]
        hover:-translate-x-1
        hover:-translate-y-1
        active:translate-x-0
        active:translate-y-0
        active:shadow-md
      "
    >
      SOLVE 4 PURPOSE
    </button>
  </Link>



          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden rounded-full border border-black/10 p-2 hover:bg-black hover:text-white transition-all"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-black/10 shadow-xl transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center py-6 gap-5 text-sm uppercase tracking-widest font-medium text-black">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-black font-bold scale-110" : "text-gray-500"
              }
            >
              {item.name}
            </NavLink>
          ))}

          <Link
            to="/solve4purpose"
            onClick={() => setIsOpen(false)}
            className="mt-3 inline-block"
          >
            <button
              className="
                px-8 py-3
                text-sm font-bold
                text-white
                bg-black
                rounded-xl
                transition-all duration-300
                shadow-md
                hover:bg-[#FF4D4D]
                hover:shadow-[6px_6px_0px_#1E293B]
                hover:-translate-x-1
                hover:-translate-y-1
                active:translate-x-0
                active:translate-y-0
                active:shadow-md
              "
            >
              Solve 4 Purpose
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};