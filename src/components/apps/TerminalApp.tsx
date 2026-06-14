import React, { useState, useRef, useEffect } from "react";
import { projects } from "../../data/projects";
import { skills } from "../../data/skills";

export const TerminalApp = () => {
  const [history, setHistory] = useState<string[]>([
    "Microsoft Windows XP [Version 5.1.2600]",
    "(C) Copyright 1985-2001 Microsoft Corp.",
    "",
    'C:\\Documents and Settings\\Bleu>Type "help" for a list of commands.',
    "",
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, `C:\\Documents and Settings\\Bleu>${cmd}`];

    if (!trimmedCmd) {
      setHistory(newHistory);
      return;
    }

    switch (trimmedCmd) {
      case "help":
        newHistory.push("Available commands:");
        newHistory.push("  help     - Show this help message");
        newHistory.push("  about    - About the developer");
        newHistory.push("  projects - List installed applications");
        newHistory.push("  skills   - List technical skills");
        newHistory.push("  contact  - Show contact information");
        newHistory.push("  clear    - Clear terminal");
        break;
      case "about":
        newHistory.push("Bleu - IT Technician & Informatics Student.");
        newHistory.push("Hardware guy by day, Informatics student by night.");
        break;
      case "projects":
        const count =
          projects.media.length +
          projects.productivity.length +
          projects.experimental.length;
        newHistory.push(`${count} applications installed.`);
        projects.media.forEach((p) => newHistory.push(`  [Media] ${p.name}`));
        projects.productivity.forEach((p) =>
          newHistory.push(`  [Prod]  ${p.name}`),
        );
        projects.experimental.forEach((p) =>
          newHistory.push(`  [Exp]   ${p.name}`),
        );
        break;
      case "skills":
        newHistory.push(`Languages: ${skills.languages.join(", ")}`);
        newHistory.push(`Frameworks: ${skills.frameworks.join(", ")}`);
        newHistory.push(`Tools: ${skills.tools.join(", ")}`);
        newHistory.push(
          `Background:` + skills.background.map((b) => `\n    - ${b}`).join(""),
        );
        break;
      case "contact":
        newHistory.push("Email: hello@bleu.local");
        newHistory.push("GitHub: https://github.com/halfthew0rldaway");
        break;
      case "clear":
        setHistory([
          "Microsoft Windows XP [Version 5.1.2600]",
          "(C) Copyright 1985-2001 Microsoft Corp.",
          "",
        ]);
        setInput("");
        return;
      default:
        newHistory.push(
          `'${trimmedCmd}' is not recognized as an internal or external command,`,
        );
        newHistory.push(`operable program or batch file.`);
    }
    newHistory.push(""); // spacing
    setHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="bg-[#000] text-[#C0C0C0] font-['Lucida_Console',_monospace] text-[12px] p-2 h-full flex flex-col font-normal leading-tight">
      <div className="flex-1 overflow-auto px-1">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        <div className="flex items-center">
          <span className="mr-1">C:\Documents and Settings\Bleu&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-[#C0C0C0] caret-[#C0C0C0]"
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
