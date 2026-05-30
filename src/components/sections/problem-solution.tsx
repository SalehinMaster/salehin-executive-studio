import { ArrowRight, CircleAlert, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { problemSolutionPairs } from "@/lib/home-content";
import { cn } from "@/lib/utils";

export function ProblemSolution() {
  return (
    <Section id="problem-solution" className="border-t border-border">
      <FadeIn>
        <SectionHeading
          eyebrow="Problem → Solution"
          title="From visibility gaps to authority systems"
          description="The friction holding leaders back — and the AI-powered infrastructure that replaces it."
        />
      </FadeIn>

      <div className="mt-16 grid gap-6 md:gap-8">
        {problemSolutionPairs.map((pair, index) => (
          <FadeIn key={pair.problem.title} delay={index * 0.08}>
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
              <GlassCard
                as="article"
                className={cn(
                  "relative overflow-hidden p-6 md:p-8",
                  "border-red-500/10 bg-red-950/10",
                )}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-red-500/5 blur-2xl"
                  aria-hidden
                />
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10">
                    <CircleAlert
                      className="size-4 text-red-400/90"
                      aria-hidden
                    />
                  </span>
                  <div>
                    <p className="text-eyebrow text-red-400/80">Problem</p>
                    <h3 className="mt-2 font-display text-xl font-medium text-foreground md:text-2xl">
                      {pair.problem.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {pair.problem.description}
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard
                as="article"
                hover
                glow="soft"
                className="relative overflow-hidden p-6 md:p-8"
              >
                <div
                  className="pointer-events-none absolute -bottom-8 -left-8 size-36 rounded-full bg-primary/15 blur-2xl"
                  aria-hidden
                />
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/15">
                    <Sparkles className="size-4 text-primary" aria-hidden />
                  </span>
                  <div className="flex-1">
                    <p className="text-eyebrow text-secondary">Solution</p>
                    <h3 className="mt-2 font-display text-xl font-medium text-foreground md:text-2xl">
                      {pair.solution.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {pair.solution.description}
                    </p>
                  </div>
                  <ArrowRight
                    className="mt-1 hidden size-4 shrink-0 text-primary/60 lg:block"
                    aria-hidden
                  />
                </div>
              </GlassCard>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
