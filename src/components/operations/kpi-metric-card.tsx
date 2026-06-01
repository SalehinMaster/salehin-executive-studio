import { TrendingDown, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

type KpiMetricCardProps = {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  glow?: boolean;
  className?: string;
};

export function KpiMetricCard({
  label,
  value,
  delta,
  deltaLabel = "vs last month",
  glow = false,
  className,
}: KpiMetricCardProps) {
  const positive = delta !== undefined && delta >= 0;

  return (
    <GlassCard
      variant="strong"
      glow={glow ? "soft" : "none"}
      className={cn("p-5 sm:p-6", className)}
    >
      <p className="text-eyebrow text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl tracking-tight text-foreground tabular-nums">
        {value}
      </p>
      {delta !== undefined ? (
        <p
          className={cn(
            "mt-3 flex items-center gap-1.5 text-xs font-medium",
            positive ? "text-emerald-400" : "text-amber-400",
          )}
        >
          {positive ? (
            <TrendingUp className="size-3.5" aria-hidden />
          ) : (
            <TrendingDown className="size-3.5" aria-hidden />
          )}
          <span>
            {positive ? "+" : ""}
            {delta}% {deltaLabel}
          </span>
        </p>
      ) : null}
    </GlassCard>
  );
}
