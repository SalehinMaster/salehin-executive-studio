"use client";

import { useId, useMemo } from "react";
import { buildAreaPath, buildLinePath, normalizeSeries } from "@/components/operations/charts/chart-utils";
import { cn } from "@/lib/utils";

type AreaSparkChartProps = {
  values: number[];
  labels: readonly string[];
  className?: string;
  accent?: "primary" | "secondary";
  height?: number;
};

const WIDTH = 320;
const HEIGHT = 120;

export function AreaSparkChart({
  values,
  labels,
  className,
  accent = "primary",
  height = HEIGHT,
}: AreaSparkChartProps) {
  const gradientId = useId();
  const normalized = useMemo(() => normalizeSeries(values), [values]);

  const areaPath = useMemo(
    () => buildAreaPath(normalized, WIDTH, height),
    [normalized, height],
  );
  const linePath = useMemo(
    () => buildLinePath(normalized, WIDTH, height),
    [normalized, height],
  );

  const strokeClass =
    accent === "secondary" ? "stroke-secondary" : "stroke-primary";
  const fillStart =
    accent === "secondary"
      ? "rgba(6, 182, 212, 0.35)"
      : "rgba(124, 58, 237, 0.35)";
  const fillEnd =
    accent === "secondary"
      ? "rgba(6, 182, 212, 0)"
      : "rgba(124, 58, 237, 0)";

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Trend chart for ${labels.join(", ")}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillStart} />
            <stop offset="100%" stopColor={fillEnd} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={linePath}
          fill="none"
          className={strokeClass}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="mt-2 flex justify-between gap-2 text-[10px] uppercase tracking-wider text-subtle">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
