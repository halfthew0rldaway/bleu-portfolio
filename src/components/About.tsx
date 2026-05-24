import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { SplitText } from './SplitText';
import { SectionWrapper, sectionItemVariants } from './SectionWrapper';
import { Divider } from './Divider';

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 40 });

  return (
    <section 
      id="about" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-[clamp(8rem,15vw,14rem)] px-[clamp(1.5rem,5vw,3rem)] bg-[#050505] relative min-h-[90vh] flex items-center overflow-hidden border-t border-white/5 z-20 group"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              700px circle at ${smoothX}px ${smoothY}px,
              rgba(59, 130, 246, 0.05),
              transparent 80%
            )
          `,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <SectionWrapper stagger={true} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <motion.div variants={sectionItemVariants} className="lg:col-span-7">
            <h2 className="text-[clamp(3rem,6vw,6.5rem)] font-bold tracking-tighter text-white leading-[1.05]">
              <SplitText text="A junior dev" delay={0.2} /> <br className="hidden lg:block"/>
              <SplitText text="who never" delay={0.2 + (13 * 0.03)} /> <br className="hidden lg:block"/>
              <SplitText text="stops " delay={0.2 + (23 * 0.03)} />
              <SplitText text="learning." className="text-blue-500 font-light italic" delay={0.2 + (29 * 0.03)} />
            </h2>
          </motion.div>
          
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <motion.div variants={sectionItemVariants} className="text-white/60 text-[clamp(1.125rem,1.5vw,1.375rem)] font-light leading-[1.8] text-justify">
              <p>
                I'm a junior developer with a real curiosity for how things work on the web. I build with <span className="text-white/90 font-normal">React, Next.js, and TypeScript</span>, but what excites me most isn't the tools themselves. It's the process of <span className="text-blue-400/80 italic">figuring things out</span>.
              </p>
            </motion.div>
            
            <motion.div variants={sectionItemVariants} className="text-white/60 text-[clamp(1.125rem,1.5vw,1.375rem)] font-light leading-[1.8] text-justify">
              <p>
                Every project is a chance to explore something new. Could be interaction design, motion, creative coding, or a framework I've never touched before. I don't pretend to know everything, but I'm <span className="text-white/90 font-normal">willing to put in the work</span> to get there.
              </p>
            </motion.div>

            <motion.div variants={sectionItemVariants} className="text-white/40 text-[clamp(1rem,1.3vw,1.2rem)] font-light leading-[1.8] text-justify">
              <p>
                Still growing. Still exploring. And genuinely enjoying every step of the journey.
              </p>
            </motion.div>
          </div>
        </SectionWrapper>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <Divider />
      </div>
    </section>
  );
}
