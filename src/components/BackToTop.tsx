import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useMotionValue } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { playHoverSound, playNavSound } from '../lib/audio';

export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
       setIsVisible(latest > 0.1);
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    x.set(0);
    y.set(0);
    playNavSound();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const strokeDashoffset = useTransform(pathLength, [0, 1], [301.59, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic pull
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    playHoverSound();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           className="fixed bottom-6 md:bottom-10 right-6 md:right-10 z-[90]"
           initial={{ opacity: 0, y: 20, scale: 0.8 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           exit={{ opacity: 0, y: 20, scale: 0.8 }}
           transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            ref={buttonRef}
            onClick={scrollToTop}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className="cursor-interactive group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 hover:border-white/30 hover:bg-black hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300"
            aria-label="Back to top"
          >
            {/* SVG Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none stroke-blue-500 group-hover:stroke-purple-500 transition-colors duration-500 overflow-visible" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="2"
                className="transition-colors duration-500"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="301.59"
                style={{
                  strokeDashoffset,
                  strokeLinecap: "round"
                }}
              />
            </svg>
            <ArrowUp size={20} className="text-white/60 group-hover:text-white group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
