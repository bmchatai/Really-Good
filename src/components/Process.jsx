import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import AnimatedBackground from './AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'Creative Audit',          desc: 'Wir sezieren deine bestehenden Ads — was skaliert, was verbrennt Budget.',      tag: 'Analyse'    },
  { num: '02', title: 'Produkt- & Marktanalyse', desc: 'Zielgruppe, Pain Points, Wettbewerber — wir kennen deinen Markt besser als du.', tag: 'Research'   },
  { num: '03', title: 'Creative Strategy',        desc: 'Datengetriebene Strategie — kein Bauchgefühl, nur gewinnende Formeln.',          tag: 'Strategie'  },
  { num: '04', title: 'Konzepte & Skripte',       desc: 'Scroll-stoppende Hooks und Storylines, die Menschen zum Kaufen bringen.',        tag: 'Konzept'    },
  { num: '05', title: 'Content Shooting',          desc: 'Professionelle Produktion mit unserem Kreativteam — alles aus einer Hand.',     tag: 'Produktion' },
  { num: '06', title: 'Erster Creativewurf',      desc: 'Fertiges Creative zur Freigabe — bereit für den Live-Test auf deinem Account.',  tag: 'Lieferung'  },
  { num: '07', title: 'Datenanalyse KPIs',        desc: 'Wir lesen die Zahlen — CPM, CTR, ROAS — und wissen sofort was als nächstes.',   tag: 'Data'       },
  { num: '08', title: 'Iterationen bauen',         desc: 'Winner skalieren, Loser killen — Woche für Woche besser werdende Results.',     tag: 'Optimierung'},
];

/* SVG Checkmark that draws itself */
function AnimatedCheck({ checkRef }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
      {/* Circle */}
      <circle cx="11" cy="11" r="10" stroke="rgba(47,215,191,0.2)" strokeWidth="1.5" />
      <circle
        ref={el => { if (checkRef) checkRef.circleRef = el; }}
        cx="11" cy="11" r="10"
        stroke="#2FD7BF"
        strokeWidth="1.5"
        strokeDasharray="63"
        strokeDashoffset="63"
        strokeLinecap="round"
        style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
      />
      {/* Check path */}
      <path
        ref={el => { if (checkRef) checkRef.pathRef = el; }}
        d="M6.5 11.5 L9.5 14.5 L15.5 8.5"
        stroke="#2FD7BF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="14"
        strokeDashoffset="14"
      />
    </svg>
  );
}

