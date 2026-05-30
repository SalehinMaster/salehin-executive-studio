import { FadeIn } from "@/components/ui/fade-in";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/home-content";

export function FAQ() {
  return (
    <Section id="faq" lazy className="border-t border-border">
      <FadeIn>
        <SectionHeading
          eyebrow="FAQ"
          title="Direct answers. No performance."
        />
      </FadeIn>
      <div className="mt-12 divide-y divide-border md:mt-20">
        {faqs.map((item, index) => (
          <FadeIn key={item.question} delay={index * 0.05}>
            <details className="group py-6 md:py-8">
              <summary className="focus-ring touch-target flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 rounded-lg marker:content-none sm:gap-8">
                <span className="text-display-card font-display font-medium text-foreground">
                  {item.question}
                </span>
                <span className="mt-1 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
                {item.answer}
              </p>
            </details>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
