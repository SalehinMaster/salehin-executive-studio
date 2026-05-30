import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { portfolioItems } from "@/lib/home-content";

export function Portfolio() {
  return (
    <Section id="portfolio" lazy className="border-t border-border bg-surface/50">
      <FadeIn>
        <SectionHeading
          eyebrow="Portfolio"
          title="Leaders who turned visibility into revenue."
          description="CEOs, founders, and operators who installed a personal branding OS — and let it compound."
        />
      </FadeIn>
      <div className="mt-12 divide-y divide-border md:mt-20">
        {portfolioItems.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.08}>
            <article className="grid gap-3 py-8 md:grid-cols-[12rem_1fr_2fr] md:items-baseline md:gap-10 md:py-10">
              <p className="text-eyebrow text-secondary">
                {item.category}
              </p>
              <h3 className="text-display-card font-display font-medium text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{item.description}</p>
            </article>
          </FadeIn>
        ))}
      </div>
      <FadeIn className="mt-12">
        <TextLink href="/portfolio">
          Full portfolio
          <ArrowRight className="size-4 stroke-[1.5]" />
        </TextLink>
      </FadeIn>
    </Section>
  );
}
