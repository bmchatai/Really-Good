import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  { brand: 'Prepmymeal',      src: '/Nr. 1 - Die Proteinbombe.mp4' },
  { brand: 'Prepmymeal',      src: '/Nr. 4 - Gericht splitten.mp4' },
  { brand: 'Prepmymeal',      src: '/PMM - Nr. 4 - choose your meal.mp4' },
  { brand: 'Matcha Baby',     src: '/Nr. 4 - Clean Mango Matcha.mp4' },
  { brand: 'SNOCKS',          src: '/SNOCKS.mp4' },
  { brand: 'Nigela',          src: '/Nr. 1 - Beautyvideo.mp4' },
  { brand: 'SoA',             src: '/Nr. 4 - Kane Koffer Evra.mp4' },
  { brand: 'I Do',            src: '/I Do Nr. 1 - Motion Ad.mov' },
  { brand: 'Frittenwerk',     src: '/Frittenwerk -  Reel by ReelyGood.mp4' },
  { brand: 'Dryll',           src: '/Dryll Cinematic Hook 2.mp4' },
  { brand: 'Kryptomillionär', src: '/Kryptomillionär (korrigiert).mp4' },
  { brand: 'Nurisan',         src: '/Nurisan - Testvideo 1.mp4' },
  { brand: 'Storytelling',    src: '/Nr. 3 - Storytelling Hook 2.mp4' },
];

const HEADING_WORDS = 'So sehen unsere Videos aus'.split(' ');
const CARD_W   = 220; // px – width of each card
const CARD_GAP = 24;  // px – gap between cards

