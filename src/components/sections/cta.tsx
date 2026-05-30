import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";

export function CTA() {
  return (
    <Section id="cta" className="pb-section-lg md:pb-[10rem]">
      <FadeIn>
        <GlassCard
          variant="strong"
          glow="soft"
          className="glow-border-primary px-8 py-20 text-center md:px-20 md:py-28"
        >
          <p className="text-eyebrow text-primary">Get started</p>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.12] text-foreground sm:text-5xl">
            Install the personal brand your market expects.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted">
            Share where you are and where you need to be seen. We respond within
            two business days with fit, scope, and next steps.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <ButtonLink href="/contact">
              Book a strategy call
              <ArrowRight className="size-4 stroke-[1.5]" />
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              About the studio
            </ButtonLink>
          </div>
        </GlassCard>
      </FadeIn>
    </Section>
  );
}
