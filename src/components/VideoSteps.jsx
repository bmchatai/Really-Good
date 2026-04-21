import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Package, Clapperboard, Sparkles } from 'lucide-react';
import { annotate } from 'rough-notation';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    Icon: Package,
    title: 'Du schickst uns Dein Produkt',
  },
  {
    num: '02',
    Icon: Clapperboard,
    title: 'Wir produzieren das finale Video',

  },
  {
    num: '03',
    Icon: Sparkles,
    title: 'Du siehst, wie kreativ Dein Produkt in Szene gesetzt werden kann!',
  },
];

/* -------------------------------------------------------------------------- */
/*  Hand-drawn style SVG card border                                          */
/* -------------------------------------------------------------------------- */
function HandDrawnBorder({ pathRef, glowPathRef, className = '' }) {
  const path =
    'M 8 4 C 40 2, 120 3, 200 5 C 260 6, 340 3, 392 6 L 394 8 C 396 40, 393 120, 395 180 C 394 220, 396 280, 394 340 L 392 342 C 340 345, 200 343, 120 344 C 60 343, 20 345, 6 343 L 4 340 C 2 280, 5 200, 3 120 C 4 60, 2 20, 4 8 Z';

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 398 348"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        ref={pathRef}
        d={path}
        stroke="rgba(47, 215, 191, 0.5)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1800"
        strokeDashoffset="1800"
        vectorEffect="non-scaling-stroke"
      />
      <path
        ref={glowPathRef}
        d={path}
        stroke="rgba(47, 215, 191, 0.15)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1800"
        strokeDashoffset="1800"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Flowing connecting path between cards (desktop)                           */
/* -------------------------------------------------------------------------- */
function FlowingConnector({ lineRef, arrowRef }) {
  return (
    <div className="hidden lg:flex items-center justify-center w-20 xl:w-28 shrink-0 mx-2 self-center">
      <svg
        width="100%"
        height="80"
        viewBox="0 0 120 80"
        fill="none"
        className="overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Background dashed guide */}
        <path
          d="M 0 40 C 10 20, 30 60, 50 35 C 70 10, 90 60, 120 40"
          stroke="rgba(47,215,191,0.08)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 8"
          vectorEffect="non-scaling-stroke"
        />
        {/* Animated drawn path */}
        <path
          ref={lineRef}
          d="M 0 40 C 10 20, 30 60, 50 35 C 70 10, 90 60, 120 40"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="200"
          strokeDashoffset="200"
          vectorEffect="non-scaling-stroke"
        />
        {/* Arrowhead */}
        <path
          ref={arrowRef}
          d="M 110 35 L 122 40 L 110 45"
          stroke="#2FD7BF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0"
        />
        <defs>
          <linearGradient id="flowGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2FD7BF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#2FD7BF" stopOpacity="1" />
            <stop offset="100%" stopColor="#1AACB8" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mobile vertical connector                                                 */
/* -------------------------------------------------------------------------- */
function VerticalFlowConnector({ pathRef, arrowRef }) {
  return (
    <div className="flex lg:hidden justify-center h-20 w-full">
      <svg width="40" height="80" viewBox="0 0 40 80" fill="none">
        {/* Guide */}
        <path
          d="M 20 0 C 12 15, 28 25, 20 40 C 12 55, 28 65, 20 80"
          stroke="rgba(47,215,191,0.08)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 8"
        />
        {/* Drawn path */}
        <path
          ref={pathRef}
          d="M 20 0 C 12 15, 28 25, 20 40 C 12 55, 28 65, 20 80"
          stroke="#2FD7BF"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="120"
          strokeDashoffset="120"
        />
        {/* Arrow */}
        <path
          ref={arrowRef}
          d="M 15 70 L 20 82 L 25 70"
          stroke="#2FD7BF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0"
        />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Decorative floating particles                                             */
/* -------------------------------------------------------------------------- */
function FloatingParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 3,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="vstep-particle absolute rounded-full bg-accent"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Large decorative background number with parallax                          */
/* -------------------------------------------------------------------------- */
function ParallaxNumber({ num, index }) {
  return (
    <span
      className={`vstep-bg-num-${index} absolute font-druk text-[6rem] md:text-[8rem] xl:text-[10rem] leading-none text-white/[0.02] select-none pointer-events-none will-change-transform`}
      style={{
        right: index === 0 ? '-5%' : index === 2 ? '-5%' : 'auto',
        left: index === 1 ? '-5%' : 'auto',
        top: `${10 + index * 28}%`,
        zIndex: 0,
      }}
    >
      {num}
    </span>
  );
}


/* ========================================================================== */
/*  MAIN COMPONENT                                                            */
/* ========================================================================== */
export default function VideoSteps() {
  const container = useRef(null);
  const trackRef = useRef(null);
  const highlightRef = useRef(null);

  // Direct DOM refs — avoids setState on every scroll frame
  const borderPathRefs = useRef([null, null, null]);
  const borderGlowRefs = useRef([null, null, null]);
  const topLineRefs = useRef([null, null, null]);
  const iconGlowRefs = useRef([null, null, null]);
  const cornerGlowRefs = useRef([null, null, null]);

  const connLineRefs = useRef([null, null]);
  const connArrowRefs = useRef([null, null]);
  const vertPathRefs = useRef([null, null]);
  const vertArrowRefs = useRef([null, null]);

  // Updates all border/glow elements for card i directly on the DOM
  const updateBorder = (i, bp) => {
    const offset = 1800 - 1800 * bp;
    if (borderPathRefs.current[i]) borderPathRefs.current[i].style.strokeDashoffset = offset;
    if (borderGlowRefs.current[i]) borderGlowRefs.current[i].style.strokeDashoffset = offset;
    if (topLineRefs.current[i])
      topLineRefs.current[i].style.background = `linear-gradient(90deg, transparent, rgba(47,215,191,${0.4 * bp}), transparent)`;
    if (iconGlowRefs.current[i]) {
      iconGlowRefs.current[i].style.opacity = bp;
      iconGlowRefs.current[i].style.boxShadow = `inset 0 0 20px rgba(47,215,191,${0.15 * bp})`;
    }
    if (cornerGlowRefs.current[i])
      cornerGlowRefs.current[i].style.background = `radial-gradient(circle, rgba(47,215,191,${0.06 * bp}) 0%, transparent 70%)`;
  };

  const updateConnector = (i, cp) => {
    if (connLineRefs.current[i]) connLineRefs.current[i].style.strokeDashoffset = 200 - 200 * cp;
    if (connArrowRefs.current[i]) connArrowRefs.current[i].style.opacity = cp > 0.85 ? 1 : 0;
    if (vertPathRefs.current[i]) vertPathRefs.current[i].style.strokeDashoffset = 120 - 120 * cp;
    if (vertArrowRefs.current[i]) vertArrowRefs.current[i].style.opacity = cp > 0.85 ? 1 : 0;
  };

  useEffect(() => {
    let ctx = gsap.context(() => {

      // 1. Roll-in letter animation for headline
      gsap.fromTo(
        '.vstep-char',
        { y: '110%', opacity: 0, rotateX: -90 },
        {
          y: '0%',
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 80%',
          },
          onComplete: () => {
            if (highlightRef.current) {
              const annotation = annotate(highlightRef.current, {
                type: 'highlight',
                color: '#2FD7BF',
                strokeWidth: 2,
                animationDuration: 900,
                padding: 2,
                multiline: true,
              });
              annotation.show();
            }
          },
        }
      );

      // 2. Parallax for background numbers
      steps.forEach((_, i) => {
        gsap.to(`.vstep-bg-num-${i}`, {
          yPercent: -80 - i * 20,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      });

      // 3. Floating particles
      gsap.utils.toArray('.vstep-particle').forEach((p) => {
        gsap.to(p, {
          y: () => (Math.random() - 0.5) * 200,
          x: () => (Math.random() - 0.5) * 100,
          opacity: () => 0.15 + Math.random() * 0.4,
          duration: 3 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        });
      });

      // 4. Main animation based on matchMedia
      const mm = gsap.matchMedia();

      /* ---- DESKTOP: horizontal pin + scrub border draw ---- */
      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        const getScrollAmount = () => track.scrollWidth - window.innerWidth;

        // Fade whole track in when section enters
        gsap.fromTo(track,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: container.current, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );

        gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: () => `+=${getScrollAmount() + 400}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              // Border draw per card
              steps.forEach((_, i) => {
                const start = i * 0.28;
                const end   = start + 0.32;
                updateBorder(i, Math.min(1, Math.max(0, (p - start) / (end - start))));
              });
              // Connector draw
              [0, 1].forEach((i) => {
                const start = 0.2 + i * 0.3;
                const end   = start + 0.2;
                updateConnector(i, Math.min(1, Math.max(0, (p - start) / (end - start))));
              });
            },
          },
        }).to(track, { x: () => -getScrollAmount(), ease: 'none' });
      });

      /* ---- MOBILE: simple scroll-triggered fade-up per card ---- */
      mm.add('(max-width: 1023px)', () => {
        steps.forEach((_, i) => {
          // Card fade-up
          gsap.fromTo(`.vstep-card-${i}`,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
              scrollTrigger: { trigger: `.vstep-card-${i}`, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
          // Border draw scrub
          ScrollTrigger.create({
            trigger: `.vstep-card-${i}`,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.6,
            onUpdate: (self) => updateBorder(i, self.progress),
          });
        });
        // Connector draw
        [0, 1].forEach((i) => {
          ScrollTrigger.create({
            trigger: `.vstep-connector-${i}`,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: 0.6,
            onUpdate: (self) => updateConnector(i, self.progress),
          });
        });
      });

      // CTA bounce in
      gsap.fromTo(
        '.vstep-cta',
        { scale: 0.82, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: '.vstep-cta', start: 'top 90%' },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  // Helper to split text into chars for animation
  const splitToChars = (words) => {
    return words.map((word, wIdx) => (
      <span key={wIdx} className="inline-block overflow-hidden align-bottom pb-2 mr-[0.25em] last:mr-0">
        {word.split('').map((char, cIdx) => (
          <span key={cIdx} className="vstep-char inline-block origin-bottom" style={{ transformStyle: 'preserve-3d' }}>
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <section ref={container} className="bg-black w-full overflow-hidden flex flex-col items-center relative">
      {/* Floating particles */}
      <FloatingParticles />

      {/* Large parallax background numbers */}
      {steps.map((step, i) => (
        <ParallaxNumber key={i} num={step.num} index={i} />
      ))}

      {/* Decorative gradient orbs for depth */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-accent/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="h-auto lg:h-screen w-full flex flex-col justify-center py-16 md:py-32 items-center relative z-10">
        {/* Heading */}
        <div className="w-full max-w-6xl px-4 flex flex-col items-center mb-12 lg:mb-20">
          <h2 className="font-druk text-3xl md:text-5xl uppercase tracking-[-0.02em] text-center text-white">
            {splitToChars(['In'])}
            <span ref={highlightRef} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
              {splitToChars(['3', 'einfachen', 'Schritten'])}
            </span>
            {splitToChars(['zu', 'Deinem', 'Video:'])}
          </h2>
          {/* Hand-drawn underline */}
          <svg className="w-48 md:w-64 h-4 mt-4 overflow-visible" viewBox="0 0 200 12" fill="none">
            <path
              className="vstep-underline"
              d="M 2 8 C 30 3, 60 10, 100 6 C 140 2, 170 9, 198 5"
              stroke="#2FD7BF"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="250"
              strokeDashoffset="250"
            />
          </svg>
        </div>

        {/* Scrollable Track */}
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row items-center lg:items-stretch w-full px-4 lg:pl-[10vw] pr-[10vw] gap-0"
        >
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col lg:flex-row items-center w-full lg:w-auto shrink-0">
              {/* Card */}
              <div
                className={`vstep-card-${i} relative flex flex-col w-full lg:w-[360px] xl:w-[420px] rounded-[2rem] p-7 pb-16 md:p-9 md:pb-20 overflow-visible group transition-all duration-500 hover:-translate-y-2`}
                style={{ perspective: '800px' }}
              >
                {/* Hand-drawn SVG border */}
                <HandDrawnBorder
                  pathRef={(el) => (borderPathRefs.current[i] = el)}
                  glowPathRef={(el) => (borderGlowRefs.current[i] = el)}
                />

                {/* Inner glass background */}
                <div className="absolute inset-[2px] rounded-[1.9rem] bg-gradient-to-br from-[#151515] via-[#111111] to-[#0a0a0a] pointer-events-none" style={{ zIndex: -1 }} />

                {/* Glowing top line — updated via direct DOM ref */}
                <div
                  ref={(el) => (topLineRefs.current[i] = el)}
                  className="absolute inset-x-4 top-2 h-[1px] rounded-full pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(47,215,191,0), transparent)' }}
                />

                {/* Large background number */}
                <span
                  className={`vstep-num-${i} absolute -bottom-4 -right-3 font-druk text-[5rem] xl:text-[6rem] leading-none text-accent/[0.04] select-none pointer-events-none will-change-transform`}
                >
                  {step.num}
                </span>

                {/* Step label + icon */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <span
                    className={`vstep-icon-${i} w-13 h-13 xl:w-16 xl:h-16 rounded-2xl bg-accent/[0.08] border border-accent/20 flex items-center justify-center shrink-0 relative overflow-hidden`}
                  >
                    {/* Draw-in glow — updated via direct DOM ref */}
                    <div
                      ref={(el) => (iconGlowRefs.current[i] = el)}
                      className="absolute inset-0 bg-accent/10 rounded-2xl"
                      style={{ opacity: 0 }}
                    />
                    <step.Icon className="w-6 h-6 xl:w-7 xl:h-7 text-accent relative z-10" />
                  </span>
                  <span className="font-mono text-xs xl:text-sm text-accent/60 tracking-[0.2em] uppercase">
                    Schritt {step.num}
                  </span>
                </div>

                {/* Text content */}
                <div className={`vstep-text-${i} relative z-10`}>
                  <h3 className="font-sans font-bold text-lg md:text-xl xl:text-2xl text-white leading-snug mb-3 group-hover:text-accent transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm xl:text-base text-white/40 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Corner glow — updated via direct DOM ref */}
                <div
                  ref={(el) => (cornerGlowRefs.current[i] = el)}
                  className="absolute bottom-0 right-0 w-28 h-28 xl:w-36 xl:h-36 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(47,215,191,0) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />
              </div>

              {/* Connectors between cards */}
              {i < steps.length - 1 && (
                <>
                  <FlowingConnector
                    lineRef={(el) => (connLineRefs.current[i] = el)}
                    arrowRef={(el) => (connArrowRefs.current[i] = el)}
                  />
                  <div className={`vstep-connector-${i}`}>
                    <VerticalFlowConnector
                      pathRef={(el) => (vertPathRefs.current[i] = el)}
                      arrowRef={(el) => (vertArrowRefs.current[i] = el)}
                    />
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Desktop CTA */}
          <div className="vstep-cta hidden lg:flex shrink-0 w-[400px] flex-col items-center justify-center px-12 gap-6 ml-8">
            <MagneticButton className="group w-full">
              <a
                href="https://form.typeform.com/to/dDmy0xtw"
                target="_blank"
                rel="noreferrer"
                className="relative overflow-hidden bg-[#e6321c] text-white font-bold text-xl px-10 py-5 min-h-[56px] rounded-full flex items-center justify-center gap-3 transition-transform duration-300 btn-red-glow w-full"
              >
                <span className="relative z-10 flex items-center gap-2 text-center leading-tight">
                  In 30 Sekunden zum Free Video!
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="vstep-cta lg:hidden mt-16 flex flex-col items-center gap-4 px-4 w-full">
          <a
            href="https://form.typeform.com/to/dDmy0xtw"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden bg-[#e6321c] text-white font-bold text-base px-8 py-5 min-h-[56px] rounded-full flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300 btn-red-glow w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              In 30 Sekunden zum Free Video!
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 transform-gpu" />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes particleFloat {
          0%, 100% { opacity: 0; transform: translateY(0) translateX(0); }
          50% { opacity: 0.3; transform: translateY(-30px) translateX(10px); }
        }
        .vstep-particle {
          animation: particleFloat 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
