import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Mail, Globe, Sparkles, MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  const [timeStr, setTimeStr] = useState('06:06:51 UTC');
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Magnetic coordinate tracking
  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.2 };
  const smoothButtonX = useSpring(buttonX, springConfig);
  const smoothButtonY = useSpring(buttonY, springConfig);

  // Studio Real-time Clock ticking
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hrs = now.getUTCHours().toString().padStart(2, '0');
      const mins = now.getUTCMinutes().toString().padStart(2, '0');
      const secs = now.getUTCSeconds().toString().padStart(2, '0');
      setTimeStr(`${hrs}:${mins}:${secs} UTC`);
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const diffX = e.clientX - btnCenterX;
    const diffY = e.clientY - btnCenterY;

    // Calculate distance
    const dist = Math.sqrt(diffX * diffX + diffY * diffY);

    if (dist < 120) {
      // Pull button towards mouse (magnetic intensity: 35% of offset)
      buttonX.set(diffX * 0.35);
      buttonY.set(diffY * 0.35);
    } else {
      buttonX.set(0);
      buttonY.set(0);
    }
  };

  const handleMouseLeave = () => {
    buttonX.set(0);
    buttonY.set(0);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 md:py-36 bg-[#F4EFE6] text-[#0B1220] overflow-hidden flex flex-col justify-between"
    >
      {/* Decorative page borders */}
      <div className="absolute top-0 inset-x-12 h-[1px] bg-[#0B1220]/15" />
      
      {/* Background halftone element */}
      <div className="absolute inset-0 halftone-bg pointer-events-none opacity-[0.03]" />

      {/* Decorative Top Segment details */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-start select-none border-b border-[#0B1220]/10 pb-6 mb-12">
        <div className="flex gap-4 items-center">
          <span className="bg-[#9E2A2B] text-[#F4EFE6] text-xs font-mono px-2 py-0.5 tracking-widest skew-x-[-10deg]">
            SEC.05
          </span>
          <span className="font-mono text-xs text-[#0B1220]/50 uppercase tracking-widest">
            PROJECT WRAP-UP // 最終章
          </span>
        </div>
        <div className="font-mono text-[9px] text-[#0B1220]/60 text-right leading-tight">
          STATUS: IN PROCESS // 2026 EDITION<br />
          LOCAL TIME: {timeStr}
        </div>
      </div>

      {/* MAIN CONTENT BLOCK */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col items-center justify-center text-center relative z-10 pt-8 pb-12">
        
        {/* Technical Spinning Crosshair Beacon (Manga Sci-Fi Aesthetic) */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-[3px] border-[#0B1220] bg-[#121A2C] shadow-md mb-8 relative flex items-center justify-center select-none pointer-events-none overflow-hidden"
        >
          {/* Rotating radar line */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" className="opacity-35">
              <circle cx="50" cy="50" r="40" stroke="#F4EFE6" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="#F4EFE6" strokeWidth="0.75" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="#F4EFE6" strokeWidth="0.75" />
              <circle cx="50" cy="50" r="15" stroke="#9E2A2B" strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* Central neon beacon dot */}
          <div className="relative">
            <div className="w-3.5 h-3.5 bg-[#9E2A2B] rounded-full animate-ping absolute -inset-0.5 opacity-75" />
            <div className="w-2.5 h-2.5 bg-[#D66A2C] rounded-full relative" />
          </div>

          <div className="absolute inset-0 halftone-bg opacity-20" />
        </motion.div>

        {/* Massive Centered Title */}
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl italic leading-none uppercase tracking-tighter text-[#0B1220] max-w-3xl transform skew-x-[-10deg] mb-6 select-none relative">
          LET'S BUILD<br />
          SOMETHING COOL.
          
          {/* Subtle shadow outline duplicate for raw depth effect */}
          <span className="absolute left-1 top-1 text-stroke-midnight text-4xl sm:text-5xl md:text-7xl font-black italic -z-10 opacity-15 select-none leading-none">
            LET'S BUILD<br />
            SOMETHING COOL.
          </span>
        </h2>

        {/* Sub-header Japanese line */}
        <p className="font-display font-bold text-sm sm:text-base text-[#9E2A2B] tracking-widest uppercase mb-6">
          素晴らしいものを一緒に作りましょう。
        </p>

        {/* Calming editorial tone description */}
        <p className="font-mono text-xs md:text-sm text-[#0B1220]/75 leading-relaxed max-w-xl mb-12">
          Feel free to reach out for design inquiries, commercial art partnership, full-stack product building, or simple retro anime/music talks. We sculpt pure nostalgia into ultra-responsive web experiences.
        </p>

        {/* MAGNETIC grad button with glowing shadow backdrop */}
        <div 
          className="relative py-8 px-12 z-20 flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Button glow element matching coordinates */}
          <motion.div
            style={{ x: smoothButtonX, y: smoothButtonY }}
            className="absolute w-52 h-14 bg-gradient-to-r from-[#4F46E5] via-[#D946EF] to-[#EA580C] rounded-full filter blur-xl opacity-45 pointer-events-none z-0"
          />

          <motion.button
            ref={buttonRef}
            style={{ x: smoothButtonX, y: smoothButtonY }}
            className="relative px-8 py-4 bg-gradient-to-r from-[#4F46E5] via-[#D946EF] to-[#EA580C] text-[#F4EFE6] font-display text-sm font-black tracking-widest uppercase rounded-full shadow-[0px_10px_35px_rgba(217,70,239,0.4)] border border-white/20 flex items-center gap-3 select-none hover:shadow-[0px_15px_45px_rgba(217,70,239,0.65)] hover:scale-[1.04] transition-all cursor-pointer z-10"
          >
            SAY HELLO TO BLEU <Mail size={16} className="animate-bounce" />
          </motion.button>
        </div>

      </div>

      {/* FOOTER METADATA GRIDS */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-12 border-t border-[#0B1220]/10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Col: Branded sign off */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#0B1220] text-[#F4EFE6] font-mono text-[9px] flex items-center justify-center italic font-black rounded-sm skew-x-[-10deg]">
              M98
            </div>
            <span className="font-display font-black text-sm italic uppercase tracking-tighter text-[#0B1220]">
              BLEU DIGITAL INC.
            </span>
          </div>
          <p className="font-mono text-[10px] text-[#0B1220]/50 max-w-xs leading-relaxed uppercase">
            ESTABLISHED IN 1998, DIGITAL REFORMATTED 2026. THE BLEU SCRIPT CO-AUTHORED FOR RETRO ENTHUSIASTS.
          </p>
        </div>

        {/* Center Col: Location specs */}
        <div className="flex flex-col gap-2 font-mono text-[10px] text-[#0B1220]/75">
          <span className="font-display text-xs font-black tracking-wider uppercase text-[#0B1220]">
            STUDIO LOCALE // 所在地
          </span>
          <p className="flex items-center gap-1.5 uppercase">
            <MapPin size={12} className="text-[#9E2A2B]" /> SHIBUYA DOCK 04B, TOKYO WORLD METROPOLIS
          </p>
          <p className="text-left text-[#0B1220]/50 uppercase">
            LATENCY: 12ms // CONSOLE_ONLINE // EMIT_TOYO_INK
          </p>
        </div>

        {/* Right Col: Connection links */}
        <div className="flex flex-col gap-2">
          <span className="font-display text-xs font-black tracking-wider uppercase text-[#0B1220]">
            CONNECT CHANNELS // 連絡先
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase font-bold text-[#0B1220]">
            <a href="mailto:hello@bleu.studio" className="flex items-center gap-1 hover:text-[#9E2A2B] transition-colors border-b border-transparent hover:border-[#9E2A2B]">
              MAIL-INK <ArrowUpRight size={10} />
            </a>
            <a href="#" className="flex items-center gap-1 hover:text-[#D66A2C] transition-colors border-b border-transparent hover:border-[#D66A2C]">
              TWIT_RADAR <ArrowUpRight size={10} />
            </a>
            <a href="#" className="flex items-center gap-1 hover:text-indigo-600 transition-colors border-b border-transparent hover:border-indigo-600">
              GIT_REPOSITORY <ArrowUpRight size={10} />
            </a>
          </div>
          <p className="font-mono text-[8px] text-[#0B1220]/45 uppercase mt-1">
            ALL PHYSICAL AND CEL GRAPHICS REGISTERED UNDER TOYO LAws. INK BRAND DESIGN PATENTS © 1998.
          </p>
        </div>

      </div>

    </section>
  );
}
