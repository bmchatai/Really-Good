import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

const navLinks = ['Leistungen', 'Case Studies', 'Prozess', 'FAQ'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 rounded-full px-4 sm:px-6 py-3 flex items-center justify-between gap-4 md:gap-16 w-[92%] max-w-5xl ${
          scrolled || menuOpen
            ? 'bg-black/70 backdrop-blur-xl border border-white/10 shadow-lg'
            : 'bg-transparent border border-transparent'
        }`}
      >
        <div className="flex items-center">
          <span className="font-druk font-bold text-lg tracking-tight uppercase">
            ReelyGood
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-medium text-white/80 hover:text-accent transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <a
            href="https://form.typeform.com/to/dDmy0xtw"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex group relative overflow-hidden bg-gradient-accent text-black font-semibold text-sm px-6 py-2.5 rounded-full items-center gap-2 hover:scale-105 transition-transform duration-300 will-change-transform"
          >
            <span className="relative z-10 flex items-center gap-2">
              Free Video sichern <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
          </a>

          {/* Mobile CTA (compact) */}
          <a
            href="https://form.typeform.com/to/dDmy0xtw"
            target="_blank"
            rel="noreferrer"
            className="md:hidden bg-gradient-accent text-black font-semibold text-xs px-4 py-2 rounded-full whitespace-nowrap"
          >
            Free Video
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[99] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              onClick={() => setMenuOpen(false)}
              className="font-druk text-3xl uppercase tracking-tight text-white hover:text-accent transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="https://form.typeform.com/to/dDmy0xtw"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-4 bg-gradient-accent text-black font-bold text-base px-8 py-4 rounded-full flex items-center gap-2"
          >
            Free Video sichern <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      )}
    </>
  );
}
