import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, X } from "lucide-react";

export const MobileWarningModal = () => {
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem("mobileWarningSeen") !== "true";
  });

  const handleDismiss = () => {
    localStorage.setItem("mobileWarningSeen", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-black/80 z-[100] backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute left-4 right-4 top-1/2 -translate-y-1/2 bg-[#ECE9D8] z-[101] rounded-[8px] overflow-hidden flex flex-col shadow-[4px_8px_20px_rgba(0,0,0,0.6)] border-[#003C74] border-[3px]"
            style={{ y: "-50%" }}
          >
            <div className="h-7 shrink-0 px-1 flex justify-between items-center select-none bg-gradient-to-b from-[#0058E6] via-[#3A93FF] to-[#0058E6] text-white">
              <h3 className="font-bold tracking-wide text-[12px] flex items-center gap-1.5 truncate ml-1 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] font-sans">
                <AlertCircle size={16} />
                Critical Mobile Alert.exe
              </h3>
              <button
                onClick={handleDismiss}
                className="w-[21px] h-[21px] flex justify-center items-center rounded-sm border border-[#fff]/40 bg-gradient-to-b from-[#ffa4a4] via-[#e53a24] to-[#f42626] shadow-[inset_1px_1px_rgba(255,255,255,0.8)] active:brightness-90 mt-0.5 mr-0.5"
              >
                <X size={14} className="text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]" strokeWidth={3} />
              </button>
            </div>
            <div className="p-6 bg-white flex flex-col items-center text-center font-serif text-slate-800">
              <h1 className="text-2xl font-black mb-4 tracking-tighter text-red-600">
                Oh, you're on a phone?
              </h1>
              <p className="text-sm leading-relaxed mb-4 italic text-slate-600">
                I humbly beg your pardon. You've accessed a meticulously crafted, desktop-optimized retro OS simulation... on a tiny rectangle of glass. 
              </p>
              <p className="text-sm leading-relaxed mb-6 font-medium">
                While I've duct-taped together a "mobile view" so it doesn't entirely explode, please know that it probably doesn't look as glorious as it should. Proceed at your own aesthetic peril.
              </p>
              <button
                onClick={handleDismiss}
                className="px-6 py-2 text-sm border-2 border-[#003C74] bg-[#0058E6] text-white font-bold rounded shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] active:bg-[#003C74] transition-colors"
              >
                I accept the consequences
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
