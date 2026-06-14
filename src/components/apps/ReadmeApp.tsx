import React from "react";

export const ReadmeApp = () => {
  return (
    <div className="h-full bg-white p-6 font-mono text-[13px] overflow-auto shadow-[inset_1px_1px_#848284,inset_-1px_-1px_#fff,inset_2px_2px_#0a0a0a,inset_-2px_-2px_#dfdfdf]">
      <div className="max-w-md space-y-6 text-[#1a1a1a]">
        <h1 className="text-[18px] font-bold border-b border-dashed border-gray-400 pb-2">
          readme.txt
        </h1>

        <p>
          Hi. I'm Bleu.
          <br />
          Hardware guy by day, Informatics student by night.
        </p>

        <p>
          If the code looks a bit unhinged, it's because I'm figuring this out
          as I go. But hey, it works on my machine. ¯\_(ツ)_/¯
        </p>

        <p>
          Most of the stuff you see here exists for one simple reason: I got
          tired of paying $9.99/mo for basic software. If a corporate SAAS can
          do it, I can probably tape together a sketchy free version over the
          weekend.
        </p>

        <p>
          Click around. Try not to break anything. If you find a bug, consider
          it an undocumented feature.
        </p>

        <p className="pt-4 border-t border-dashed border-gray-400 text-[#666]">
          --
          <br />
          Built out of spite for subscription models.
        </p>
      </div>
    </div>
  );
};
