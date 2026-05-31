import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { caseStudies } from "@/lib/home-content";
import { cn } from "@/lib/utils";

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[number];
  index: number;
}) {
  const phases = [
    { label: "Before", content: study.before, accent: "text-subtle" },
    { label: "Strategy", content: study.strategy, accent: "text-primary" },
    { label: "After", content: study.after, accent: "text-secondary" },
  ] as const;

  return (
    <FadeIn delay={index * 0.1}>
      <GlassCard
        as="article"
        hover
        glow={index === 0 ? "soft" : "none"}
        variant="strong"
        className="group relative h-full overflow-hidden"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/8 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-50"
          aria-hidden
        />

        <div className="border-b border-border/80 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-eyebrow text-secondary">{study.industry}</span>
              <h3 className="mt-2 text-display-card font-display font-medium text-foreground">
                {study.client}
              </h3>
              <p className="mt-1 text-sm text-muted">{study.role}</p>
            </div>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface/80 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:border-primary/30">
              <ArrowUpRight className="size-4 text-primary" aria-hidden />
            </span>
          </div>
        </div>

        <div className="grid gap-0 divide-y divide-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {phases.map((phase) => (
            <div key={phase.label} className="p-5 sm:p-6">
              <p className={cn("text-[10px] font-semibold uppercase tracking-[0.2em]", phase.accent)}>
                {phase.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{phase.content}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-border/80 bg-surface/30 p-5 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gradient-brand">
            Results
          </p>
          <ul className="mt-4 grid grid-cols-3 gap-4">
            {study.results.map((result) => (
              <li key={result.label} className="text-center sm:text-left">
                <p className="font-display text-2xl font-medium tracking-tight text-gradient-brand">
                  {result.metric}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-subtle">
                  {result.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </GlassCard>
    </FadeIn>
  );
}

export function CaseStudies() {
  return (
    <Section id="case-studies" lazy className="relative border-t border-border bg-surface/30">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />

      <FadeIn>
        <SectionHeading
          eyebrow="Case studies"
          title="LinkedIn growth transformations — measured, not promised."
          description="Real before-and-after journeys from founders who installed the authority system and let it compound."
        />
      </FadeIn>

      <div className="mt-12 space-y-6 md:mt-16 lg:space-y-8">
        {caseStudies.map((study, index) => (
          <CaseStudyCard key={study.client} study={study} index={index} />
        ))}
      </div>

      <FadeIn className="mt-12 flex justify-center md:mt-14">
        <TextLink href="/portfolio">
          Explore full portfolio
          <ArrowRight className="size-4 stroke-[1.5]" />
        </TextLink>
      </FadeIn>
    </Section>
  );
}
