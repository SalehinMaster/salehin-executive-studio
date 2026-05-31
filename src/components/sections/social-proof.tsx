"use client";

import { Award, TrendingUp, Users } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  authorityBadges,
  engagementImprovements,
  socialProofClients,
  socialProofMetrics,
} from "@/lib/home-content";
import { cn } from "@/lib/utils";

function ClientAvatar({
  initials,
  index,
}: {
  initials: string;
  index: number;
}) {
  return (
    <span
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-background text-xs font-semibold text-foreground sm:size-11",
        "bg-gradient-to-br from-primary/80 to-secondary/60",
      )}
      style={{ zIndex: socialProofClients.length - index }}
    >
      {initials}
    </span>
  );
}

function EngagementBar({
  metric,
  before,
  after,
  unit,
  index,
}: {
  metric: string;
  before: number;
  after: number;
  unit: string;
  index: number;
}) {
  const maxVal = Math.max(before, after);
  const beforePct = (before / maxVal) * 100;
  const afterPct = (after / maxVal) * 100;

  return (
    <FadeIn delay={index * 0.1}>
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-sm font-medium text-foreground">{metric}</p>
          <p className="text-xs text-muted">
            <span className="text-subtle line-through">{before}{unit}</span>
            {" → "}
            <span className="font-medium text-secondary">
              {after}{unit}
            </span>
          </p>
        </div>
        <div className="space-y-1.5">
          <div className="h-2 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-muted/30 transition-all duration-700"
              style={{ width: `${beforePct}%` }}
            />
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-gradient-brand transition-all duration-700"
              style={{ width: `${afterPct}%` }}
            />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export function SocialProof() {
  return (
    <Section id="social-proof" lazy className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 size-64 rounded-full bg-primary/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-1/4 size-48 rounded-full bg-secondary/8 blur-[80px]"
        aria-hidden
      />

      <FadeIn>
        <SectionHeading
          eyebrow="Social proof"
          title="Trusted by leaders who measure authority in pipeline."
          description="Founders and executives across fintech, healthtech, and venture — all running the same compounding system."
          align="center"
          className="mx-auto"
        />
      </FadeIn>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
        {socialProofMetrics.map((item, index) => (
          <FadeIn key={item.label} delay={index * 0.08}>
            <GlassCard
              hover
              glow={index === 0 ? "soft" : "none"}
              variant={index === 0 ? "strong" : "default"}
              className="relative h-full overflow-hidden p-5 sm:p-6"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-primary/10 blur-2xl"
                aria-hidden
              />
              <p className="font-display text-3xl font-medium tracking-tight text-gradient-brand sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-muted">{item.label}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-secondary">
                <TrendingUp className="size-3" aria-hidden />
                {item.trend}
              </p>
            </GlassCard>
          </FadeIn>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
        <FadeIn delay={0.15}>
          <GlassCard variant="strong" glow="soft" className="h-full p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                <Users className="size-5 text-primary" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Join 200+ executives
                </p>
                <p className="text-xs text-muted">Building authority at scale</p>
              </div>
            </div>

            <div className="mt-6 flex items-center">
              <div className="-space-x-3 flex">
                {socialProofClients.map((client, i) => (
                  <ClientAvatar key={client.initials} initials={client.initials} index={i} />
                ))}
              </div>
              <span className="ml-4 text-sm text-muted">+194 more</span>
            </div>

            <ul className="mt-6 space-y-3 border-t border-border/80 pt-6">
              {socialProofClients.slice(0, 3).map((client) => (
                <li
                  key={client.initials}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-foreground">{client.name}</span>
                  <span className="truncate text-xs text-subtle">{client.company}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.2}>
          <GlassCard variant="strong" className="h-full p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-secondary/25 bg-secondary/10">
                <TrendingUp className="size-5 text-secondary" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Avg. engagement improvement
                </p>
                <p className="text-xs text-muted">90-day client benchmark</p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {engagementImprovements.map((item, index) => (
                <EngagementBar key={item.metric} {...item} index={index} />
              ))}
            </div>

            <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-subtle">
              Before → After · representative client cohort
            </p>
          </GlassCard>
        </FadeIn>
      </div>

      <FadeIn delay={0.25} className="mt-10 md:mt-14">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-muted">
            <Award className="size-4 text-primary" aria-hidden />
            <span className="text-eyebrow text-primary">Authority badges</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {authorityBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-border bg-surface/60 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
