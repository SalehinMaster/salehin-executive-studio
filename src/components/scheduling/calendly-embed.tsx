"use client";

import { useEffect, useRef } from "react";
import { calendlyUrl } from "@/lib/calendly-config";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

const CALENDLY_SCRIPT_ID = "calendly-widget-script";

type CalendlyEmbedProps = {
  className?: string;
  minHeight?: number;
};

export function CalendlyEmbed({
  className,
  minHeight = 680,
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parentElement = containerRef.current;
    if (!parentElement) return;

    parentElement.innerHTML = "";

    let cancelled = false;

    const mountWidget = () => {
      if (cancelled || !containerRef.current) return;

      window.Calendly?.initInlineWidget({
        url: calendlyUrl,
        parentElement: containerRef.current,
      });
    };

    const existingScript = document.getElementById(
      CALENDLY_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existingScript && window.Calendly) {
      mountWidget();
      return () => {
        cancelled = true;
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
      };
    }

    const script = existingScript ?? document.createElement("script");
    if (!existingScript) {
      script.id = CALENDLY_SCRIPT_ID;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }

    script.addEventListener("load", mountWidget);

    return () => {
      cancelled = true;
      script.removeEventListener("load", mountWidget);
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "calendly-inline-widget w-full overflow-hidden rounded-xl border border-border/80 bg-surface/40",
        className,
      )}
      style={{ minWidth: "280px", minHeight }}
      data-url={calendlyUrl}
    />
  );
}
