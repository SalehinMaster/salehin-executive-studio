import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

type CrmStatsBarProps = {
  total: number;
  active: number;
  won: number;
  conversionRate: number;
  className?: string;
};

const stats = [
  { key: "total", label: "Total leads" },
  { key: "active", label: "Active pipeline" },
  { key: "won", label: "Clients won" },
  { key: "conversion", label: "Win rate" },
] as const;

export function CrmStatsBar({
  total,
  active,
  won,
  conversionRate,
  className,
}: CrmStatsBarProps) {
  const values: Record<(typeof stats)[number]["key"], string> = {
    total: String(total),
    active: String(active),
    won: String(won),
    conversion: `${conversionRate}%`,
  };

  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat, index) => (
        <GlassCard
          key={stat.key}
          variant="strong"
          glow={index === 0 ? "soft" : "none"}
          className="p-5 sm:p-6"
        >
          <p className="text-eyebrow text-muted">{stat.label}</p>
          <p className="mt-2 font-display text-3xl tracking-tight text-foreground">
            {values[stat.key]}
          </p>
        </GlassCard>
      ))}
    </div>
  );
}
