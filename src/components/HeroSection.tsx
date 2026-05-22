import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { IMAGES } from '../data';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [blinking, setBlinking] = useState(false);

  // Parallax mouse trackers
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end feel
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map mouse positions to different layer transformations (Parallax)
  const bgTranslateX = useTransform(smoothX, [-300, 300], [-8, 8]);
  const bgTranslateY = useTransform(smoothY, [-300, 300], [-8, 8]);

  const textTranslateX = useTransform(smoothX, [-300, 300], [-25, 25]);
  const textTranslateY = useTransform(smoothY, [-300, 300], [-10, 10]);

  const charTranslateX = useTransform(smoothX, [-300, 300], [-15, 15]);
  const charTranslateY = useTransform(smoothY, [-300, 300], [-12, 12]);

  const detailsTranslateX = useTransform(smoothX, [-300, 300], [20, -20]);
  const detailsTranslateY = useTransform(smoothY, [-300, 300], [20, -20]);

  const badgeRotate = useTransform(smoothX, [-300, 300], [-5, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;
      
      const relX = e.clientX - centerX;
      const relY = e.clientY - centerY;

      mouseX.set(relX);
      mouseY.set(relY);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Blinking timer for the character eyes to add natural soul
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 160);
    }, 4200);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(blinkInterval);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F4EFE6] px-6 md:px-12 pt-20"
      id="hero"
    >
      {/* Editorial Grid Backing (faint lines resembling layout rulers) */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none opacity-20 border-x border-[#0B1220]/5 max-w-7xl mx-auto flex justify-between">
        <div className="w-px h-full bg-[#0B1220]/10 border-dashed" />
        <div className="w-px h-full bg-[#0B1220]/10 border-dashed hidden md:block" />
        <div className="w-px h-full bg-[#0B1220]/10 border-dashed hidden md:block" />
        <div className="w-px h-full bg-[#0B1220]/10 border-dashed" />
      </div>

      {/* Halftone & Scanline backing */}
      <div className="absolute inset-0 halftone-bg pointer-events-none" />
      <div className="absolute inset-0 vintage-scanlines opacity-50 pointer-events-none" />

      {/* Vignette Breathing Background effect */}
      <motion.div 
        animate={{ opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-0 bottom-0 top-0 pointer-events-none bg-radial from-transparent via-[#0B1220]/5 to-[#0B1220]/25 mix-blend-multiply"
      />

      {/* Floating analog dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#0B1220]/20"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40 - Math.random() * 40, 0],
              x: [0, (Math.random() - 0.5) * 30, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* LEFT SIDE RAIL: Muted crimson red vertical Katakana */}
      <div className="absolute left-4 md:left-12 lg:left-24 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 select-none pointer-events-none z-10 w-fit">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <span className="font-display text-base md:text-xl font-black text-[#9E2A2B] tracking-[-0.1em] writing-vertical text-center uppercase md:leading-6">
            ブルー・バスケットボール
          </span>
          <div className="h-12 w-[1.5px] bg-[#9E2A2B] mt-6" />
          <span className="font-mono text-[9px] text-[#9E2A2B] tracking-widest uppercase mt-4 [writing-mode:vertical-lr]">
            90'S STYLE CAMPAIGN
          </span>
        </motion.div>
      </div>

      {/* RIGHT SIDE RAIL: Midnight Navy vertical Kanji */}
      <div className="absolute right-4 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 select-none pointer-events-none z-10 w-fit">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <span className="font-mono text-[9px] text-[#0B1220]/60 tracking-widest uppercase mb-4 [writing-mode:vertical-lr] rotate-180">
            BLUE HARMONICS // EST 1998
          </span>
          <div className="h-12 w-[1.5px] bg-[#0B1220]/20 mb-6" />
          <span className="font-display text-base md:text-xl font-black text-[#0B1220] tracking-[-0.05em] writing-vertical text-center md:leading-6">
            冷静と情熱の狭間
          </span>
        </motion.div>
      </div>

      {/* HERO HERO CONTAINER */}
      <div className="relative max-w-5xl w-full h-[70vh] md:h-[80vh] flex items-center justify-center">
        
        {/* PARALLAX WORLDMARK BACKDROP LAYER */}
        <motion.div
          style={{ x: textTranslateX, y: textTranslateY }}
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0"
        >
          <h1 className="font-display font-black italic text-[24vw] md:text-[22vw] uppercase tracking-tighter text-[#0B1220]/90 leading-none select-none select-none text-center transform -skew-x-[12deg] relative">
            BLEU
            {/* Outline duplicate offset behind for absolute depth styling */}
            <span className="absolute left-1.5 top-1.5 text-stroke-midnight text-[24vw] md:text-[22vw] font-black italic -z-10 opacity-30 select-none">
              BLEU
            </span>
          </h1>
        </motion.div>

        {/* CHARACTER ILLUSTRATION WRAPPER */}
        <motion.div
          style={{ x: charTranslateX, y: charTranslateY }}
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative w-full max-w-md md:max-w-xl h-full flex items-center justify-center z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full aspect-[4/5] max-h-[60vh] md:max-h-[70vh] rounded-3xl overflow-hidden bg-cover bg-center border-[6px] border-[#0B1220] shadow-[12px_12px_0px_rgba(11,18,32,0.15)] flex items-end group transition-all duration-500 hover:shadow-[20px_20px_0px_rgba(11,18,32,0.18)]">
            
            {/* The Majestic Generated Main Portrait Image */}
            <img
              src={IMAGES.hero}
              alt="BLEU Manga character protagonist with headphones, black hair and glasses"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none filter brightness-95 contrast-105 transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Simulated Animated Layover Hair and Headphones sway using clip and glow */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            {/* Overlay lens glare or light flash that triggers every few seconds */}
            <motion.div
              animate={{ 
                x: ['-100%', '200%'],
                opacity: [0, 0.4, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatDelay: 8, 
                ease: 'easeInOut' 
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] pointer-events-none"
            />

            {/* Interactive Eye Blinking simulated using custom animated mask */}
            <AnimatePresence>
              {blinking && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.08 }}
                  className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply opacity-5 w-full bg-[#121622]/90"
                />
              )}
            </AnimatePresence>

            {/* Subtle vintage printed frame border inside */}
            <div className="absolute inset-3 border border-[#F4EFE6]/20 rounded-[1.25rem] pointer-events-none z-20" />
            
            {/* Halftone grid overlay in card to give tangible printed feel */}
            <div className="absolute inset-0 halftone-bg pointer-events-none opacity-5 z-20" />

            {/* Corner branding print labels inside the portrait */}
            <div className="absolute top-5 left-5 bg-[#0B1220] text-[#F4EFE6] px-2 py-0.5 text-[8px] font-mono tracking-widest uppercase z-20">
              FRAME // 001_HERO
            </div>

            <div className="absolute bottom-5 left-5 flex flex-col z-20">
              <span className="font-display text-[#F4EFE6] text-sm font-black italic tracking-tighter">
                K. Minami
              </span>
              <span className="font-mono text-[#F4EFE6]/70 text-[9px] tracking-widest uppercase">
                DIGITAL ILLUSTRATOR
              </span>
            </div>
            
            <div className="absolute bottom-5 right-5 z-20 skew-x-[-10deg] bg-[#D66A2C] px-2 py-1 text-[9px] font-display text-[#F4EFE6] font-bold tracking-widest shadow">
              CALM ESSENCE
            </div>
          </div>
        </motion.div>

        {/* BOTTOM CORNER RETRO SPORTS BADGE / BADGE ORANGE CARD */}
        <motion.div
          style={{ x: detailsTranslateX, y: detailsTranslateY, rotate: badgeRotate }}
          initial={{ opacity: 0, scale: 0.8, x: 80 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="absolute right-0 bottom-4 md:right-8 lg:right-16 z-30 flex flex-col items-end pointer-events-none select-none max-w-[170px]"
        >
          {/* Sports branding design mockup */}
          <div className="bg-[#F4EFE6] border-2 border-[#0B1220] p-3 rounded-md shadow-md flex flex-col gap-2 relative">
            <div className="flex justify-between items-center w-full">
              <div className="w-6 h-6 rounded-full bg-[#D66A2C] border border-[#0B1220] flex items-center justify-center">
                {/* SVG basketball court lines inside orange badge */}
                <svg className="w-4 h-4 text-[#0B1220]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="1" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10M2 12h20" strokeWidth="1" />
                </svg>
              </div>
              <span className="font-mono text-[9px] text-[#0B1220] font-black">M98 / S.C</span>
            </div>
            
            <div className="h-[1px] bg-[#0B1220]/20 my-1" />
            
            <div className="text-[10px] uppercase tracking-tight text-[#0B1220] leading-3 font-bold font-sans">
              "MADE FOR PLAYERS, BUILT DIFFERENT"
            </div>
            <div className="text-[8px] text-[#9E2A2B] font-mono leading-tight">
              STREET SPIRIT // 1998
            </div>

            {/* Artist signature label */}
            <div className="absolute -top-4 -right-1 font-mono text-[7px] text-[#0B1220]/50 bg-[#F4EFE6] px-1 italic">
              K.Minami ©
            </div>
          </div>
        </motion.div>

        {/* BOTTOM LEFT CORNER COMPOSITIONS LABELS */}
        <div className="absolute left-0 bottom-4 md:left-8 lg:left-16 z-30 flex flex-col select-none pointer-events-none max-w-[150px] font-mono text-[9px] text-[#0B1220]/75 gap-1">
          <p>STREET BALL CULTURE</p>
          <p>M-98 PRINT SPECIFICATION</p>
          <p>INK SYSTEM: TOYO INK C100</p>
          <p className="font-display text-[#9E2A2B] font-bold mt-1 text-sm tracking-tighter italic">TOKYO CAMPAIGN</p>
        </div>

      </div>

      {/* Decorative center downward indicator arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer group" onClick={() => document.querySelector('#marquee-row')?.scrollIntoView({ behavior: 'smooth' })}>
        <span className="font-mono text-[10px] text-[#0B1220]/40 group-hover:text-[#9E2A2B] transition-colors tracking-widest uppercase">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[#0B1220]/40 group-hover:text-[#9E2A2B] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

    </section>
  );
}
