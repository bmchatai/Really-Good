import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from './AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    author: 'Christopher Nitsch',
    role: 'Marketing Director',
    company: 'Klosterfrau',
    logo: '/kunden-logos/Klosterfrau.png',
    text: 'Sehr professionelle Arbeitsweise und grandiose Ergebnisse. Wenn Sie einen starken Partner in Fragen Content für Social Media suchen, sind Sie hier an der richtigen Adresse!',
    stars: 5,
  },
  {
    author: 'Jonas Noyon',
    role: 'Co-Founder',
    company: 'Prepmymeal GmbH',
    logo: '/kunden-logos/prepmymeal.png',
    avatar: '/Jonas von Prepmymeal.jpeg',
    text: 'Es entstehen monatlich neue Winner Creatives für uns — die Ideen sowie Kreativität von ReelyGood ist beeindruckend. Wir empfehlen ReelyGood wärmstens weiter.',
    stars: 5,
  },
  {
    author: 'Hyatt Regency',
    role: 'Marketing Team',
    company: 'Hyatt Regency Köln',
    logo: '/kunden-logos/Hyatt .png',
    text: 'Ein ausgesprochen nettes Team! Die Qualität der Zusammenarbeit und Kommunikation war ausgezeichnet und wir sind mit dem erstellten Content sehr zufrieden. Gerne wieder!',
    stars: 5,
  },
  {
    author: 'Frittenwerk',
    role: 'Geschäftsführung',
    company: 'Frittenwerk Deutschland',
    logo: '/kunden-logos/frittenwerk.png',
    text: 'Ein tolles Team, was schnell und zuverlässig ist. Sie bieten eine hohe Qualität von Videos an und setzen Feedback sehr gut um!',
    stars: 5,
  },
  {
    author: 'THELUXO',
    role: 'Brand Team',
    company: 'THELUXO',
    logo: '/kunden-logos/THELUXO.png',
    text: 'Die Videos sind nicht einfach „nur" professionell – sie transportieren genau das Gefühl und die Botschaft, die man sich wünscht. Dazu kommt, dass die Zusammenarbeit richtig Spaß macht, weil man sich einfach wohlfühlt.',
    stars: 5,
  },
  {
    author: 'Nigela',
    role: 'Founder',
    company: 'Nigela',
    logo: '/kunden-logos/Nigela.png',
    text: 'Fantastische Zusammenarbeit! Die Videos haben unsere Erwartungen weit übertroffen und direkt messbare Ergebnisse geliefert.',
    stars: 5,
  },
];

