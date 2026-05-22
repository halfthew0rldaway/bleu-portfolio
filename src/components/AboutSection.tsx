import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { IMAGES } from '../data';
import { ArrowUpRight, Radio, Music, Play, Layers } from 'lucide-react';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Monitor scroll progression for smooth editorial transformations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Scroll link values for floating background accents (Subtle shifts)
  const floatY1 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const floatY3 = useTransform(scrollYProgress, [0, 1], [-20, 30]);

  // Main text is structured for sequential word-by-word reveal
  const statement = "A cinematic portfolio showcasing real development work, wrapped in a 90s manga editorial aesthetic. Designed to connect robust digital engineering with vintage printed Shonen layouts.";
  const words = statement.split(' ');

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen w-full py-24 md:py-36 bg-[#F4EFE6] text-[#0B1220] overflow-hidden flex flex-col justify-center"
    >
      {/* Decorative layout border lines */}
      <div className="absolute top-0 inset-x-12 h-[1px] bg-[#0B1220]/10 border-dashed" />
      <div className="absolute bottom-0 inset-x-12 h-[1px] bg-[#0B1220]/10 border-dashed" />

      {/* FLOATING RETRO ASSETS (Awwwards-style editorial interactive props) */}
      
      {/* 1. Manga Sketch Clipping (Left Float) */}
      <motion.div
        style={{ y: floatY1 }}
        animate={{ rotate: [-2, -4, -2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-4 md:left-[8%] top-[12%] w-48 md:w-64 bg-[#F4EFE6] border-2 border-[#0B1220] p-3 rounded-xl shadow-[8px_8px_0px_rgba(11,18,32,0.1)] z-10 hidden sm:block select-none pointer-events-none group"
      >
        <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-cover bg-center border border-[#0B1220]/10 mb-3 bg-[#EAE3D5]">
          <img
            src={IMAGES.about}
            alt="BLEU manga side-view sketching draft"
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 halftone-bg opacity-10" />
          <div className="absolute bottom-2 left-2 bg-[#9E2A2B] text-[#F4EFE6] text-[8px] font-mono px-1.5 py-0.5 rounded-sm">
            FRAME-02 // DRAFT
          </div>
        </div>
        <div className="flex justify-between items-center font-mono text-[8.5px] text-[#0B1220]/75 uppercase">
          <span>CAT: MANGA CEL // 98</span>
          <span className="text-[#9E2A2B] font-bold">● ACTIVE PROCESS</span>
        </div>
      </motion.div>

      {/* 2. Basketball Court Diagram (Right Float) */}
      <motion.div
        style={{ y: floatY2 }}
        animate={{ rotate: [1, 3, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute right-4 md:right-[10%] top-[45%] w-44 md:w-56 bg-[#F4EFE6] border border-[#0B1220]/40 p-4 rounded-xl shadow-[4px_4px_0px_rgba(11,18,32,0.05)] z-10 hidden md:block select-none pointer-events-none text-[#0B1220]/60 text-center font-mono"
      >
        <div className="flex justify-between items-center text-[8px] border-b border-[#0B1220]/20 pb-1.5 mb-2.5">
          <span>DIAGRAM // 04B</span>
          <span className="font-bold text-[#D66A2C]">ZONE RE-DEF</span>
        </div>
        {/* Basketball board custom design */}
        <div className="relative w-full h-24 border border-[#0B1220]/30 rounded">
          <div className="absolute top-0 bottom-0 left-[20%] right-[20%] border-x border-[#0B1220]/30" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#0B1220]/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#0B1220]/30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D66A2C]" />
          </div>
          {/* Half circles */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 rounded-b-full border-b border-x border-[#0B1220]/30" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-6 rounded-t-full border-t border-x border-[#0B1220]/30" />
        </div>
        <p className="text-[7.5px] mt-2.5 tracking-tighter text-[#0B1220]/50 uppercase">
          TOKYO URBAN SESSIONS SCRIPT // OUT OF BOUNDS
        </p>
      </motion.div>

      {/* 3. Cassette Tape Player Card (Bottom Left Float) */}
      <motion.div
        style={{ y: floatY3 }}
        animate={{ rotate: [-3, 1, -3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute left-6 md:left-[12%] bottom-[10%] w-48 bg-[#0B1220] hover:bg-[#121b2d] text-[#F4EFE6] p-4 rounded-xl border-2 border-[#0B1220] shadow-[10px_10px_0px_rgba(11,18,32,0.12)] z-10 hidden lg:block select-none transition-colors"
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <Radio size={14} className="text-[#D66A2C] animate-pulse" />
            <span className="font-mono text-[8px] tracking-widest text-[#F4EFE6]/70 uppercase">WALKMAN VOL_04</span>
          </div>
          <span className="bg-[#9E2A2B] text-white text-[7px] font-mono px-1">AUTO REVERSE</span>
        </div>
        
        {/* Cassette layout */}
        <div className="w-full bg-[#F4EFE6]/5 border border-[#F4EFE6]/10 rounded p-2.5 flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <div className="w-4 h-4 rounded-full border border-dashed border-[#F4EFE6]/50 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D66A2C]" />
            </div>
            <div className="h-0.5 bg-[#F4EFE6]/20 flex-1 mx-2 relative">
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#9E2A2B]" />
            </div>
            <div className="w-4 h-4 rounded-full border border-dashed border-[#F4EFE6]/50 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D66A2C]" />
            </div>
          </div>
          <div className="h-1 bg-[#0B1220] w-full rounded border border-[#F4EFE6]/10 flex items-center px-1 overflow-hidden">
            <div className="h-full bg-[#D66A2C] w-2/3" />
          </div>
        </div>

        <div className="flex justify-between items-center mt-3 font-mono text-[8px]">
          <span className="text-[#F4EFE6]/50">A-SIDE // STEREO</span>
          <span className="text-[#D66A2C] font-bold">PLAYING</span>
        </div>
      </motion.div>

      {/* MAIN TEXT CONTAINER */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-20">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10 md:mb-14">
          <span className="bg-[#0B1220] text-[#F4EFE6] text-xs font-mono px-2 py-0.5 tracking-widest skew-x-[-10deg]">
            SEC.01
          </span>
          <h2 className="font-display font-black text-2xl md:text-3xl italic tracking-tighter uppercase text-[#0B1220]">
            ABOUT BLEU // 概要
          </h2>
        </div>

        {/* Scroll Character/Word Reveal Paragraph */}
        <div ref={textRef} className="mb-12 md:mb-16">
          <p className="font-display font-black italic text-2xl sm:text-3xl md:text-5xl tracking-tighter uppercase leading-[1.1] text-[#0B1220]">
            {words.map((word, wordIdx) => {
              // Create staggered delays based on index
              return (
                <motion.span
                  key={wordIdx}
                  initial={{ opacity: 0.15, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-20%' }}
                  transition={{ 
                    duration: 0.5, 
                    delay: Math.min(wordIdx * 0.03, 1), 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="inline-block mr-[0.25em] transition-colors duration-300 hover:text-[#9E2A2B] cursor-default"
                >
                  {word}
                </motion.span>
              );
            })}
          </p>
        </div>

        {/* Side Story Pillars Grid (Manga-box layouts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#0B1220]/15 relative">
          
          {/* Box 1: Creative philosophy */}
          <div className="relative group">
            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#9E2A2B]" />
            <h4 className="font-display text-sm font-black tracking-widest mb-3 uppercase pl-4">
              PHILOSOPHY // 創作理念
            </h4>
            <p className="font-mono text-xs text-[#0B1220]/75 leading-relaxed pl-4">
              We reject the cold, overly-sanitized interface aesthetics of the generic tech web. Grounded in the ink weight and organic imperfections of 90's Shonen publications, our layouts breathe, react, and evoke deep emotional nostalgia of reading paper campaigns on urban trains.
            </p>
          </div>

          {/* Box 2: Studio capabilities */}
          <div className="relative group">
            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#D66A2C]" />
            <h4 className="font-display text-sm font-black tracking-widest mb-3 uppercase pl-4">
              METRIC & ENGINE // 技術スタック
            </h4>
            <p className="font-mono text-xs text-[#0B1220]/75 leading-relaxed pl-4">
              Every pixel is tuned to maintain high frame rates. Built with robust React state machinery, GSAP spring triggers, and buttery-smooth Lenis-based scroll physics. Designed to behave like a living, interactive vector mural running flawlessly across any viewport.
            </p>
          </div>

          {/* Graphic marker arrow */}
          <div className="absolute -bottom-8 right-0 text-[#9E2A2B] font-mono text-[9px] font-bold tracking-widest flex items-center gap-1.5">
            SPEC_SYS: TOKYO LABS <ArrowUpRight size={14} />
          </div>
        </div>

      </div>

    </section>
  );
}
