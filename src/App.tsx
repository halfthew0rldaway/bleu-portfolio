import React, { useEffect, useState } from "react";
import { BootSequence } from "./components/BootSequence";
import { DesktopView } from "./components/DesktopView";
import { useDesktopStore } from "./store/desktopStore";

export default function App() {
  const isBooting = useDesktopStore((state) => state.isBooting);
  const [hasStarted, setHasStarted] = useState(false);
  const enableDeveloperMode = useDesktopStore(
    (state) => state.enableDeveloperMode,
  );

  // Konami code hook
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          enableDeveloperMode();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableDeveloperMode]);

  if (!hasStarted) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center font-sans">
        <button 
          onClick={() => setHasStarted(true)} 
          className="px-8 py-4 text-xl border-2 border-[#b0b0b0] bg-[#ECE9D8] text-black font-bold rounded shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#0a0a0a,inset_-2px_-2px_#dfdfdf,inset_2px_2px_#808080]"
        >
          Power On
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-orange-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      <BootSequence />
      {!isBooting && <DesktopView />}
    </div>
  );
}
