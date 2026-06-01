"use client";

import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { StrategyCallButton } from "@/components/ui/strategy-call-button";

type PricingTierCTAProps = {
  tierId: string;
  cta: string;
  highlighted: boolean;
};

export function PricingTierCTA({
  tierId,
  cta,
  highlighted,
}: PricingTierCTAProps) {
  if (tierId === "executive") {
    return (
      <StrategyCallButton
        variant={highlighted ? "primary" : "secondary"}
        className="w-full"
        analyticsLocation={`pricing-tier-${tierId}`}
        analyticsLabel={cta}
      >
        {cta}
        <ArrowRight className="size-4 stroke-[1.5]" />
      </StrategyCallButton>
    );
  }

  return (
    <ButtonLink
      href="/contact#scheduling"
      variant={highlighted ? "primary" : "secondary"}
      className="w-full"
      analytics={{
        ctaLabel: cta,
        ctaLocation: `pricing-tier-${tierId}`,
        destination: "/contact#scheduling",
      }}
    >
      {cta}
      <ArrowRight className="size-4 stroke-[1.5]" />
    </ButtonLink>
  );
}
