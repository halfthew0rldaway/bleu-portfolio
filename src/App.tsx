import { useEffect } from 'react';
import Lenis from 'lenis';

// Import our beautiful modular sections
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import IdentityMarqueeSection from './components/IdentityMarqueeSection';
import AboutSection from './components/AboutSection';
import WorksSection from './components/WorksSection';
import GalleryMotionSection from './components/GalleryMotionSection';
import ContactSection from './components/ContactSection';

export default function App() {
  // Initialize Lenis smooth scrolling for premium scroll physics
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential deceleration ease
      infinite: false,
      prevent: (node) => node.id === 'mobile-menu-btn' // Avoid scrolling body when toggle mobile menu
    });

    // Frame loops to sync physics with rendering engine
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#F4EFE6] overflow-x-hidden antialiased selection:bg-[#9E2A2B] selection:text-[#F4EFE6]">
      
      {/* 1. Subtle global continuous analog paper noise/film grain */}
      <div className="paper-grain pointer-events-none" />

      {/* 2. Floating Navbar */}
      <Navbar />

      {/* 3. Narrative Sections Assembly */}
      <main className="w-full relative">
        {/* SEC.01 — Cinematic Hero Poster */}
        <HeroSection />

        {/* SEC.02 — Horizontal Scrolling Scrapbook */}
        <IdentityMarqueeSection />

        {/* SEC.03 — Introspective Narrative About */}
        <AboutSection />

        {/* SEC.04 — Stacked Sticky Night Mode Projects */}
        <WorksSection />

        {/* SEC.05 — Edit Room Cinematic Filmstrip Grid */}
        <GalleryMotionSection />

        {/* SEC.06 — Magnetic Dynamic Call To Action Footer */}
        <ContactSection />
      </main>

    </div>
  );
}
