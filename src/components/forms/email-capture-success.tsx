"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type EmailCaptureSuccessProps = {
  title: string;
  message: string;
  className?: string;
  compact?: boolean;
};

export function EmailCaptureSuccess({
  title,
  message,
  className,
  compact = false,
}: EmailCaptureSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-secondary/30 bg-secondary/5 backdrop-blur-md",
        compact ? "px-4 py-3" : "px-5 py-5 sm:px-6 sm:py-6",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-secondary/15 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 size-28 rounded-full bg-primary/10 blur-2xl"
        aria-hidden
      />

      <div className="relative flex items-start gap-3 sm:gap-4">
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border border-secondary/40 bg-secondary/15 text-secondary",
            compact ? "size-9" : "size-11",
          )}
        >
          <CheckCircle2
            className={cn(compact ? "size-5" : "size-6")}
            aria-hidden
          />
        </span>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={cn(
                "font-medium text-foreground",
                compact ? "text-sm" : "text-base",
              )}
            >
              {title}
            </p>
            {!compact ? (
              <Sparkles className="size-3.5 text-secondary" aria-hidden />
            ) : null}
          </div>
          <p
            className={cn(
              "leading-relaxed text-muted",
              compact ? "text-sm" : "text-sm sm:text-base",
            )}
          >
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
