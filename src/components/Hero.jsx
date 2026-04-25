import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Star } from 'lucide-react';
import InteractiveGrid from './InteractiveGrid';
import AnimatedBackground from './AnimatedBackground';

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
import MagneticButton from './MagneticButton';

export default function Hero() {
  const container = useRef(null);
  const heroVideoRef = useRef(null);

  // Pause the iPhone-mockup video when the hero scrolls out of view so it
  // stops chewing up the H.264 decoder + memory while the user reads further
  // sections. Restart on re-entry.
  useLayoutEffect(() => {
    const vid = heroVideoRef.current;
    if (!vid || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.play().catch(() => { /* ignore autoplay rejection */ });
        } else {
          vid.pause();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(vid);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered text/badge entrance for other elements
      gsap.fromTo(
        '.hero-el',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );

      // Letter-by-letter roll-in for the main headline
      gsap.fromTo(
        '.hero-char',
        { y: '110%', opacity: 0, rotateX: -90 },
        {
          y: '0%',
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power4.out',
          delay: 0.2, // sync with other elements
        }
      );

      // Phone mockup: dramatic fly-in from bottom-right with slight rotation
      gsap.fromTo(
        '.hero-phone',
        { y: 120, x: 40, opacity: 0, rotateY: -18, rotateZ: 4, scale: 0.88 },
        {
          y: 0,
          x: 0,
          opacity: 1,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          duration: 1.4,
          ease: 'power4.out',
          delay: 0.5,
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  // Helper to split text into chars for animation
  const splitToChars = (text) => {
    return text.split('').map((char, cIdx) => (
      <span key={cIdx} className="hero-char inline-block" style={{ transformOrigin: 'bottom', transformStyle: 'preserve-3d' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section ref={container} className="relative w-full min-h-[100dvh] bg-black flex flex-col items-center justify-center pt-36 sm:pt-40 lg:pt-44 pb-12 px-4">

      {/* Background InteractiveGrid – fixed to viewport height so it doesn't stretch with content */}
      <div className="absolute inset-x-0 top-0 h-[100dvh] overflow-hidden">
        <InteractiveGrid />
      </div>

      {/* Animated teal background — covers the scroll content below the first viewport
          (Bekannt aus / 200+ Brands marquee). Starts where InteractiveGrid ends. */}
      <div className="pointer-events-none absolute inset-x-0 top-[100dvh] bottom-0 overflow-hidden">
        <AnimatedBackground />
      </div>

      <div className="max-w-6xl w-full flex flex-col items-center text-center z-10 relative pointer-events-none">
        
        {/* Mobile Phone Mockup Overlay */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full">
          
          {/* Main Copy */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-3/5 pointer-events-none">
            <h1 className="hero-el-header font-druk text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.0] lg:leading-[1.1] tracking-[-0.03em] uppercase mb-6 sm:mb-8 text-white pointer-events-auto overflow-hidden">
              <span className="inline-block overflow-hidden align-bottom">
                <Highlighter
                  action="underline"
                  color="#FFFFFF"
                  strokeWidth={3}
                  animationDuration={1200}
                  padding={4}
                  loop
                  loopDelay={1800}
                  className="mr-2 text-accent inline-block"
                >
                  {splitToChars("MESSBAR")}
                </Highlighter>
              </span>
              <span className="inline-block overflow-hidden align-bottom">
                {splitToChars(" MEHR")}
              </span>
              <br />
              <span className="inline-block overflow-hidden align-bottom mt-2 lg:mt-3">
                {splitToChars("PROFIT DURCH")}
              </span>
              <br />
              <span className="inline-block overflow-hidden align-bottom mt-2 lg:mt-3">
                {splitToChars("DIE RICHTIGEN")}
              </span>
              <br />
              <span className="inline-block overflow-hidden align-bottom mt-2 lg:mt-3">
                {splitToChars("CREATIVES &")}
              </span>
              <br />
              <span className="inline-block overflow-hidden align-bottom mt-2 lg:mt-3">
                {splitToChars("VIDEO ADS.")}
              </span>
            </h1>

            <p className="hero-el font-sans text-base md:text-lg text-white max-w-xl font-normal leading-relaxed mb-8 sm:mb-10 pointer-events-auto">
              Unsere Ads performen nachweislich <span className="text-accent">57% besser als der Marktdurchschnitt</span>. Also verschaffe dir einen Eindruck, wie eine Ad für dein Konzept aussehen sollte, wenn du richtige Ergebnisse willst.
            </p>

            <div className="hero-el flex flex-col sm:flex-row items-center gap-6 pointer-events-auto">
              <MagneticButton className="relative group w-auto">
                {/* Glowing Aura behind button */}
                <div className="absolute inset-0 bg-[#e6321c] rounded-full blur-2xl opacity-40 animate-pulse-glow" />
                <a
                  href="https://form.typeform.com/to/dDmy0xtw"
                  target="_blank"
                  rel="noreferrer"
                  className="relative overflow-hidden bg-[#e6321c] text-white font-bold text-sm md:text-base px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] sm:min-h-[52px] rounded-full inline-flex items-center gap-3 transition-transform duration-300 will-change-transform btn-red-glow pointer-events-auto w-auto justify-center z-10"
                >
                  <span className="relative z-10 text-white">In 30 Sekunden zum Free Video!</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </a>
              </MagneticButton>
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

          <div className="hero-phone w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] shrink-0 order-last mt-4 lg:mt-0 pointer-events-auto" style={{ perspective: '1000px' }}>
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
                    ref={heroVideoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src="/Wir sind Reelygood.mp4" type="video/mp4" />
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
        <div className="pointer-events-auto w-full">
          <LogoMarquee variant="hero" />
        </div>

        {/* VSL Video with interactive backlight glow */}
        <div className="w-full max-w-4xl mt-4 relative pointer-events-auto">
          <Backlight blur={40} className="relative z-10">
            <div className="w-full rounded-2xl shadow-2xl border border-white/10 overflow-hidden aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/wR-WBaD1MqA"
                title="ReelyGood VSL"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Backlight>
        </div>
        
        {/* CTA direkt unter VSL */}
        <div className="pointer-events-auto w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <MagneticButton className="relative group w-auto">
            <div className="absolute inset-0 bg-[#e6321c] rounded-full blur-2xl opacity-40 animate-pulse-glow" />
            <a
              href="https://form.typeform.com/to/dDmy0xtw"
              target="_blank"
              rel="noreferrer"
              className="relative overflow-hidden bg-[#e6321c] text-white font-bold text-base md:text-lg px-8 sm:px-10 py-3.5 sm:py-4 min-h-[52px] sm:min-h-[56px] rounded-full inline-flex items-center gap-3 transition-transform duration-300 will-change-transform btn-red-glow w-auto justify-center z-10"
            >
              <span className="relative z-10 text-white">In 30 Sekunden zum Free Video!</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </MagneticButton>
        </div>

        {/* Countdown Timer */}
        <div className="pointer-events-auto w-full mt-8">
          <CountdownTimer />
        </div>

        {/* Bekannt Aus Section - Direct and Massive */}
        <div className="w-full max-w-6xl mt-20 sm:mt-32 flex flex-col items-center pointer-events-auto px-4 z-10">
          <div className="w-full flex flex-col items-center">
            <span className="font-sans text-sm sm:text-base md:text-lg text-white/50 tracking-[0.3em] uppercase mb-12 sm:mb-16 font-bold text-center">
              Bekannt aus
            </span>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row place-items-center justify-items-center lg:justify-center items-center w-full gap-x-8 gap-y-16 sm:gap-16 md:gap-24 opacity-70 hover:opacity-100 transition-opacity duration-500">
              {['welt.png', 'dmax.png', 'sport1.png', 'sky.png', 'n24.png', 'mtv.png'].map((logo, idx) => {
                const imgUrl = `/bekannt-aus/${logo}`;
                return (
                  <div
                    key={idx}
                    className="relative h-20 sm:h-24 md:h-28 lg:h-32 w-44 sm:w-56 md:w-64 lg:w-72 mx-auto flex items-center justify-center group transition-transform duration-300 hover:scale-110"
                  >
                    {/* Base white image — fades out on hover */}
                    <img
                      src={imgUrl}
                      alt={logo.split('.')[0]}
                      className="max-h-full max-w-full object-contain filter brightness-0 invert opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                      aria-label={`Featured on ${logo.split('.')[0]}`}
                    />
                    {/* Accent-colored silhouette via mask — fades in on hover */}
                    <div
                      className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        WebkitMaskImage: `url('${imgUrl}')`,
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskImage: `url('${imgUrl}')`,
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                      }}
                    />
                  </div>
                );
              })}
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
