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
  "Adbaker.png",
  "Afh.png",
  "Bolt.png",
  "Celv.png",
  "Cologne Watch.png",
  "Doo automation.png",
  "ECOMBEAT.png",
  "Flexx.png",
  "Madame Croissant.png",
  "Matcha Baby.png",
  "Nigela.png",
  "Pace.png",
  "THELUXO.png",
  "TheCreate.png",
  "dailynature.png",
  "milveo.png",
];

function Row({ logos, direction = 'left', durationSec = 45, rowId, size = 'md' }) {
  const marqueeRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const from = direction === 'left' ? 0 : -33.333333;
      const to   = direction === 'left' ? -33.333333 : 0;
      gsap.set(`.${rowId}`, { xPercent: from });
      tweenRef.current = gsap.to(`.${rowId}`, {
        xPercent: to,
        repeat: -1,
        duration: durationSec,
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
    ? 'h-24 sm:h-32 md:h-36 w-56 sm:w-72 md:w-80'
    : 'h-16 sm:h-20 md:h-24 w-40 sm:w-52 md:w-60';

  const content = (
    <div className="flex items-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6">
      {logos.map((logo, idx) => {
        const imgUrl = encodeURI(`/kunden-logos/${logo}`);
        return (
          <div
            key={idx}
            className={`relative ${sizeCls} flex-shrink-0 cursor-pointer pointer-events-auto group flex items-center justify-center p-1`}
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
          <Row logos={HERO_BRANDS} direction="left" durationSec={40} rowId="logo-marquee-hero" />
        </div>
      </div>
    );
  }

  // Row 1: prominent brands first, then half of the rest
  const row1Logos = [...BIG_BRANDS, ...REST.slice(0, 8)];
  // Row 2: the rest, interleaved with some big brands so they appear in both rows
  const row2Logos = [...REST.slice(8), ...BIG_BRANDS.slice(0, 5)];

  return (
    <div className={`hero-el w-full flex flex-col items-center mt-12 sm:mt-20 pt-8 sm:pt-12 relative z-10 ${hideBorder ? '' : 'border-t border-white/5'}`}>
      {title && (
        <span className="font-mono text-[11px] text-white tracking-widest mb-8 sm:mb-10">{title}</span>
      )}

      <div className="w-full flex flex-col gap-4 sm:gap-6 pb-8 sm:pb-12">
        <Row logos={row1Logos} direction="left"  durationSec={50} rowId="logo-marquee-row-1" size="lg" />
        <Row logos={row2Logos} direction="right" durationSec={55} rowId="logo-marquee-row-2" size="lg" />
      </div>
    </div>
  );
}
