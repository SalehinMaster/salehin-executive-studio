import { FadeIn } from "@/components/ui/fade-in";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FAQAccordion } from "@/components/sections/faq-accordion";

export function FAQ() {
  return (
    <Section id="faq" lazy className="relative border-t border-border">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 size-96 -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]"
        aria-hidden
      />

      <FadeIn>
        <SectionHeading
          eyebrow="FAQ"
          title="Direct answers. No performance."
          description="Everything founders ask before investing in authority — pricing, delivery, LinkedIn growth, personal branding, and our AI systems."
          align="center"
          className="mx-auto"
        />
      </FadeIn>

      <FAQAccordion />
    </Section>
  );
}
