import React from "react";
import { projects } from "../../data/projects";
import { Folder, ArrowUpRight } from "lucide-react";
import { ImageRenderer } from "../DesktopEnvironment";
import { useDesktopStore } from "../../store/desktopStore";

export const ApplicationsApp = () => {
  return (
    <div className="bg-[#ECE9D8] min-h-full font-sans p-4 text-[#000]">
      <div className="bg-white border text-[#000] border-[#848284] shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#fff,inset_2px_2px_#848284,inset_-2px_-2px_#dfdfdf] p-4 text-[11px] max-w-4xl mx-auto w-full">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <CategorySection title="Media" items={projects.media} />
          <CategorySection
            title="Productivity & Utilities"
            items={projects.productivity}
          />
          <CategorySection title="Experimental" items={projects.experimental} />
        </div>
      </div>
    </div>
  );
};

const getAppIconSrc = (id: string) => {
  if (id === "cinea")
    return "https://win98icons.alexmeub.com/icons/png/multimedia-0.png";
  if (id === "docsmith")
    return "https://win98icons.alexmeub.com/icons/png/write_wordpad-1.png";
  if (id === "kalkulator-kalori")
    return "https://win98icons.alexmeub.com/icons/png/calculator-1.png";
  if (id === "animix")
    return "https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png";
  if (id === "utilify")
    return "https://win98icons.alexmeub.com/icons/png/hardware-1.png";
  if (id === "pomodoro")
    return "https://win98icons.alexmeub.com/icons/png/clock-1.png";
  if (id === "flux-state")
    return "https://win98icons.alexmeub.com/icons/png/settings_gear-0.png";
  return "https://win98icons.alexmeub.com/icons/png/package-0.png";
};

const CategorySection = ({ title, items }: { title: string; items: any[] }) => {
  return (
    <div>
      <h3 className="font-bold text-[12px] text-black border-b border-[#A0A0A0] pb-1 mb-2 flex items-center pr-2">
        <Folder size={14} className="text-[#E59700] fill-[#E59700]/10 mr-1.5" />
        {title}
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-y-6 gap-x-2">
        {items.map((item) => (
          <AppGridItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const AppGridItem: React.FC<{ item: any }> = ({ item }) => {
  const openWindow = useDesktopStore((state) => state.openWindow);
  const iconSrc = getAppIconSrc(item.id);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    openWindow(
      `browser-${item.id}`,
      item.name,
      "browser",
      { width: 900, height: 600 },
      item.link
    );
  };

  return (
    <div className="flex flex-col items-center group cursor-default focus:outline-none p-1 relative w-20 justify-start">
      <button
        onClick={handleOpen}
        className="flex flex-col items-center w-full focus:outline-none bg-transparent border-none"
      >
        <div
          className={`w-12 h-12 flex items-center justify-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] mb-1`}
        >
          <ImageRenderer src={iconSrc} size={36} />
        </div>

        <div className="text-center group-hover:bg-[#0055EA] group-active:bg-[#0055EA] group-hover:text-white px-1 py-0.5 rounded transition-colors break-words max-w-full font-[Tahoma,sans-serif]">
          <span
            className="text-[11px] leading-tight block line-clamp-2"
            title={item.name}
          >
            {item.name}
          </span>
        </div>
      </button>
      {item.repo && item.repo !== "#" && (
        <a
          href={item.repo}
          target="_blank"
          rel="noreferrer"
          title="Source Code"
          className="absolute top-0 right-1 w-4 h-4 bg-[#ece9d8] border border-[#A0A0A0] hover:border-[#0055EA] flex items-center justify-center rounded-sm text-[#0055EA] shadow-[1px_1px_0_rgba(255,255,255,1)]"
        >
          <ArrowUpRight size={10} strokeWidth={2} />
        </a>
      )}
    </div>
  );
};
