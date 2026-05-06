import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';
import { annotate } from 'rough-notation';
import MagneticButton from './MagneticButton';
import AnimatedBackground from './AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

// Split heading lines into word spans per line so we can reveal line-by-line
const HEADING_LINES = [
  ["WIR", "PRODUZIEREN"],
  ["DIR", "KOSTENLOS"],
  ["EIN", "TESTVIDEO"],
];

export default function FreeVideoCTA() {
  const container     = useRef(null);
  const highlightRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stars stagger in
      gsap.fromTo(
        '.cta-star',
        { scale: 0, opacity: 0, rotate: -30 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 75%',
          }
        }
      );

      // Star label fades in
      gsap.fromTo(
        '.cta-star-label',
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 75%',
          },
          delay: 0.4,
        }
      );

      // Heading: word-by-word clip reveal, staggered line by line
      gsap.fromTo(
        '.cta-word',
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-heading',
            start: 'top 78%',
          },
          delay: 0.2,
          onComplete: () => {
            if (highlightRef.current) {
              const ann = annotate(highlightRef.current, {
                type: 'highlight',
                color: 'rgba(47,215,191,0.28)',
                strokeWidth: 3,
                animationDuration: 700,
                padding: 4,
              });
              ann.show();
            }
          },
        }
      );

      // Subtext slides up after heading
      gsap.fromTo(
        '.cta-subtext',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-heading',
            start: 'top 72%',
          },
          delay: 0.6,
        }
      );

      // CTA button: bouncy pop-in
      gsap.fromTo(
        '.cta-button',
        { scale: 0.8, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'back.out(1.8)',
          scrollTrigger: {
            trigger: '.cta-heading',
            start: 'top 68%',
          },
          delay: 0.85,
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="freevideo-section py-20 md:py-40 px-4 w-full flex flex-col items-center relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-dark-surface z-0"></div>
      <AnimatedBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,215,191,0.15)_0%,rgba(10,10,10,0.85)_70%)] z-0 pointer-events-none"></div>

      <div className="max-w-3xl w-full flex flex-col items-center text-center relative z-10">

        {/* Trust Element */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star key={i} className="cta-star w-4 h-4 fill-accent text-accent" />
            ))}
          </div>
          <span className="cta-star-label font-mono text-xs font-semibold text-accent uppercase tracking-wider">
            5/5 Sterne aus 45+ Google-Bewertungen
          </span>
        </div>

        {/* Headline — word-by-word reveal */}
        <h2 className="cta-heading font-druk text-[2rem] sm:text-4xl md:text-5xl lg:text-[4rem] uppercase leading-[1.1] tracking-[-0.02em] text-white mb-6 md:mb-8">
          {HEADING_LINES.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => (
                <span
                  key={wi}
                  className="inline-block overflow-hidden align-bottom pb-1 mr-[0.25em] last:mr-0"
                >
                  {word === 'KOSTENLOS' ? (
                    <span className="cta-word inline-block" ref={highlightRef}>{word}</span>
                  ) : (
                    <span className="cta-word inline-block">{word}</span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </h2>

        {/* Subline */}
        <p className="cta-subtext font-sans text-base md:text-xl text-white/80 leading-relaxed font-light max-w-2xl mb-8 md:mb-12">
          Im Grunde genommen spricht nichts dagegen.<br /><br />
          Du bekommst nicht nur ein kostenloses Video, sondern erhältst einen Einblick, wie man es schafft, JEDES Produkt zielgruppengerecht zu positionieren.
        </p>

        {/* CTA Button */}
        <MagneticButton className="cta-button group mb-12 md:mb-20 w-auto">
          <a
            href="https://form.typeform.com/to/dDmy0xtw"
            target="_blank"
            rel="noreferrer"
            className="relative overflow-hidden bg-[#e6321c] text-white font-bold text-base md:text-xl px-7 md:px-10 py-3.5 md:py-5 min-h-[52px] md:min-h-[56px] rounded-full inline-flex items-center justify-center gap-3 transition-transform duration-300 will-change-transform btn-red-glow w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              In 30 Sekunden zum Free Video!
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
          </a>
        </MagneticButton>

      </div>
    </section>
  );
}
