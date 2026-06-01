"use client";

import { ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "saas-onboarding-v1-complete";

const STEPS = [
  {
    target: '[data-onboarding="nav-ai-tools"]',
    title: "AI Tools",
    body: "Generate posts, hooks, bios, rewrites, and carousels — outputs save automatically.",
  },
  {
    target: '[data-onboarding="nav-saved"]',
    title: "Saved Outputs",
    body: "Search, favorite, or delete any generation from your secure history.",
  },
  {
    target: '[data-onboarding="nav-analytics"]',
    title: "Analytics",
    body: "Track daily and monthly usage with tool-level breakdowns.",
  },
  {
    target: '[data-onboarding="beta-feedback"]',
    title: "Beta feedback",
    body: "Share feedback or report bugs anytime — you're shaping the launch.",
  },
] as const;

type OnboardingWalkthroughProps = {
  enabled?: boolean;
};

export function OnboardingWalkthrough({ enabled = true }: OnboardingWalkthroughProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!enabled) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), 800);
    return () => window.clearTimeout(timer);
  }, [enabled]);

  const updateRect = useCallback(() => {
    const step = STEPS[stepIndex];
    if (!step) return;
    const el = document.querySelector(step.target);
    if (el) setRect(el.getBoundingClientRect());
    else setRect(null);
  }, [stepIndex]);

  useEffect(() => {
    if (!visible) return;
    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [visible, updateRect]);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }, []);

  const next = () => {
    if (stepIndex >= STEPS.length - 1) {
      dismiss();
      return;
    }
    setStepIndex((i) => i + 1);
  };

  if (!visible) return null;

  const step = STEPS[stepIndex];
  if (!step) return null;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[55] bg-background/60 backdrop-blur-[1px]" aria-hidden />
      {rect ? (
        <div
          className="pointer-events-none fixed z-[56] rounded-lg ring-2 ring-primary ring-offset-2 ring-offset-background transition-all"
          style={{
            top: rect.top - 4,
            left: rect.left - 4,
            width: rect.width + 8,
            height: rect.height + 8,
          }}
          aria-hidden
        />
      ) : null}
      <div
        className={cn(
          "fixed z-[57] w-[min(100%,20rem)] rounded-xl border border-border bg-surface-elevated p-4 shadow-2xl",
          rect
            ? {
                top: Math.min(rect.bottom + 12, window.innerHeight - 200),
                left: Math.min(rect.left, window.innerWidth - 320),
              }
            : { bottom: 24, right: 24 },
        )}
        role="dialog"
        aria-labelledby="onboarding-title"
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-eyebrow text-primary">
            Step {stepIndex + 1} of {STEPS.length}
          </p>
          <button
            type="button"
            onClick={dismiss}
            className="focus-ring text-muted hover:text-foreground"
            aria-label="Skip tour"
          >
            <X className="size-4" />
          </button>
        </div>
        <h2 id="onboarding-title" className="mt-2 font-display text-lg text-foreground">
          {step.title}
        </h2>
        <p className="mt-2 text-sm text-muted">{step.body}</p>
        <div className="mt-4 flex gap-2">
          <Button variant="ghost" className="flex-1 text-xs" onClick={dismiss}>
            Skip
          </Button>
          <Button className="flex-1 gap-1 text-xs" onClick={next}>
            {stepIndex >= STEPS.length - 1 ? "Done" : "Next"}
            <ChevronRight className="size-3.5" aria-hidden />
          </Button>
        </div>
      </div>
    </>
  );
}
