export function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--gradient-deep)", color: "var(--pearl)" }}>
      <div aria-hidden className="absolute inset-0 opacity-30" style={{
        background: "radial-gradient(ellipse at 50% 0%, oklch(0.5 0.1 200 / 0.6), transparent 60%)",
      }} />
      <div className="relative mx-auto max-w-6xl px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full" style={{ background: "var(--gradient-aqua)", boxShadow: "0 0 30px var(--aqua)" }} />
              <span className="text-display text-2xl tracking-[0.3em]">KHYORA</span>
            </div>
            <p className="mt-6 text-pearl/65 text-sm max-w-md leading-relaxed">
              A flushable, fully biodegradable sanitary napkin engineered to dissolve into
              biomass — restoring dignity to disposal, and ease to the planet.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-pearl/40 mb-4">Contact</div>
            <ul className="space-y-2 text-sm text-pearl/75">
              <li>info@khyora.com</li>
              <li>+91 99761 39198</li>
              <li>Coimbatore, India</li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-pearl/40 mb-4">Explore</div>
            <ul className="space-y-2 text-sm text-pearl/75">
              <li><a href="#solution" className="hover:text-pearl">Solution</a></li>
              <li><a href="#science" className="hover:text-pearl">Science</a></li>
              <li><a href="#impact" className="hover:text-pearl">Impact</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-pearl/40 mb-4">Connect</div>
            <ul className="space-y-2 text-sm text-pearl/75">
              <li><a href="#" className="hover:text-pearl">Instagram</a></li>
              <li><a href="#" className="hover:text-pearl">LinkedIn</a></li>
              <li><a href="#" className="hover:text-pearl">X / Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-pearl/45 max-w-xl">
            Sustainability statement: KHYORA is engineered for full biodegradation,
            replacing persistent plastic with cellulose-based bio-superabsorbents
            for a closed natural cycle.
          </p>
          <p className="text-xs text-pearl/40">© {new Date().getFullYear()} KHYORA · All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
