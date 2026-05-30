"use client";

import {
  ArrowRight,
  Bot,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { strategyCallHref } from "@/lib/routes";
import { cn } from "@/lib/utils";

const trustStats = [
  { icon: Users, label: "200+ founders & CEOs" },
  { icon: TrendingUp, label: "4× avg. inbound lift" },
  { icon: Zap, label: "8–12 week go-live" },
] as const;

const floatingCards = [
  {
    title: "AI Content Pipeline",
    metric: "+340%",
    sub: "reach in 90 days",
    delay: 0,
    className: "right-0 top-8 md:right-4 lg:right-8",
    floatDelay: "0s",
  },
  {
    title: "Authority Score",
    metric: "92",
    sub: "LinkedIn brand index",
    delay: 0.15,
    className: "left-0 top-32 md:left-4 lg:left-8",
    floatDelay: "1.5s",
  },
  {
    title: "Posts / month",
    metric: "24",
    sub: "on-brand, automated",
    delay: 0.3,
    className: "right-4 bottom-4 md:right-12 md:bottom-8",
    floatDelay: "3s",
  },
] as const;

export function Hero() {
  return (
    <Section
      id="hero"
      className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24"
    >
      <div className="hero-mesh" aria-hidden>
        <div
          className="hero-mesh-blob left-1/2 top-0 size-[min(90vw,42rem)] -translate-x-1/2 bg-primary/30"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="hero-mesh-blob right-[-10%] top-[20%] size-[min(70vw,28rem)] bg-secondary/20"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="hero-mesh-blob bottom-0 left-[-15%] size-[min(60vw,24rem)] bg-primary/15"
          style={{ animationDelay: "-12s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </div>

      <div className="relative">
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="size-3.5 text-secondary" aria-hidden />
              <span className="text-eyebrow text-muted">
                AI-Powered Personal Branding OS
              </span>
            </div>

            <h1 className="mt-8 font-display text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Build LinkedIn Authority{" "}
              <span className="text-gradient-brand">Faster With AI</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Help founders, CEOs and creators build authority using AI-powered
              content systems.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <ButtonLink href={strategyCallHref} className="min-w-[200px]">
                Book Strategy Call
                <ArrowRight className="size-4 stroke-[1.5]" />
              </ButtonLink>
              <ButtonLink
                href="#ai-demo"
                variant="secondary"
                className="group min-w-[200px]"
              >
                <Bot className="size-4 stroke-[1.5] transition-transform group-hover:scale-110" />
                Try AI Demo
              </ButtonLink>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-border/60 pt-10">
              {trustStats.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-sm text-muted"
                >
                  <span className="flex size-8 items-center justify-center rounded-lg border border-border bg-surface/80">
                    <Icon className="size-3.5 text-secondary" aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3 md:hidden">
          {floatingCards.map((card) => (
            <GlassCard key={card.title} variant="strong" glow="soft" className="p-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                {card.title}
              </p>
              <p className="mt-2 font-display text-2xl font-medium text-foreground">
                {card.metric}
              </p>
              <p className="mt-1 text-xs text-subtle">{card.sub}</p>
            </GlassCard>
          ))}
        </div>

        <div
          className="pointer-events-none relative mx-auto mt-16 hidden h-64 max-w-5xl md:block lg:h-72"
          aria-hidden
        >
          {floatingCards.map((card) => (
            <motion.div
              key={card.title}
              className={cn("absolute w-52", card.className)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5 + card.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <GlassCard
                variant="strong"
                glow="soft"
                className="float-card p-4"
                style={{ animationDelay: card.floatDelay }}
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                  {card.title}
                </p>
                <p className="mt-2 font-display text-3xl font-medium text-foreground">
                  {card.metric}
                </p>
                <p className="mt-1 text-xs text-subtle">{card.sub}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
