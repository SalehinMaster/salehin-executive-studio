import { FadeIn } from "@/components/ui/fade-in";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/home-content";

export function Testimonials() {
  return (
    <Section id="testimonials" lazy>
      <FadeIn>
        <SectionHeading
          eyebrow="Testimonials"
          title="What leaders say when the OS is live."
          align="center"
          className="mx-auto max-w-3xl"
        />
      </FadeIn>
      <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-16">
        {testimonials.map((item, index) => (
          <FadeIn key={item.name} delay={index * 0.08}>
            <blockquote>
              <p className="text-display-quote font-display font-medium text-pretty text-foreground">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-8">
                <cite className="not-italic">
                  <span className="block text-sm font-medium text-foreground">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.18em] text-muted">
                    {item.role}
                  </span>
                </cite>
              </footer>
            </blockquote>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
