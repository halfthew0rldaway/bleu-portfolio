import React, { useEffect, useState } from "react";
import { useDesktopStore } from "../store/desktopStore";
import { motion, AnimatePresence } from "motion/react";
import startupSoundUrl from "../assets/sounds/forstartup.mp3";

export const BootSequence = () => {
  const finishBoot = useDesktopStore((state) => state.finishBoot);
  const isBooting = useDesktopStore((state) => state.isBooting);
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    if (!isBooting) {
      setShowBoot(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowBoot(false); // start the fade-out
    }, 4000);

    return () => clearTimeout(timer);
  }, [isBooting]);

  const handleExitComplete = () => {
    if (isBooting) {
      finishBoot();
      const audio = new Audio(startupSoundUrl);
      audio.play().catch((e) => console.log("Audio autoplay blocked:", e));
    }
  };

  if (!isBooting && !showBoot) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {showBoot && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center cursor-wait"
        >
          {/* Windows XP Logo Container */}
          <div className="flex flex-col items-center -mt-20">
            <div className="flex items-start">
              {/* Simplified Windows Flag */}
              <div
                className="w-16 h-16 grid grid-cols-2 gap-1 translate-y-2 opacity-90 mr-6"
                style={{
                  transform:
                    "perspective(200px) rotateY(15deg) rotateZ(-15deg)",
                }}
              >
                <div className="bg-[#245edb] rounded-tl-[10px]"></div>
                <div className="bg-[#3b82f6] rounded-tr-[10px]"></div>
                <div className="bg-[#60a5fa] rounded-bl-[10px]"></div>
                <div className="bg-[#93c5fd] rounded-br-[10px]"></div>
              </div>
              <div className="flex flex-col">
                <div className="text-white text-[24px] font-serif italic leading-none ml-1 tracking-wider">
                  Bleu
                </div>
                <div className="text-white text-[72px] font-bold font-sans leading-none tracking-tighter">
                  System
                  <span className="text-[#3b82f6] text-[36px] align-top tracking-normal ml-1">
                    XP
                  </span>
                </div>
              </div>
            </div>

            <div className="text-white text-[22px] font-sans mt-2 tracking-wide self-end mr-2 font-bold opacity-0">
              Professional
            </div>
          </div>

          {/* Loading Bar */}
          <div className="absolute bottom-32 w-[280px] h-[22px] border-[2px] border-[#b0b0b0] rounded-[6px] p-[2px] bg-black overflow-hidden flex items-center shadow-[inset_0_0_4px_rgba(0,0,0,1)]">
            <motion.div
              animate={{ x: [-100, 280] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="flex gap-[2px]"
            >
              <div className="w-3 h-[14px] bg-gradient-to-b from-[#245edb] via-[#60a5fa] to-[#245edb] rounded-[1px]" />
              <div className="w-3 h-[14px] bg-gradient-to-b from-[#245edb] via-[#60a5fa] to-[#245edb] rounded-[1px]" />
              <div className="w-3 h-[14px] bg-gradient-to-b from-[#245edb] via-[#60a5fa] to-[#245edb] rounded-[1px]" />
            </motion.div>
          </div>

          <div className="absolute bottom-10 flex w-full justify-between px-10 text-white/50 text-[11px] font-sans font-bold">
            <div>Copyright © Bleu OS Foundation</div>
            <div className="italic font-serif">Bleu</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
