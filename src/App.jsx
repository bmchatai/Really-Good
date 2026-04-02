import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProofBar from './components/SocialProofBar';
import VideoSteps from './components/VideoSteps';
import CaseStudies from './components/CaseStudies';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Founders from './components/Founders';
import PainPoints from './components/PainPoints';
import FreeVideoCTA from './components/FreeVideoCTA';
import QuizCTA from './components/QuizCTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { SmoothCursor } from './components/magicui/smooth-cursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Smoother scroll is a premium plugin, so we simulate smooth scrolling via CSS scroll-behavior 
    // and rely on ScrollTrigger for animations.
    
    // Refresh ScrollTrigger on mount
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-accent/30">
      <SmoothCursor />
      <Navbar />
      
      <main>
        <Hero />
        <VideoSteps />
        <PainPoints />
        <CaseStudies />
        <Process />
        <Testimonials />
        <Founders />
        <FreeVideoCTA />
        <QuizCTA />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
}
