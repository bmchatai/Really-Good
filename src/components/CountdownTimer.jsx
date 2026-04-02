import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 22,
    hours: 11,
    minutes: 50,
    seconds: 18,
  });

  useEffect(() => {
    // For this design demo, we create a fake target date in the future
    const targetDate = new Date().getTime() + 
      (22 * 24 * 60 * 60 * 1000) + 
      (11 * 60 * 60 * 1000) + 
      (50 * 60 * 1000) + 
      (18 * 1000);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center mt-24 sm:mt-32 mb-8 hero-el w-full">
      <h2 className="font-druk text-3xl sm:text-4xl md:text-5xl text-white tracking-[-0.02em] mb-10 text-center leading-tight">
        Angebot endet bald!
      </h2>
      
      <div className="flex items-center gap-3 sm:gap-5 mb-14">
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
      <div className="bg-accent rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-[0_0_15px_rgba(47,215,191,0.15)]">
        <span className="text-black font-bold text-2xl sm:text-3xl font-sans">{value}</span>
      </div>
      <span className="text-white text-[10px] sm:text-xs font-semibold tracking-wider">{label}</span>
    </div>
  );
}
