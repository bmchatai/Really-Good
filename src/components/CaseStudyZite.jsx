import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, TrendingUp, Target, Zap, Award, ChevronDown } from 'lucide-react';
import { SmoothCursor } from './magicui/smooth-cursor';

gsap.registerPlugin(ScrollTrigger);

// Animated counter hook
function useCounter(target, duration = 2, suffix = '', prefix = '', decimals = 2) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      start = eased * target;
      setValue(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return { ref, display: `${prefix}${value.toFixed(decimals)}${suffix}` };
}

// Metric card
function MetricCard({ label, value, suffix = '', prefix = '', decimals = 2, color = 'accent', delay = 0 }) {
  const target = parseFloat(value);
  const { ref, display } = useCounter(target, 2.2, suffix, prefix, decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="relative bg-[#0D0D0D] border border-white/5 rounded-2xl p-6 md:p-8 overflow-hidden hover:border-accent/30 transition-colors duration-500">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
        {/* Top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-3 font-mono">{label}</p>
        <div ref={ref} className="font-mono text-4xl md:text-5xl font-bold text-white">
          <span className="text-accent">{prefix}</span>
          {value.includes('.') || decimals > 0
            ? parseFloat(value).toFixed(decimals)
            : value}
          <span className="text-accent">{suffix}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Campaign row card
function CampaignCard({ num, cpa, roas, delay }) {
  const roasNum = parseFloat(roas);
  const cpaNum = parseFloat(cpa);
  const { ref: roasRef, display: roasDisplay } = useCounter(roasNum, 1.8, 'x', '', 2);
  const { ref: cpaRef, display: cpaDisplay } = useCounter(cpaNum, 1.8, '€', '', 2);

  const roasPct = Math.round((roasNum / 10) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="group relative bg-[#0D0D0D] border border-white/5 rounded-2xl p-5 md:p-7 hover:border-accent/20 transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-xs text-white/30 uppercase tracking-[0.2em]">Campaign {num}</span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
          LIVE DATA
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-2 font-mono">CPA</p>
          <div ref={cpaRef} className="font-mono text-2xl md:text-3xl font-bold text-white">
            {cpaDisplay}
          </div>
          <p className="text-xs text-white/40 mt-1">Pro Kauf</p>
        </div>
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-2 font-mono">ROAS</p>
          <div ref={roasRef} className="font-mono text-2xl md:text-3xl font-bold text-accent">
            {roasDisplay}
          </div>
          <p className="text-xs text-white/40 mt-1">Return on Ad Spend</p>
        </div>
      </div>

      {/* ROAS Bar */}
      <div className="mt-5">
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${roasPct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-accent/50 to-accent rounded-full"
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-white/20 font-mono">0x</span>
          <span className="text-[10px] text-white/20 font-mono">10x</span>
        </div>
      </div>
    </motion.div>
  );
}

// Particle background
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(47,215,191,${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(47,215,191,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// Split text reveal
function RevealText({ children, className, delay = 0 }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '110%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

const campaigns = [
  { num: 1, cpa: '10.93', roas: '8.63' },
  { num: 2, cpa: '11.25', roas: '7.33' },
  { num: 3, cpa: '10.67', roas: '8.84' },
  { num: 4, cpa: '11.12', roas: '8.18' },
];

export default function CaseStudyZite() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  // GSAP horizontal scroll for campaigns on desktop
  const hScrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Hero line animations
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-tag',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-badge',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 1.4, ease: 'back.out(1.7)' }
      );
      gsap.fromTo(
        '.scroll-hint',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2, ease: 'power2.out' }
      );

      // Floating glow orbs
      gsap.to('.glow-orb-1', {
        y: -30, x: 15,
        duration: 5, repeat: -1, yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.glow-orb-2', {
        y: 25, x: -20,
        duration: 6.5, repeat: -1, yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
      gsap.to('.glow-orb-3', {
        y: -20, x: 10,
        duration: 4.5, repeat: -1, yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });

      // Section fade-in on scroll
      gsap.utils.toArray('.section-fade').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%' },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black text-white min-h-screen overflow-x-hidden">
      <SmoothCursor />

      {/* Back Nav */}
      <motion.a
        href="/"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="fixed top-6 left-6 z-[100] flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-accent/30 transition-all duration-300 text-sm font-mono text-white/70 hover:text-white group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Zurück
      </motion.a>

      {/* ── HERO ─────────────────────────────────────────── */}
      <motion.section
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      >
        <ParticleField />

        {/* Glow orbs */}
        <div className="glow-orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />
        <div className="glow-orb-2 absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/6 blur-[100px] pointer-events-none" />
        <div className="glow-orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent/4 blur-[80px] pointer-events-none" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(47,215,191,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(47,215,191,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Tag */}
          <div className="hero-tag opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">Case Study · UGC Ads</span>
          </div>

          {/* Title */}
          <RevealText
            className="font-druk text-[clamp(3.5rem,12vw,9rem)] uppercase tracking-tight leading-[0.88] text-white mb-2"
            delay={0.3}
          >
            Zite
          </RevealText>
          <RevealText
            className="font-druk text-[clamp(3.5rem,12vw,9rem)] uppercase tracking-tight leading-[0.88] mb-10"
            delay={0.45}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #2FD7BF 0%, #1AACB8 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Fishing
            </span>
          </RevealText>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="font-sans text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Wie wir mit nativem UGC-Content konsistente
            <span className="text-white/80"> 8x+ ROAS</span> und eine
            <span className="text-white/80"> CPA-Reduktion von bis zu 54%</span> erzielt haben.
          </motion.p>

          {/* Stat badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="hero-badge flex flex-wrap justify-center gap-4"
          >
            {[
              { icon: <TrendingUp className="w-4 h-4" />, label: 'Peak ROAS', value: '8.84x' },
              { icon: <Target className="w-4 h-4" />, label: 'CPA Reduktion', value: '–54%' },
              { icon: <Zap className="w-4 h-4" />, label: 'Kampagnen', value: '4 Active' },
              { icon: <Award className="w-4 h-4" />, label: 'Ø ROAS', value: '8.25x' },
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <span className="text-accent">{b.icon}</span>
                <span className="font-mono text-xs text-white/50 uppercase tracking-widest">{b.label}</span>
                <span className="font-mono text-sm font-bold text-white">{b.value}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-white/30" />
          </motion.div>
        </div>
      </motion.section>

      {/* ── CHALLENGE ─────────────────────────────────────── */}
      <section className="section-fade py-24 md:py-40 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs text-accent uppercase tracking-[0.25em] mb-6 block"
            >
              01 / Die Herausforderung
            </motion.span>
            <RevealText className="font-druk text-4xl md:text-6xl uppercase leading-tight mb-8" delay={0.1}>
              Der Status Quo
            </RevealText>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-lg leading-relaxed mb-6"
            >
              Zite Fishing, eine der führenden Marken für Angelzubehör im DACH-Raum, stand vor einer klassischen
              Herausforderung: <span className="text-white">steigende Ad Costs</span> bei gleichzeitig
              sinkenden ROAS-Werten durch generische, nicht zielgruppengerechte Creatives.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-white/60 text-lg leading-relaxed"
            >
              Die Zielgruppe – leidenschaftliche Angler – reagierte kaum auf klassische
              Product-Ads. Es fehlte: <span className="text-white">Authentizität, Community-Feeling und nativer Content</span>, der
              wirklich abholt.
            </motion.p>
          </div>

          {/* Pain points */}
          <div className="space-y-4">
            {[
              { label: 'Bisheriger ROAS', value: '< 2x', bad: true },
              { label: 'CPA zu hoch für profitablen Betrieb', value: '> 24€', bad: true },
              { label: 'Creatives ohne Zielgruppen-Resonanz', value: '↓ CTR', bad: true },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex items-center justify-between bg-[#0D0D0D] border border-white/5 rounded-xl px-6 py-4"
              >
                <span className="text-white/60 text-sm font-sans">{item.label}</span>
                <span className="font-mono text-sm font-bold text-red-400/80">{item.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 bg-[#050505] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-accent uppercase tracking-[0.25em] mb-6 block"
            >
              02 / Die Lösung
            </motion.span>
            <RevealText className="font-druk text-4xl md:text-6xl lg:text-7xl uppercase leading-tight" delay={0.1}>
              Native UGC Creative Strategie
            </RevealText>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-7 h-7" />,
                title: 'Authentischer Content',
                desc: 'Wir haben echte Angler eingesetzt, die Zite Produkte unter realen Bedingungen zeigen – kein Studio, keine Hochglanz-Ästhetik. Nur echter, nativer Content der konvertiert.',
              },
              {
                icon: <Target className="w-7 h-7" />,
                title: 'Data-Driven Iteration',
                desc: 'Wöchentliche Performance-Analyse jeder Creative-Variable: Hook, CTA, Pacing, Musikwahl. Winning Creatives werden skaliert, Verlierer sofort ersetzt.',
              },
              {
                icon: <TrendingUp className="w-7 h-7" />,
                title: 'Winning Creative System',
                desc: 'Ein strukturierter Creative-Pipeline-Prozess sorgt dafür, dass immer neue Ad-Varianten getestet werden – und Benchmarks kontinuierlich outperformt werden.',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative bg-[#0D0D0D] border border-white/5 rounded-2xl p-8 hover:border-accent/25 transition-colors duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-accent/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:bg-accent/15 transition-colors">
                  {card.icon}
                </div>
                <h3 className="font-sans font-bold text-xl text-white mb-3">{card.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS HERO ──────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-accent uppercase tracking-[0.25em] mb-6 block"
            >
              03 / Die Ergebnisse
            </motion.span>
            <RevealText className="font-druk text-4xl md:text-6xl lg:text-7xl uppercase leading-tight mb-4" delay={0.1}>
              Numbers don't lie
            </RevealText>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/40 text-lg max-w-lg mx-auto"
            >
              Echte Meta Ads Daten. Keine Hochrechnungen, keine Prognosen.
            </motion.p>
          </div>

          {/* Big stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { label: 'Peak ROAS', value: '8.84', suffix: 'x', decimals: 2, delay: 0 },
              { label: 'Ø ROAS', value: '8.25', suffix: 'x', decimals: 2, delay: 0.1 },
              { label: 'CPA Reduktion', value: '54', suffix: '%', prefix: '–', decimals: 0, delay: 0.2 },
              { label: 'Aktive Kampagnen', value: '4', suffix: '', decimals: 0, delay: 0.3 },
            ].map((m, i) => (
              <MetricCard key={i} {...m} />
            ))}
          </div>

          {/* Campaign cards */}
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {campaigns.map((c, i) => (
              <CampaignCard key={i} {...c} delay={i * 0.12} />
            ))}
          </div>

          {/* Meta Ads proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#0D0D0D] border border-white/5 rounded-3xl p-6 md:p-10 overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-white/40 uppercase tracking-[0.2em]">
                Meta Ads Manager · Verified Screenshots
              </span>
              <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-mono">Verifiziert</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { src: encodeURI('/Case study Zite/Screenshot 2024-10-05 at 10.41.14.png'), label: 'Campaign 1' },
                { src: encodeURI('/Case study Zite/Screenshot 2024-10-05 at 10.41.48.png'), label: 'Campaign 2' },
                { src: encodeURI('/Case study Zite/Screenshot 2024-10-07 at 06.55.31.png'), label: 'Campaign 3' },
                { src: encodeURI('/Case study Zite/Testvideo.png'), label: 'Campaign 4' },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="relative rounded-xl overflow-hidden border border-white/5 group-hover:border-accent/30 transition-colors duration-300">
                    <img
                      src={img.src}
                      alt={`Zite Fishing ${img.label} Meta Ads Screenshot`}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="font-mono text-xs text-white/30 text-center mt-2 uppercase tracking-widest">{img.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ROAS CHART ────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 bg-[#050505] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-xs text-accent uppercase tracking-[0.25em] mb-4 block">
              ROAS Performance · Alle Kampagnen
            </span>
            <p className="text-white/40 text-sm">Jede Kampagne outperformt den Branchenstandard von ~3x ROAS</p>
          </motion.div>

          <div className="space-y-5">
            {campaigns.map((c, i) => {
              const pct = Math.round((parseFloat(c.roas) / 10) * 100);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-5"
                >
                  <span className="font-mono text-xs text-white/30 w-24 shrink-0 uppercase tracking-widest">
                    Campaign {c.num}
                  </span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: i * 0.12 + 0.3, ease: 'easeOut' }}
                      className="h-full rounded-full relative"
                      style={{
                        background: 'linear-gradient(90deg, rgba(47,215,191,0.4), #2FD7BF)',
                        boxShadow: '0 0 12px rgba(47,215,191,0.4)',
                      }}
                    />
                  </div>
                  <span className="font-mono text-sm font-bold text-accent w-14 text-right shrink-0">
                    {c.roas}x
                  </span>
                </motion.div>
              );
            })}
            {/* Benchmark line */}
            <div className="flex items-center gap-5 mt-6 pt-6 border-t border-white/5">
              <span className="font-mono text-xs text-white/20 w-24 shrink-0 uppercase tracking-widest">
                Benchmark
              </span>
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[30%] h-full bg-white/15 rounded-full" />
              </div>
              <span className="font-mono text-sm text-white/30 w-14 text-right shrink-0">~3x</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ───────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/4 blur-[150px]" />
        </div>
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Quote marks */}
            <div
              className="font-druk text-[10rem] leading-none text-accent/10 absolute -top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none"
              aria-hidden
            >
              "
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-accent uppercase tracking-[0.25em] mb-10 block"
            >
              04 / Kundenstimme
            </motion.span>

            <blockquote className="font-sans text-2xl md:text-3xl text-white/85 leading-relaxed mb-10 font-light">
              "ReelyGood hat verstanden, was unsere Community bewegt. Der Content fühlt sich echt an –
              weil er es ist. Die Ergebnisse sprechen für sich: Wir haben noch nie so einen
              <span className="text-accent font-medium"> konstanten ROAS</span> gesehen."
            </blockquote>

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-px bg-accent/30 mb-4" />
              <span className="font-mono text-sm text-white/70 uppercase tracking-widest">
                Zite Fishing · Management
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(47,215,191,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(47,215,191,0.03) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <RevealText className="font-druk text-4xl md:text-6xl lg:text-7xl uppercase leading-tight mb-6" delay={0.1}>
              Willst du das auch?
            </RevealText>
            <p className="text-white/50 text-lg mb-12 leading-relaxed">
              Sichere dir jetzt dein kostenloses Strategiegespräch und wir zeigen dir,
              wie wir deinen ROAS auf das nächste Level bringen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="https://form.typeform.com/to/dDmy0xtw"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden bg-gradient-to-r from-accent to-[#1AACB8] text-black font-bold text-base px-10 py-4 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(47,215,191,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Free Strategiegespräch sichern
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </motion.a>

              <a
                href="/"
                className="font-mono text-sm text-white/40 hover:text-white/70 transition-colors uppercase tracking-widest"
              >
                ← Alle Cases
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer micro */}
      <div className="py-8 px-6 border-t border-white/5 text-center">
        <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
          © 2024 ReelyGood · All rights reserved
        </span>
      </div>
    </div>
  );
}
