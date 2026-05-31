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
      >
        {cta}
        <ArrowRight className="size-4 stroke-[1.5]" />
      </StrategyCallButton>
    );
  }

  return (
    <ButtonLink
      href="/contact"
      variant={highlighted ? "primary" : "secondary"}
      className="w-full"
    >
      {cta}
      <ArrowRight className="size-4 stroke-[1.5]" />
    </ButtonLink>
  );
}
