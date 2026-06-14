import React, { useState } from "react";
import { Loader2 } from "lucide-react";

export const BrowserApp = ({ url }: { url?: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!url) {
    return (
      <div className="bg-[#ECE9D8] h-full flex items-center justify-center text-[#000]">
        No URL provided.
      </div>
    );
  }

  return (
    <div className="bg-white h-full w-full flex flex-col relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
          <Loader2 className="animate-spin text-[#0055EA]" size={32} />
        </div>
      )}
      <iframe
        src={url}
        className="w-full flex-1 border-none"
        onLoad={() => setIsLoading(false)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        title="Browser"
      />
    </div>
  );
};
