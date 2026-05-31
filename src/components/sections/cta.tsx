"use client";

import { ArrowRight, Bot, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { StrategyCallButton } from "@/components/ui/strategy-call-button";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export function CTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="cta" lazy className="relative pb-section md:pb-section-lg">
      <FadeIn>
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-surface/40 px-5 py-14 text-center sm:px-8 sm:py-20 md:px-16 md:py-28">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/15"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/30 blur-[100px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-[-10%] bottom-[-20%] size-64 rounded-full bg-secondary/20 blur-[90px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            aria-hidden
          />

          {!prefersReducedMotion ? (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-40"
              aria-hidden
              animate={{
                background: [
                  "radial-gradient(circle at 20% 30%, rgba(124,58,237,0.25), transparent 50%)",
                  "radial-gradient(circle at 80% 40%, rgba(6,182,212,0.2), transparent 55%)",
                  "radial-gradient(circle at 40% 70%, rgba(124,58,237,0.22), transparent 50%)",
                  "radial-gradient(circle at 20% 30%, rgba(124,58,237,0.25), transparent 50%)",
                ],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          ) : null}

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-primary backdrop-blur-sm">
              <Sparkles className="size-3.5" aria-hidden />
              <span className="text-eyebrow">Ready to compound</span>
            </div>

            <h2 className="mx-auto mt-6 max-w-3xl text-display-section font-display font-medium text-balance text-foreground sm:mt-8">
              Install the personal brand{" "}
              <span className="text-gradient-brand">your market expects.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted sm:mt-6 sm:text-base">
              Strategy, AI content systems, and LinkedIn authority — built as
              infrastructure, not one-off campaigns. Pick your next step below.
            </p>

            <div className="mx-auto mt-10 flex max-w-2xl flex-col items-stretch gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
              <StrategyCallButton
                className={cn(
                  "w-full shadow-glow-primary sm:w-auto sm:min-w-[210px]",
                  "bg-gradient-brand hover:opacity-95 hover:shadow-[var(--shadow-glow-primary),0_0_80px_rgba(124,58,237,0.45)]",
                )}
              >
                Book Strategy Call
                <ArrowRight className="size-4 stroke-[1.5]" />
              </StrategyCallButton>

              <ButtonLink
                href="/#pricing"
                variant="secondary"
                className="w-full border-primary/20 bg-surface/60 backdrop-blur-sm sm:w-auto sm:min-w-[180px]"
              >
                Get Started
                <ArrowRight className="size-4 stroke-[1.5]" />
              </ButtonLink>

              <ButtonLink
                href="/#ai-demo"
                variant="ghost"
                className="group w-full border-border-strong bg-surface/30 sm:w-auto sm:min-w-[180px]"
              >
                <Bot className="size-4 stroke-[1.5] transition-transform group-hover:scale-110" />
                Try AI Demo
              </ButtonLink>
            </div>

            <p className="mx-auto mt-8 max-w-md text-xs leading-relaxed text-muted/90 sm:mt-10">
              30-minute strategy calls · No obligation · Response within two
              business days
            </p>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
