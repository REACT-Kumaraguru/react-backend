import { ArrowUpRight, Leaf } from 'lucide-react'
import { navItems } from '../utils/content'

export function NavBar() {
  return (
    <header className="fixed left-0 right-0 top-4 z-40 px-4">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-charcoal/10 bg-[#fffaf0]/75 px-3 pl-5 shadow-soft backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-charcoal">
          <span className="grid size-8 place-items-center rounded-full bg-olive/12 text-olive">
            <Leaf size={16} />
          </span>
          Therbel
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-full px-3 py-2 text-sm text-muted transition hover:bg-white/70 hover:text-charcoal"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#cta"
          className="inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-terracotta"
        >
          Deploy
          <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  )
}
