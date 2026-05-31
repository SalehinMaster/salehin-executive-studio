"use client";

import { Calendar, Sparkles } from "lucide-react";
import { CalendlyEmbed } from "@/components/scheduling/calendly-embed";
import { GlassCard } from "@/components/ui/glass-card";
import { hasCalendlyConfig } from "@/lib/calendly-config";

export function SchedulingSection() {
  return (
    <section id="scheduling" className="relative">
      <GlassCard variant="strong" glow="soft" className="glow-border-primary overflow-hidden">
        <div
          className="pointer-events-none absolute -top-20 -right-16 size-48 rounded-full bg-primary/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-12 size-40 rounded-full bg-secondary/15 blur-3xl"
          aria-hidden
        />

        <div className="relative border-b border-border/80 px-5 py-6 sm:px-8 sm:py-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
            <Sparkles className="size-3.5" aria-hidden />
            Schedule
          </div>
          <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            Book your strategy call
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Pick a time that works. We&apos;ll map your authority goals, assess
            fit, and outline scope for your personal branding OS.
          </p>
        </div>

        <div className="relative p-3 sm:p-4">
          {!hasCalendlyConfig ? (
            <div className="mb-4 flex items-start gap-3 rounded-lg border border-secondary/25 bg-secondary/5 px-4 py-3 text-sm text-muted">
              <Calendar className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden />
              <p>
                Using demo scheduler. Set{" "}
                <code className="rounded bg-surface px-1 py-0.5 text-xs text-secondary">
                  NEXT_PUBLIC_CALENDLY_URL
                </code>{" "}
                in your environment for your live calendar.
              </p>
            </div>
          ) : null}
          <CalendlyEmbed minHeight={700} className="min-h-[560px] sm:min-h-[700px]" />
        </div>
      </GlassCard>
    </section>
  );
}
