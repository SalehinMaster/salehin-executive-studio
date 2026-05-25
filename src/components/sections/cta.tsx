import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { Section } from "@/components/ui/section";

export function CTA() {
  return (
    <Section id="cta" className="pb-28 md:pb-40">
      <FadeIn>
        <div className="border border-border bg-inverse px-8 py-20 text-center md:px-20 md:py-28">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
            Begin
          </p>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.12] text-background sm:text-5xl">
            Build the authority your company requires.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-background/65">
            Tell us where you are and where you need to be seen. We respond
            within two business days with fit, scope, and availability.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-10">
            <ButtonLink href="/contact" variant="ghost">
              Start a project
              <ArrowRight className="size-4 stroke-[1.5]" />
            </ButtonLink>
            <ButtonLink
              href="/about"
              variant="ghost"
              className="text-background/55 hover:border-background/70 hover:text-background"
            >
              The studio
            </ButtonLink>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
