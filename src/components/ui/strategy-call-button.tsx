"use client";

import { Button } from "@/components/ui/button";
import { useCalendly } from "@/components/scheduling/calendly-provider";
import { trackConversion, trackCtaClick } from "@/lib/analytics/track";
import { cn } from "@/lib/utils";

type StrategyCallButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  tabIndex?: number;
  onClick?: () => void;
  /** Analytics context — e.g. "home-hero", "page-services" */
  analyticsLocation?: string;
  analyticsLabel?: string;
};

export function StrategyCallButton({
  children,
  variant = "primary",
  className,
  tabIndex,
  onClick,
  analyticsLocation,
  analyticsLabel = "Book strategy call",
}: StrategyCallButtonProps) {
  const { openCalendly } = useCalendly();

  return (
    <Button
      variant={variant}
      className={cn(className)}
      tabIndex={tabIndex}
      onClick={() => {
        onClick?.();
        trackCtaClick({
          ctaLabel: analyticsLabel,
          ctaLocation: analyticsLocation,
          ctaType: "calendly",
          destination: "calendly_modal",
        });
        trackConversion({
          conversionName: "strategy_call_click",
          source: analyticsLocation,
        });
        openCalendly();
      }}
    >
      {children}
    </Button>
  );
}
