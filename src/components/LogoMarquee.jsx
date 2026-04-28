import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Big / prominent brands come first so they sit in the first visible slide
const BIG_BRANDS = [
  "SNOCKS.png",
  "Hyatt .png",
  "KIA.png",
  "Klosterfrau.png",
  "frittenwerk.png",
  "hukcoburg.png",
  "Rosense.png",
  "bitterliebe.png",
  "prepmymeal.png",
];

const REST = [
  "afhgrau.png",
  "Bolt.png",
  "Celv.png",
  "Cologne Watch.png",
  "Doo automation.png",
  "ECOMBEAT.png",
  "Madame Croissant.png",
  "Matcha Baby.png",
  "Nigela.png",
  "Pace.png",
  "THELUXO.png",
  "dailynature.png",
  "milveo.png",
];

function Row({ logos, direction = 'left', durationSec = 45, rowId, size = 'md' }) {
  const marqueeRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Faster scroll on mobile — shortens perceived dead time on small screens
      const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      const effectiveDuration = isTouchDevice ? durationSec * 0.65 : durationSec;
      const from = direction === 'left' ? 0 : -33.333333;
      const to   = direction === 'left' ? -33.333333 : 0;
      gsap.set(`.${rowId}`, { xPercent: from });
      tweenRef.current = gsap.to(`.${rowId}`, {
        xPercent: to,
        repeat: -1,
        duration: effectiveDuration,
        ease: 'none',
      });

      // Velocity-boost on scroll allocates a fresh tween every frame and
      // chokes mobile Safari. Desktop only — and even there throttled to
      // a single in-flight decay tween.
      const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      if (isTouch) return;

      let decayTween = null;
      const scrollTrigger = ScrollTrigger.create({
        onUpdate: (self) => {
          if (!tweenRef.current) return;
          const velocity = Math.min(Math.abs(self.getVelocity()) / 200, 8);
          const boost = 1 + velocity;
          tweenRef.current.timeScale(boost);
          if (decayTween) return;
          decayTween = gsap.to(tweenRef.current, {
            timeScale: 1,
            duration: 0.9,
            ease: 'power2.out',
            overwrite: true,
            onComplete: () => { decayTween = null; },
          });
        },
      });

      return () => {
        scrollTrigger.kill();
        decayTween?.kill();
      };
    }, marqueeRef);
    return () => ctx.revert();
  }, [direction, durationSec, rowId]);

  const sizeCls = size === 'lg'
    ? 'h-20 sm:h-32 md:h-44 w-44 sm:w-72 md:w-96'
    : 'h-16 sm:h-24 md:h-28 w-36 sm:w-60 md:w-72';

  const content = (
    <div className="flex items-center gap-1 sm:gap-6 md:gap-10 px-1 sm:px-4">
      {logos.map((logo, idx) => {
        const imgUrl = encodeURI(`/kunden-logos/${logo}`);
        return (
          <div
            key={idx}
            className={`relative ${sizeCls} flex-shrink-0 cursor-pointer pointer-events-auto group flex items-center justify-center`}
          >
            <img
              src={imgUrl}
              alt="Client Logo"
              className="max-h-full max-w-full object-contain opacity-50 group-hover:opacity-0 transition-opacity duration-300"
            />
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
    <div
      ref={marqueeRef}
      className="w-full overflow-hidden relative pointer-events-auto"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <div className={`${rowId} flex w-max hover:[animation-play-state:paused]`}>
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}

// Hero: only these hand-picked brands on a single row
const HERO_BRANDS = [
  "Klosterfrau.png",
  "Hyatt .png",
  "Bolt.png",
  "prepmymeal.png",
  "bitterliebe.png",
  "SNOCKS.png",
];

export default function LogoMarquee({ title = "Brands we work with", hideBorder = false, variant = 'default' }) {
  if (variant === 'hero') {
    return (
      <div className={`hero-el w-full flex flex-col items-center mt-12 sm:mt-20 pt-8 sm:pt-12 relative z-10 ${hideBorder ? '' : 'border-t border-white/5'}`}>
        {title && (
          <span className="font-mono text-[11px] text-white tracking-widest mb-8 sm:mb-10">{title}</span>
        )}
        <div className="w-full pb-8 sm:pb-12">
          <Row logos={HERO_BRANDS} direction="left" durationSec={35} rowId="logo-marquee-hero" size="lg" />
        </div>
      </div>
    );
  }

  // Even split so both rows have the same width — combined with the same
  // durationSec, that means identical pixel-per-second speed across rows.
  const half = Math.ceil((BIG_BRANDS.length + REST.length) / 2);
  const allLogos = [...BIG_BRANDS, ...REST];
  const row1Logos = allLogos.slice(0, half);
  const row2Logos = allLogos.slice(half);

  return (
    <div className={`hero-el w-full flex flex-col items-center mt-12 sm:mt-20 pt-8 sm:pt-12 relative z-10 ${hideBorder ? '' : 'border-t border-white/5'}`}>
      {title && (
        <span className="font-mono text-[11px] text-white tracking-widest mb-8 sm:mb-10">{title}</span>
      )}

      <div className="w-full flex flex-col gap-4 sm:gap-6 pb-8 sm:pb-12">
        <Row logos={row1Logos} direction="left"  durationSec={50} rowId="logo-marquee-row-1" size="lg" />
        <Row logos={row2Logos} direction="right" durationSec={50} rowId="logo-marquee-row-2" size="lg" />
      </div>
    </div>
  );
}