/* The vertical line segment between two steps */
function ConnectorLine({ lineRef }) {
  return (
    <div className="flex justify-center" style={{ height: 40 }}>
      <div className="relative w-px" style={{ height: 40 }}>
        <div className="absolute inset-0 bg-white/[0.06]" />
        <div
          ref={lineRef}
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent to-accent/40"
          style={{ height: 0 }}
        />
      </div>
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef(null);
  /* Store refs to check SVG pieces and connector lines */
  const checkRefs  = useRef(steps.map(() => ({ circleRef: null, pathRef: null })));
  const lineRefs   = useRef(steps.map(() => null));

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px), (hover: none) and (pointer: coarse)').matches;
    const ctx = gsap.context(() => {

      // On mobile native scroll, scrub-based ScrollTriggers stutter (especially
      // during iOS momentum). Use plain play-on-enter so steps reliably appear.
      const TOGGLE = isMobile ? 'play none none none' : 'play reverse play reverse';

      /* ── 1. CINEMATIC HEADER ─────────────────────────────────────────────── */
      gsap.fromTo('.prc-badge',
        { opacity: 0, y: 18, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: TOGGLE } }
      );

      /* Each word flips up — and flips back down on scroll up */
      gsap.fromTo('.prc-word',
        { y: '105%', opacity: 0, rotateX: -70 },
        {
          y: '0%', opacity: 1, rotateX: 0,
          duration: 0.75, ease: 'power4.out', stagger: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: TOGGLE },
        }
      );

      gsap.fromTo('.prc-sub',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', toggleActions: TOGGLE } }
      );

      /* ── 2. STEP CARDS + CHECKMARKS ──────────────────────────────────────── */
      steps.forEach((_, i) => {
        const card    = sectionRef.current.querySelector(`.prc-card-${i}`);
        const numEl   = sectionRef.current.querySelector(`.prc-num-${i}`);
        const tagEl   = sectionRef.current.querySelector(`.prc-tag-${i}`);
        const titleEl = sectionRef.current.querySelector(`.prc-title-${i}`);
        const descEl  = sectionRef.current.querySelector(`.prc-desc-${i}`);
        const lineEl  = lineRefs.current[i];
        const { circleRef, pathRef } = checkRefs.current[i];

        /* Card slides up / back down — drop the blur on mobile (cheap GPU + safer) */
        gsap.fromTo(card,
          isMobile
            ? { opacity: 0, y: 24 }
            : { opacity: 0, y: 32, filter: 'blur(3px)' },
          isMobile
            ? { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: TOGGLE } }
            : { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: TOGGLE } }
        );

        /* Number + tag */
        gsap.fromTo([numEl, tagEl],
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05,
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: TOGGLE } }
        );

        /* Title clip reveal */
        gsap.fromTo(titleEl,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.65, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 86%', toggleActions: TOGGLE } }
        );

        /* Desc */
        gsap.fromTo(descEl,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 84%', toggleActions: TOGGLE } }
        );

        /* Checkmark — scrub on desktop, plain play-once on mobile */
        if (circleRef && pathRef) {
          if (isMobile) {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
            });
            tl.to(circleRef, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' })
              .to(pathRef,   { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' }, '-=0.1');
          } else {
            ScrollTrigger.create({
              trigger: card,
              start: 'top 78%',
              end:   'top 55%',
              scrub: 0.8,
              onUpdate(self) {
                const p = self.progress;
                const circleProg = Math.min(1, p / 0.7);
                const checkProg  = Math.max(0, (p - 0.7) / 0.3);
                circleRef.style.strokeDashoffset = 63 * (1 - circleProg);
                pathRef.style.strokeDashoffset   = 14 * (1 - checkProg);
              },
            });
          }
        }

        /* Connector line — scrub on desktop, play-once on mobile */
        if (lineEl && i < steps.length - 1) {
          if (isMobile) {
            gsap.fromTo(lineEl,
              { height: 0 },
              { height: 40, duration: 0.45, ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' } }
            );
          } else {
            ScrollTrigger.create({
              trigger: card,
              start: 'top 68%',
              end:   'top 48%',
              scrub: 0.6,
              onUpdate(self) {
                lineEl.style.height = `${self.progress * 40}px`;
              },
            });
          }
        }
      });

      /* ── 3. QUOTE BLOCK ──────────────────────────────────────────────────── */
      gsap.fromTo('.prc-quote-block',
        { opacity: 0, y: 28, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.prc-quote-block', start: 'top 88%', toggleActions: TOGGLE } }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = ['Mit', 'diesem', 'Framework', 'bauen', 'wir', 'weekly', 'Winning', 'Ads'];

  return (
    <section ref={sectionRef} id="prozess" className="bg-black relative overflow-hidden pt-24 pb-32 md:pt-36 md:pb-44">

      <AnimatedBackground />

      {/* ── Extra cinematic noise on top of animated base ─────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px 200px' }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5 sm:px-6 md:max-w-2xl lg:max-w-3xl">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-14 md:mb-20">
          {/* Badge */}
          <div className="prc-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(47,215,191,0.07)', border: '1px solid rgba(47,215,191,0.18)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-accent block" style={{ boxShadow: '0 0 6px 2px rgba(47,215,191,0.6)' }} />
            <span className="font-mono text-[11px] text-accent uppercase tracking-[0.28em]">Unser 8-Stufen-Framework</span>
          </div>

          {/* Headline — each word clips up */}
          <h2 className="font-druk text-[clamp(2rem,7vw,3.75rem)] uppercase tracking-[-0.02em] leading-[1.05] text-white mb-6" style={{ perspective: '600px', perspectiveOrigin: '50% 50%' }}>
            {headline.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0">
                <span
                  className={`prc-word inline-block will-change-transform ${word === 'Winning' ? 'text-accent' : ''}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <p className="prc-sub font-sans text-sm md:text-base text-white/30 max-w-sm mx-auto leading-relaxed">
            Jede Woche. Jeder Schritt. Kein Zufall.
          </p>
        </div>

        {/* ── Steps ──────────────────────────────────────────────────────────── */}
        <div className="flex flex-col">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <div key={i}>
                {/* Card */}
                <div className={`prc-card-${i} relative rounded-2xl overflow-hidden`}
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>

                  {/* Top accent bar — thin */}
                  <div className="absolute top-0 inset-x-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(47,215,191,0.35), transparent)' }} />

                  <div className="p-5 sm:p-6 flex items-start gap-4">

                    {/* Left: check */}
                    <div className="shrink-0 mt-0.5">
                      <AnimatedCheck checkRef={checkRefs.current[i]} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className={`prc-num-${i} font-mono text-[11px] font-bold text-white/15 tabular-nums`}>
                          {step.num}
                        </span>
                        <span className={`prc-tag-${i} font-mono text-[10px] uppercase tracking-[0.22em] px-2 py-0.5 rounded-full`}
                          style={{ color: 'rgba(47,215,191,0.6)', background: 'rgba(47,215,191,0.07)', border: '1px solid rgba(47,215,191,0.12)' }}>
                          {step.tag}
                        </span>
                      </div>
                      <h3 className={`prc-title-${i} font-sans font-semibold text-[15px] sm:text-base md:text-lg text-white leading-snug mb-1.5`}>
                        {step.title}
                      </h3>
                      <p className={`prc-desc-${i} font-sans text-[13px] sm:text-sm text-white/30 leading-relaxed`}>
                        {step.desc}
                      </p>
                    </div>

                    {/* Right: big dim number */}
                    <span className="hidden sm:block font-druk text-5xl md:text-6xl text-white/[0.04] select-none shrink-0 leading-none -mr-1 -mt-1">
                      {step.num}
                    </span>
                  </div>
                </div>

                {/* Connector line between steps */}
                {!isLast && <ConnectorLine lineRef={el => (lineRefs.current[i] = el)} />}
              </div>
            );
          })}
        </div>

        {/* ── Quote block ─────────────────────────────────────────────────────── */}
        <div className="prc-quote-block mt-12 md:mt-16 rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{ background: 'rgba(47,215,191,0.04)', border: '1px solid rgba(47,215,191,0.12)' }}>

          {/* Big quote mark */}
          <span className="absolute -top-3 left-5 font-druk text-7xl text-accent/10 leading-none select-none pointer-events-none">"</span>

          <p className="font-sans text-sm md:text-base text-white/55 leading-relaxed italic mb-6 relative z-10">
            "Es entstehen monatlich neue Winner Creatives für uns — die Ideen sowie Kreativität von ReelyGood ist beeindruckend."
          </p>
          <div className="flex items-center gap-3 relative z-10">
            <img
              src={encodeURI('/Jonas von Prepmymeal.jpeg')}
              alt="Jonas Noyon"
              className="w-9 h-9 rounded-full object-cover shrink-0"
              style={{ border: '1px solid rgba(47,215,191,0.35)' }}
              loading="lazy"
            />
            <div>
              <p className="font-sans text-xs font-semibold text-white/60">Jonas Noyon</p>
              <p className="font-mono text-[10px] text-white/25 tracking-wide">Co-Founder, Prepmymeal</p>
            </div>
            <img
              src="/kunden-logos/prepmymeal.png"
              alt="Prepmymeal"
              className="h-16 md:h-20 w-auto object-contain ml-3 shrink-0"
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
              loading="lazy"
            />
            {/* Stars */}
            <div className="ml-auto flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#2FD7BF" opacity="0.8">
                  <path d="M6 1l1.24 2.55 2.76.4-2 1.96.47 2.74L6 7.27 3.53 8.65 4 5.91 2 3.95l2.76-.4z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA Button ──────────────────────────────────────────────────────── */}
        <div className="mt-10 md:mt-14 flex justify-center">
          <MagneticButton className="relative group">
            <div className="absolute inset-0 bg-[#e6321c] rounded-full blur-2xl opacity-40 animate-pulse-glow" />
            <a
              href="https://form.typeform.com/to/dDmy0xtw"
              target="_blank"
              rel="noreferrer"
              className="relative overflow-hidden bg-[#e6321c] text-white font-bold text-base md:text-lg px-10 py-4 min-h-[56px] rounded-full flex items-center gap-3 transition-transform duration-300 will-change-transform btn-red-glow z-10 justify-center"
            >
              <span className="relative z-10 text-white">In 30 Sekunden zum Free Video!</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
