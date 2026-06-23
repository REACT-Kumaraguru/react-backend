import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-5 md:px-8 transition-all duration-500 ${
          scrolled ? "glass rounded-full" : ""
        }`}
        style={scrolled ? {} : { background: "transparent" }}
      >
        <div className="flex items-center justify-between py-2.5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative h-7 w-7">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--gradient-aqua)", filter: "blur(8px)", opacity: 0.7 }}
              />
              <div
                className="absolute inset-0 rounded-full border border-white/60"
                style={{ background: "var(--gradient-glass)", backdropFilter: "blur(10px)" }}
              />
            </div>
            <span className="text-display text-xl tracking-[0.3em] font-light">KHYORA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-9 text-[13px] text-foreground/70">
            <a href="#problem" className="hover:text-foreground transition-colors">Problem</a>
            <a href="#solution" className="hover:text-foreground transition-colors">Solution</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#science" className="hover:text-foreground transition-colors">Science</a>
            <a href="#impact" className="hover:text-foreground transition-colors">Impact</a>
          </nav>
          <a href="#solution" className="btn-glass !py-2 !px-5 !text-[13px]">
            Explore
          </a>
        </div>
      </div>
    </header>
  );
}
