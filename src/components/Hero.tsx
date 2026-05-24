import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Physics } from './Physics';
import { SplitText } from './SplitText';

const skills = [
  'React', 'TypeScript', 'Node.js', 'TailwindCSS',
  'Framer Motion', 'GSAP', 'Matter.js', 'PHP',
  'MySQL', 'Linux', 'UI/UX', 'Figma'
];

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const xSpring = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const ySpring = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const xTransform = useTransform(xSpring, [-0.5, 0.5], ['-1.5%', '1.5%']);
  const yTransform = useTransform(ySpring, [-0.5, 0.5], ['-1.5%', '1.5%']);
  
  const textXTransform = useTransform(xSpring, [-0.5, 0.5], ['3%', '-3%']);
  const textYTransform = useTransform(ySpring, [-0.5, 0.5], ['3%', '-3%']);

  const subTextXTransform = useTransform(xSpring, [-0.5, 0.5], ['1.5%', '-1.5%']);
  const subTextYTransform = useTransform(ySpring, [-0.5, 0.5], ['1.5%', '-1.5%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black z-10"
    >
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden scale-105">
        <motion.img 
          src="/bleu.png" 
          alt="Hero Background" 
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 0.7 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: xTransform, y: yTransform }}
          className="w-full h-full object-cover object-center mix-blend-plus-lighter will-change-transform"
          draggable="false"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/60 to-[#050505]" />
        {/* Subtle blur overlay on the bottom portion */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#050505] to-transparent backdrop-blur-[2px]" />
      </div>

      {/* Intro Text */}
      <motion.div 
        style={{ x: textXTransform, y: textYTransform }}
        className="relative z-0 flex flex-col items-center justify-center text-center px-[clamp(1.5rem,5vw,3rem)] mt-20 md:mt-24 pointer-events-none will-change-transform"
      >
        <h1 className="text-[clamp(4rem,10vw,10rem)] font-bold tracking-tighter text-white mb-6 leading-[0.9]">
          <SplitText text="Hi, I’m Bleu" delay={0.2} />
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          style={{ x: subTextXTransform, y: subTextYTransform }}
          className="text-[clamp(1.25rem,2vw,1.75rem)] text-white/70 max-w-2xl font-light tracking-wide will-change-transform"
        >
          Creative Developer & Fullstack Builder
        </motion.p>
      </motion.div>

      {/* Physics Container for Skills */}
      <div className="absolute inset-0 z-10">
        <Physics>
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="cursor-interactive px-[clamp(1.5rem,2vw,2rem)] py-[clamp(0.75rem,1vw,1.125rem)] rounded-sm bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-[clamp(0.875rem,1.25vw,1.125rem)] font-medium whitespace-nowrap shadow-xl hover:bg-white/10 hover:border-white/30 transition-colors select-none"
            >
              {skill}
            </div>
          ))}
        </Physics>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
      >
        <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
