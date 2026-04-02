import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, MousePointer2 } from 'lucide-react';
import { Highlighter } from './magicui/highlighter';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 80%',
          },
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="leistungen" ref={container} className="py-20 md:py-32 px-4 bg-black w-full flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12 md:mb-20 relative">
          <h2 className="font-druk text-4xl md:text-5xl uppercase tracking-[-0.02em] inline-block relative">
            Warum ReelyGood?
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-full shadow-accent-glow"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Diagnostic Shuffler */}
          <div className="feature-card group bg-card-surface border border-accent-base rounded-[2rem] p-6 md:p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300 hover:shadow-accent-glow relative overflow-hidden md:col-span-1 lg:col-span-1">
            <DiagnosticShuffler />
            <h3 className="font-sans font-semibold text-2xl mt-8 md:mt-10 mb-3 text-white">
              <Highlighter 
                action="underline" 
                color="#FFFFFF" 
                strokeWidth={2}
                padding={2}
                isView={true}
                className="text-accent"
              >
                Messbare
              </Highlighter> Ergebnisse
            </h3>
            <p className="font-sans text-sm md:text-base text-white leading-relaxed">
              Keine leeren Versprechen. Unsere Creatives liefern KPIs, die den Marktdurchschnitt konstant outperformen.
            </p>
          </div>

          {/* Card 2 - Telemetry Typewriter */}
          <div className="feature-card group bg-card-surface border border-accent-base rounded-[2rem] p-6 md:p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300 hover:shadow-accent-glow relative overflow-hidden">
            <TelemetryTypewriter />
            <h3 className="font-sans font-semibold text-2xl mt-8 md:mt-10 mb-3 text-white">Weekly Winning Ads</h3>
            <p className="font-sans text-sm md:text-base text-white leading-relaxed">
              Unser Creative-Team testet und iteriert jede Woche neue Formate &mdash; so findest du konstant frische Winner.
            </p>
          </div>

          {/* Card 3 - Cursor Protocol Scheduler */}
          <div className="feature-card group bg-card-surface border border-accent-base rounded-[2rem] p-6 md:p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300 hover:shadow-accent-glow relative overflow-hidden md:col-span-2 lg:col-span-1">
            <ProtocolScheduler />
            <h3 className="font-sans font-semibold text-2xl mt-8 md:mt-10 mb-3 text-white">Lückenloser Prozess</h3>
            <p className="font-sans text-sm md:text-base text-white leading-relaxed">
              Von der Strategie bis zum fertigen Creative &mdash; wir übernehmen 99% des Aufwands. Du lehnst dich zurück.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiagnosticShuffler() {
  const cards = [
    { label: "CPA -54%", icon: <div className="w-2 h-2 rounded-full bg-success-green"></div> },
    { label: "ROAS 8.84x", icon: <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-success-green"></div> },
    { label: "CTR +127%", icon: <Activity className="w-3 h-3 text-success-green" /> }
  ];
  
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx((p) => (p + 1) % cards.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-32 w-full relative bg-dark-surface/50 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
      {cards.map((c, i) => {
        const offset = i - activeIdx;
        const normalizedOffset = offset < -1 ? offset + cards.length : (offset > 1 ? offset - cards.length : offset);
        
        let transform = `translateY(${normalizedOffset * 100}%) scale(${1 - Math.abs(normalizedOffset) * 0.1})`;
        let opacity = 1 - Math.abs(normalizedOffset) * 0.5;
        let zIndex = 10 - Math.abs(normalizedOffset);

        return (
          <div
            key={i}
            className="absolute w-48 h-12 bg-card-surface border border-white/10 rounded-lg flex items-center justify-between px-4"
            style={{
              transform,
              opacity,
              zIndex,
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <span className="font-mono font-medium text-sm text-white">{c.label}</span>
            {c.icon}
          </div>
        );
      })}
    </div>
  );
}

function TelemetryTypewriter() {
  const lines = [
    "→ Neuer Winner Creative identifiziert...",
    "→ Hook-Rate: 42% über Benchmark...",
    "→ Iteration V3 live — CPA sinkt...",
    "→ Creative Fatigue erkannt → Refresh deployed"
  ];
  const [text, setText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const currentLine = lines[lineIdx];
    if (charIdx < currentLine.length) {
      const t = setTimeout(() => {
        setText(prev => prev + currentLine[charIdx]);
        setCharIdx(c => c + 1);
      }, 50);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setText("");
        setCharIdx(0);
        setLineIdx(l => (l + 1) % lines.length);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx]);

  return (
    <div className="h-32 w-full relative bg-dark-surface/80 rounded-xl border border-white/5 p-4 flex flex-col font-mono text-xs overflow-hidden">
      <div className="flex items-center gap-2 mb-3 opacity-60">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
        <span>Live Feed</span>
      </div>
      <div className="text-accent/90 break-words leading-relaxed text-[11px] md:text-xs">
        {text}<span className="inline-block w-1.5 h-3 bg-accent animate-pulse ml-1 align-middle"></span>
      </div>
    </div>
  );
}

function ProtocolScheduler() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      // Move to Wed
      tl.to('.click-cursor', {
        x: 82, // approx position of W
        y: 20,
        duration: 1,
        ease: 'power2.inOut'
      })
      // Click Wed
      .to('.click-cursor', { scale: 0.8, duration: 0.1 })
      .to('.day-3', { backgroundColor: '#2FD7BF', color: '#000', duration: 0.1 }, '<')
      .to('.click-cursor', { scale: 1, duration: 0.1 })
      
      // Move to Deploy
      .to('.click-cursor', {
        x: 100,
        y: 65,
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 0.5
      })
      // Click Deploy
      .to('.click-cursor', { scale: 0.8, duration: 0.1 })
      .to('.deploy-btn', { scale: 0.95, opacity: 0.8, duration: 0.1 }, '<')
      .to('.click-cursor', { scale: 1, duration: 0.1 })
      .to('.deploy-btn', { scale: 1, opacity: 1, duration: 0.1 }, '<')
      
      // Reset
      .set('.day-3', { backgroundColor: 'transparent', color: '#fff', delay: 1 })
      .to('.click-cursor', { x: 0, y: 0, duration: 0.5, ease: 'power2.inOut' });
      
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="h-32 w-full relative bg-dark-surface/50 rounded-xl border border-white/5 p-4 flex flex-col items-center justify-center">
      <div className="w-full flex justify-between items-center px-2 mb-6 text-sm font-mono text-white/50 relative z-0">
        <div className="w-6 h-6 flex items-center justify-center rounded-md transition-colors day-1">M</div>
        <div className="w-6 h-6 flex items-center justify-center rounded-md transition-colors day-2">D</div>
        <div className="w-6 h-6 flex items-center justify-center rounded-md transition-colors day-3">M</div>
        <div className="w-6 h-6 flex items-center justify-center rounded-md transition-colors day-4">D</div>
        <div className="w-6 h-6 flex items-center justify-center rounded-md transition-colors day-5">F</div>
      </div>
      
      <div className="deploy-btn bg-white/10 border border-white/20 rounded-md px-4 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white">
        Deploy Creative
      </div>
      
      <div className="click-cursor absolute top-4 left-4 z-10 w-5 h-5 text-white/90 drop-shadow-md">
        <MousePointer2 className="w-full h-full fill-white/20" />
      </div>
    </div>
  );
}
