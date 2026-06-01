"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingDown } from "lucide-react";
import { FUNNEL_STEPS } from "@/lib/crm/constants";
import type { FunnelMetrics, FunnelStep } from "@/lib/crm/types";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

type FunnelVisualizerProps = {
  metrics: FunnelMetrics[];
};

function dropOffPercent(current: number, previous: number): number | null {
  if (previous <= 0) return null;
  const retained = Math.round((current / previous) * 100);
  return Math.max(0, 100 - retained);
}

export function FunnelVisualizer({ metrics }: FunnelVisualizerProps) {
  const prefersReducedMotion = useReducedMotion();
  const metricMap = new Map(metrics.map((m) => [m.step, m]));
  const maxCount = Math.max(...metrics.map((m) => m.count), 1);

  return (
    <div className="space-y-6">
      <div className="hidden lg:block">
        <FunnelFlowDesktop
          metrics={metricMap}
          maxCount={maxCount}
          reducedMotion={prefersReducedMotion}
        />
      </div>
      <div className="lg:hidden">
        <FunnelFlowMobile metrics={metricMap} maxCount={maxCount} />
      </div>
    </div>
  );
}

function FunnelFlowDesktop({
  metrics,
  maxCount,
  reducedMotion,
}: {
  metrics: Map<FunnelStep, FunnelMetrics>;
  maxCount: number;
  reducedMotion: boolean | null;
}) {
  return (
    <GlassCard variant="strong" glow="soft" className="overflow-hidden p-6 sm:p-8">
      <div className="flex items-stretch justify-between gap-2">
        {FUNNEL_STEPS.map((step, index) => {
          const data = metrics.get(step.id);
          const count = data?.count ?? 0;
          const widthPct = Math.max(12, Math.round((count / maxCount) * 100));
          const prevStep = index > 0 ? FUNNEL_STEPS[index - 1] : null;
          const prevCount = prevStep
            ? (metrics.get(prevStep.id)?.count ?? 0)
            : 0;
          const dropOff = index > 0 ? dropOffPercent(count, prevCount) : null;

          return (
            <div key={step.id} className="flex min-w-0 flex-1 items-center">
              <motion.div
                className="flex min-w-0 flex-1 flex-col"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <div className="glass-card-strong relative overflow-hidden rounded-xl p-4">
                  <div
                    className="absolute inset-x-0 bottom-0 bg-primary/20 transition-all duration-700"
                    style={{ height: `${widthPct}%` }}
                    aria-hidden
                  />
                  <div className="relative">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                      Step {index + 1}
                    </p>
                    <p className="mt-2 font-display text-sm font-medium text-foreground">
                      {step.label}
                    </p>
                    <p className="mt-3 font-display text-2xl text-foreground">{count}</p>
                    <p className="mt-1 text-xs text-muted">
                      {data?.uniqueSessions ?? 0} sessions
                    </p>
                    {step.href ? (
                      <Link
                        href={step.href}
                        className="focus-ring mt-3 inline-flex text-xs text-primary hover:underline"
                      >
                        View touchpoint
                      </Link>
                    ) : null}
                  </div>
                </div>
                {dropOff !== null && dropOff > 0 ? (
                  <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-muted">
                    <TrendingDown className="size-3" aria-hidden />
                    {dropOff}% drop-off
                  </p>
                ) : null}
              </motion.div>
              {index < FUNNEL_STEPS.length - 1 ? (
                <ArrowRight
                  className="mx-1 size-4 shrink-0 text-border-strong sm:mx-2"
                  aria-hidden
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

function FunnelFlowMobile({
  metrics,
  maxCount,
}: {
  metrics: Map<FunnelStep, FunnelMetrics>;
  maxCount: number;
}) {
  return (
    <div className="space-y-3">
      {FUNNEL_STEPS.map((step, index) => {
        const data = metrics.get(step.id);
        const count = data?.count ?? 0;
        const barWidth = Math.max(8, Math.round((count / maxCount) * 100));

        return (
          <GlassCard key={step.id} variant="strong" className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                  {index + 1}. {step.label}
                </p>
                <p className="mt-1 text-xs text-muted">{step.description}</p>
              </div>
              <p className="font-display text-xl text-foreground">{count}</p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
              <div
                className={cn("h-full rounded-full bg-gradient-to-r from-primary/80 to-secondary/80")}
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
