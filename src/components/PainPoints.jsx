import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { TrendingDown, AlertTriangle, Clock, Lightbulb } from 'lucide-react';
import { Highlighter } from './magicui/highlighter';
import AnimatedBackground from './AnimatedBackground';

gsap.registerPlugin(ScrollTrigger, SplitText);

const ACCENT     = '#2FD7BF';
const ACCENT_RGB = '47,215,191';
const DANGER     = '#FF3B30';
const DANGER_RGB = '255,59,48';

/* ── Data ─────────────────────────────────────────────── */
const pains = [
  { Icon: TrendingDown, label: 'Fehlende Creative Prozesse' },
  { Icon: AlertTriangle, label: 'Keine Ressourcen für frische Inhalte' },
  { Icon: Clock,         label: 'Keine Zeit für Kreativität' },
  { Icon: Lightbulb,    label: 'Kein Know-How, welche Formate funktionieren' },
];

/* Sparkline — descending ROAS */
const sparkPoints = [0.92, 0.85, 0.78, 0.82, 0.70, 0.60, 0.55, 0.48, 0.38, 0.30, 0.22, 0.18];
const W = 320, H = 120, PAD = 12;
function buildPath(pts) {
  return pts.map((v, i) => {
    const x = PAD + (i / (pts.length - 1)) * (W - PAD * 2);
    const y = PAD + (1 - v) * (H - PAD * 2);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
}
function buildArea(pts) {
  const line  = buildPath(pts);
  const lastX = (PAD + (W - PAD * 2)).toFixed(1);
  const firstX = PAD.toFixed(1);
  const bottom = (H - PAD + 4).toFixed(1);
  return `${line} L ${lastX} ${bottom} L ${firstX} ${bottom} Z`;
}

/* ── Scroll-brightening word component ────────────────── */
function BrightWord({ text, delay = 0 }) {
  const words    = text.split(' ');
  const wordRefs = useRef([]);

  useEffect(() => {
    wordRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { color: 'rgba(255,255,255,0.12)' },
        {
          color: 'rgba(255,255,255,0.9)',
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 52%', scrub: 0.6 },
          delay: delay + i * 0.04,
        }
      );
    });
  }, [delay]);

  return (
    <span>
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => (wordRefs.current[i] = el)}
          className="inline-block mr-[0.35em]"
          style={{ color: 'rgba(255,255,255,0.12)', willChange: 'color' }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

/* ── Main component ────────────────────────────────────── */
export default function PainPoints() {
  const container    = useRef(null);
  const chartLineRef = useRef(null);
  const chartAreaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* 1. Heading chars roll in */
      gsap.fromTo('.pp-char',
        { y: '115%', opacity: 0, rotateX: -90 },
        { y: '0%', opacity: 1, rotateX: 0, duration: 0.75, stagger: 0.022, ease: 'power4.out',
          scrollTrigger: { trigger: '.pp-heading', start: 'top 82%' } }
      );

      /* 2. Pain items cascade from left */
      gsap.fromTo('.pp-item',
        { x: -48, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.pp-list', start: 'top 78%' } }
      );

      /* 3. Icons pop in */
      gsap.fromTo('.pp-icon-wrap',
        { scale: 0, rotate: -20 },
        { scale: 1, rotate: 0, duration: 0.55, stagger: 0.1, ease: 'back.out(2)',
          scrollTrigger: { trigger: '.pp-list', start: 'top 78%' } }
      );

      /* 4. Quote: SplitText word-by-word scroll brightening */
      const split = new SplitText('.pp-quote-body', { type: 'words' });
      split.words.forEach((word) => {
        // Teal words stay teal; normal words go white
        const isTeal = word.classList.contains('pp-teal');
        gsap.fromTo(word,
          { opacity: 0.08, color: isTeal ? ACCENT : '#ffffff' },
          {
            opacity: 1,
            color: isTeal ? ACCENT : '#ffffff',
            ease: 'none',
            scrollTrigger: {
              trigger: word,
              start: 'top 90%',
              end:   'top 52%',
              scrub: 0.7,
            },
          }
        );
      });

      // Decorative quote mark fades in
      gsap.fromTo('.pp-deco-quote',
        { opacity: 0, scale: 0.6, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.pp-quote', start: 'top 85%' } }
      );

      // Bottom rule draws in
      gsap.fromTo('.pp-rule',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power3.inOut', transformOrigin: 'left',
          scrollTrigger: { trigger: '.pp-rule', start: 'top 90%' } }
      );

      /* 5. Dashboard slide in */
      gsap.fromTo('.pp-dashboard',
        { x: 70, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.pp-dashboard', start: 'top 80%' } }
      );

      /* 6. Chart line draws itself, then flows continuously */
      if (chartLineRef.current) {
        const len = chartLineRef.current.getTotalLength();
        gsap.set(chartLineRef.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(chartLineRef.current, {
          strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.pp-dashboard', start: 'top 78%' },
          onComplete: () => {
            // switch to marching-dash pattern so the line has continuous movement
            gsap.set(chartLineRef.current, { strokeDasharray: '10 6' });
            gsap.to(chartLineRef.current, {
              strokeDashoffset: -160,
              duration: 4,
              ease: 'none',
              repeat: -1,
            });
          },
        });
      }

      // Pulsing end-point dot — keeps the line feeling alive
      gsap.to('.pp-chart-dot', {
        scale: 1.6,
        opacity: 0.2,
        duration: 1.1,
        ease: 'power1.out',
        repeat: -1,
        yoyo: true,
        transformOrigin: 'center',
      });
      if (chartAreaRef.current) {
        gsap.fromTo(chartAreaRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.4,
            scrollTrigger: { trigger: '.pp-dashboard', start: 'top 78%' } }
        );
      }

      /* 7. KPI counters count up */
      gsap.utils.toArray('.pp-counter').forEach((el) => {
        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        gsap.fromTo({ v: 0 }, { v: target }, {
          duration: 1.5, ease: 'power2.out',
          onUpdate() { el.textContent = prefix + Math.round(this.targets()[0].v) + suffix; },
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      /* 8. Pulsing rings */
      gsap.to('.pp-ring', {
        scale: 2.2, opacity: 0, duration: 1.6,
        repeat: -1, ease: 'power1.out',
        stagger: { each: 0.5, repeat: -1 },
      });

    }, container);

    return () => ctx.revert();
  }, []);

  const headingWords  = ['WIR', 'WISSEN,', 'DASS', 'DU', 'FOLGENDE', 'PAIN', 'POINTS', 'HAST:'];
  const accentWords   = new Set(['PAIN', 'POINTS']);
  const linePath = buildPath(sparkPoints);
  const areaPath = buildArea(sparkPoints);

  return (
    <section
      ref={container}
      className="relative py-24 md:py-40 px-4 bg-black w-full flex flex-col items-center overflow-hidden"
    >
      <AnimatedBackground />

      {/* Background orbs */}
      <div className="absolute top-[10%] left-[-8%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: `rgba(${ACCENT_RGB},0.05)` }} />
      <div className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: `rgba(${ACCENT_RGB},0.04)` }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(${ACCENT_RGB},0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(${ACCENT_RGB},0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-16 lg:gap-20 items-start relative z-10">

        {/* ══════════════════ LEFT */}
        <div className="w-full lg:w-1/2 flex flex-col">

          {/* Heading */}
          <div className="pp-heading mb-10">
            <h2 className="font-druk text-[2rem] sm:text-[2.7rem] md:text-[3rem] uppercase tracking-[-0.01em] text-white leading-[1.05]">
              {headingWords.map((word, wIdx) => (
                <span
                  key={wIdx}
                  className="inline-block overflow-hidden align-bottom pb-1 mr-[0.28em] last:mr-0"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {accentWords.has(word) ? (
                    <Highlighter
                      action="highlight"
                      color={`rgba(${ACCENT_RGB},0.3)`}
                      strokeWidth={2}
                      animationDuration={900}
                      isView
                    >
                      {word.split('').map((char, cIdx) => (
                        <span key={cIdx} className="pp-char inline-block" style={{ color: ACCENT, transformStyle: 'preserve-3d' }}>
                          {char}
                        </span>
                      ))}
                    </Highlighter>
                  ) : (
                    word.split('').map((char, cIdx) => (
                      <span key={cIdx} className="pp-char inline-block" style={{ transformStyle: 'preserve-3d' }}>
                        {char}
                      </span>
                    ))
                  )}
                </span>
              ))}
            </h2>
          </div>

          {/* Pain list — scroll-brightening */}
          <ul className="pp-list space-y-3 mb-10">
            {pains.map(({ Icon, label }, i) => (
              <li
                key={i}
                className="pp-item group flex items-center gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300 px-5 py-4"
                style={{ '--hover-border': `rgba(${ACCENT_RGB},0.25)` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.25)`;
                  e.currentTarget.style.background = `rgba(${ACCENT_RGB},0.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.background = '';
                }}
              >
                {/* Icon */}
                <div className="pp-icon-wrap relative flex items-center justify-center shrink-0">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300"
                    style={{ background: `rgba(${ACCENT_RGB},0.08)`, border: `1px solid rgba(${ACCENT_RGB},0.2)` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: ACCENT }} />
                  </div>
                </div>

                {/* Scroll-brightening label */}
                <span className="font-sans text-base md:text-lg font-medium leading-snug flex-1">
                  <BrightWord text={label} delay={i * 0.05} />
                </span>

                {/* Right dot */}
                <div className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300"
                  style={{ background: `rgba(${ACCENT_RGB},0.3)` }} />
              </li>
            ))}
          </ul>

          {/* Quote — editorial, no box */}
          <div className="pp-quote relative pl-6 md:pl-8">

            {/* Decorative left accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
              style={{ background: `linear-gradient(180deg, ${ACCENT}, rgba(${ACCENT_RGB},0.1))` }}
            />

            {/* Decorative large quote mark */}
            <span
              className="pp-deco-quote absolute -top-5 -left-2 font-serif text-[5rem] leading-none select-none pointer-events-none"
              style={{ color: `rgba(${ACCENT_RGB},0.18)`, fontFamily: 'Georgia, serif' }}
            >
              „
            </span>

            {/* Body — SplitText will split this at word level */}
            <p
              className="pp-quote-body font-sans text-lg md:text-xl font-light leading-[1.75] tracking-[-0.01em]"
              style={{ color: 'rgba(255,255,255,0.08)' }}
            >
              Neue Winning Ads zu finden war noch nie so einfach — und doch so
              herausfordernd für E-Com Brands und Dienstleister. Unser erfahrenes
              Performance-Team entwickelt und testet{' '}
              <span className="pp-teal font-semibold" style={{ color: ACCENT }}>
                hochkonvertierende
              </span>{' '}
              <span className="pp-teal font-semibold" style={{ color: ACCENT }}>
                Anzeigen,
              </span>{' '}
              die konstant Ergebnisse liefern.
            </p>

            {/* Bottom rule + label */}
            <div className="mt-8 flex items-center gap-4">
              <div
                className="pp-rule h-px flex-1 max-w-[80px] rounded-full"
                style={{ background: `rgba(${ACCENT_RGB},0.4)` }}
              />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: `rgba(${ACCENT_RGB},0.5)` }}>
                Performance Team · ReelyGood
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════ RIGHT: Dashboard */}
        <div className="pp-dashboard w-full lg:w-1/2">
          <h3 className="font-druk text-lg md:text-xl uppercase tracking-[-0.01em] text-white/90 mb-4 md:mb-5 leading-tight">
            So sieht dein Dashboard aktuell aus:
          </h3>
          <div
            className="relative rounded-3xl border border-white/[0.07] bg-[#060d0c] overflow-hidden"
            style={{ boxShadow: `0 0 80px rgba(${ACCENT_RGB},0.07)` }}
          >
            {/* Top accent bar */}
            <div className="h-[2px] w-full"
              style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />

            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.05]">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="ml-3 font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase">
                Ad Performance Analytics
              </span>
              {/* Live badge */}
              <div className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full"
                style={{ border: `1px solid rgba(${ACCENT_RGB},0.3)`, background: `rgba(${ACCENT_RGB},0.08)` }}>
                <div className="relative flex items-center justify-center w-2 h-2">
                  <div className="pp-ring absolute w-2 h-2 rounded-full" style={{ background: `rgba(${ACCENT_RGB},0.6)` }} />
                  <div className="w-1.5 h-1.5 rounded-full relative z-10" style={{ background: ACCENT }} />
                </div>
                <span className="font-mono text-[9px] font-bold tracking-widest uppercase" style={{ color: ACCENT }}>Live</span>
              </div>
            </div>

            {/* KPI tiles */}
            <div className="grid grid-cols-3 gap-px border-b border-white/[0.05]">
              {[
                { label: 'ROAS',  target: 0.8,  prefix: '',  suffix: '×',   color: `rgba(${DANGER_RGB},0.9)` },
                { label: 'CTR',   target: 0.6,  prefix: '',  suffix: '%',   color: `rgba(${DANGER_RGB},0.9)` },
                { label: 'Ø CPA', target: 142,  prefix: '+', suffix: '%↑',  color: `rgba(${DANGER_RGB},0.9)` },
              ].map((kpi, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-5 px-3 bg-white/[0.01]">
                  <span className="font-mono text-[10px] text-white/25 tracking-widest uppercase mb-2">{kpi.label}</span>
                  <span
                    className="pp-counter font-mono text-xl md:text-2xl font-bold"
                    style={{ color: kpi.color }}
                    data-target={kpi.target}
                    data-prefix={kpi.prefix}
                    data-suffix={kpi.suffix}
                  >
                    {kpi.prefix}0{kpi.suffix}
                  </span>
                </div>
              ))}
            </div>

            {/* Sparkline */}
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-white/25 tracking-widest uppercase">ROAS über Zeit</span>
                <span className="font-mono text-[10px] tracking-widest font-bold" style={{ color: `rgba(${DANGER_RGB},0.9)` }}>↓ −80%</span>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-white/[0.04]"
                style={{ background: 'rgba(30,0,0,0.5)' }}>
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ display: 'block' }} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="pp-areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={DANGER} stopOpacity="0.28" />
                      <stop offset="100%" stopColor={DANGER} stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="pp-lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor={DANGER} stopOpacity="1" />
                      <stop offset="60%"  stopColor={DANGER} stopOpacity="0.85" />
                      <stop offset="100%" stopColor={DANGER} stopOpacity="0.75" />
                    </linearGradient>
                    <filter id="pp-glow">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {[0.25, 0.5, 0.75].map((v, i) => {
                    const y = PAD + (1 - v) * (H - PAD * 2);
                    return <line key={i} x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />;
                  })}

                  <path ref={chartAreaRef} d={areaPath} fill="url(#pp-areaGrad)" opacity="0" />

                  {/* Soft glow halo */}
                  <path d={linePath} stroke={`rgba(${DANGER_RGB},0.35)`} strokeWidth="8" fill="none" strokeLinecap="round" filter="url(#pp-glow)" />

                  {/* Main line — red, with marching dashes animated via GSAP */}
                  <path
                    ref={chartLineRef}
                    d={linePath}
                    stroke="url(#pp-lineGrad)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: `drop-shadow(0 0 4px ${DANGER})` }}
                  />

                  {/* End-point dot — pulsing */}
                  <circle
                    className="pp-chart-dot"
                    cx={(PAD + (W - PAD * 2)).toFixed(1)}
                    cy={(PAD + (1 - sparkPoints.at(-1)) * (H - PAD * 2)).toFixed(1)}
                    r="5"
                    fill={DANGER}
                    style={{ filter: `drop-shadow(0 0 8px ${DANGER})` }}
                  />
                </svg>
              </div>
              <p className="mt-2 font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: `rgba(${DANGER_RGB},0.85)` }}>
                Kunde verbrennt ohne ReelyGood Geld
              </p>
            </div>

            {/* Creative rows */}
            <div className="px-5 pb-4 space-y-3">
              {[
                { label: 'Creative V1', w: '22%', change: '−38%' },
                { label: 'Creative V2', w: '14%', change: '−67%' },
                { label: 'Creative V3', w:  '8%', change: '−82%' },
              ].map(({ label, w, change }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-white/30 w-20 shrink-0">{label}</span>
                  <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: w,
                        background: `linear-gradient(90deg, ${ACCENT}, rgba(${ACCENT_RGB},0.2))`,
                        boxShadow: `0 0 6px rgba(${ACCENT_RGB},0.25)`,
                      }}
                    />
                  </div>
                  <span className="font-mono text-[10px] w-10 text-right shrink-0 font-bold" style={{ color: `rgba(${DANGER_RGB},0.95)` }}>{change}</span>
                </div>
              ))}
            </div>

            {/* Alert footer */}
            <div className="px-5 pb-5">
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  border: `1px solid rgba(${DANGER_RGB},0.35)`,
                  background: `rgba(${DANGER_RGB},0.08)`,
                }}
              >
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="pp-ring absolute w-4 h-4 rounded-full" style={{ background: `rgba(${DANGER_RGB},0.55)` }} />
                  <AlertTriangle className="w-4 h-4 relative z-10" style={{ color: DANGER }} />
                </div>
                <p className="font-sans text-xs leading-snug font-semibold" style={{ color: `rgba(${DANGER_RGB},0.95)` }}>
                  Deine Creatives verbrennen Budget — neue Ad Creatives sind jetzt erforderlich.
                </p>
              </div>
            </div>

            {/* Inner bottom glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-40 rounded-full pointer-events-none blur-[60px]"
              style={{ background: `rgba(${ACCENT_RGB},0.04)` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
