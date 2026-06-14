import React from "react";
import { useDesktopStore } from "../store/desktopStore";
import { AppContentId } from "../types";
import { Taskbar } from "./Taskbar";
import { WindowManager } from "./WindowManager";
import wallpaperUrl from "../assets/images/walpaper.jpg";

export const ImageRenderer = ({ src, size = 32, className = "" }: any) => (
  <img
    src={src}
    width={size}
    height={size}
    className={className}
    style={{ imageRendering: "pixelated" }}
    draggable={false}
    alt="icon"
  />
);

export const desktopIcons: {
  id: AppContentId;
  label: string;
  src: string;
}[] = [
  {
    id: "readme",
    label: "readme.txt",
    src: "https://win98icons.alexmeub.com/icons/png/notepad-2.png",
  },
  {
    id: "applications",
    label: "Applications",
    src: "https://win98icons.alexmeub.com/icons/png/directory_closed-4.png",
  },
  {
    id: "toolbox",
    label: "Skillset",
    src: "https://win98icons.alexmeub.com/icons/png/hardware-1.png",
  },
  {
    id: "lab",
    label: "System Lab",
    src: "https://win98icons.alexmeub.com/icons/png/settings_gear-0.png",
  },
  {
    id: "contact",
    label: "Sys. Properties",
    src: "https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png",
  },
  {
    id: "github",
    label: "GitHub Network",
    src: "https://win98icons.alexmeub.com/icons/png/network_internet_pcs_installer-2.png",
  },
];

export const DesktopEnvironment = () => {
  const openWindow = useDesktopStore((state) => state.openWindow);
  const developerMode = useDesktopStore((state) => state.developerMode);

  return (
    <div
      className="relative w-full h-full pb-12 overflow-hidden flex flex-col bg-[#004E98]"
      style={{
        backgroundImage: `url(${wallpaperUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-6 p-2 z-0 font-sans">
        {desktopIcons.map((icon) => (
          <button
            key={icon.id}
            className="flex flex-col items-center justify-center group w-[72px] gap-1.5 focus:outline-none"
            onDoubleClick={() =>
              openWindow(
                icon.id,
                icon.label.replace(/(\.txt|\/|\.exe|\.app)/, ""),
                icon.id,
              )
            }
            onTouchEnd={() =>
              openWindow(
                icon.id,
                icon.label.replace(/(\.txt|\/|\.exe|\.app)/, ""),
                icon.id,
              )
            }
          >
            <div
              className={`w-10 h-10 flex items-center justify-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] transition-transform`}
            >
              <ImageRenderer src={icon.src} size={36} />
            </div>
            <span className="text-white text-[11px] tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,1)] text-center leading-tight group-hover:bg-[#0055EA] group-hover:bg-opacity-50 group-active:bg-[#0055EA] px-1 py-0.5 rounded transition-colors break-words max-w-full font-[Tahoma,sans-serif]">
              {icon.label}
            </span>
          </button>
        ))}

        {developerMode && (
          <button
            className="flex flex-col items-center justify-center group w-[72px] gap-1.5 focus:outline-none"
            onDoubleClick={() => openWindow("terminal", "cmd.exe", "terminal")}
            onTouchEnd={() => openWindow("terminal", "cmd.exe", "terminal")}
          >
            <div className="w-10 h-10 flex items-center justify-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] transition-transform">
              <ImageRenderer
                src="https://win98icons.alexmeub.com/icons/png/console_prompt-0.png"
                size={36}
              />
            </div>
            <span className="text-white text-[11px] tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,1)] text-center leading-tight group-hover:bg-[#0055EA] group-hover:bg-opacity-50 group-active:bg-[#0055EA] px-1 py-0.5 rounded transition-colors break-words max-w-full font-[Tahoma,sans-serif]">
              cmd.exe
            </span>
          </button>
        )}
      </div>

      <WindowManager />
      <Taskbar icons={desktopIcons} />
    </div>
  );
};
