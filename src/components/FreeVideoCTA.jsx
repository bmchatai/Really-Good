import { ArrowRight, Star } from 'lucide-react';

export default function FreeVideoCTA() {
  return (
    <section className="py-20 md:py-40 px-4 w-full flex flex-col items-center relative overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-dark-surface z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,215,191,0.15)_0%,rgba(10,10,10,1)_70%)] z-0"></div>
      
      <div className="max-w-3xl w-full flex flex-col items-center text-center relative z-10">
        
        {/* Trust Element */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>
          <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
            5/5 Sterne aus 45+ Google-Bewertungen
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-druk text-[2rem] sm:text-4xl md:text-5xl lg:text-[4rem] uppercase leading-[1.1] tracking-[-0.02em] text-white mb-6 md:mb-8">
          WAS SPRICHT GEGEN<br />EIN KOSTENLOSES<br />VIDEO?
        </h2>
        
        {/* Subline */}
        <p className="font-sans text-base md:text-xl text-white/80 leading-relaxed font-light max-w-2xl mb-8 md:mb-12">
          Im Grunde genommen spricht nichts dagegen.<br/><br/>
          Du bekommst nicht nur ein kostenloses Video, sondern erhältst einen Einblick, wie man es schafft, JEDES Produkt zielgruppengerecht zu positionieren.
        </p>

        {/* CTA Button */}
        <a
          href="https://form.typeform.com/to/dDmy0xtw"
          target="_blank"
          rel="noreferrer"
          className="group relative overflow-hidden bg-[#e6321c] text-white font-bold text-base md:text-xl px-8 md:px-10 py-4 md:py-5 min-h-[56px] rounded-full flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300 will-change-transform shadow-[0_0_30px_rgba(230,50,28,0.3)] mb-12 md:mb-20 w-full sm:w-auto"
        >
          <span className="relative z-10 flex items-center gap-2">
            In 30 Sekunden zum Free Video!
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
        </a>



      </div>
    </section>
  );
}
