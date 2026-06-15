import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { WindowState } from "../types";
import { useDesktopStore } from "../store/desktopStore";
import { X } from "lucide-react";
import { desktopIcons } from "./DesktopEnvironment";

interface WindowProps {
  windowData: WindowState;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ windowData, children }) => {
  const { id, title, isMaximized, position, size, zIndex } = windowData;
  const closeWindow = useDesktopStore((state) => state.closeWindow);
  const toggleMaximize = useDesktopStore((state) => state.toggleMaximize);
  const toggleMinimize = useDesktopStore((state) => state.toggleMinimize);
  const focusWindow = useDesktopStore((state) => state.focusWindow);
  const updateWindowPos = useDesktopStore((state) => state.updateWindowPos);
  const updateWindowSize = useDesktopStore((state) => state.updateWindowSize);
  const activeWindowId = useDesktopStore((state) => state.activeWindowId);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const isActive = activeWindowId === id;

  const handlePointerDown = () => {
    focusWindow(id);
  };

  const handleResizeStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    focusWindow(id);
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX));
      const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
      updateWindowSize(id, { width: newWidth, height: newHeight });
    };

    const onPointerUp = () => {
      setIsResizing(false);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  };

  return (
    <motion.div
      ref={containerRef}
      drag={!isMaximized}
      dragMomentum={false}
      dragHandle=".window-titlebar"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: isMaximized ? 0 : position.x,
        y: isMaximized ? 0 : position.y,
        width: isMaximized ? "100vw" : size.width,
        height: isMaximized ? "calc(100vh - 36px)" : size.height, // 36px taskbar height in XP
      }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e, info) => {
        setIsDragging(false);
        if (!isMaximized) {
          updateWindowPos(id, {
            x: position.x + info.offset.x,
            y: position.y + info.offset.y,
          });
        }
      }}
      onPointerDown={handlePointerDown}
      style={{
        position: "absolute",
        zIndex,
        top: 0,
        left: 0,
      }}
      className={`flex flex-col bg-[#ECE9D8] rounded-t-[8px] overflow-hidden shadow-[2px_4px_10px_rgba(0,0,0,0.5)] ${
        isActive
          ? "pointer-events-auto border-[#003C74] border-[3px]"
          : "border-[#6D8AAB] border-[3px]"
      } ${isMaximized ? "rounded-none shadow-none border-x-0 !border-y-0" : ""}`}
    >
      {/* Title Bar */}
      <div
        className={`window-titlebar h-7 px-1 flex justify-between items-center select-none ${
          isActive
            ? "bg-gradient-to-b from-[#0058E6] via-[#3A93FF] to-[#0058E6] text-white"
            : "bg-gradient-to-b from-[#7CAAF7] via-[#B4D6FE] to-[#7CAAF7] text-[#dfdfdf]"
        }`}
        onDoubleClick={() => toggleMaximize(id)}
      >
        <div className="font-bold tracking-wide text-[12px] truncate ml-1 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] font-sans flex items-center gap-1.5">
          <img
            src={
              id === "terminal"
                ? "https://win98icons.alexmeub.com/icons/png/console_prompt-0.png"
                : desktopIcons.find((i) => i.id === windowData.contentId)
                    ?.src ||
                  "https://win98icons.alexmeub.com/icons/png/directory_closed-4.png"
            }
            width={16}
            height={16}
            draggable={false}
            alt="icon"
            style={{ imageRendering: "pixelated" }}
          />
          {title}
        </div>

        <div className="flex gap-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMinimize(id);
            }}
            className={`w-[21px] h-[21px] flex justify-center items-center rounded-sm border border-[#fff]/40 ${isActive ? "bg-gradient-to-b from-[#fff] to-[#245edb] shadow-[inset_1px_1px_rgba(255,255,255,0.8)] hover:brightness-110 active:brightness-90" : "bg-gradient-to-b from-[#e0e0e0] to-[#7CAAF7]"}`}
            aria-label="Minimize"
          >
            <div className="w-[8px] h-[2px] bg-white mt-2 shadow-[1px_1px_1px_currentColor] text-black"></div>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize(id);
            }}
            className={`w-[21px] h-[21px] flex justify-center items-center rounded-sm border border-[#fff]/40 ${isActive ? "bg-gradient-to-b from-[#fff] to-[#245edb] shadow-[inset_1px_1px_rgba(255,255,255,0.8)] hover:brightness-110 active:brightness-90" : "bg-gradient-to-b from-[#e0e0e0] to-[#7CAAF7]"}`}
            aria-label="Maximize"
          >
            <div className="w-[10px] h-[9px] border-[2px] border-t-[3px] border-white shadow-[1px_1px_1px_currentColor] text-black"></div>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
            className={`w-[21px] h-[21px] flex justify-center items-center rounded-sm border border-[#fff]/40 ${isActive ? "bg-gradient-to-b from-[#ffa4a4] via-[#e53a24] to-[#f42626] shadow-[inset_1px_1px_rgba(255,255,255,0.8)] hover:brightness-110 active:brightness-90" : "bg-gradient-to-b from-[#f2aeb0] to-[#7CAAF7]"}`}
            aria-label="Close"
          >
            <X
              size={14}
              className="text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]"
              strokeWidth={3}
            />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-[#ECE9D8] relative border-t-0 p-0 m-0">
        {(isResizing || isDragging || !isActive) && (
          <div className="absolute inset-0 z-50 bg-transparent" />
        )}
        {children}
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
          onPointerDown={handleResizeStart}
          style={{
            backgroundImage: "linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.15) 50%, transparent 50%, transparent 70%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.15) 80%, transparent 80%)"
          }}
        />
      )}
    </motion.div>
  );
};
