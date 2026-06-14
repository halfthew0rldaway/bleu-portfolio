import React, { useState, useEffect } from "react";
import { useDesktopStore } from "../store/desktopStore";
import { AppContentId } from "../types";
import { ImageRenderer } from "./DesktopEnvironment";

interface TaskbarProps {
  icons: {
    id: AppContentId;
    label: string;
    src: string;
  }[];
}

export const Taskbar: React.FC<TaskbarProps> = ({ icons }) => {
  const windows = useDesktopStore((state) => state.windows);
  const activeWindowId = useDesktopStore((state) => state.activeWindowId);
  const focusWindow = useDesktopStore((state) => state.focusWindow);
  const toggleMinimize = useDesktopStore((state) => state.toggleMinimize);
  const developerMode = useDesktopStore((state) => state.developerMode);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const allIcons = [...icons];
  if (developerMode) {
    allIcons.push({
      id: "terminal",
      label: "cmd.exe",
      src: "https://win98icons.alexmeub.com/icons/png/console_prompt-0.png",
    });
  }

  return (
    <div className="absolute bottom-0 w-full h-[36px] bg-gradient-to-b from-[#245edb] via-[#3f8efc] to-[#245edb] z-[9999] flex items-center justify-between border-t border-[#003C74]">
      {/* Start Button */}
      <div className="flex bg-gradient-to-b from-[#4ca355] via-[#5fb45f] to-[#3a8b41] hover:brightness-110 active:brightness-90 text-white italic font-bold px-4 h-full items-center rounded-r-[12px] border-r border-[#003C74] cursor-pointer shadow-[inset_2px_2px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.5)] z-10 font-sans text-[16px]">
        <span className="drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)] flex items-center gap-2">
          <div className="w-4 h-4 grid grid-cols-2 gap-[1px] skew-x-[-10deg]">
            <div className="bg-[#245edb]"></div>
            <div className="bg-[#3b82f6]"></div>
            <div className="bg-[#60a5fa]"></div>
            <div className="bg-[#93c5fd]"></div>
          </div>
          start
        </span>
      </div>

      <div className="flex-1 flex px-2 gap-1 overflow-x-auto min-w-0 mx-2 scrollbar-none items-center h-full pt-1 pb-1">
        {windows.map((w) => {
          const iconDef = allIcons.find((i) => i.id === w.contentId);
          const isActive = activeWindowId === w.id && !w.isMinimized;

          return (
            <button
              key={w.id}
              onClick={() => {
                if (isActive) {
                  toggleMinimize(w.id);
                } else {
                  if (w.isMinimized) toggleMinimize(w.id);
                  focusWindow(w.id);
                }
              }}
              className={`flex items-center min-w-[32px] max-w-[160px] px-2 h-full rounded-[3px] text-white text-[11px] font-sans truncate transition-all ${
                isActive
                  ? "bg-gradient-to-b from-[#1b5ab3] to-[#12418a] shadow-[inset_1px_1px_rgba(0,0,0,0.5),inset_-1px_-1px_rgba(255,255,255,0.2)]"
                  : "bg-gradient-to-b from-[#3b85e0] to-[#2f66c1] hover:brightness-110 shadow-[inset_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_rgba(0,0,0,0.2)]"
              }`}
            >
              <div className="mr-2 shrink-0">
                {iconDef && <ImageRenderer src={iconDef.src} size={16} />}
              </div>
              <span className="truncate hidden sm:inline drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
                {w.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center h-full bg-gradient-to-b from-[#119aea] to-[#166db8] px-4 text-white text-[11px] font-sans whitespace-nowrap border-l border-[#003C74] shadow-[inset_1px_0_rgba(255,255,255,0.3)]">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
};
