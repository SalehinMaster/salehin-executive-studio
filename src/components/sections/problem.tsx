import { FadeIn } from "@/components/ui/fade-in";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { problems } from "@/lib/home-content";

export function Problem() {
  return (
    <Section id="problem" className="border-t border-border">
      <FadeIn>
        <SectionHeading
          eyebrow="Problem"
          title="You built the business. Your brand didn't keep pace."
          description="Without infrastructure, visibility stays accidental — and revenue leaves on the table."
        />
      </FadeIn>
      <div className="mt-20 grid gap-px border border-border bg-border md:grid-cols-3">
        {problems.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.08}>
            <article className="bg-background p-8 md:p-10">
              <span className="font-display text-3xl font-medium text-accent/80">
                0{index + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl font-medium text-foreground">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
