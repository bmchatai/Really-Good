import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudies() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter Animation
      const counters = document.querySelectorAll('.counter-val');
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        const isNegative = target < 0;
        
        gsap.to(counter, {
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%',
          },
          innerHTML: target,
          duration: 2,
          ease: 'power3.out',
          snap: { innerHTML: isNegative ? 1 : 0.01 },
          onUpdate: function() {
            let val = Math.abs(parseFloat(this.targets()[0].innerHTML)).toFixed(isNegative ? 0 : 2);
            this.targets()[0].innerHTML = `${isNegative ? '-' : ''}${prefix}${val}${suffix}`;
          }
        });
      });

      // Path Animation
      gsap.fromTo(
        '#growth-path',
        { strokeDasharray: 500, strokeDashoffset: 500 },
        {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.svg-container',
            start: 'top 80%',
          }
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="case-studies" ref={container} className="py-16 md:py-32 px-4 bg-dark-surface w-full flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12 md:mb-24 relative">
          <h2 className="font-druk text-4xl md:text-5xl uppercase tracking-[-0.02em] inline-block relative">
            Case Studies
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-full shadow-accent-glow"></div>
          </h2>
        </div>

        <div className="flex flex-col gap-12 md:gap-24">

          {/* Case Study 1: Zite Fishing */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="w-full lg:w-1/2 text-left order-2 lg:order-1">
              <h3 className="font-sans font-semibold text-2xl md:text-4xl text-white mb-4 md:mb-6">KUNDE ZITE FISHING</h3>
              <p className="font-sans text-base md:text-lg text-text-secondary leading-relaxed mb-6 md:mb-8">
                Zite Fishing erstellen wir primär nativen und authentischen Content, der effektiv auf die Zielgruppe abzielt und diese abholt. Fortlaufend erstellen wir Winning Creatives, die die KPI-Benchmarks outperformen:
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <span className="font-sans text-xs text-text-secondary uppercase tracking-wider mb-2">Campaign 1</span>
                  <div className="font-mono text-xl text-white"><span className="text-accent">CPA</span> -54%</div>
                  <div className="font-mono text-xl text-white"><span className="text-accent">ROAS</span> 8,84x</div>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs text-text-secondary uppercase tracking-wider mb-2">Campaign 2</span>
                  <div className="font-mono text-xl text-white"><span className="text-accent">CPA</span> -52%</div>
                  <div className="font-mono text-xl text-white"><span className="text-accent">ROAS</span> 8,63x</div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="bg-card-surface border border-accent-base rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 relative overflow-hidden group hover:shadow-accent-glow transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-accent" />
                    <span className="font-mono text-sm tracking-widest text-white/50">PERFORMANCE DASHBOARD</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-accent-glow"></div>
                </div>

                <div className="space-y-8">
                  <div className="flex flex-col">
                    <span className="font-sans text-sm text-text-secondary mb-1">Avg. CPA Reduction</span>
                    <div className="font-mono text-5xl md:text-6xl text-white flex items-baseline gap-2">
                      <span className="text-success-green flex items-center">-</span>
                      <span className="counter-val" data-target="51.6" data-suffix="%">0</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-sm text-text-secondary mb-1">Peak ROAS</span>
                    <div className="font-mono text-5xl md:text-6xl text-white flex items-baseline gap-2">
                      <span className="text-success-green flex items-center">&uarr;</span>
                      <span className="counter-val" data-target="8.84" data-suffix="x">0.00x</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-white/5"></div>

          {/* Case Study 2: Nigela */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            
            <div className="w-full lg:w-1/2">
              <div className="svg-container bg-card-surface border border-accent-base rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 h-56 md:h-80 flex flex-col justify-end relative overflow-hidden group hover:shadow-accent-glow transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-50"></div>
                <div className="absolute top-8 left-8">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                
                {/* SVG Growth Chart */}
                <svg viewBox="0 0 400 200" className="w-full h-full absolute inset-0 pt-20" preserveAspectRatio="none">
                  <path
                    d="M 0 200 Q 100 200 150 150 T 250 80 T 400 20"
                    fill="none"
                    stroke="var(--accent-border)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                  <path
                    id="growth-path"
                    d="M 0 200 Q 100 200 150 150 T 250 80 T 400 20"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="drop-shadow-lg"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2FD7BF" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#2FD7BF" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Data Points */}
                  <circle cx="150" cy="150" r="4" fill="#2FD7BF" />
                  <circle cx="250" cy="80" r="4" fill="#2FD7BF" />
                  <circle cx="400" cy="20" r="6" fill="#fff" className="animate-pulse shadow-[0_0_15px_#2FD7BF]" />
                </svg>
              </div>
            </div>

            <div className="w-full lg:w-1/2 text-left">
              <h3 className="font-sans font-semibold text-2xl md:text-4xl text-white mb-4 md:mb-6">Testimonial</h3>
              <p className="font-sans text-base md:text-lg text-text-secondary leading-relaxed mb-6 md:mb-8">
                Mit einer klaren Creative-Strategie und datengetriebenen Ads haben wir Nigela dabei unterstützt, ihren Meta Ad Account profitabel zu skalieren. Heute gehört Nigela zu den Marktführern für Schwarzkümmelöl in Deutschland.
              </p>
              
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border border-accent/20">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <span className="font-mono text-sm tracking-widest text-accent uppercase">Marktführung erreicht</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
