import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Highlighter } from './magicui/highlighter';

gsap.registerPlugin(ScrollTrigger);

export default function VideoSteps() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.step-card',
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 80%'
          }
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="py-16 md:py-32 px-4 bg-black w-full flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col items-center">
        
        <h2 className="font-druk text-3xl md:text-5xl uppercase tracking-[-0.02em] text-center text-white mb-12 lg:mb-20">
          In <Highlighter action="highlight" color="#2FD7BF" strokeWidth={2} animationDuration={1000} padding={2} isView={true}>3 einfachen</Highlighter> Schritten<br/>
          zu Deinem Video:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 w-full mb-12">
          {[
            { num: "1", text: "Du schickst uns Dein Produkt" },
            { num: "2", text: "Wir produzieren das finale Video" },
            { num: "3", text: "Du siehst, wie kreativ Dein Produkt in Szene gesetzt werden kann!" }
          ].map((step, i) => (
            <div key={i} className="step-card flex flex-col items-center text-center gap-4 p-8 rounded-[2rem] bg-card-surface border border-accent/20 shadow-accent-glow hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center font-druk text-3xl text-accent">
                {step.num}
              </div>
              <p className="font-sans text-lg md:text-xl text-white leading-relaxed font-semibold">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center flex flex-col items-center">
          <p className="text-xl md:text-2xl text-white font-medium mb-10">
            Wir übernehmen den gesamten Prozess -<br />
            Du siehst, was möglich ist!
          </p>
          
          <a
            href="https://form.typeform.com/to/dDmy0xtw"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden bg-[#e6321c] text-white font-bold text-base md:text-xl px-10 py-5 min-h-[56px] rounded-full flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(230,50,28,0.3)] w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              In 30 Sekunden zum Free Video!
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
          </a>
        </div>

      </div>
    </section>
  );
}
