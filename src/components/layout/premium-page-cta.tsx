"use client";

import { ArrowRight, Calendar, Mail } from "lucide-react";
import { NewsletterCapture } from "@/components/newsletter/newsletter-capture";
import { ButtonLink } from "@/components/ui/button-link";
import { StrategyCallButton } from "@/components/ui/strategy-call-button";
import { conversionPaths } from "@/lib/internal-links";
import { cn } from "@/lib/utils";

type PremiumPageCtaProps = {
  className?: string;
  location: string;
  showNewsletter?: boolean;
};

/**
 * Premium conversion band — Calendly strategy call + lead capture paths.
 */
export function PremiumPageCta({
  className,
  location,
  showNewsletter = true,
}: PremiumPageCtaProps) {
  return (
    <section
      aria-labelledby={`premium-cta-${location}`}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-primary/20 bg-surface/40 px-5 py-10 sm:px-8 sm:py-12",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/10"
        aria-hidden
      />

      <div className="relative">
        <p className="text-eyebrow text-primary">Next step</p>
        <h2
          id={`premium-cta-${location}`}
          className="mt-3 max-w-xl font-display text-2xl font-medium text-foreground sm:text-3xl"
        >
          Ready to install your authority system?
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
          Book a strategy call for fit and scope, or capture your email for
          executive playbooks — every path leads to pipeline, not fluff.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <StrategyCallButton
            className="w-full sm:w-auto"
            analyticsLocation={location}
          >
            <Calendar className="size-4 stroke-[1.5]" aria-hidden />
            Book strategy call
            <ArrowRight className="size-4 stroke-[1.5]" aria-hidden />
          </StrategyCallButton>

          <ButtonLink
            href={conversionPaths.leadMagnet}
            variant="secondary"
            className="w-full sm:w-auto"
            analytics={{
              ctaLabel: "Get free resources",
              ctaLocation: location,
              destination: conversionPaths.leadMagnet,
            }}
          >
            <Mail className="size-4 stroke-[1.5]" aria-hidden />
            Get free resources
          </ButtonLink>

          <ButtonLink
            href={conversionPaths.pricing}
            variant="ghost"
            className="w-full sm:w-auto"
            analytics={{
              ctaLabel: "View pricing",
              ctaLocation: location,
              destination: conversionPaths.pricing,
            }}
          >
            View pricing
            <ArrowRight className="size-4 stroke-[1.5]" aria-hidden />
          </ButtonLink>
        </div>

        {showNewsletter ? (
          <div className="mt-10 border-t border-border/60 pt-8">
            <NewsletterCapture
              source="page-hub"
              inputId={`page-cta-newsletter-${location}`}
              variant="compact"
              layout="inline"
              eyebrow="Newsletter"
              title="Prefer email first?"
              description="Weekly authority briefings — LinkedIn systems and AI workflows."
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
