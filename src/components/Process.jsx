import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'Creative Audit', desc: 'Analyse deiner bestehenden Creatives und Ad-Performance.', icon: '🔍' },
  { num: '02', title: 'Produkt- und Marktanalyse', desc: 'Tiefes Verständnis deiner Zielgruppe und Wettbewerber.', icon: '📊' },
  { num: '03', title: 'Creative Strategy', desc: 'Datengetriebene Strategie für maximale Performance.', icon: '🧠' },
  { num: '04', title: 'Konzepte und Skripte', desc: 'Hooks, Storylines und Skripte die konvertieren.', icon: '✍️' },
  { num: '05', title: 'Content Shooting', desc: 'Professionelle Produktion mit unserem Kreativteam.', icon: '🎥' },
  { num: '06', title: 'Erster Creativewurf', desc: 'Erstes fertiges Creative zur Freigabe.', icon: '🚀' },
  { num: '07', title: 'Datenanalyse KPIs', desc: 'Performance-Tracking und Analyse aller Metriken.', icon: '📈' },
  { num: '08', title: 'Iterationen bauen', desc: 'Daten-basierte Optimierung für noch bessere Results.', icon: '🔄' },
];

export default function Process() {
  const container = useRef(null);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    let ctx;
    
    if (isDesktop) {
      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray('.process-card');
        
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return; // Skip last card

          gsap.to(card, {
            scale: 0.92,
            filter: 'blur(12px)',
            opacity: 0.4,
            yPercent: -5,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 15%',
              end: 'bottom top',
              scrub: true,
              pin: true,
              pinSpacing: false,
            }
          });
        });
        
        // Pin the last card briefly
        ScrollTrigger.create({
          trigger: cards[cards.length - 1],
          start: 'top 15%',
          end: '+=50%',
          pin: true,
        });
        
      }, container);
    }
    
    return () => {
      if (ctx) ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="prozess" ref={container} className="py-16 md:py-32 px-4 bg-black w-full flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12 md:mb-24 relative">
          <h2 className="font-druk text-4xl md:text-5xl uppercase tracking-[-0.02em] inline-block relative text-center">
            Mit diesem Framework bauen<br/>wir weekly Winning Ads:
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-full shadow-accent-glow"></div>
          </h2>
        </div>

        <div className="process-wrapper flex flex-col gap-8 lg:gap-0 lg:h-auto">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`process-card w-full lg:min-h-[70vh] flex items-center justify-center lg:sticky lg:top-[15vh] z-${10 + idx}`}
            >
              <div className="w-full bg-card-surface border border-accent-base rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-16 flex flex-col md:flex-row gap-6 md:gap-8 items-center shadow-xl">
                
                <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                  <span className="font-mono text-8xl md:text-9xl font-bold text-accent opacity-20 relative">
                    {step.num}
                    <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-100 mix-blend-overlay">
                      {step.icon}
                    </div>
                  </span>
                </div>
                
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <h3 className="font-sans font-semibold text-2xl md:text-4xl text-white mb-4 md:mb-6">{step.title}</h3>
                  <p className="font-sans text-base md:text-xl text-text-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
