import React from "react";
import { useDesktopStore } from "../store/desktopStore";
import { Window } from "./Window";
import { AnimatePresence } from "motion/react";
import { ReadmeApp } from "./apps/ReadmeApp";
import { ApplicationsApp } from "./apps/ApplicationsApp";
import { ToolboxApp } from "./apps/ToolboxApp";
import { LabApp } from "./apps/LabApp";
import { ContactApp } from "./apps/ContactApp";
import { GithubApp } from "./apps/GithubApp";
import { TerminalApp } from "./apps/TerminalApp";

export const WindowManager = () => {
  const windows = useDesktopStore((state) => state.windows);

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
        return <div className="p-4 text-slate-800">Application not found.</div>;
    }
  };

  return (
    <>
      <AnimatePresence>
        {windows.map(
          (win) =>
            !win.isMinimized && (
              <Window key={win.id} windowData={win}>
                {renderContent(win.contentId)}
              </Window>
            ),
        )}
      </AnimatePresence>
    </>
  );
};
