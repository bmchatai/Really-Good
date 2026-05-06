import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 rounded-full px-4 sm:px-6 py-1.5 flex items-center justify-between gap-4 w-[92%] max-w-5xl ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl border border-white/10 shadow-lg'
          : 'bg-transparent border border-transparent'
      }`}
    >
      <div className="flex items-center gap-1 sm:gap-2 origin-left scale-[1.7] sm:scale-[2] md:scale-[2.4]">
        <img
          src={encodeURI("/RG weiß.png")}
          alt="RG Logo"
          className="h-8 md:h-10 w-auto object-contain"
        />
        <img
          src={encodeURI("/ReelyGood weiß NEU.png")}
          alt="ReelyGood Logo"
          className="h-14 sm:h-16 md:h-20 w-auto object-contain scale-x-75 origin-left"
        />
      </div>

      <a
        href="https://form.typeform.com/to/dDmy0xtw"
        target="_blank"
        rel="noreferrer"
        className="group relative overflow-hidden bg-[#e6321c] text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full flex items-center gap-2 hover:scale-105 transition-transform duration-300 will-change-transform btn-red-glow"
      >
        <span className="relative z-10 flex items-center gap-2">
          Free Video sichern <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
      </a>
    </nav>
  );
}
