import {
  FileText,
  Image,
  Megaphone,
  MessageSquareText,
  RefreshCw,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { featureTools } from "@/lib/home-content";
import { cn } from "@/lib/utils";

const toolIcons: Record<(typeof featureTools)[number]["id"], LucideIcon> = {
  "linkedin-generator": MessageSquareText,
  "hook-generator": Zap,
  "bio-optimizer": FileText,
  "carousel-generator": Image,
  "content-rewriter": RefreshCw,
  "cta-generator": Megaphone,
};

const spanClasses: Record<
  (typeof featureTools)[number]["span"],
  string
> = {
  large: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  wide: "sm:col-span-2 lg:col-span-2",
  default: "",
};

export function FeaturesGrid() {
  return (
    <Section id="tools" lazy className="relative border-t border-border">
      <FadeIn>
        <SectionHeading
          eyebrow="Mini-tools"
          title="Specialized generators inside your branding OS"
          description="Six precision tools — each tuned for a single high-leverage job in your content workflow."
          align="center"
          className="mx-auto"
        />
      </FadeIn>

      <div className="mt-12 grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:mt-16 lg:grid-cols-4 lg:gap-5">
        {featureTools.map((tool, index) => {
          const Icon = toolIcons[tool.id];
          const isLarge = tool.span === "large";

          return (
            <FadeIn
              key={tool.id}
              delay={index * 0.05}
              className={cn(spanClasses[tool.span])}
            >
              <GlassCard
                as="article"
                hover
                glow={isLarge ? "soft" : "none"}
                variant={isLarge ? "strong" : "default"}
                className={cn(
                  "group feature-card-glow relative h-full overflow-hidden p-6 transition-all duration-300",
                  isLarge && "md:p-8",
                )}
              >
                <div
                  className="pointer-events-none absolute -bottom-16 -right-16 size-48 rounded-full bg-secondary/0 blur-3xl transition-all duration-500 group-hover:bg-secondary/10"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -left-8 -top-8 size-32 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/15"
                  aria-hidden
                />

                <span
                  className={cn(
                    "relative flex items-center justify-center rounded-xl border border-border bg-surface/80 transition-all duration-300",
                    "group-hover:border-primary/40 group-hover:shadow-[0_0_24px_rgba(124,58,237,0.25)]",
                    isLarge ? "size-14" : "size-11",
                  )}
                >
                  <Icon
                    className={cn(
                      "text-primary transition-transform duration-300 group-hover:scale-110",
                      isLarge ? "size-7" : "size-5",
                    )}
                    aria-hidden
                  />
                </span>

                <h3
                  className={cn(
                    "relative mt-4 text-display-card font-display font-medium text-foreground md:mt-5",
                    isLarge && "md:text-[clamp(1.5rem,3vw,1.875rem)]",
                  )}
                >
                  {tool.title}
                </h3>

                <p
                  className={cn(
                    "relative mt-2 leading-relaxed text-muted",
                    isLarge ? "mt-4 max-w-md text-base" : "text-sm",
                  )}
                >
                  {tool.description}
                </p>

                {isLarge ? (
                  <div className="relative mt-8 flex flex-wrap gap-2">
                    {["Hook", "Body", "CTA", "Hashtags"].map((chip) => (
                      <span
                        key={chip}
                        className="rounded-md border border-border/80 bg-background/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-subtle"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                ) : null}

                <span
                  className="relative mt-6 inline-block text-xs font-medium uppercase tracking-[0.18em] text-primary opacity-0 transition-all duration-300 group-hover:opacity-100"
                  aria-hidden
                >
                  Open tool →
                </span>
              </GlassCard>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
