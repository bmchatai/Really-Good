import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoSteps from './components/VideoSteps';
import VideoTestimonials from './components/VideoTestimonials';
import NigelaTestimonial from './components/NigelaTestimonial';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Founders from './components/Founders';
import PainPoints from './components/PainPoints';
import FreeVideoCTA from './components/FreeVideoCTA';
import QuizCTA from './components/QuizCTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { SmoothCursor } from './components/magicui/smooth-cursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(t);
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-accent/30">
      <SmoothCursor />
      <Navbar />
      <main>
        <Hero />
        <VideoSteps />
        <PainPoints />
        <NigelaTestimonial />
        <VideoTestimonials />
        <CaseStudies />
        <Process />
        <Founders />
        <Testimonials />
        <FreeVideoCTA />
        <QuizCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
