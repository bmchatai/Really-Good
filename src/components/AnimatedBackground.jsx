import { useEffect, useMemo, useState } from 'react';

const ACCENT_RGB = '47,215,191';

export default function AnimatedBackground({ variant = 'default' }) {
  const gridSize = variant === 'tight' ? '60px 60px' : '80px 80px';

  // Detect touch/mobile so we can render a slimmer, GPU-cheaper version.
  // Mobile gets fewer particles, smaller blurs, no rotating conic gradient.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px), (hover: none) and (pointer: coarse)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const particleCount = isMobile ? 8 : 28;
  const streakCount   = isMobile ? 1 : 4;

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: -Math.random() * 10,
        dur: 8 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 40,
        opacity: 0.25 + Math.random() * 0.55,
      })),
    [particleCount]
  );

  const streaks = useMemo(
    () =>
      Array.from({ length: streakCount }).map(() => ({
        top: 10 + Math.random() * 70,
        delay: -Math.random() * 14,
        dur: 9 + Math.random() * 6,
        width: 120 + Math.random() * 140,
      })),
    [streakCount]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes ab-orb-a { 0%,100% { transform: translate3d(-8%, 0, 0) scale(1); } 50% { transform: translate3d(8%, -6%, 0) scale(1.12); } }
        @keyframes ab-orb-b { 0%,100% { transform: translate3d(6%, 4%, 0) scale(1.05); } 50% { transform: translate3d(-10%, -4%, 0) scale(0.92); } }
        @keyframes ab-orb-c { 0%,100% { transform: translate3d(0, 0, 0) scale(1); } 50% { transform: translate3d(4%, 8%, 0) scale(1.15); } }
        @keyframes ab-orb-d { 0%,100% { transform: translate3d(0, 0, 0) scale(0.9); opacity: 0.35; } 50% { transform: translate3d(-6%, 10%, 0) scale(1.1); opacity: 0.8; } }
        @keyframes ab-scan  { 0% { transform: translateY(-100%); } 100% { transform: translateY(260%); } }
        @keyframes ab-scan-x { 0% { transform: translateX(-100%); } 100% { transform: translateX(260%); } }
        @keyframes ab-grid  { 0% { background-position: 0 0; } 100% { background-position: 80px 80px; } }
        @keyframes ab-conic { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        @keyframes ab-particle {
          0%   { transform: translate3d(0, 0, 0) scale(1);    opacity: 0; }
          10%  { opacity: var(--ab-o, 0.5); }
          50%  { transform: translate3d(var(--ab-dx, 0), -40px, 0) scale(1.2); }
          90%  { opacity: var(--ab-o, 0.5); }
          100% { transform: translate3d(var(--ab-dx, 0), -80px, 0) scale(0.6); opacity: 0; }
        }

        @keyframes ab-streak {
          0%   { transform: translateX(-120%) translateY(0) rotate(-12deg); opacity: 0; }
          10%  { opacity: 0.9; }
          100% { transform: translateX(120vw) translateY(-20px) rotate(-12deg); opacity: 0; }
        }

        @keyframes ab-pulse-dot {
          0%,100% { transform: scale(1); opacity: 0.6; }
          50%     { transform: scale(1.8); opacity: 0.15; }
        }

        .ab-orb-a { animation: ab-orb-a 18s ease-in-out infinite; }
        .ab-orb-b { animation: ab-orb-b 22s ease-in-out infinite; }
        .ab-orb-c { animation: ab-orb-c 26s ease-in-out infinite; }
        .ab-orb-d { animation: ab-orb-d 20s ease-in-out infinite; }
        .ab-scan  { animation: ab-scan 14s linear infinite; }
        .ab-scan-x { animation: ab-scan-x 22s linear infinite; }
        .ab-grid-anim { animation: ab-grid 40s linear infinite; }
        .ab-conic-anim { animation: ab-conic 60s linear infinite; }
        .ab-particle { animation: ab-particle var(--ab-d, 10s) ease-in-out infinite; }
        .ab-streak { animation: ab-streak var(--ab-d, 12s) linear infinite; }
        .ab-pulse-dot { animation: ab-pulse-dot 3.5s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ab-orb-a, .ab-orb-b, .ab-orb-c, .ab-orb-d,
          .ab-scan, .ab-scan-x, .ab-grid-anim, .ab-conic-anim,
          .ab-particle, .ab-streak, .ab-pulse-dot { animation: none !important; }
        }
      `}</style>

      {/* Rotating conic gradient — desktop only (rotating giant blur is GPU-heavy) */}
      {!isMobile && (
        <div
          className="ab-conic-anim absolute -inset-1/4 opacity-[0.06]"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(${ACCENT_RGB},0.35) 60deg, transparent 140deg, rgba(${ACCENT_RGB},0.25) 240deg, transparent 320deg)`,
            filter: 'blur(60px)',
          }}
        />
      )}

      {/* Core orbs — smaller blur on mobile */}
      <div
        className="ab-orb-a absolute top-[-10%] left-[-10%] rounded-full"
        style={{
          width: isMobile ? 320 : 520,
          height: isMobile ? 320 : 520,
          filter: `blur(${isMobile ? 70 : 130}px)`,
          background: `rgba(${ACCENT_RGB},0.08)`,
        }}
      />
      <div
        className="ab-orb-b absolute bottom-[-10%] right-[-8%] rounded-full"
        style={{
          width: isMobile ? 300 : 480,
          height: isMobile ? 300 : 480,
          filter: `blur(${isMobile ? 70 : 120}px)`,
          background: `rgba(${ACCENT_RGB},0.06)`,
        }}
      />

      {/* Extra orbs — desktop only */}
      {!isMobile && (
        <>
          <div
            className="ab-orb-c absolute top-[40%] left-[35%] w-[420px] h-[420px] rounded-full blur-[140px]"
            style={{ background: `rgba(${ACCENT_RGB},0.04)` }}
          />
          <div
            className="ab-orb-d absolute top-[15%] right-[20%] w-[300px] h-[300px] rounded-full blur-[110px]"
            style={{ background: `rgba(${ACCENT_RGB},0.05)` }}
          />
        </>
      )}

      {/* Drifting grid */}
      <div
        className="ab-grid-anim absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(${ACCENT_RGB},0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${ACCENT_RGB},0.5) 1px, transparent 1px)
          `,
          backgroundSize: gridSize,
        }}
      />

      {/* Floating particle field */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="ab-particle absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: `rgba(${ACCENT_RGB},${p.opacity})`,
            boxShadow: `0 0 ${p.size * 3}px rgba(${ACCENT_RGB},${p.opacity})`,
            '--ab-d': `${p.dur}s`,
            '--ab-dx': `${p.drift}px`,
            '--ab-o': p.opacity,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Diagonal light streaks */}
      {streaks.map((s, i) => (
        <span
          key={i}
          className="ab-streak absolute h-px"
          style={{
            top: `${s.top}%`,
            left: 0,
            width: s.width,
            background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.6), transparent)`,
            filter: 'blur(0.5px)',
            '--ab-d': `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Pulsing accent dots — desktop only */}
      {!isMobile && (
        <>
          <span
            className="ab-pulse-dot absolute w-1.5 h-1.5 rounded-full top-[22%] left-[18%]"
            style={{ background: `rgba(${ACCENT_RGB},0.8)`, boxShadow: `0 0 10px rgba(${ACCENT_RGB},0.6)` }}
          />
          <span
            className="ab-pulse-dot absolute w-1 h-1 rounded-full top-[68%] left-[82%]"
            style={{ background: `rgba(${ACCENT_RGB},0.7)`, boxShadow: `0 0 8px rgba(${ACCENT_RGB},0.5)`, animationDelay: '1.2s' }}
          />
          <span
            className="ab-pulse-dot absolute w-1 h-1 rounded-full top-[80%] left-[30%]"
            style={{ background: `rgba(${ACCENT_RGB},0.7)`, boxShadow: `0 0 8px rgba(${ACCENT_RGB},0.5)`, animationDelay: '2.1s' }}
          />
        </>
      )}

      {/* Scanline sweep — desktop only (big blurred sweeps are GPU-heavy) */}
      {!isMobile && (
        <>
          <div
            className="ab-scan absolute inset-x-0 h-[55%]"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, rgba(${ACCENT_RGB},0.04) 50%, transparent 100%)`,
            }}
          />
          <div
            className="ab-scan-x absolute inset-y-0 w-[40%]"
            style={{
              background: `linear-gradient(to right, transparent 0%, rgba(${ACCENT_RGB},0.03) 50%, transparent 100%)`,
            }}
          />
        </>
      )}

      {/* Vignette to blend back into surrounding sections */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, #000 95%)' }}
      />
    </div>
  );
}