function VideoCard({ brand, src, isCenter, onSelect }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // pause when no longer center
  useEffect(() => {
    if (!isCenter && playing) {
      videoRef.current?.pause();
      setPlaying(false);
    }
  }, [isCenter, playing]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onEnded = () => setPlaying(false);
    vid.addEventListener('ended', onEnded);
    return () => vid.removeEventListener('ended', onEnded);
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isCenter) {
      onSelect?.();
      return;
    }
    const vid = videoRef.current;
    if (!vid) return;
    if (playing) {
      vid.pause();
      setPlaying(false);
    } else {
      // Unmute on explicit user gesture so sound plays back
      vid.muted = false;
      vid.play();
      setPlaying(true);
    }
  };

  // iOS Safari won't render the first frame until user interaction unless the
  // video is muted and we explicitly nudge currentTime once metadata loads.
  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (!vid) return;
    try { vid.currentTime = 0.1; } catch { /* ignore */ }
  };

  return (
    <div
      className="relative shrink-0"
      style={{
        width:       CARD_W,
        aspectRatio: '9/16',
        transition:  'transform 0.45s cubic-bezier(0.33,1,0.68,1), opacity 0.45s ease',
        transform:   isCenter ? 'scale(1.1)'  : 'scale(0.88)',
        opacity:     isCenter ? 1             : 0.55,
        zIndex:      isCenter ? 10            : 1,
        cursor:      isCenter ? 'pointer'     : 'pointer',
      }}
      onClick={handleClick}
    >
      {/* ── Backlight ── */}
      {isCenter && (
        <>
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
          {/* side halos */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '10% -50px 10% -50px',
              background: 'radial-gradient(ellipse 55% 40% at 0% 50%, rgba(47,215,191,0.18), transparent 70%)',
              filter: 'blur(16px)',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '10% -50px 10% -50px',
              background: 'radial-gradient(ellipse 55% 40% at 100% 50%, rgba(47,215,191,0.18), transparent 70%)',
              filter: 'blur(16px)',
            }}
          />
        </>
      )}

      {/* ── Card shell ── */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border"
        style={{
          borderColor: isCenter ? 'rgba(47,215,191,0.45)' : 'rgba(255,255,255,0.06)',
          boxShadow:   isCenter
            ? '0 0 50px -10px rgba(47,215,191,0.35), 0 30px 70px -15px rgba(0,0,0,0.9)'
            : '0 10px 30px -8px rgba(0,0,0,0.6)',
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
        >
          {/* Desktop browsers (Chrome/Firefox) won't touch .mov unless we
              declare an mp4 type — most of these files are H.264 in a .mov
              container, which they can actually decode. */}
          <source src={encodeURI(src)} type="video/mp4" />
          <source src={encodeURI(src)} type="video/quicktime" />
        </video>

        {/* gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none transition-opacity duration-300"
          style={{ opacity: playing ? 0 : 1 }}
        />

        {/* play button */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}

        {/* brand label */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
          <span className="font-sans font-semibold text-white text-sm">{brand}</span>
        </div>
      </div>
    </div>
  );
}

export default function VideoTestimonials() {
  const container   = useRef(null);
  const trackRef    = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef   = useRef(0);

  // drag state (all refs – no re-render during drag)
  const dragStartX  = useRef(null);
  const dragDelta   = useRef(0);
  const isDragging  = useRef(false);

  const getBaseX = (idx) =>
    window.innerWidth / 2 - (idx * (CARD_W + CARD_GAP) + CARD_W / 2);

  const applyTransform = (x, animated) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = animated
      ? 'transform 0.45s cubic-bezier(0.33,1,0.68,1)'
      : 'none';
    track.style.transform = `translateX(${x}px)`;
  };

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(videos.length - 1, idx));
    activeRef.current = clamped;
    setActive(clamped);
    applyTransform(getBaseX(clamped), true);
  };

  // Keep transform in sync when active changes via keyboard / dots / arrows
  useEffect(() => {
    applyTransform(getBaseX(active), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  goTo(activeRef.current - 1);
      if (e.key === 'ArrowRight') goTo(activeRef.current + 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // drag / swipe – live feedback via direct DOM mutation.
  // We only call setPointerCapture once a real drag is detected, so plain
  // clicks still bubble up to the video cards (required for desktop mouse).
  const capturedPointer = useRef({ el: null, id: null });

  const onPointerDown = (e) => {
    isDragging.current = false;
    dragStartX.current = e.clientX;
    dragDelta.current  = 0;
  };

  const onPointerMove = (e) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragDelta.current = delta;
    if (Math.abs(delta) > 6) {
      if (!isDragging.current) {
        isDragging.current = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
          capturedPointer.current = { el: e.currentTarget, id: e.pointerId };
        } catch { /* ignore */ }
      }
      // rubber-band resistance at edges
      const resistance = (activeRef.current === 0 && delta > 0) ||
                         (activeRef.current === videos.length - 1 && delta < 0)
        ? 0.25 : 1;
      applyTransform(getBaseX(activeRef.current) + delta * resistance, false);
    }
  };

  const onPointerUp = () => {
    if (dragStartX.current === null) return;
    const delta = dragDelta.current;
    let next = activeRef.current;
    const wasDragging = isDragging.current;
    if (wasDragging && Math.abs(delta) > 40) {
      next = delta < 0
        ? Math.min(activeRef.current + 1, videos.length - 1)
        : Math.max(activeRef.current - 1, 0);
    }
    dragStartX.current = null;
    dragDelta.current  = 0;
    isDragging.current = false;
    const { el, id } = capturedPointer.current;
    if (el && id !== null) {
      try { el.releasePointerCapture(id); } catch { /* ignore */ }
      capturedPointer.current = { el: null, id: null };
    }
    // Only snap via goTo when we actually dragged — a plain click should
    // let the VideoCard's onClick handle play/select.
    if (wasDragging) goTo(next);
  };

  // scroll-in animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.vtest-word',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.75, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '.vtest-heading', start: 'top 85%' } }
      );
      gsap.fromTo('.vtest-underline',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.4,
          scrollTrigger: { trigger: '.vtest-heading', start: 'top 80%' } }
      );
      gsap.fromTo('.vtest-viewport',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.vtest-viewport', start: 'top 90%' } }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative py-16 md:py-28 bg-black w-full flex flex-col items-center border-t border-white/5 overflow-hidden"
    >
      <AnimatedBackground />
      {/* Heading */}
      <div className="vtest-heading text-center mb-12 md:mb-20 relative px-4">
        <h2 className="font-druk text-4xl md:text-5xl uppercase tracking-[-0.02em] inline-block relative">
          {HEADING_WORDS.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.25em] last:mr-0">
              <span className="vtest-word inline-block">{word}</span>
            </span>
          ))}
          <div className="vtest-underline absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-full shadow-accent-glow origin-left" />
        </h2>
      </div>

      {/* Viewport – clips cards, allows glow to bleed via overflow-visible on track */}
      <div
        className="vtest-viewport w-full overflow-hidden select-none"
        style={{ padding: '60px 0 70px', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Track – translates left/right */}
        <div
          ref={trackRef}
          className="flex items-center"
          style={{
            gap:       CARD_GAP,
            willChange:'transform',
            cursor:    'grab',
          }}
        >
          {videos.map((v, i) => (
            <VideoCard
              key={i}
              brand={v.brand}
              src={v.src}
              isCenter={i === active}
              onSelect={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-2">
        <button
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:border-accent/50 hover:bg-accent/10 transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-2">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width:      i === active ? 24 : 6,
                height:     6,
                background: i === active ? '#2FD7BF' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(active + 1)}
          disabled={active === videos.length - 1}
          className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:border-accent/50 hover:bg-accent/10 transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </section>
  );
}
