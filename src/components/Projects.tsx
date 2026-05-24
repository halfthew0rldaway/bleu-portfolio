import React, { useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useScroll } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { playHoverSound, playClickSound } from '../lib/audio';
import { SectionWrapper, sectionItemVariants } from './SectionWrapper';
import { Divider } from './Divider';

const projects = [
  {
    name: 'Docsmith',
    description: 'Browser-first PDF utility — merge, split, rotate & compress.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'pdf-lib'],
    url: 'https://docsmith-six.vercel.app'
  },
  {
    name: 'Zendo',
    description: 'Zen-inspired project management with Kanban & team pipelines.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
    url: 'https://zendo-gules.vercel.app'
  },
  {
    name: 'Animix',
    description: 'Anime & manga streaming platform with cinematic UI.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    url: 'https://animix-omega.vercel.app'
  },
  {
    name: 'FluxState',
    description: 'Real-time PC power & thermal simulation engine.',
    stack: ['Astro', 'JavaScript', 'CSS'],
    url: 'https://flux-state.vercel.app'
  },
  {
    name: 'Gear-In',
    description: 'Full-featured e-commerce platform with advanced checkout.',
    stack: ['Laravel', 'PHP', 'Blade', 'MySQL'],
    url: 'https://github.com/halfthew0rldaway/gear-in'
  }
];

const isTouchDevice = typeof window !== 'undefined' && 
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const ProjectCard: React.FC<{ project: typeof projects[0], index: number, total: number }> = ({ project, index, total }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Responsive top offset so cards stack cohesively
  const topOffset = `calc(10vh + ${index * 40}px)`;

  // Scroll-linked 3D only on desktop
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  // 0 at center, 1 at edges
  const distanceFomCenter = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1]);
  const scrollZ = useTransform(distanceFomCenter, [0, 1], isTouchDevice ? [0, 0] : [0, -200]);
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], isTouchDevice ? ["0deg", "0deg", "0deg"] : ["5deg", "0deg", "-5deg"]);

  // Mouse-tracking springs — only allocate on desktop
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) playHoverSound();
  };

  return (
    <div 
      className="sticky w-full flex items-center justify-center mb-16 md:mb-32 perspective-[2000px]" 
      style={{ top: topOffset }}
    >
      <SectionWrapper className="w-full max-w-5xl mx-auto">
        <motion.div
           style={{ z: scrollZ, rotateX: scrollRotateX, transformPerspective: 2000 }}
           className="w-full will-change-transform"
        >
          <motion.div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
              transformPerspective: 2000,
              transformOrigin: 'center center'
            }}
            className="cursor-interactive group relative w-full min-h-[clamp(320px,50vh,450px)] rounded-[clamp(1.5rem,3vw,2.5rem)] bg-[#0c0c0e] border border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.6)] flex flex-col md:flex-row overflow-hidden will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/5 transition-all duration-700 pointer-events-none" />
          
          {/* Content Side */}
          <div className="relative z-10 w-full md:w-1/2 p-[clamp(1.5rem,5vw,4rem)] flex flex-col justify-between h-full bg-[#0a0a0c]/80 backdrop-blur-sm">
          <div>
            <div className="flex items-center justify-between mb-[clamp(1.5rem,3vw,2rem)]">
              <span className="text-[clamp(0.875rem,1.5vw,1.25rem)] font-mono text-white/40 group-hover:text-blue-400 transition-colors">
                0{index + 1}
              </span>
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => { e.stopPropagation(); playClickSound(); }}
                className="p-[clamp(0.5rem,1.5vw,0.75rem)] bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-black hover:scale-110 transition-all border border-transparent hover:border-white/20"
              >
                <ArrowUpRight className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)]" />
              </a>
            </div>
            
            <h4 className="text-[clamp(2.5rem,4vw,4rem)] font-bold text-white tracking-tight leading-none mb-[clamp(1rem,2vw,1.5rem)] group-hover:text-blue-100 transition-colors">
              {project.name}
            </h4>
            
            <p className="text-[clamp(0.875rem,1.5vw,1.125rem)] text-white/60 font-light leading-relaxed max-w-md">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-[clamp(0.5rem,1vw,0.75rem)] mt-[clamp(1.5rem,3vw,2rem)]">
            {project.stack.map(tech => (
              <span key={tech} className="text-[clamp(0.75rem,1vw,0.875rem)] font-mono px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.25rem,0.5vw,0.5rem)] bg-black border border-white/10 rounded-full text-white/60 group-hover:border-white/20 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Visual Graphic Element */}
        <div className="hidden md:block relative z-0 w-full md:w-1/2 min-h-full bg-[#050505] border-l border-white/5 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent group-hover:opacity-40 transition-opacity duration-1000" />
          <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-700">
             <span className="text-[8rem] font-bold text-white tracking-tighter whitespace-nowrap -rotate-12 select-none">
               {project.name.toUpperCase()}
             </span>
          </div>
        </div>
        </motion.div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-[clamp(6rem,15vw,12rem)] px-[clamp(1.5rem,5vw,3rem)] bg-[#050505] relative overflow-hidden z-20">
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <SectionWrapper stagger={true} className="mb-[clamp(4rem,10vw,8rem)] flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12">
          <motion.div variants={sectionItemVariants}>
            <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.2em] mb-6">Selected Works</h2>
            <h3 className="text-[clamp(3.5rem,6vw,6rem)] font-bold text-white tracking-tighter leading-none">Open Source</h3>
          </motion.div>
          <motion.p variants={sectionItemVariants} className="max-w-[17rem] md:max-w-md text-white/50 text-[clamp(1rem,1.5vw,1.25rem)] mt-8 md:mt-0 font-light md:text-right leading-relaxed">
            A collection of architectural experiments, state management tools, and fullstack platforms.
          </motion.p>
        </SectionWrapper>

        <div className="w-full relative mt-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} total={projects.length} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <Divider />
      </div>
    </section>
  );
}
