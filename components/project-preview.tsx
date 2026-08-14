"use client";

import { useState } from "react";
import { ExternalLink, AlertCircle } from "lucide-react";

interface ProjectPreviewProps {
  title: string;
  url?: string;
  fallback?: boolean;
}

export function ProjectPreview({ title, url, fallback = false }: ProjectPreviewProps) {
  const [hasError, setHasError] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);

  if (!url) {
    return (
      <div className="w-full aspect-video md:aspect-[16/10] bg-muted/30 border rounded-xl flex items-center justify-center shadow-sm">
        <span className="text-muted-foreground">Preview unavailable</span>
      </div>
    );
  }

  // Ensure url has a domain to display
  const domain = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return "preview";
    }
  })();

  return (
    <div className="w-full aspect-video md:aspect-[16/10] flex flex-col rounded-xl overflow-hidden border shadow-sm bg-background">
      {/* Browser Chrome */}
      <div className="h-8 md:h-10 border-b bg-muted/30 flex items-center px-3 md:px-4 gap-2 relative">
        <div className="flex gap-1.5 md:gap-2">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-destructive/80" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center bg-background border px-3 py-1 rounded-md text-[10px] md:text-xs text-muted-foreground max-w-[50%] md:max-w-[60%] overflow-hidden text-ellipsis whitespace-nowrap shadow-sm">
          {domain}
        </div>
      </div>
      
      {/* Browser Content */}
      <div className="flex-1 relative bg-muted/10">
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 animate-pulse">
            <span className="text-sm text-muted-foreground">Loading preview...</span>
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted/30 p-6 text-center">
            <AlertCircle className="w-8 h-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">Live preview unavailable</p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-2"
            >
              Open Live Demo <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ) : (
          <iframe
            src={url}
            title={`${title} live preview`}
            loading="lazy"
            className={`w-full h-full border-none bg-background transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        )}
      </div>
    </div>
  );
}
