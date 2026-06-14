import React, { useState } from "react";
import { labInterests } from "../../data/skills";
import { FlaskConical, Beaker, Check, ShieldAlert } from "lucide-react";

export const LabApp = () => {
  return (
    <div className="bg-[#ECE9D8] h-full flex flex-col p-4 text-[#000] font-sans text-[11px] relative overflow-auto">
      <div className="bg-white border text-[#000] border-[#848284] shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#fff,inset_2px_2px_#848284,inset_-2px_-2px_#dfdfdf] p-4 text-[11px] max-w-lg mx-auto w-full">
        <div className="flex gap-4 items-center mb-4">
          <div className="w-14 h-14 bg-white flex items-center justify-center rounded-full border-2 border-[#848284] shadow-[inset_1px_1px_#000,1px_1px_0_rgba(255,255,255,1)]">
            <FlaskConical
              size={32}
              className="text-[#008000] drop-shadow-sm"
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h2 className="text-[18px] font-bold tracking-tight">System Lab</h2>
            <p className="text-[#333]">Experimental Modules & Research</p>
          </div>
        </div>

        <div className="w-full h-[2px] border-t border-[#A0A0A0] border-b border-[#fff] mb-4"></div>

        <div className="bg-[#FFFFCC] border border-[#848284] p-3 mb-4 flex gap-3 text-[#333]">
          <ShieldAlert
            size={28}
            className="text-[#E59700] shrink-0"
            strokeWidth={1.5}
          />
          <p className="text-[11px]">
            <strong>Warning:</strong> The following modules are currently in
            active research and development. They may cause system instability
            or unexpected behavior in production environments.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold flex items-center gap-2 mb-2">
            <Beaker size={14} className="text-[#245edb]" /> Active Research
            Threads:
          </h3>
          <div className="bg-white border border-[#848284] shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#fff] p-1">
            <ul className="space-y-1">
              {labInterests.map((interest, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-[#245edb] hover:text-white cursor-default group"
                >
                  <div className="w-4 h-4 border border-[#848284] shadow-[inset_1px_1px_#000,inset_-1px_-1px_#fff] bg-white flex items-center justify-center shrink-0">
                    <Check
                      size={12}
                      className="text-[#000] group-hover:text-[#245edb] opacity-70"
                      strokeWidth={3}
                    />
                  </div>
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
