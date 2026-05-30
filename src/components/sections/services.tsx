import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { services } from "@/lib/home-content";

export function Services() {
  return (
    <Section id="services">
      <FadeIn>
        <SectionHeading
          eyebrow="Services"
          title="Five capabilities. One operating system."
          description="LinkedIn, strategy, AI, design, and distribution — integrated under a single standard for authority and growth."
        />
      </FadeIn>
      <div className="mt-20 divide-y divide-border">
        {services.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.08}>
            <article className="grid gap-4 py-10 md:grid-cols-[1fr_2fr] md:items-start md:gap-16">
              <h3 className="font-display text-2xl font-medium text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted md:pt-1">
                {item.description}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
      <FadeIn className="mt-12">
        <TextLink href="/services">
          Full service stack
          <ArrowRight className="size-4 stroke-[1.5]" />
        </TextLink>
      </FadeIn>
    </Section>
  );
}
