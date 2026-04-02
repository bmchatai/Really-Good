import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for the big statement
      const words = document.querySelectorAll('.power-word');
      
      gsap.fromTo(
        words,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.manifesto-container',
            start: 'top 70%',
          }
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative w-full py-20 md:py-40 bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
          alt="Abstract dark texture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      <div className="manifesto-container max-w-5xl w-full px-4 relative z-10 flex flex-col items-center text-center">
        
        {/* Neutral Statement */}
        <p className="font-sans text-base md:text-xl text-text-secondary max-w-3xl leading-relaxed mb-10 md:mb-16 italic font-light">
          Die meisten Agenturen liefern Content. Schöne Videos. Hübsche Bilder. Aber ohne Strategie, ohne Daten, ohne Ergebnis.
        </p>

        {/* Power Statement */}
        <h2 className="font-druk text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] uppercase leading-[1.1] tracking-[-0.02em] text-white flex flex-wrap justify-center gap-x-4 gap-y-2">
          {['WIR', 'LIEFERN'].map((word, i) => (
            <span key={i} className="power-word inline-block">{word}</span>
          ))}
          <span className="power-word inline-block text-accent text-gradient ml-2">WINNING ADS.</span>
        </h2>
        
      </div>
    </section>
  );
}
