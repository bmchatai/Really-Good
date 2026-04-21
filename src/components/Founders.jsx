import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from './AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    name: "Hakan Kara",
    role: "Geschäftsführer & Creative Strategist",
    image: "/hakan.png",
    bio: "Hakan entwickelt die kreativen Strategien, die aus Produkten echte Bestseller machen. Mit seinem Gespür für Zielgruppen und datengetriebene Creatives hat er bereits dutzende Brands profitabel skaliert."
  },
  {
    name: "Koray Kartal",
    role: "Geschäftsführer & Produktion",
    image: "/koray.png",
    bio: "Koray verantwortet die gesamte Produktionsseite – von der ersten Idee bis zum finalen Cut. Er sorgt dafür, dass jedes Video nicht nur gut aussieht, sondern auch wirklich konvertiert."
  }
];

// "Die Köpfe hinter ReelyGood" split word-by-word
const HEADING_WORDS = ["Die", "Köpfe", "hinter", "ReelyGood"];

export default function Founders() {
  const container  = useRef(null);
  const cardRefs   = useRef([]);

  const handleTiltMove = useCallback((e, i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5; // -0.5 → 0.5
    const y = (e.clientY - top)  / height - 0.5;
    gsap.to(card, {
      rotateX: -y * 12,
      rotateY:  x * 12,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
      transformPerspective: 900,
    });
    const glare = card.querySelector('.tilt-glare');
    if (glare) {
      glare.style.opacity = '1';
      glare.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.07) 0%, transparent 65%)`;
    }
  }, []);

  const handleTiltLeave = useCallback((i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.65,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    });
    const glare = card.querySelector('.tilt-glare');
    if (glare) glare.style.opacity = '0';
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word clip reveal — each word slides up from behind its overflow-hidden wrapper
      gsap.fromTo(
        '.founders-word',
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.founders-heading',
            start: 'top 80%',
          }
        }
      );

      // Accent underline scales in
      gsap.fromTo(
        '.founders-underline',
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.founders-heading',
            start: 'top 75%',
          },
          delay: 0.55,
        }
      );

      // Subtext fades in after heading
      gsap.fromTo(
        '.founders-subtext',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.founders-heading',
            start: 'top 72%',
          },
          delay: 0.7,
        }
      );

      // Cards: staggered from below with a slight scale + vertical rise
      gsap.fromTo(
        '.founder-card',
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.founders-grid',
            start: 'top 82%',
          }
        }
      );

      // Photo ring glow pulse on scroll enter
      gsap.fromTo(
        '.founder-photo',
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.18,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.founders-grid',
            start: 'top 82%',
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative py-16 md:py-32 px-4 bg-black w-full flex flex-col items-center border-t border-white/5 overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-6xl w-full relative z-10">

        {/* Heading */}
        <div className="founders-heading text-center mb-12 md:mb-20 relative">
          <h2 className="font-druk text-4xl md:text-5xl uppercase tracking-[-0.02em] inline-block relative">
            {HEADING_WORDS.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom pb-1 mr-[0.3em] last:mr-0"
              >
                <span className="founders-word inline-block">{word}</span>
              </span>
            ))}
            <div
              className="founders-underline absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-full shadow-accent-glow origin-left"
            />
          </h2>
          <p className="founders-subtext font-sans text-base md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto mt-10">
            Keine anonyme Agentur. Hinter jeder Creative-Strategie stecken zwei Unternehmer, die selbst wissen, was es bedeutet, mit Ads zu skalieren.
          </p>
        </div>

        {/* Founder Cards */}
        <div className="founders-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((founder, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="founder-card relative bg-card-surface border border-white/5 hover:border-accent/30 rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center group"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              onMouseMove={(e) => handleTiltMove(e, i)}
              onMouseLeave={() => handleTiltLeave(i)}
            >
              {/* Glare overlay — paints below content via z-index */}
              <div
                className="tilt-glare absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] pointer-events-none"
                style={{ opacity: 0, transition: 'opacity 0.3s ease', zIndex: 0 }}
              />

              {/* Content — stacks above glare */}
              <div className="relative flex flex-col items-center w-full" style={{ zIndex: 1 }}>
                {/* Photo */}
                <div className="founder-photo w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden mb-6 ring-2 ring-white/10 group-hover:ring-accent/40 transition-all duration-300 flex-shrink-0">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name & Role */}
                <h3 className="font-druk text-xl md:text-2xl uppercase tracking-[-0.01em] text-white mb-1">
                  {founder.name}
                </h3>
                <span className="font-mono text-xs text-accent uppercase tracking-widest mb-5">
                  {founder.role}
                </span>

                {/* Bio */}
                <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed font-light">
                  {founder.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
