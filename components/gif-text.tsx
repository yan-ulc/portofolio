"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface GifTextProps {
  text?: string;
  gif?: string;
  className?: string;
  containerClassName?: string;
}

const GifText = ({
  text = "CHAMAAC",
  gif = "https://cdn.21st.dev/assets/mirror/3b/3b4510e4cd062ea14630d3d6abcc80b867d4c4ba0dc648d408648c9b15592c52.gif",
  className,
  containerClassName,
}: GifTextProps) => {
  const [loadedGif, setLoadedGif] = useState<string | null>(null);
  const [failedGif, setFailedGif] = useState<string | null>(null);
  const loading = Boolean(gif) && loadedGif !== gif && failedGif !== gif;
  const hasLoadedGif = loadedGif === gif;

  useEffect(() => {
    if (!gif) return;

    const image = new Image();
    image.src = gif;
    image.onload = () => setLoadedGif(gif);
    image.onerror = () => setFailedGif(gif);

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [gif]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4",
        containerClassName,
      )}
    >
      <span
        className={cn(
          "select-none text-center text-[clamp(80px,12vw,150px)] font-extrabold uppercase leading-tight transition-colors duration-300",
          loading
            ? "animate-pulse text-neutral-400"
            : hasLoadedGif
              ? "bg-cover bg-center bg-no-repeat text-transparent bg-clip-text"
              : "text-foreground",
          className,
        )}
        style={{
          backgroundImage: hasLoadedGif ? `url(${gif})` : "none",
          WebkitBackgroundClip: hasLoadedGif ? "text" : "initial",
          backgroundClip: hasLoadedGif ? "text" : "initial",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default GifText;
