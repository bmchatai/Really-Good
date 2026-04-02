import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LogoMarquee({ title = "Brands we work with", hideBorder = false }) {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Endless loop for the marquee
      // Since we duplicate the content 3 times, we moving -33.3333% perfectly loops it back to start
      gsap.to('.logo-marquee-inner', {
        xPercent: -33.333333,
        repeat: -1,
        duration: 45, // Adjust speed
        ease: 'none',
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  const logos = [
    "Adbaker.png",
    "Afh.png",
    "Bolt.png",
    "Celv.png",
    "Cologne Watch.png",
    "Doo automation.png",
    "ECOMBEAT.png",
    "Flexx.png",
    "Hyatt .png",
    "KIA.png",
    "Klosterfrau.png",
    "Madame Croissant.png",
    "Matcha Baby.png",
    "Nigela.png",
    "Pace.png",
    "Rosense.png",
    "SNOCKS.png",
    "THELUXO.png",
    "TheCreate.png",
    "bitterliebe.png",
    "dailynature.png",
    "frittenwerk.png",
    "hukcoburg.png",
    "milveo.png",
    "prepmymeal.png"
  ];

  const content = (
    <div className="flex items-center gap-16 sm:gap-24 md:gap-32 px-6 sm:px-10">
      {logos.map((logo, idx) => {
        // We use encodeURI to safely handle file names with spaces
        const imgUrl = encodeURI(`/kunden-logos/${logo}`);

        return (
          <div
            key={idx}
            className="relative h-24 sm:h-32 md:h-40 w-56 sm:w-80 md:w-96 flex-shrink-0 cursor-pointer pointer-events-auto group flex items-center justify-center p-1"
          >
            {/* Base image */}
            <img
              src={imgUrl}
              alt="Client Logo"
              className="max-h-full max-w-full object-contain opacity-40 group-hover:opacity-0 transition-opacity duration-300"
            />
            {/* Hover colorized mask */}
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
  );

  return (
    <div className={`hero-el w-full flex flex-col items-center mt-12 sm:mt-20 pt-8 sm:pt-12 relative z-10 ${hideBorder ? '' : 'border-t border-white/5'}`}>
      {title && (
        <span className="font-mono text-[11px] text-white tracking-widest mb-10 sm:mb-12">{title}</span>
      )}

      {/* Container with fade masks at edges */}
      <div
        ref={marqueeRef}
        className="w-full overflow-hidden relative pb-8 sm:pb-12 pointer-events-auto"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <div className="logo-marquee-inner flex w-max hover:[animation-play-state:paused]">
          {content}
          {content}
          {content}
        </div>
      </div>
    </div>
  );
}
