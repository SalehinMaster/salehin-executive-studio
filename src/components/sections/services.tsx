import {
  ArrowRight,
  BarChart3,
  Bot,
  LayoutGrid,
  PenLine,
  Share2,
  Target,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { services } from "@/lib/home-content";
import { cn } from "@/lib/utils";

const serviceIcons: Record<(typeof services)[number]["title"], LucideIcon> = {
  "LinkedIn Ghostwriting": PenLine,
  "Personal Branding Strategy": Target,
  "AI Content Systems": Bot,
  "Carousel Design": LayoutGrid,
  "Social Media Management": Share2,
};

export function Services() {
  return (
    <Section id="services" lazy className="relative border-t border-border">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />

      <FadeIn>
        <SectionHeading
          eyebrow="Value delivery"
          title="Outcomes you can measure — not tasks you can outsource"
          description="Every capability is built to move reach, leads, and authority. No filler deliverables."
          align="center"
          className="mx-auto"
        />
      </FadeIn>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 md:mt-16 lg:grid-cols-6 lg:gap-6">
        {services.map((item, index) => {
          const Icon = serviceIcons[item.title];
          const isFeatured = index === 0;

          return (
            <FadeIn
              key={item.title}
              delay={index * 0.06}
              className={cn(
                isFeatured ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-3",
              )}
            >
              <GlassCard
                as="article"
                hover
                glow={isFeatured ? "soft" : "none"}
                variant={isFeatured ? "strong" : "default"}
                className={cn(
                  "group relative h-full overflow-hidden p-6 md:p-8",
                  isFeatured && "lg:p-9",
                )}
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
                  aria-hidden
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/15">
                    <Icon className="size-5 text-primary" aria-hidden />
                  </span>
                  <BarChart3
                    className="size-4 text-subtle opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-secondary"
                    aria-hidden
                  />
                </div>

                <h3
                  className={cn(
                    "mt-5 text-display-card font-display font-medium text-foreground md:mt-6",
                    isFeatured && "md:text-[clamp(1.5rem,3vw,1.875rem)]",
                  )}
                >
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.outcomeHeadline}
                </p>

                <ul className="mt-5 grid gap-4 border-t border-border/80 pt-5 sm:grid-cols-3 md:mt-6 md:pt-6">
                  {item.outcomes.map((outcome) => (
                    <li key={outcome.label} className="text-center sm:text-left">
                      <p className="font-display text-2xl font-medium tracking-tight text-gradient-brand">
                        {outcome.metric}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-subtle uppercase tracking-[0.12em]">
                        {outcome.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn className="mt-12 flex justify-center">
        <TextLink href="/services">
          Explore the full service stack
          <ArrowRight className="size-4 stroke-[1.5]" />
        </TextLink>
      </FadeIn>
    </Section>
  );
}
