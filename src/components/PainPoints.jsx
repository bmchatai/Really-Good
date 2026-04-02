import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pains = [
  "fehlende Creative Prozesse",
  "keine Ressourcen, um frische Inhalte zu generieren",
  "keine Zeit für Kreativität",
  "kein Know-How, welche Formate funktionieren",
];

export default function PainPoints() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pain-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.pain-list',
            start: 'top 80%',
          }
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="py-16 md:py-32 px-4 bg-black w-full flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="font-druk text-[2rem] sm:text-4xl md:text-5xl lg:text-5xl uppercase tracking-[-0.02em] text-white leading-[1.1] mb-8 md:mb-12">
            Wir wissen, dass du folgende Pain Points hast:
          </h2>
          
          <ul className="pain-list space-y-6 mb-12">
            {pains.map((pain, i) => (
              <li key={i} className="pain-item flex items-center gap-4 text-text-secondary font-sans text-base md:text-xl font-medium">
                <div className="w-8 h-8 rounded-full bg-error-red/10 border border-error-red/20 flex items-center justify-center shrink-0">
                  <X className="w-4 h-4 text-error-red" />
                </div>
                {pain}
              </li>
            ))}
          </ul>
          
          <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-accent/10 border border-accent/20">
            <p className="font-sans text-base md:text-xl text-white font-medium leading-relaxed">
              Neue Winning Ads zu finden war noch nie so einfach - und doch so herausfordernd für E-Com Brands und Diensleister. Unser erfahrenes Performance-Team, geleitet von unserem Creative Strategist, entwickelt und testet hochkonvertierende Anzeigen, die konstant Ergebnisse liefern.
            </p>
          </div>
        </div>
        
        {/* Right: Error Dashboard Mockup */}
        <div className="w-full lg:w-1/2">
          <div className="bg-card-surface border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-error-red to-orange-500"></div>
            
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs text-text-secondary tracking-widest uppercase">Ad Account Status</span>
              <div className="px-3 py-1 rounded-full bg-error-red/10 border border-error-red/20 text-error-red font-mono text-xs font-semibold animate-pulse">
                FATIGUE DETECTED
              </div>
            </div>
            
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-white/50">Creative V{i+1}</span>
                    <span className="text-error-red">ROAS &darr;</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-error-red/50 rounded-full" style={{ width: `${60 - i * 15}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="font-sans text-sm text-text-secondary">Average CPA</span>
              <span className="font-mono text-2xl text-white">+142%</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
