"use client";

import { Bot, Check, LayoutGrid, PenLine, Target } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import type { ProposalServiceBlock, ProposalServiceId } from "@/lib/proposal/types";
import { cn } from "@/lib/utils";

const SERVICE_ICONS = {
  pen: PenLine,
  target: Target,
  bot: Bot,
  layout: LayoutGrid,
} as const;

type ProposalPricingBlockProps = {
  block: ProposalServiceBlock;
  selected: boolean;
  selectedTierId: string | undefined;
  onToggleService: (id: ProposalServiceId) => void;
  onSelectTier: (serviceId: ProposalServiceId, tierId: string) => void;
};

export function ProposalPricingBlock({
  block,
  selected,
  selectedTierId,
  onToggleService,
  onSelectTier,
}: ProposalPricingBlockProps) {
  const Icon = SERVICE_ICONS[block.icon];
  const activeTierId = selectedTierId ?? block.tiers.find((t) => t.highlighted)?.id ?? block.tiers[0]?.id;

  return (
    <GlassCard
      variant={selected ? "strong" : "default"}
      glow={selected ? "soft" : "none"}
      className={cn(
        "overflow-hidden transition-all duration-300",
        selected && "ring-1 ring-primary/35",
      )}
    >
      <button
        type="button"
        onClick={() => onToggleService(block.id)}
        className="focus-ring flex w-full items-start gap-4 p-5 text-left sm:p-6"
      >
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors",
            selected
              ? "border-primary/40 bg-primary/15 text-primary"
              : "border-border bg-surface/60 text-muted",
          )}
        >
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-eyebrow text-secondary">Service</p>
          <h3 className="mt-1 font-display text-lg text-foreground">{block.title}</h3>
          <p className="mt-1 text-sm text-muted">{block.tagline}</p>
        </div>
        <span
          className={cn(
            "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border",
            selected ? "border-primary bg-primary text-foreground" : "border-border-strong",
          )}
          aria-hidden
        >
          {selected ? <Check className="size-3 stroke-[3]" /> : null}
        </span>
      </button>

      {selected ? (
        <div className="grid gap-3 border-t border-border/80 p-5 sm:grid-cols-3 sm:p-6">
          {block.tiers.map((tier) => {
            const isActive = activeTierId === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => onSelectTier(block.id, tier.id)}
                className={cn(
                  "focus-ring rounded-xl border p-4 text-left transition-all",
                  isActive
                    ? "border-primary/45 bg-primary/10 shadow-glow-primary"
                    : "border-border bg-surface/40 hover:border-primary/25",
                )}
              >
                {tier.highlighted ? (
                  <span className="mb-2 inline-block rounded-full bg-gradient-brand px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground">
                    Recommended
                  </span>
                ) : null}
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                  {tier.name}
                </p>
                <p className="mt-2 font-display text-2xl text-foreground">
                  {tier.price}
                  {tier.period ? (
                    <span className="text-sm font-sans text-muted">{tier.period}</span>
                  ) : null}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{tier.description}</p>
                <ul className="mt-3 space-y-1.5 border-t border-border/60 pt-3">
                  {tier.deliverables.map((item) => (
                    <li key={item} className="flex gap-2 text-[11px] text-muted">
                      <Check className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      ) : null}
    </GlassCard>
  );
}
