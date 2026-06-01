"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { ButtonLink } from "@/components/ui/button-link";
import { getTierConfig, type SaasTierId } from "@/lib/saas/subscription-plans";
import { cn } from "@/lib/utils";

type PremiumGateProps = {
  allowed: boolean;
  requiredTier: SaasTierId;
  currentTier: SaasTierId;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function PremiumGate({
  allowed,
  requiredTier,
  currentTier,
  title,
  description,
  children,
  className,
}: PremiumGateProps) {
  if (allowed) {
    return <>{children}</>;
  }

  const required = getTierConfig(requiredTier);

  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none select-none blur-[2px] opacity-40" aria-hidden>
        {children}
      </div>
      <GlassCard
        variant="strong"
        glow="primary"
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center"
      >
        <div className="flex size-12 items-center justify-center rounded-full border border-primary/40 bg-primary/15">
          <Lock className="size-5 text-primary" aria-hidden />
        </div>
        <div>
          <p className="font-display text-lg text-foreground">{title}</p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            {description ??
              `Available on ${required.label}. You are on ${getTierConfig(currentTier).label}.`}
          </p>
        </div>
        <ButtonLink href="/dashboard/settings#plans" className="gap-2">
          View plans
        </ButtonLink>
        <Link href="/pricing" className="text-xs text-muted hover:text-primary">
          Compare tiers on marketing site
        </Link>
      </GlassCard>
    </div>
  );
}
