import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { SectionWrapper, sectionItemVariants } from './SectionWrapper';

import { playHoverSound, playClickSound } from '../lib/audio';

export function Contact() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.8, 1], [100, 0]);

  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const btnXSpring = useSpring(btnX, { stiffness: 300, damping: 20 });
  const btnYSpring = useSpring(btnY, { stiffness: 300, damping: 20 });
  const btnRef = React.useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    btnX.set((e.clientX - centerX) * 0.2);
    btnY.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  return (
    <section id="contact" className="py-[clamp(8rem,15vw,12rem)] px-[clamp(1.5rem,5vw,3rem)] bg-[#050505] relative z-20 border-t border-white/5 overflow-hidden">
      
      <SectionWrapper stagger={true} className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          variants={sectionItemVariants}
          style={{ y }}
          className="text-center md:text-left w-full md:w-auto"
        >
          <h2 className="text-[clamp(3.5rem,7vw,7rem)] font-bold text-white mb-6 tracking-tighter leading-none">
            Let's build <br className="hidden md:block" />
            <span className="text-white/40">something.</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-12">
            <motion.a 
              ref={btnRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              style={{ x: btnXSpring, y: btnYSpring }}
              href="mailto:hello@example.com" 
              className="cursor-interactive w-fit group flex items-center justify-center gap-4 bg-white text-black px-8 py-4 rounded-full font-medium text-[clamp(1rem,1.25vw,1.125rem)] hover:bg-white/90 transition-colors shadow-2xl"
            >
              Start a project 
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
           variants={sectionItemVariants}
          className="flex flex-col items-center md:items-end gap-6 mt-12 md:mt-0"
        >
          <div className="flex space-x-4">
            <a href="https://github.com/halfthew0rldaway" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} onClick={playClickSound} className="cursor-interactive p-5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all">
              <Github size={24} />
            </a>
            <a href="#" onMouseEnter={playHoverSound} onClick={playClickSound} className="cursor-interactive p-5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all">
              <Linkedin size={24} />
            </a>
            <a href="mailto:hello@example.com" onMouseEnter={playHoverSound} onClick={playClickSound} className="cursor-interactive p-5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all">
              <Mail size={24} />
            </a>
          </div>
          <p className="text-white/30 text-sm font-mono tracking-widest uppercase mt-8 md:mt-16">
            © {new Date().getFullYear()} Bleu.
          </p>
        </motion.div>
      </SectionWrapper>
    </section>
  );
}
