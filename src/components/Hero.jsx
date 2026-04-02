import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Star } from 'lucide-react';
import InteractiveGrid from './InteractiveGrid';

const PHONE_STYLES = `
  .iphone-bezel {
    background-color: #111;
    box-shadow:
      inset 0 0 0 2px #52525B,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.9),
      0 15px 25px -5px rgba(0,0,0,0.7);
    transform-style: preserve-3d;
  }
  .hardware-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.15), inset 1px 0 2px rgba(0,0,0,0.8);
    border-left: 1px solid rgba(255,255,255,0.05);
  }
  .screen-glare {
    background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }
`;

import { Highlighter } from './magicui/highlighter';
import { Backlight } from './magicui/backlight';
import CountdownTimer from './CountdownTimer';
import LogoMarquee from './LogoMarquee';

export default function Hero() {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-el',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative w-full min-h-[100dvh] bg-black flex flex-col items-center justify-center pt-20 sm:pt-24 pb-12 px-4">

      {/* Background Interactive Grid – fixed to viewport height so it doesn't stretch with content */}
      <div className="absolute inset-x-0 top-0 h-[100dvh] overflow-hidden">
        <InteractiveGrid />
      </div>

      <div className="max-w-6xl w-full flex flex-col items-center text-center z-10 relative pointer-events-auto">
        
        {/* Trust Badges - Top Row */}
        <div className="hero-el flex flex-wrap justify-center items-center gap-3 mb-8">
          <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-accent/20 bg-card-surface shadow-accent-glow">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-accent-glow"></div>
            <span className="font-mono text-[11px] font-semibold text-accent tracking-wider uppercase">
              57% ÜBER MARKTDURCHSCHNITT
            </span>
          </div>
        </div>

        {/* Mobile Phone Mockup Overlay */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full">
          
          {/* Main Copy */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-3/5">
            <h1 className="hero-el font-druk text-[1.75rem] sm:text-[2rem] md:text-5xl lg:text-[3.5rem] leading-[1.0] lg:leading-[1.1] tracking-[-0.03em] uppercase mb-6 sm:mb-8 text-white">
              <Highlighter 
                action="underline" 
                color="#FFFFFF" 
                strokeWidth={3}
                animationDuration={1200}
                padding={4}
                className="mr-2 text-accent"
              >
                MESSBAR
              </Highlighter> MEHR<br />
              PROFIT DURCH<br />
              DIE RICHTIGEN<br />
              CREATIVES &<br />VIDEO ADS.
            </h1>

            <p className="hero-el font-sans text-base md:text-lg text-white max-w-xl font-normal leading-relaxed mb-8 sm:mb-10">
              Unsere Ads performen nachweislich <span className="text-accent">57% besser als der Marktdurchschnitt</span>. Also verschaffe dir einen Eindruck, wie eine Ad für dein Konzept aussehen sollte, wenn du richtige Ergebnisse willst.
            </p>

            <div className="hero-el flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group w-full sm:w-auto">
                {/* Glowing Aura behind button */}
                <div className="absolute inset-0 bg-[#e6321c] rounded-full blur-2xl opacity-40 animate-pulse-glow" />
                
                <a
                  href="https://form.typeform.com/to/dDmy0xtw"
                  target="_blank"
                  rel="noreferrer"
                  className="relative overflow-hidden bg-[#e6321c] text-white font-bold text-sm md:text-base px-8 py-4 min-h-[52px] rounded-full flex items-center gap-3 hover:scale-105 transition-transform duration-300 will-change-transform shadow-[0_0_30px_rgba(230,50,28,0.3)] pointer-events-auto w-full sm:w-auto justify-center z-10"
                >
                  <span className="relative z-10 text-white">In 30 Sekunden zum Free Video!</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </a>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
                <span className="text-[11px] text-white mt-1 uppercase tracking-widest font-medium">5/5 durch 45 Bewertungen</span>
              </div>
            </div>
          </div>

          <div className="hero-el w-[240px] sm:w-[260px] md:w-[280px] shrink-0 order-first lg:order-last pointer-events-auto">
            <style dangerouslySetInnerHTML={{ __html: PHONE_STYLES }} />
            <div className="transition-transform duration-700 ease-out hover:scale-105 flex justify-center w-full">
              <div className="relative w-full aspect-[280/580] rounded-[2.5rem] sm:rounded-[3rem] iphone-bezel flex flex-col">
                {/* Hardware Buttons */}
                <div className="absolute top-[20%] -left-[2px] sm:-left-[3px] w-[2px] sm:w-[3px] h-[4%] hardware-btn rounded-l-md z-0" />
                <div className="absolute top-[27%] -left-[2px] sm:-left-[3px] w-[2px] sm:w-[3px] h-[8%] hardware-btn rounded-l-md z-0" />
                <div className="absolute top-[37%] -left-[2px] sm:-left-[3px] w-[2px] sm:w-[3px] h-[8%] hardware-btn rounded-l-md z-0" />
                <div className="absolute top-[29%] -right-[2px] sm:-right-[3px] w-[2px] sm:w-[3px] h-[12%] hardware-btn rounded-r-md z-0" style={{ transform: 'scaleX(-1)' }} />

                {/* Screen */}
                <div className="absolute inset-[5px] sm:inset-[7px] bg-black rounded-[2.2rem] sm:rounded-[2.5rem] overflow-hidden z-10">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src="/Wir sind ReelyGood.mov" type="video/mp4" />
                    <source src="/Wir sind ReelyGood.mov" type="video/quicktime" />
                  </video>
                  <div className="absolute inset-0 screen-glare z-10 pointer-events-none" />

                  {/* Dynamic Island */}
                  <div className="absolute top-[5px] sm:top-[8px] left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[24px] sm:h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-2 sm:px-3" style={{ boxShadow: 'inset 0 -1px 2px rgba(255,255,255,0.1)' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" style={{ boxShadow: '0 0 8px rgba(34,197,94,0.8)' }} />
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] sm:w-[120px] h-[3px] sm:h-[4px] bg-white/20 rounded-full z-50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Logo Marquee */}
        <LogoMarquee />


           {/* VSL Video with interactive backlight glow */}
           <div className="w-full max-w-4xl mt-4 relative">
             <Backlight blur={40} className="relative z-10">
               <video
                 className="w-full rounded-2xl shadow-2xl border border-white/10"
                 controls
                 playsInline
                 preload="metadata"
               >
                 <source src="/VSL final (RG, Full HD).mp4" type="video/mp4" />
               </video>
             </Backlight>
           </div>
           
           {/* Evergreen Countdown Timer */}
           <CountdownTimer />

           {/* Bekannt Aus Section */}
           <div className="w-full max-w-4xl mt-16 sm:mt-24 flex flex-col items-center pointer-events-auto px-6 z-10">
             <div className="w-full flex flex-col items-start">
               <span className="font-bold text-xs sm:text-sm text-white/70 tracking-wider mb-6 lg:mb-8 lowercase">bekannt aus:</span>
               <div className="flex flex-wrap md:flex-nowrap justify-between items-center w-full gap-8 sm:gap-6 opacity-50 hover:opacity-100 transition-opacity duration-500">
                 {['welt.png', 'dmax.png', 'sport1.png', 'sky.png', 'n24.png', 'mtv.png'].map((logo, idx) => (
                   <div 
                     key={idx} 
                     className="h-6 sm:h-8 md:h-10 w-[40%] md:w-auto flex items-center justify-start md:justify-center grayscale hover:grayscale-0 transition-all duration-300"
                   >
                     {/* Render image. The user needs to place files in /public/bekannt-aus/ */}
                     <img 
                       src={`/bekannt-aus/${logo}`} 
                       alt={logo.split('.')[0]} 
                       className="max-h-full max-w-full object-contain"
                       aria-label={`Logo of ${logo.split('.')[0]}`}
                     />
                   </div>
                 ))}
               </div>
             </div>
           </div>

           {/* 200+ Brands & Marquee Section */}
           <div className="w-full mt-24 sm:mt-32 flex flex-col items-center text-center z-10 pointer-events-auto px-4">
             <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed max-w-3xl mb-10 md:mb-12">
               <span className="text-accent font-bold">200+ Brands</span> haben unser Testvideo genutzt, um zu sehen, wie<br className="hidden md:block"/> wir aus Produkten verkaufsstarke Video Ads machen –<br className="hidden md:block"/> kostenfrei.
             </p>
             <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed max-w-3xl mb-4 md:mb-8">
               <span className="text-accent font-bold">Finde jede Woche neue Winning Ads</span> und lasse<br className="hidden md:block"/> deinen Shop durch konstantes Testing von Ad Creatives wachsen.
             </p>
             
             {/* Logo Marquee without title/border */}
             <div className="w-screen max-w-[100vw] overflow-hidden">
               <LogoMarquee title={null} hideBorder={true} />
             </div>
           </div>

      </div>
    </section>
  );
}
