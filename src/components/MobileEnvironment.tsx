import React, { useState } from "react";
import { AppContentId } from "../types";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useDesktopStore } from "../store/desktopStore";
import { desktopIcons, ImageRenderer } from "./DesktopEnvironment";
import wallpaperUrl from "../assets/images/walpaper.jpg";

import { ReadmeApp } from "./apps/ReadmeApp";
import { ApplicationsApp } from "./apps/ApplicationsApp";
import { ToolboxApp } from "./apps/ToolboxApp";
import { LabApp } from "./apps/LabApp";
import { ContactApp } from "./apps/ContactApp";
import { GithubApp } from "./apps/GithubApp";
import { TerminalApp } from "./apps/TerminalApp";
import { MobileWarningModal } from "./MobileWarningModal";

const renderContent = (contentId: string) => {
  switch (contentId) {
    case "readme":
      return <ReadmeApp />;
    case "applications":
      return <ApplicationsApp />;
    case "toolbox":
      return <ToolboxApp />;
    case "lab":
      return <LabApp />;
    case "contact":
      return <ContactApp />;
    case "github":
      return <GithubApp />;
    case "terminal":
      return <TerminalApp />;
    default:
      return null;
  }
};

export const MobileEnvironment = () => {
  const [activeSheet, setActiveSheet] = useState<AppContentId | null>(null);
  const developerMode = useDesktopStore((state) => state.developerMode);

  const icons = [...desktopIcons];
  if (developerMode) {
    icons.push({
      id: "terminal",
      label: "cmd.exe",
      src: "https://win98icons.alexmeub.com/icons/png/console_prompt-0.png",
    });
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col bg-[#004E98]"
      style={{
        backgroundImage: `url(${wallpaperUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Mobile Grid Layout */}
      <div className="flex-1 p-6 grid grid-cols-3 gap-y-8 gap-x-4 content-start z-0 filter drop-shadow-xl font-sans">
        {icons.map((icon) => (
          <button
            key={icon.id}
            onClick={() => setActiveSheet(icon.id)}
            className="flex flex-col items-center justify-start group focus:outline-none gap-2"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center drop-shadow-md transition-transform`}
            >
              <ImageRenderer src={icon.src} size={48} />
            </div>
            <span className="text-white text-[11px] tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,1)] text-center leading-tight active:bg-[#0055EA] active:bg-opacity-50 px-1 py-0.5 rounded transition-colors break-words max-w-full font-[Tahoma,sans-serif]">
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeSheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSheet(null)}
              className="absolute inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-x-0 bottom-0 top-[15%] bg-[#ECE9D8] z-50 rounded-t-[12px] overflow-hidden flex flex-col shadow-[0_-4px_20px_rgba(0,0,0,0.5)] border-[#003C74] border-[3px] border-b-0"
            >
              <div className="h-10 shrink-0 px-2 flex justify-between items-center select-none bg-gradient-to-b from-[#0058E6] via-[#3A93FF] to-[#0058E6] text-white">
                <h3 className="font-bold tracking-wide text-[14px] flex items-center gap-2 truncate ml-1 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] font-sans">
                  <ImageRenderer
                    src={icons.find((i) => i.id === activeSheet)?.src}
                    size={20}
                  />
                  {icons.find((i) => i.id === activeSheet)?.label}
                </h3>
                <button
                  onClick={() => setActiveSheet(null)}
                  className="w-[28px] h-[28px] flex justify-center items-center rounded-sm border border-[#fff]/40 bg-gradient-to-b from-[#ffa4a4] via-[#e53a24] to-[#f42626] shadow-[inset_1px_1px_rgba(255,255,255,0.8)] active:brightness-90 mr-0.5"
                >
                  <X
                    size={18}
                    className="text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]"
                    strokeWidth={3}
                  />
                </button>
              </div>
              <div className="flex-1 overflow-auto bg-[#ECE9D8] flex flex-col">
                {renderContent(activeSheet)}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sarcastic Mobile Warning */}
      <MobileWarningModal />
    </div>
  );
};
