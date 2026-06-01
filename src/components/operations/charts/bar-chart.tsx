"use client";

import { useMemo } from "react";
import { normalizeSeries } from "@/components/operations/charts/chart-utils";
import { cn } from "@/lib/utils";

type BarChartProps = {
  values: number[];
  labels: readonly string[];
  className?: string;
  formatValue?: (value: number) => string;
};

export function BarChart({
  values,
  labels,
  className,
  formatValue = (v) => String(v),
}: BarChartProps) {
  const normalized = useMemo(() => normalizeSeries(values), [values]);

  return (
    <div className={cn("w-full", className)}>
      <div
        className="flex h-36 items-end justify-between gap-1.5 sm:gap-2"
        role="img"
        aria-label="Bar chart"
      >
        {normalized.map((height, index) => (
          <div
            key={labels[index] ?? index}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <span className="text-[10px] font-medium text-muted tabular-nums">
              {formatValue(values[index] ?? 0)}
            </span>
            <div
              className="w-full max-w-[2.5rem] rounded-t-md bg-gradient-to-t from-primary/30 to-primary shadow-glow-soft"
              style={{ height: `${Math.max(height * 100, 8)}%` }}
            />
            <span className="text-[10px] uppercase tracking-wider text-subtle">
              {labels[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
