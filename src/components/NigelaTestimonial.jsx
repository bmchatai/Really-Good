import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

export default function NigelaTestimonial() {
  const container = useRef(null);
  const videoRef  = useRef(null);
  const [playing, setPlaying] = useState(false);
  // Defer mounting the <video> until the section is near the viewport so it
  // doesn't hold an H.264 decoder while the user is on the hero or scrolling
  // through the page.
  const [mountVideo, setMountVideo] = useState(false);
  useEffect(() => {
    const el = container.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setMountVideo(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMountVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (playing) {
      vid.pause();
      setPlaying(false);
    } else {
      vid.muted = false; // user gesture → allow sound
      vid.play();
      setPlaying(true);
    }
  };

  // iOS Safari refuses to paint the first frame of a <video> until a user
  // gesture unless it's muted + we nudge currentTime after metadata loads.
  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (!vid) return;
    try { vid.currentTime = 0.1; } catch { /* ignore */ }
  };

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onEnded = () => setPlaying(false);
    vid.addEventListener('ended', onEnded);
    return () => vid.removeEventListener('ended', onEnded);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.nigela-heading',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: container.current, start: 'top 80%' } }
      );
      gsap.fromTo(
        '.nigela-video-wrap',
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: container.current, start: 'top 75%' } }
      );
      gsap.fromTo(
        '.nigela-content',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: container.current, start: 'top 75%' } }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative py-16 md:py-28 px-4 bg-black w-full flex flex-col items-center border-t border-white/5 overflow-hidden"
    >
      <AnimatedBackground />
      {/* Heading */}
      <div className="nigela-heading text-center mb-12 md:mb-20 relative">
        <h2 className="font-druk text-4xl md:text-5xl uppercase tracking-[-0.02em] inline-block relative">
          Testimonial
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-full shadow-accent-glow" />
        </h2>
      </div>

      <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* ── Video with backlight ── */}
        <div
          className="nigela-video-wrap relative shrink-0 cursor-pointer"
          style={{ width: 260, aspectRatio: '9/16' }}
          onClick={toggle}
        >
          {/* bottom bloom */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '-30px -40px -50px -40px',
              background: 'radial-gradient(ellipse 70% 55% at 50% 100%, rgba(47,215,191,0.55), transparent 70%)',
              filter: 'blur(22px)',
            }}
          />
          {/* top bloom */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '-40px -40px auto -40px',
              height: '160px',
              background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(47,215,191,0.30), transparent 70%)',
              filter: 'blur(18px)',
            }}
          />
          {/* left halo */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '10% -50px 10% -50px',
              background: 'radial-gradient(ellipse 55% 40% at 0% 50%, rgba(47,215,191,0.18), transparent 70%)',
              filter: 'blur(16px)',
            }}
          />
          {/* right halo */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '10% -50px 10% -50px',
              background: 'radial-gradient(ellipse 55% 40% at 100% 50%, rgba(47,215,191,0.18), transparent 70%)',
              filter: 'blur(16px)',
            }}
          />

          {/* Card shell */}
          <div
            className="relative w-full h-full rounded-2xl overflow-hidden border"
            style={{
              borderColor: 'rgba(47,215,191,0.45)',
              boxShadow: '0 0 50px -10px rgba(47,215,191,0.35), 0 30px 70px -15px rgba(0,0,0,0.9)',
            }}
          >
            {mountVideo ? (
              <video
                ref={videoRef}
                src="/Nigela Testi Chris.mp4"
                className="w-full h-full object-cover"
                playsInline
                muted
                preload="metadata"
                onLoadedMetadata={handleLoadedMetadata}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-white/[0.04] to-white/[0.02]" />
            )}

            {/* gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none transition-opacity duration-300"
              style={{ opacity: playing ? 0 : 1 }}
            />

            {/* play button */}
            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-7 h-7 text-white fill-white ml-0.5" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Text content ── */}
        <div className="nigela-content flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
          {/* Logo */}
          <img
            src="/kunden-logos/Nigela.png"
            alt="Nigela"
            className="object-contain brightness-0 invert h-32 md:h-44 max-w-[420px] md:max-w-[520px]"
          />

          {/* Description */}
          <p className="font-sans text-base md:text-lg text-white leading-relaxed max-w-md">
            Mit einer klaren Creative-Strategie und datengetriebenen Ads haben wir Nigela
            dabei unterstützt, ihren Meta Ad Account profitabel zu skalieren.
          </p>

          <p className="font-sans text-base md:text-lg text-white leading-relaxed max-w-md">
            Heute gehört Nigela zu den Marktführern für Schwarzkümmelöl in Deutschland.
          </p>
        </div>
      </div>
    </section>
  );
}
