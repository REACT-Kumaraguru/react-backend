import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-sage/15 bg-white py-10">
      <div className="container mx-auto flex max-w-7xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between">
        <div>
          <strong className="text-xl text-ink">SeedVision</strong>
          <p className="mt-2 text-sm text-muted">AI-Powered Papaya Seed Classification & Automated Sorting</p>
        </div>
        <div className="flex items-center gap-3 text-muted">
          <a className="footer-icon" href="mailto:hello@seedvision.ai" aria-label="Email"><Mail size={18} /></a>
          <a className="footer-icon" href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a className="footer-icon" href="#" aria-label="Twitter"><Twitter size={18} /></a>
          <a className="footer-icon" href="#" aria-label="GitHub"><Github size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
