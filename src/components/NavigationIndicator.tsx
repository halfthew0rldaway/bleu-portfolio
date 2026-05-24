import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { playHoverSound, playNavSound } from '../lib/audio';

const sections = ['home', 'about', 'projects', 'contact'];

export function NavigationIndicator() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      playNavSound();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-5 hidden md:flex items-center">
      {sections.map((id) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            onMouseEnter={playHoverSound}
            className="group relative p-2 cursor-interactive flex items-center justify-center outline-none"
            aria-label={`Scroll to ${id}`}
          >
            <span className="absolute right-8 text-[10px] font-mono uppercase tracking-[0.2em] text-white/0 group-hover:text-white/50 transition-colors whitespace-nowrap pointer-events-none pr-2">
              {id}
            </span>
            <motion.div 
              className={`rounded-full transition-all duration-500 ${isActive ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]' : 'bg-white/20 group-hover:bg-white/60'}`}
              animate={{ 
                height: isActive ? 32 : 6,
                width: isActive ? 4 : 6,
                borderRadius: isActive ? 4 : 6
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </button>
        );
      })}
    </div>
  );
}