/* Split into two rows for the dual-marquee */
const row1 = [...testimonials, ...testimonials];
const row2 = [...[...testimonials].reverse(), ...[...testimonials].reverse()];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#2FD7BF">
          <path d="M7 1l1.56 3.21 3.44.5-2.5 2.44.59 3.42L7 8.77l-3.09 1.8.59-3.42L2 4.71l3.44-.5z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t }) {
  return (
    <div
      className="tst-card shrink-0 w-[min(80vw,360px)] sm:w-[350px] md:w-[380px] rounded-2xl flex flex-col mx-3 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, rgba(30,30,30,1) 0%, rgba(18,18,18,1) 100%)',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
      }}
    >
      {/* Logo area — full-width, prominent */}
      <div
        className="w-full flex items-center justify-center px-6 py-10 md:py-12"
        style={{
          background: 'rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          minHeight: 160,
        }}
      >
        <img
          src={t.logo}
          alt={t.company}
          className="w-auto object-contain"
          style={{
            height: 110,
            maxWidth: 300,
            filter: 'brightness(0) invert(1)',
            opacity: 0.95,
          }}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Stars */}
        <Stars count={t.stars} />

        {/* Quote */}
        <p className="font-sans text-[13px] md:text-sm text-white/60 leading-relaxed flex-1 mb-6">
          "{t.text}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {t.avatar ? (
            <img
              src={encodeURI(t.avatar)}
              alt={t.author}
              className="w-8 h-8 rounded-full object-cover shrink-0"
              style={{ border: '1px solid rgba(47,215,191,0.35)' }}
              loading="lazy"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-mono text-[10px] font-bold text-accent"
              style={{ background: 'rgba(47,215,191,0.1)', border: '1px solid rgba(47,215,191,0.2)' }}
            >
              {t.author.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-sans text-xs font-semibold text-white/75 leading-none mb-0.5">{t.author}</p>
            <p className="font-mono text-[10px] text-white/30 tracking-wide">{t.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef       = useRef(null);
  const row1Ref          = useRef(null);
  const row2Ref          = useRef(null);
  const raf1Ref          = useRef(null);
  const pos1Ref          = useRef(0);
  const pos2Ref          = useRef(0);
  const pos2InitRef      = useRef(false); // tracks whether row2 start offset was set
  const pausedRef        = useRef(false);

  /* ── Infinite marquee via RAF (no CSS animation — fully controllable) ─── */
  useEffect(() => {
    const speed = 0.45; // px per frame

    const tick = () => {
      if (pausedRef.current) {
        raf1Ref.current = requestAnimationFrame(tick);
        return;
      }
      const el1 = row1Ref.current;
      const el2 = row2Ref.current;
      if (!el1 || !el2) { raf1Ref.current = requestAnimationFrame(tick); return; }

      const halfW1 = el1.scrollWidth / 2;
      const halfW2 = el2.scrollWidth / 2;

      // Row 2 must start at -halfW2 so it scrolls rightward without a gap
      if (!pos2InitRef.current) {
        pos2Ref.current = -halfW2;
        pos2InitRef.current = true;
      }

      // Row 1: scrolls left
      pos1Ref.current -= speed;
      if (Math.abs(pos1Ref.current) >= halfW1) pos1Ref.current = 0;

      // Row 2: scrolls right — resets when it reaches 0 (back to -halfW2)
      pos2Ref.current += speed;
      if (pos2Ref.current >= 0) pos2Ref.current = -halfW2;

      el1.style.transform = `translateX(${pos1Ref.current}px)`;
      el2.style.transform = `translateX(${pos2Ref.current}px)`;

      raf1Ref.current = requestAnimationFrame(tick);
    };

    raf1Ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf1Ref.current);
  }, []);

  /* ── GSAP scroll animations ──────────────────────────────────────────── */
  useEffect(() => {
    const TOGGLE = 'play reverse play reverse';
    const ctx = gsap.context(() => {

      /* Badge */
      gsap.fromTo('.tst-badge',
        { opacity: 0, y: 16, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: TOGGLE } }
      );

      /* Headline words flip up / back */
      gsap.fromTo('.tst-word',
        { y: '108%', opacity: 0, rotateX: -65 },
        {
          y: '0%', opacity: 1, rotateX: 0,
          duration: 0.7, ease: 'power4.out', stagger: 0.055,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: TOGGLE },
        }
      );

      /* Subline */
      gsap.fromTo('.tst-sub',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', toggleActions: TOGGLE } }
      );

      /* Marquee rows fade + slide in */
      gsap.fromTo('.tst-row-1',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.tst-marquee-wrap', start: 'top 88%', toggleActions: TOGGLE } }
      );
      gsap.fromTo('.tst-row-2',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: '.tst-marquee-wrap', start: 'top 88%', toggleActions: TOGGLE } }
      );

      /* Pause marquee when out of view */
      ScrollTrigger.create({
        trigger: '.tst-marquee-wrap',
        start: 'top bottom',
        end: 'bottom top',
        onEnter:     () => { pausedRef.current = false; },
        onLeave:     () => { pausedRef.current = true; },
        onEnterBack: () => { pausedRef.current = false; },
        onLeaveBack: () => { pausedRef.current = true; },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = ['Was', 'sagen', 'Kunden', 'zu', 'ReelyGood?'];

  return (
    <section ref={sectionRef} id="testimonials" className="relative overflow-hidden pt-24 pb-28 md:pt-32 md:pb-36" style={{ background: '#050505' }}>

      <AnimatedBackground />

      {/* ── Background: Hero-style grid + glows ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Ambient teal glow — top center, like hero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(900px,120vw)] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(47,215,191,0.18) 0%, transparent 65%)' }} />

        {/* Secondary glow — bottom left */}
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(47,215,191,0.08) 0%, transparent 70%)' }} />

        {/* Flat grid — same line style as hero grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(47,215,191,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(47,215,191,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Glowing dots at grid intersections */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(47,215,191,0.9) 1.5px, transparent 2px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Scanline sweep — same as hero */}
        <div
          className="tst-scanline absolute inset-x-0 h-[60%]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(47,215,191,0.04) 50%, transparent 100%)',
          }}
        />

        {/* Vignette — fades grid at edges so cards stay focus */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #050505 80%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #050505 0%, transparent 12%, transparent 88%, #050505 100%)' }} />
      </div>

      <style>{`
        @keyframes tstScanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(250%); }
        }
        .tst-scanline { animation: tstScanline 10s linear infinite; }
      `}</style>

      {/* Edge fades for marquee */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 z-10"
        style={{ background: 'linear-gradient(to right, #000 0%, transparent 100%)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 z-10"
        style={{ background: 'linear-gradient(to left, #000 0%, transparent 100%)' }} />

      <div className="relative z-10">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="text-center mb-14 md:mb-20 px-5">
          <div className="tst-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7"
            style={{ background: 'rgba(47,215,191,0.07)', border: '1px solid rgba(47,215,191,0.18)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse block"
              style={{ boxShadow: '0 0 6px 2px rgba(47,215,191,0.6)' }} />
            <span className="font-mono text-[11px] text-accent uppercase tracking-[0.28em]">Kundenstimmen</span>
          </div>

          <h2
            className="font-druk text-[clamp(2rem,7vw,3.75rem)] uppercase tracking-[-0.02em] leading-[1.05] text-white mb-5"
            style={{ perspective: '600px', perspectiveOrigin: '50% 50%' }}
          >
            {headline.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0">
                <span
                  className={`tst-word inline-block will-change-transform${word === 'ReelyGood?' ? ' text-accent' : ''}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <p className="tst-sub font-sans text-sm md:text-base text-white/30 max-w-xs mx-auto leading-relaxed">
            Echte Ergebnisse. Echte Worte.
          </p>
        </div>

        {/* ── Dual marquee ─────────────────────────────────────────────────── */}
        <div className="tst-marquee-wrap flex flex-col gap-6 overflow-x-hidden py-4">
          {/* Row 1 — left */}
          <div className="tst-row-1 flex">
            <div ref={row1Ref} className="flex will-change-transform">
              {row1.map((t, i) => <Card key={i} t={t} />)}
            </div>
          </div>

          {/* Row 2 — right */}
          <div className="tst-row-2 flex">
            <div ref={row2Ref} className="flex will-change-transform">
              {row2.map((t, i) => <Card key={i} t={t} />)}
            </div>
          </div>
        </div>

        {/* ── Trust bar ────────────────────────────────────────────────────── */}
        <div className="mt-14 md:mt-18 flex flex-col items-center gap-3 px-5">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 14 14" fill="#2FD7BF">
                <path d="M7 1l1.56 3.21 3.44.5-2.5 2.44.59 3.42L7 8.77l-3.09 1.8.59-3.42L2 4.71l3.44-.5z" />
              </svg>
            ))}
          </div>
          <p className="font-mono text-[11px] text-white/25 uppercase tracking-[0.25em] text-center">
            5,0 · 50+ Kunden · 100% Weiterempfehlung
          </p>
        </div>

      </div>
    </section>
  );
}
