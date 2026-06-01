import { Check } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import {
  SAAS_TIER_CONFIG,
  SAAS_TIER_ORDER,
  type SaasTierId,
} from "@/lib/saas/subscription-plans";
import { cn } from "@/lib/utils";

type SubscriptionTierCardsProps = {
  currentTier: SaasTierId;
};

export function SubscriptionTierCards({ currentTier }: SubscriptionTierCardsProps) {
  return (
    <div id="plans" className="scroll-mt-8 grid gap-4 lg:grid-cols-3">
      {SAAS_TIER_ORDER.map((tierId) => {
        const tier = SAAS_TIER_CONFIG[tierId];
        const isCurrent = tierId === currentTier;
        return (
          <GlassCard
            key={tierId}
            variant={tier.highlighted ? "strong" : "default"}
            glow={tier.highlighted ? "primary" : "none"}
            className={cn(
              "flex flex-col p-6",
              isCurrent && "ring-1 ring-primary/50",
              tier.highlighted && "lg:-mt-1",
            )}
          >
            {tier.highlighted ? (
              <span className="mb-3 w-fit rounded-full border border-primary/40 bg-primary/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                Popular
              </span>
            ) : null}
            <p className="font-display text-xl text-foreground">{tier.label}</p>
            <p className="mt-1 text-sm text-muted">{tier.tagline}</p>
            <p className="mt-4 font-display text-3xl text-foreground">
              {tier.priceMonthly === 0 ? (
                "Free"
              ) : (
                <>
                  ${tier.priceMonthly}
                  <span className="text-sm font-sans text-muted">/mo</span>
                </>
              )}
            </p>
            {tier.stripePriceIdMock ? (
              <p className="mt-1 font-mono text-[10px] text-subtle">{tier.stripePriceIdMock}</p>
            ) : null}
            <ul className="mt-5 flex-1 space-y-2">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-xs text-muted">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
            <p
              className={cn(
                "mt-5 rounded-lg border px-3 py-2 text-center text-xs",
                isCurrent
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border text-subtle",
              )}
            >
              {isCurrent ? "Current plan" : "Stripe checkout — coming soon"}
            </p>
          </GlassCard>
        );
      })}
    </div>
  );
}
