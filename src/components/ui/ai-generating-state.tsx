"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

function SkeletonLine({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0.35 }}
      animate={{ opacity: [0.35, 0.75, 0.35] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={cn(
        "h-3 rounded-md bg-gradient-to-r from-border via-primary/20 to-border",
        className,
      )}
    />
  );
}

export function AiGeneratingState() {
  return (
    <div
      className="relative flex min-h-[280px] flex-col justify-center overflow-hidden px-1 py-2"
      aria-busy="true"
      aria-label="Generating LinkedIn post"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex flex-col items-center gap-5">
        <div className="relative flex size-16 items-center justify-center">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(124,58,237,0.85) 120deg, rgba(6,182,212,0.65) 220deg, transparent 360deg)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
            }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-2 rounded-full border border-secondary/20 bg-background/70 backdrop-blur-sm"
            animate={{ scale: [1, 1.04, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <Sparkles
            className="relative size-5 text-primary"
            aria-hidden
          />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Crafting your authority post
          </p>
          <p className="mt-1 text-xs text-muted">
            Calibrating hook, narrative, and CTA…
          </p>
        </div>
      </div>

      <div className="relative mt-8 space-y-4 px-2">
        <div className="space-y-2">
          <SkeletonLine className="h-2.5 w-16" delay={0} />
          <SkeletonLine className="w-full" delay={0.1} />
          <SkeletonLine className="w-[92%]" delay={0.2} />
        </div>
        <div className="space-y-2 pt-2">
          <SkeletonLine className="h-2.5 w-14" delay={0.15} />
          <SkeletonLine className="w-full" delay={0.25} />
          <SkeletonLine className="w-[88%]" delay={0.35} />
          <SkeletonLine className="w-[76%]" delay={0.45} />
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {["w-20", "w-24", "w-[4.5rem]", "w-28", "w-[5.5rem]"].map(
            (width, index) => (
              <SkeletonLine
                key={width}
                className={cn("h-6 rounded-full", width)}
                delay={0.2 + index * 0.08}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
