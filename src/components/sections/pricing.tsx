import { Check, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { pricingTiers } from "@/lib/home-content";
import { PricingTierCTA } from "@/components/sections/pricing-tier-cta";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <Section id="pricing" lazy className="relative border-t border-border bg-surface/30">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/2 size-72 -translate-y-1/2 rounded-full bg-secondary/6 blur-[100px]"
        aria-hidden
      />

      <FadeIn>
        <SectionHeading
          eyebrow="Pricing"
          title="Invest in authority that compounds — not posts that expire."
          description="Three tiers built for where you are. Every plan includes strategy, AI infrastructure, and measurable outcomes."
          align="center"
          className="mx-auto"
        />
      </FadeIn>

      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3 lg:gap-5 lg:items-stretch">
        {pricingTiers.map((tier, index) => (
          <FadeIn key={tier.id} delay={index * 0.1}>
            <GlassCard
              as="article"
              hover={!tier.highlighted}
              glow={tier.highlighted ? "primary" : "none"}
              variant={tier.highlighted ? "strong" : "default"}
              className={cn(
                "relative flex h-full flex-col overflow-hidden",
                tier.highlighted && "glow-border-primary lg:-mt-4 lg:mb-4 lg:scale-[1.02]",
              )}
            >
              {tier.highlighted && "badge" in tier && tier.badge ? (
                <div className="absolute right-4 top-4 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground shadow-glow-primary">
                    <Sparkles className="size-3" aria-hidden />
                    {tier.badge}
                  </span>
                </div>
              ) : null}

              {tier.highlighted ? (
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/15 to-transparent"
                  aria-hidden
                />
              ) : null}

              <div className="relative p-6 sm:p-8">
                <h3 className="text-display-card font-display font-medium text-foreground">
                  {tier.name}
                </h3>
                <p className="mt-3 min-h-[3rem] text-sm leading-relaxed text-muted">
                  {tier.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                    {tier.price}
                  </span>
                  {tier.period ? (
                    <span className="text-sm text-muted">{tier.period}</span>
                  ) : null}
                </div>
              </div>

              <ul className="flex-1 space-y-3 border-t border-border/80 px-6 py-6 sm:px-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                    <span
                      className={cn(
                        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                        tier.highlighted
                          ? "bg-primary/20 text-primary"
                          : "bg-surface text-secondary",
                      )}
                    >
                      <Check className="size-3 stroke-[2.5]" aria-hidden />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="border-t border-border/80 p-6 sm:p-8">
                <PricingTierCTA
                  tierId={tier.id}
                  cta={tier.cta}
                  highlighted={tier.highlighted}
                />
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3} className="mt-10 text-center md:mt-14">
        <p className="text-sm text-muted">
          All plans include a 30-day satisfaction guarantee.{" "}
          <span className="text-foreground">No long-term lock-in.</span>
        </p>
      </FadeIn>
    </Section>
  );
}
