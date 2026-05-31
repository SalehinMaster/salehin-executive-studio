"use client";

import { Calendar, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { CalendlyEmbed } from "@/components/scheduling/calendly-embed";
import { useCalendly } from "@/components/scheduling/calendly-provider";
import { GlassCard } from "@/components/ui/glass-card";
import { hasCalendlyConfig } from "@/lib/calendly-config";

export function CalendlyModal() {
  const { isCalendlyOpen, closeCalendly } = useCalendly();

  useEffect(() => {
    if (!isCalendlyOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCalendly();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isCalendlyOpen, closeCalendly]);

  return (
    <AnimatePresence>
      {isCalendlyOpen ? (
        <div
          className="fixed inset-0 z-[110] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
          role="presentation"
        >
          <motion.button
            type="button"
            aria-label="Close scheduling"
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCalendly}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendly-modal-title"
            className="relative flex max-h-[96dvh] w-full max-w-3xl flex-col"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard
              variant="strong"
              glow="primary"
              className="relative flex max-h-[96dvh] flex-col overflow-hidden"
            >
              <div
                className="pointer-events-none absolute -top-32 -right-20 size-56 rounded-full bg-primary/25 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-16 size-48 rounded-full bg-secondary/15 blur-3xl"
                aria-hidden
              />

              <div className="relative flex items-start justify-between gap-4 border-b border-border/80 px-5 py-4 sm:px-6 sm:py-5">
                <div className="min-w-0 pr-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                    <Sparkles className="size-3.5" aria-hidden />
                    Strategy session
                  </div>
                  <h2
                    id="calendly-modal-title"
                    className="mt-3 font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl"
                  >
                    Book your strategy call
                  </h2>
                  <p className="mt-1.5 text-sm text-muted">
                    30 minutes to map your authority goals, fit, and next steps.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeCalendly}
                  className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface/60 text-muted transition-colors hover:border-primary/30 hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>

              <div className="relative flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
                {hasCalendlyConfig ? (
                  <CalendlyEmbed minHeight={640} className="min-h-[520px] sm:min-h-[640px]" />
                ) : (
                  <CalendlyPlaceholder />
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function CalendlyPlaceholder() {
  return (
    <div className="flex min-h-[520px] flex-col items-center justify-center rounded-xl border border-dashed border-primary/30 bg-surface/30 px-6 py-16 text-center sm:min-h-[640px]">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
        <Calendar className="size-7" aria-hidden />
      </div>
      <h3 className="mt-6 font-display text-xl font-medium text-foreground">
        Scheduling embed ready
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        Add your Calendly link to{" "}
        <code className="rounded bg-surface px-1.5 py-0.5 text-xs text-secondary">
          NEXT_PUBLIC_CALENDLY_URL
        </code>{" "}
        in <code className="rounded bg-surface px-1.5 py-0.5 text-xs text-secondary">.env.local</code>.
        A demo scheduler is shown until then.
      </p>
      <div className="mt-8 w-full max-w-xl">
        <CalendlyEmbed minHeight={480} />
      </div>
    </div>
  );
}
