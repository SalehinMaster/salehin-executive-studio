"use client";

import { Button } from "@/components/ui/button";
import { useCalendly } from "@/components/scheduling/calendly-provider";
import { cn } from "@/lib/utils";

type StrategyCallButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  tabIndex?: number;
  onClick?: () => void;
};

export function StrategyCallButton({
  children,
  variant = "primary",
  className,
  tabIndex,
  onClick,
}: StrategyCallButtonProps) {
  const { openCalendly } = useCalendly();

  return (
    <Button
      variant={variant}
      className={cn(className)}
      tabIndex={tabIndex}
      onClick={() => {
        onClick?.();
        openCalendly();
      }}
    >
      {children}
    </Button>
  );
}
