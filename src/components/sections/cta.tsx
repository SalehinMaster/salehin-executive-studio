import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";

export function CTA() {
  return (
    <Section id="cta" lazy className="pb-section md:pb-section-lg">
      <FadeIn>
        <GlassCard
          variant="strong"
          glow="soft"
          className="glow-border-primary px-5 py-14 text-center sm:px-8 sm:py-20 md:px-20 md:py-28"
        >
          <p className="text-eyebrow text-primary">Get started</p>
          <h2 className="mx-auto mt-5 max-w-2xl text-display-section font-display font-medium text-balance text-foreground sm:mt-6">
            Install the personal brand your market expects.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted">
            Share where you are and where you need to be seen. We respond within
            two business days with fit, scope, and next steps.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <ButtonLink href="/contact" className="w-full sm:w-auto">
              Book a strategy call
              <ArrowRight className="size-4 stroke-[1.5]" />
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary" className="w-full sm:w-auto">
              About the studio
            </ButtonLink>
          </div>
        </GlassCard>
      </FadeIn>
    </Section>
  );
}
