import React, { useState } from "react";
import { contactInfo } from "../../data/skills";
import {
  Globe,
  Folder,
  FolderTree,
  Activity,
  Archive,
  FlaskConical,
} from "lucide-react";

export const GithubApp = () => {
  const [activeTab, setActiveTab] = useState("Repositories");

  return (
    <div className="bg-[#ECE9D8] h-full flex flex-col p-2 text-[#000] font-sans text-[11px] relative">
      <div className="flex px-1 gap-0 relative z-10 font-medium tracking-wide pt-1">
        {["Repositories", "Activity", "Experiments"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 pb-1.5 -mb-[1px] border border-[#fff] border-b-0 border-r-[#848284] rounded-t-[3px] ${
              activeTab === tab
                ? "bg-[#ECE9D8] z-20 border-b-[#ECE9D8] translate-y-[1px]"
                : "bg-[#ECE9D8] text-[#848284] shadow-[inset_-1px_-1px_#848284] hover:bg-[#F2F0E3]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 bg-[#ECE9D8] border border-[#fff] border-r-[#848284] border-b-[#848284] shadow-[1px_1px_0_#4a494a] flex flex-col p-4 z-0 relative overflow-auto">
        <div className="flex gap-4 items-center mb-4">
          <div className="w-14 h-14 bg-white flex items-center justify-center rounded-sm border-2 border-black shadow-[inset_1px_1px_#848284,1px_1px_0_rgba(255,255,255,1)] p-1">
            <img
              src="https://github.com/halfthew0rldaway.png"
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://ui-avatars.com/api/?name=Bleu&background=245edb&color=fff")
              }
            />
          </div>
          <div>
            <h2 className="text-[18px] font-bold tracking-tight">
              halfthew0rldaway
            </h2>
            <p className="text-[#333]">GitHub Profile</p>
          </div>
        </div>

        <div className="w-full h-[2px] border-t border-[#A0A0A0] border-b border-[#fff] mb-4"></div>

        {activeTab === "Repositories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <GitHubBox title="Top Repositories" icon={FolderTree}>
              <ul className="mt-2 space-y-1">
                <li>
                  <a
                    href="https://github.com/halfthew0rldaway/cinea"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#245edb] hover:underline flex items-center gap-1.5"
                  >
                    <Folder
                      size={12}
                      className="text-[#E59700] fill-[#E59700]/20"
                    />{" "}
                    cinea
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/halfthew0rldaway/docsmith"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#245edb] hover:underline flex items-center gap-1.5"
                  >
                    <Folder
                      size={12}
                      className="text-[#E59700] fill-[#E59700]/20"
                    />{" "}
                    docsmith
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/halfthew0rldaway/utilify"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#245edb] hover:underline flex items-center gap-1.5"
                  >
                    <Folder
                      size={12}
                      className="text-[#E59700] fill-[#E59700]/20"
                    />{" "}
                    utilify
                  </a>
                </li>
              </ul>
            </GitHubBox>
            <GitHubBox title="Archives" icon={Archive}>
              <ul className="mt-2 space-y-1">
                <li className="text-[#848284] italic line-through flex items-center gap-1.5">
                  <Folder size={12} /> legacy-portfolio
                </li>
              </ul>
            </GitHubBox>
          </div>
        )}

        {activeTab === "Activity" && (
          <GitHubBox title="Recent Activity" icon={Activity}>
            <div className="mt-2 bg-white border border-[#848284] shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#fff] p-2 flex flex-wrap gap-0.5">
              {Array.from({ length: 104 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 ${Math.random() > 0.7 ? "bg-[#008000]" : Math.random() > 0.4 ? "bg-[#90EE90]" : "bg-[#ECE9D8]"}`}
                ></div>
              ))}
            </div>
            <p className="mt-2 text-[#848284] italic">
              Simulated contribution graph.
            </p>
          </GitHubBox>
        )}

        {activeTab === "Experiments" && (
          <GitHubBox title="Lab & Experiments" icon={FlaskConical}>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href="https://github.com/halfthew0rldaway/flux-state"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#245edb] hover:underline flex items-center gap-1.5"
                >
                  <Folder
                    size={12}
                    className="text-[#E59700] fill-[#E59700]/20"
                  />{" "}
                  flux-state
                </a>
              </li>
            </ul>
          </GitHubBox>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-1 px-1">
        <a
          href={contactInfo.github}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-1.5 bg-[#ECE9D8] border border-[#003C74] rounded-[3px] hover:border-[#E59700] hover:shadow-[0_0_0_1px_#F2CD70,inset_1px_1px_rgba(255,255,255,0.7)] text-black focus:border-[#E59700] active:bg-[#E0E0E0] active:shadow-[inset_1px_1px_rgba(0,0,0,0.2)] shadow-[inset_1px_1px_rgba(255,255,255,0.7),inset_-1px_-1px_rgba(0,0,0,0.1)] text-[11px] flex gap-1.5 items-center justify-center no-underline min-w-[75px] transition-colors cursor-default"
        >
          <Globe size={14} className="text-[#0055EA]" /> Open in Browser
        </a>
      </div>
    </div>
  );
};

const GitHubBox = ({ title, children, icon: Icon }: any) => (
  <div className="bg-white border text-[#000] border-[#848284] shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#fff,inset_2px_2px_#848284,inset_-2px_-2px_#dfdfdf] p-3 text-[11px] mb-4">
    <div className="flex items-center gap-2 mb-2 border-b border-[#ECE9D8] pb-1">
      <Icon size={14} className="text-[#666]" />
      <strong className="font-bold text-[11px]">{title}</strong>
    </div>
    {children}
  </div>
);
