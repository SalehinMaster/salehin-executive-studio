"use client";

import { cn } from "@/lib/utils";

type RingChartProps = {
  value: number;
  max?: number;
  label: string;
  className?: string;
  size?: number;
};

export function RingChart({
  value,
  max = 100,
  label,
  className,
  size = 112,
}: RingChartProps) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(Math.max(value / max, 0), 1);
  const offset = circumference * (1 - percent);

  return (
    <div
      className={cn("relative inline-flex flex-col items-center", className)}
      role="img"
      aria-label={`${label}: ${value}${max === 100 ? "%" : ` of ${max}`}`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-border"
          strokeWidth={8}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-primary"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl text-foreground tabular-nums">
          {value}
          {max === 100 ? "%" : null}
        </span>
      </div>
      <p className="mt-3 text-center text-xs text-muted">{label}</p>
    </div>
  );
}
