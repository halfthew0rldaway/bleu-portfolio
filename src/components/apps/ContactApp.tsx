import React, { useState } from "react";
import { contactInfo } from "../../data/skills";
import { Mail, Github, Linkedin, Monitor } from "lucide-react";

export const ContactApp = () => {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div className="bg-[#ECE9D8] h-full flex flex-col p-2 text-[#000] font-sans text-[11px] relative">
      {/* Tabs */}
      <div className="flex px-1 gap-0 relative z-10 font-medium tracking-wide pt-1">
        <button
          onClick={() => setActiveTab("General")}
          className={`px-3 py-1 pb-1.5 -mb-[1px] border border-[#fff] border-b-0 border-r-[#848284] rounded-t-[3px] ${
            activeTab === "General"
              ? "bg-[#ECE9D8] z-20 border-b-[#ECE9D8] translate-y-[1px]"
              : "bg-[#ECE9D8] text-[#848284] shadow-[inset_-1px_-1px_#848284] hover:bg-[#F2F0E3]"
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("Hardware")}
          className={`px-3 py-1 pb-1.5 -mb-[1px] border border-[#fff] border-b-0 border-r-[#848284] rounded-t-[3px] ${
            activeTab === "Hardware"
              ? "bg-[#ECE9D8] z-20 border-b-[#ECE9D8] translate-y-[1px]"
              : "bg-[#ECE9D8] text-[#848284] shadow-[inset_-1px_-1px_#848284] hover:bg-[#F2F0E3]"
          }`}
        >
          Hardware
        </button>
      </div>

      {/* Panel */}
      <div className="flex-1 bg-[#ECE9D8] border border-[#fff] border-r-[#848284] border-b-[#848284] shadow-[1px_1px_0_#4a494a] flex flex-col p-4 z-0 relative overflow-y-auto min-h-0">
        {activeTab === "General" ? (
          <div className="flex flex-col h-full gap-4">
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 bg-white flex items-center justify-center rounded-sm border-2 border-black shadow-[inset_1px_1px_#848284,1px_1px_0_rgba(255,255,255,1)]">
                <Monitor
                  size={32}
                  className="text-[#245edb] drop-shadow-md"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h2 className="text-[18px] font-bold tracking-tight">
                  System Properties
                </h2>
                <p className="text-[#333]">BleuOS Professional</p>
              </div>
            </div>

            <div className="w-full h-[2px] border-t border-[#A0A0A0] border-b border-[#fff]"></div>

            <div className="flex-1">
              <p className="mb-2 font-medium">Registered to:</p>
              <div className="pl-6 space-y-1 text-[#333]">
                <p>Bleu</p>
                <p>IT Technician & Informatics Student</p>
                <p>55274-OEM-0123456-78901</p>
                <p className="mt-4 text-[#245edb] font-medium tracking-wide">
                  Genuine BleuOS Advantage
                </p>
              </div>
            </div>

            <div className="w-full h-[2px] border-t border-[#A0A0A0] border-b border-[#fff]"></div>

            <div>
              <p className="mb-4">Connect across platforms:</p>
              <div className="flex gap-2">
                <XPButton href={`mailto:${contactInfo.email}`} icon={Mail}>
                  Email
                </XPButton>
                <XPButton href={contactInfo.github} icon={Github}>
                  GitHub
                </XPButton>
                <XPButton href={contactInfo.linkedin} icon={Linkedin}>
                  LinkedIn
                </XPButton>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-1 text-[#848284]">
            Nothing here yet.
          </div>
        )}
      </div>

      {/* Footer buttons */}
      <div className="flex justify-end gap-2 mt-4 pt-1 px-1">
        <XPButton>OK</XPButton>
        <XPButton>Cancel</XPButton>
        <XPButton disabled>Apply</XPButton>
      </div>
    </div>
  );
};

const XPButton = ({ children, onClick, href, icon: Icon, disabled }: any) => {
  const baseClasses = `px-4 py-1.5 bg-[#ECE9D8] border border-[#003C74] rounded-[3px] 
  ${disabled ? "opacity-50 grayscale border-[#848284] pointer-events-none text-[#848284]" : "hover:border-[#E59700] hover:shadow-[0_0_0_1px_#F2CD70,inset_1px_1px_rgba(255,255,255,0.7)] text-black focus:border-[#E59700] active:bg-[#E0E0E0] active:shadow-[inset_1px_1px_rgba(0,0,0,0.2)]"} 
  shadow-[inset_1px_1px_rgba(255,255,255,0.7),inset_-1px_-1px_rgba(0,0,0,0.1)] 
  text-[11px] flex gap-1.5 items-center justify-center no-underline min-w-[75px] font-sans transition-colors cursor-default`;

  if (href) {
    return (
      <a href={href} className={baseClasses} target="_blank" rel="noreferrer">
        {Icon && <Icon size={14} className="text-[#0055EA]" strokeWidth={2} />}
        {children}
      </a>
    );
  }
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={baseClasses}
      type="button"
    >
      {Icon && <Icon size={14} className="text-[#0055EA]" strokeWidth={2} />}
      {children}
    </button>
  );
};
