import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { Section } from "@/components/ui/section";

export function Hero() {
  return (
    <Section id="hero" className="pt-28 pb-20 md:pt-40 md:pb-28">
      <FadeIn>
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-accent" aria-hidden />
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
            AI · Authority · Systems
          </p>
        </div>
        <h1 className="mt-8 max-w-4xl font-display text-5xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          We build AI-powered authority systems for founders.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Luxury-grade, minimal by design, and strategic at the core — we
          engineer how you are perceived, published, and remembered across every
          touchpoint that builds trust.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-10">
          <ButtonLink href="/contact">
            Request consultation
            <ArrowRight className="size-4 stroke-[1.5]" />
          </ButtonLink>
          <ButtonLink href="/portfolio" variant="secondary">
            Selected work
          </ButtonLink>
        </div>
      </FadeIn>
    </Section>
  );
}
