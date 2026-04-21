import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from './AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

const campaigns = [
  { num: 1, cpa: '10,67 €', roas: '8,84', img: encodeURI('/Case study Zite/Screenshot 2024-10-07 at 06.55.31.png'), cpaReduction: '-54%' },
  { num: 2, cpa: '10,93 €', roas: '8,63', img: encodeURI('/Case study Zite/Screenshot 2024-10-05 at 10.41.14.png'), cpaReduction: '-52%' },
  { num: 3, cpa: '11,12 €', roas: '8,18', img: encodeURI('/Case study Zite/Testvideo.png'),                         cpaReduction: '-49%' },
];


export default function CaseStudies() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SVG path
      gsap.fromTo('#growth-path',
        { strokeDasharray: 500, strokeDashoffset: 500 },
        { strokeDashoffset: 0, duration: 2.5, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.svg-container', start: 'top 80%' } }
      );

      // Stat rows slide in from left
      gsap.fromTo('.stat-row',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.zite-block', start: 'top 78%' } }
      );

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="case-studies"
      ref={container}
      className="relative py-16 md:py-28 px-4 bg-dark-surface w-full flex flex-col items-center overflow-hidden"
    >
      <AnimatedBackground />
      <div className="relative z-10 max-w-6xl w-full">

        {/* Heading */}
        <div className="text-center mb-14 md:mb-20 relative">
          <h2 className="font-druk text-5xl md:text-6xl lg:text-7xl uppercase tracking-[-0.02em] inline-block relative">
            Case Studies
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-accent rounded-full shadow-accent-glow" />
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-28">

          {/* ── ZITE FISHING ─────────────────────────────── */}
          <div className="zite-block flex flex-col gap-8">

            {/* Title row */}
            <div>
              <h3 className="font-sans font-bold text-2xl md:text-4xl text-white uppercase tracking-tight mb-3">
                KUNDE: ZITE FISHING
              </h3>
              <p className="font-sans text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
                Zite Fishing erstellen wir primär nativen und authentischen Content, der effektiv auf die
                Zielgruppe abzielt. Fortlaufend entstehen Winning Creatives, die die KPI-Benchmarks outperformen:
              </p>
            </div>

            {/* Campaign cards */}
            <div className="flex flex-col gap-3">
              {campaigns.map((c) => (
                <div
                  key={c.num}
                  className="stat-row flex flex-col md:flex-row md:items-center gap-4 md:gap-6 bg-[#0C0C0C] border border-white/5 rounded-2xl px-5 py-4"
                >
                  {/* Stats row */}
                  <div className="flex items-center gap-6">
                    {/* CPA */}
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-0.5">CPA</span>
                      <div className="flex items-baseline gap-2 whitespace-nowrap">
                        <span className="font-mono text-xl font-bold text-white">{c.cpa}</span>
                        <span className="font-mono text-sm font-bold text-green-400">{c.cpaReduction}</span>
                      </div>
                    </div>

                    <div className="w-px h-8 bg-white/8 shrink-0" />

                    {/* ROAS */}
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-0.5">ROAS</span>
                      <span className="font-mono text-xl font-bold text-accent">{c.roas}x</span>
                    </div>
                  </div>

                  {/* Screenshot — full width centered on mobile, right on desktop */}
                  <div className="w-full md:w-48 md:ml-auto md:shrink-0 rounded-lg overflow-hidden border border-white/5">
                    <img
                      src={c.img}
                      alt={`Campaign ${c.num}`}
                      className="w-full h-auto object-contain object-center md:object-top"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Verified badge */}
            <div className="flex items-center gap-2 self-start">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[10px] text-white/25 uppercase tracking-[0.2em]">
                Meta Ads Manager · Verified Live Data
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
