import { FadeIn } from "@/components/ui/fade-in";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { solutions } from "@/lib/home-content";

export function Solution() {
  return (
    <Section id="solution" className="bg-inverse text-background">
      <FadeIn>
        <SectionHeading
          eyebrow="Solution"
          title="Personal branding, run like infrastructure."
          description="Strategy sets the standard. AI scales execution. Design makes every signal feel inevitable — not improvised."
          invert
        />
      </FadeIn>
      <div className="mt-20 space-y-0 divide-y divide-background/10">
        {solutions.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.08}>
            <article className="grid gap-4 py-10 md:grid-cols-[6rem_1fr] md:gap-10">
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
                0{index + 1}
              </span>
              <div>
                <h3 className="font-display text-2xl font-medium">{item.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-background/65">
                  {item.description}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
