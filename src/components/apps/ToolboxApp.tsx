import React, { useState } from "react";
import { skills } from "../../data/skills";
import { Wrench, Monitor, Cpu, Code2, Layers } from "lucide-react";

export const ToolboxApp = () => {
  const [activeTab, setActiveTab] = useState("Software");

  return (
    <div className="bg-[#ECE9D8] h-full flex flex-col p-2 text-[#000] font-sans text-[11px] relative">
      {/* Tabs */}
      <div className="flex px-1 gap-0 relative z-10 font-medium tracking-wide pt-1">
        <button
          onClick={() => setActiveTab("Software")}
          className={`px-3 py-1 pb-1.5 -mb-[1px] border border-[#fff] border-b-0 border-r-[#848284] rounded-t-[3px] ${
            activeTab === "Software"
              ? "bg-[#ECE9D8] z-20 border-b-[#ECE9D8] translate-y-[1px]"
              : "bg-[#ECE9D8] text-[#848284] shadow-[inset_-1px_-1px_#848284] hover:bg-[#F2F0E3]"
          }`}
        >
          Software & Code
        </button>
        <button
          onClick={() => setActiveTab("Hardware")}
          className={`px-3 py-1 pb-1.5 -mb-[1px] border border-[#fff] border-b-0 border-r-[#848284] rounded-t-[3px] ${
            activeTab === "Hardware"
              ? "bg-[#ECE9D8] z-20 border-b-[#ECE9D8] translate-y-[1px]"
              : "bg-[#ECE9D8] text-[#848284] shadow-[inset_-1px_-1px_#848284] hover:bg-[#F2F0E3]"
          }`}
        >
          Hardware & Repair
        </button>
      </div>

      {/* Panel */}
      <div className="flex-1 overflow-auto min-h-0 bg-[#ECE9D8] border border-[#fff] border-r-[#848284] border-b-[#848284] shadow-[1px_1px_0_#4a494a] flex flex-col p-4 z-0 relative">
        {activeTab === "Software" && (
          <div className="space-y-4">
            <div className="flex gap-4 items-center mb-2">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-[#fff] shadow-[1px_1px_0_#848284] bg-[#245edb] rounded-sm">
                <Code2 size={24} className="text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-[14px] font-bold tracking-tight">
                  Software Development
                </h2>
                <p className="text-[#333]">
                  Languages, frameworks, and tools used in my projects.
                </p>
              </div>
            </div>

            <div className="w-full h-[2px] border-t border-[#A0A0A0] border-b border-[#fff] my-1"></div>

            <div className="grid grid-cols-2 gap-4">
              <SkillBox
                title="Languages"
                items={skills.languages}
                icon={Code2}
              />
              <SkillBox
                title="Frameworks & Libs"
                items={skills.frameworks}
                icon={Layers}
              />
              <SkillBox
                title="Workbench Tools"
                items={skills.tools}
                icon={Wrench}
                className="col-span-2"
              />
            </div>
          </div>
        )}
        {activeTab === "Hardware" && (
          <div className="space-y-4">
            <div className="flex gap-4 items-center mb-2">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-[#fff] shadow-[1px_1px_0_#848284] bg-[#008000] rounded-sm">
                <Monitor size={24} className="text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-[14px] font-bold tracking-tight">
                  Hardware & IT Support
                </h2>
                <p className="text-[#333]">
                  Practical skills for physical machines and networks.
                </p>
              </div>
            </div>

            <div className="w-full h-[2px] border-t border-[#A0A0A0] border-b border-[#fff] my-1"></div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white border text-[#000] border-[#848284] shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#fff,inset_2px_2px_#848284,inset_-2px_-2px_#dfdfdf] p-3 text-[11px]">
                <div className="flex items-center gap-2 mb-2 border-b border-[#ECE9D8] pb-1">
                  <Cpu size={14} className="text-[#666]" />
                  <strong className="font-bold text-[11px]">
                    Field Specialties
                  </strong>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-[#333] pt-1">
                  {skills.background.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SkillBox = ({ title, items, icon: Icon, className = "" }: any) => (
  <div
    className={`bg-white border text-[#000] border-[#848284] shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#fff,inset_2px_2px_#848284,inset_-2px_-2px_#dfdfdf] p-3 text-[11px] ${className}`}
  >
    <div className="flex items-center gap-2 mb-2 border-b border-[#ECE9D8] pb-1">
      <Icon size={14} className="text-[#666]" />
      <strong className="font-bold text-[11px]">{title}</strong>
    </div>
    <ul className="list-disc pl-4 space-y-0.5 text-[#333] pt-1">
      {items.map((i: string, idx: number) => (
        <li key={idx}>{i}</li>
      ))}
    </ul>
  </div>
);
