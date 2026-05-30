import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { Section } from "@/components/ui/section";

export function Hero() {
  return (
    <Section id="hero" className="pt-28 pb-20 md:pt-40 md:pb-28">
      <FadeIn>
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-primary" aria-hidden />
          <p className="text-eyebrow text-primary">
            AI-Powered Personal Branding OS
          </p>
        </div>
        <h1 className="mt-8 max-w-4xl font-display text-5xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          The operating system for executive visibility.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          We build personal branding infrastructure for leaders who cannot
          afford to be invisible — strategy, content, and AI systems engineered
          to compound authority, trust, and revenue.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-10">
          <ButtonLink href="/contact">
            Book a strategy call
            <ArrowRight className="size-4 stroke-[1.5]" />
          </ButtonLink>
          <ButtonLink href="/portfolio" variant="secondary">
            View outcomes
          </ButtonLink>
        </div>
      </FadeIn>
    </Section>
  );
}
