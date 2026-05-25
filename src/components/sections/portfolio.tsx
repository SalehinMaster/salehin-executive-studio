import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { portfolioItems } from "@/lib/home-content";

export function Portfolio() {
  return (
    <Section id="portfolio" className="border-t border-border bg-surface">
      <FadeIn>
        <SectionHeading
          eyebrow="Portfolio"
          title="Authority systems in market."
          description="Founders who moved from visible expertise to unmistakable authority — with systems that keep working."
        />
      </FadeIn>
      <div className="mt-20 divide-y divide-border">
        {portfolioItems.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.08}>
            <article className="grid gap-4 py-10 md:grid-cols-[12rem_1fr_2fr] md:items-baseline md:gap-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
                {item.category}
              </p>
              <h3 className="font-display text-2xl font-medium text-foreground">
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
