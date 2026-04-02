import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SocialProofBar() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple endless hardware accelerated loop
      gsap.to('.marquee-inner', {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: 'none',
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  const items = [
    "200+ BRANDS VERTRAUEN UNS",
    "5/5 STERNE AUS 45 BEWERTUNGEN",
    "57% ÜBER MARKTDURCHSCHNITT",
    "WEEKLY WINNING ADS",
  ];

  const content = (
    <div className="flex items-center gap-8 px-4 whitespace-nowrap">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-8">
          <span className="font-mono text-xs md:text-sm font-medium tracking-widest uppercase text-white/90">
            {item}
          </span>
          <span className="text-accent text-xs">◆</span>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={marqueeRef} className="w-full bg-black border-y border-white/5 py-4 overflow-hidden relative">
      <div className="marquee-inner flex w-[200%] md:w-max">
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}
