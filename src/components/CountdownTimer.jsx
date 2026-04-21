import { useState, useEffect, useRef } from 'react';

const LOOP_DURATION_MS = 20 * 24 * 60 * 60 * 1000; // 20 days
const STORAGE_KEY = 'reelygood_countdown_target';

function computeParts(distance) {
  return {
    days:    Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

function getOrInitTarget() {
  if (typeof window === 'undefined') return Date.now() + LOOP_DURATION_MS;
  const stored = Number(localStorage.getItem(STORAGE_KEY));
  const now = Date.now();
  if (stored && stored > now) return stored;
  // Expired or not set → start a fresh 20-day cycle from now
  const next = now + LOOP_DURATION_MS;
  localStorage.setItem(STORAGE_KEY, String(next));
  return next;
}

export default function CountdownTimer() {
  const targetRef = useRef(null);
  if (targetRef.current === null) {
    targetRef.current = getOrInitTarget();
  }

  const [timeLeft, setTimeLeft] = useState(() =>
    computeParts(Math.max(0, targetRef.current - Date.now()))
  );

  useEffect(() => {
    const compute = () => {
      const now = Date.now();
      let distance = targetRef.current - now;

      // Loop: restart a new 20-day cycle once we hit zero
      if (distance <= 0) {
        const next = now + LOOP_DURATION_MS;
        targetRef.current = next;
        try { localStorage.setItem(STORAGE_KEY, String(next)); } catch { /* ignore */ }
        distance = LOOP_DURATION_MS;
      }

      setTimeLeft(computeParts(distance));
    };

    compute();
    const interval = setInterval(compute, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center mt-24 sm:mt-32 md:mt-40 mb-8 md:mb-12 hero-el w-full">
      <h2 className="font-druk text-3xl sm:text-4xl md:text-5xl text-white tracking-[-0.02em] mb-8 md:mb-10 text-center leading-tight">
        Angebot endet bald!
      </h2>

      <div className="flex items-center gap-3 sm:gap-5 md:gap-6 mb-10 md:mb-12">
        <TimeUnit value={formatNumber(timeLeft.days)} label="Days" />
        <TimeUnit value={formatNumber(timeLeft.hours)} label="Hour" />
        <TimeUnit value={formatNumber(timeLeft.minutes)} label="Min" />
        <TimeUnit value={formatNumber(timeLeft.seconds)} label="Sec" />
      </div>

      <p className="text-white font-bold text-base sm:text-lg md:text-xl tracking-wide text-center">
        Sichere dir dein kostenfreies Video
      </p>
    </div>
  );
}

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-accent rounded-xl md:rounded-2xl w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center shadow-[0_0_24px_rgba(47,215,191,0.22)] hover:scale-105 transition-transform duration-300">
        <span className="text-black font-bold text-2xl sm:text-3xl md:text-4xl font-sans">{value}</span>
      </div>
      <span className="text-white text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase">{label}</span>
    </div>
  );
}
