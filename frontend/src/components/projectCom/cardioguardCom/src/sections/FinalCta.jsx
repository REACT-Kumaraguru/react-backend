import { Leaf } from 'lucide-react';

export default function FinalCta() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container mx-auto max-w-5xl px-5 text-center">
        <div className="reveal mx-auto rounded-lg border border-sage/20 bg-white/75 p-8 shadow-soft backdrop-blur md:p-14">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-cream text-green-deep shadow-glow">
            <Leaf size={30} />
          </div>
          <h2 className="text-4xl font-semibold leading-tight text-ink md:text-7xl">
            Precision Farming Starts From the Seed.
          </h2>
          <div className="spectral-card mx-auto mt-9 max-w-3xl">
            <span /><span /><span /><span />
          </div>
          <a className="btn-primary mx-auto mt-9 w-fit" href="mailto:hello@seedvision.ai">
            Transform Agriculture with AI
          </a>
        </div>
      </div>
    </section>
  );
}
