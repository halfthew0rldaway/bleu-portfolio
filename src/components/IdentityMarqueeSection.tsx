import { motion } from 'motion/react';
import { MARQUEE_TOP_ROW, MARQUEE_BOTTOM_ROW, IMAGES } from '../data';
import { MarqueeCard as MarqueeCardType } from '../types';

interface MarqueeRowProps {
  items: MarqueeCardType[];
  direction: 'left' | 'right';
  speed?: string;
}

function MarqueeCard({ card }: { card: MarqueeCardType; key?: any }) {
  // Styles based on card type
  if (card.type === 'typography') {
    return (
      <div className={`flex flex-col justify-between shrink-0 rounded-[28px] overflow-hidden p-8 border-2 border-[#0B1220] shadow-[6px_6px_0px_rgba(11,18,32,0.1)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[10px_10px_0px_rgba(11,18,32,0.15)] bg-[#0B1220] text-[#F4EFE6] ${card.aspectRatioClassName || 'w-80 h-48'}`}>
        <div className="flex justify-between items-center">
          <span className="font-mono text-[9px] tracking-widest text-[#D66A2C]">SPECS // M98</span>
          <div className="w-2 h-2 rounded-full bg-[#9E2A2B]" />
        </div>
        <p className="font-display font-black text-xl italic tracking-tight leading-7 break-words whitespace-normal text-left">
          {card.text}
        </p>
        <div className="flex justify-between items-end">
          <span className="font-display font-bold text-sm tracking-tighter text-[#F4EFE6]">{card.highlightText}</span>
          <span className="font-mono text-[8px] text-[#F4EFE6]/40">CHAPTER: MAIN</span>
        </div>
      </div>
    );
  }

  if (card.type === 'panel') {
    const isCrimson = card.aspectRatioClassName?.includes('bg-crimson');
    return (
      <div className={`flex flex-col justify-between shrink-0 rounded-[28px] p-6 border-2 border-[#0B1220] shadow-[6px_6px_0px_rgba(11,18,32,0.1)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[10px_10px_0px_rgba(11,18,32,0.15)] relative overflow-hidden ${
        isCrimson ? 'bg-[#9E2A2B] text-[#F4EFE6]' : 'bg-[#0B1220] text-[#F4EFE6]'
      } ${card.aspectRatioClassName || 'w-72 h-48'}`}>
        
        {/* Halftone BG filter inside */}
        <div className="absolute inset-0 halftone-bg opacity-10 pointer-events-none" />
        
        <div className="flex justify-between items-start z-10">
          <div>
            <h4 className="font-display font-black text-sm italic tracking-tight">{card.title}</h4>
            <p className="font-mono text-[8px] opacity-70 tracking-widest">{card.subtitle}</p>
          </div>
          <span className="border border-current px-1.5 py-0.5 text-[8px] font-mono rounded">
            90s STYLE
          </span>
        </div>

        {/* Vintage Diagram SVG representation */}
        {card.title?.includes('CASSETTE') ? (
          <div className="w-full h-16 border border-[#F4EFE6]/20 rounded stroke-current flex items-center justify-around px-4 mt-2 opacity-50 z-10">
            <div className="w-6 h-6 rounded-full border border-dashed flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#D66A2C]" />
            </div>
            <div className="h-0.5 w-12 border-t border-dashed" />
            <div className="w-6 h-6 rounded-full border border-dashed flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#D66A2C]" />
            </div>
          </div>
        ) : (
          <div className="w-full h-24 border border-[#F4EFE6]/20 rounded stroke-current flex flex-col justify-between p-2 mt-2 opacity-65 z-10 font-mono text-[6px]">
            <div className="flex justify-between border-b border-dashed border-[#F4EFE6]/10 pb-1">
              <span>BOUNDS: X1 // Y9</span>
              <span>SCALE: 1:1.0</span>
            </div>
            <svg viewBox="0 0 100 40" className="w-full h-12 fill-none stroke-current opacity-60">
              <circle cx="50" cy="20" r="16" strokeDasharray="3 3" />
              <line x1="10" y1="20" x2="90" y2="20" />
              <line x1="50" y1="5" x2="50" y2="35" strokeDasharray="1 1" />
            </svg>
          </div>
        )}

        <div className="flex justify-between items-center z-10 mt-2">
          <span className="font-mono text-[7px] tracking-widest uppercase">MODEL: SYSTEM-M16</span>
          <span className="text-[9px] font-display italic font-black text-[#D66A2C]">BLEU CO.</span>
        </div>
      </div>
    );
  }

  // Otherwise, render full retro-print image cards
  const isSketch = card.type === 'sketch';
  return (
    <div className={`relative shrink-0 rounded-[28px] overflow-hidden border-2 border-[#0B1220] shadow-[6px_6px_0px_rgba(11,18,32,0.1)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[12px_12px_0px_rgba(11,18,32,0.15)] group ${card.aspectRatioClassName || 'w-64 h-90'}`}>
      
      {/* Visual background grain */}
      <div className="absolute inset-0 halftone-bg opacity-15 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/40 via-transparent to-[#0B1220]/10 pointer-events-none z-10" />

      {/* Actual Illustration */}
      <img
        src={card.imageUrl}
        alt={card.title || 'Manga Panel'}
        className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-700 ${
          isSketch ? 'filter grayscale brightness-90 contrast-125 saturate-110' : 'filter brightness-95 saturation-90 contrast-105'
        } group-hover:scale-105`}
        referrerPolicy="no-referrer"
      />

      {/* Retro Newspaper print overlay details */}
      <div className="absolute top-4 left-4 bg-[#F4EFE6] border border-[#0B1220] text-[#0B1220] px-2 py-0.5 text-[7px] font-mono tracking-widest uppercase z-20 shadow-sm rounded-sm">
        {isSketch ? 'SKETCH // DRAFT' : 'EDITORIAL // CMYK'}
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
        <div>
          <span className="font-mono text-[7px] text-[#F4EFE6]/80 block lowercase">
            #bleu_project_98
          </span>
          <h5 className="font-display font-black text-xs italic text-[#F4EFE6] uppercase tracking-wider">
            {card.title}
          </h5>
        </div>
        <div className="w-5 h-5 rounded-full bg-[#F4EFE6]/10 border border-[#F4EFE6]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-2.5 h-2.5 text-[#F4EFE6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      {/* Decorative manga border guidelines inside */}
      <div className="absolute inset-2 border border-[#F4EFE6]/10 rounded-[20px] pointer-events-none z-20" />
    </div>
  );
}

function MarqueeRow({ items, direction, speed = '35s' }: MarqueeRowProps) {
  // Triple the items array elements to guarantee seamless looping without gaps
  const itemsExtended = [...items, ...items, ...items, ...items];
  
  return (
    <div className="relative flex w-full overflow-x-hidden py-3">
      <div 
        className={`flex gap-6 shrink-0 select-none pb-2 ${
          direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
        } hover:[animation-play-state:paused]`}
        style={{
          animationDuration: speed,
        }}
      >
        {itemsExtended.map((card, idx) => (
          <MarqueeCard key={`${card.id}-${idx}`} card={card} />
        ))}
      </div>
    </div>
  );
}

export default function IdentityMarqueeSection() {
  return (
    <section 
      id="marquee-row" 
      className="relative w-full py-16 bg-[#F4EFE6] border-y-2 border-[#0B1220] shrink-0 overflow-hidden"
    >
      {/* Subtle alignment ruler guidelines */}
      <div className="absolute inset-x-0 top-2 h-[1px] bg-[#0B1220]/5 px-12" />
      <div className="absolute inset-x-0 bottom-2 h-[1px] bg-[#0B1220]/5 px-12" />

      {/* Decorative vertical rulers on the side */}
      <div className="absolute inset-y-0 left-2 w-[1px] bg-[#0B1220]/5" />
      <div className="absolute inset-y-0 right-2 w-[1px] bg-[#0B1220]/5" />

      {/* Stylized Section Title Block */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 flex flex-col md:flex-row justify-between items-baseline gap-4">
        <div className="flex gap-4 items-center">
          <span className="bg-[#9E2A2B] text-[#F4EFE6] text-xs font-mono px-2 py-0.5 tracking-widest skew-x-[-10deg]">
            SEC.02
          </span>
          <h3 className="font-display font-black text-xl md:text-2xl italic text-[#0B1220] uppercase tracking-tighter">
            IDENTITY SCRAPBOOK // 漫画集
          </h3>
        </div>
        <p className="font-mono text-[9px] text-[#0B1220]/60 max-w-sm uppercase tracking-wider text-left md:text-right leading-relaxed">
          ARCHIVAL FILM STRIPS, PRINT SYSTEM CMYK TEST PLATES, SPECS BLUEPRINTS, AND RAW CHARACTER CONCEPT POSES STUBBORNLY RECLAIMED FROM A VINTAGE TOKYO MAGAZINE.
        </p>
      </div>

      {/* The Scrollable Containers */}
      <div className="flex flex-col gap-6 relative">
        {/* Soft layout shade on absolute horizontal bounds to hide cuts */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#F4EFE6] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#F4EFE6] to-transparent z-10 pointer-events-none" />

        {/* Row 1: Right-ward continuous movement */}
        <MarqueeRow items={MARQUEE_TOP_ROW} direction="right" speed="45s" />

        {/* Row 2: Left-ward continuous movement */}
        <MarqueeRow items={MARQUEE_BOTTOM_ROW} direction="left" speed="40s" />
      </div>

      {/* Custom embedded animations keyframes injected here inside standard style element, compatible with Tailwind v4 */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-25%, 0, 0); }
        }
        @keyframes scroll-right {
          0% { transform: translate3d(-25%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right linear infinite;
        }
      `}</style>

    </section>
  );
}
