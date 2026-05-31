"use client";

import { FileText, ListChecks, Lock, Sparkles } from "lucide-react";
import { useState } from "react";
import { EmailCaptureForm } from "@/components/forms/email-capture-form";
import { FadeIn } from "@/components/ui/fade-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { formspreeLeadMagnetId } from "@/lib/formspree-config";
import { leadMagnetResources } from "@/lib/home-content";
import { cn } from "@/lib/utils";

const resourceIcons = {
  "linkedin-hooks-pdf": FileText,
  "linkedin-profile-checklist": ListChecks,
  "personal-branding-guide": Sparkles,
} as const;

export function LeadMagnet() {
  const [selectedId, setSelectedId] = useState<
    (typeof leadMagnetResources)[number]["id"]
  >(leadMagnetResources[0].id);

  const selectedResource = leadMagnetResources.find(
    (resource) => resource.id === selectedId,
  )!;

  return (
    <Section id="lead-magnet" lazy className="relative border-t border-border">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 size-96 -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 size-72 rounded-full bg-secondary/6 blur-[100px]"
        aria-hidden
      />

      <FadeIn>
        <SectionHeading
          eyebrow="Free resources"
          title="Executive-grade playbooks — yours after one email."
          description="Three premium guides used with founders and C-suite clients. Enter your work email below to unlock instant download links."
          align="center"
          className="mx-auto max-w-3xl"
        />
      </FadeIn>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-5">
        {leadMagnetResources.map((resource, index) => {
          const Icon = resourceIcons[resource.id];
          const isSelected = selectedId === resource.id;

          return (
            <FadeIn key={resource.id} delay={index * 0.08}>
              <button
                type="button"
                onClick={() => setSelectedId(resource.id)}
                aria-pressed={isSelected}
                className="focus-ring group w-full text-left"
              >
                <GlassCard
                  hover
                  glow={isSelected ? "primary" : "none"}
                  variant={isSelected ? "strong" : "default"}
                  className={cn(
                    "relative h-full overflow-hidden transition-all duration-300",
                    isSelected && "glow-border-primary ring-1 ring-primary/30",
                  )}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />

                  <div className="relative p-5 sm:p-6">
                    <div className="relative mx-auto max-w-[220px]">
                      <div
                        className={cn(
                          "relative aspect-[3/4] overflow-hidden rounded-lg border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]",
                          "bg-gradient-to-br",
                          resource.accent,
                        )}
                      >
                        <div
                          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_45%)]"
                          aria-hidden
                        />
                        <div className="absolute inset-x-0 top-0 h-8 border-b border-white/10 bg-black/20 backdrop-blur-sm" />
                        <div className="absolute left-3 top-2.5 flex gap-1">
                          <span className="size-2 rounded-full bg-white/25" />
                          <span className="size-2 rounded-full bg-white/15" />
                          <span className="size-2 rounded-full bg-white/15" />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
                            <Lock className="size-3" aria-hidden />
                            Email to unlock
                          </span>
                        </div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                          <span className="flex size-12 items-center justify-center rounded-xl border border-white/20 bg-black/25 backdrop-blur-sm">
                            <Icon className="size-6 text-white/90" aria-hidden />
                          </span>
                          <p className="mt-4 font-display text-lg font-medium leading-tight text-white">
                            {resource.title}
                          </p>
                        </div>
                      </div>

                      <div
                        className="absolute -bottom-3 left-1/2 h-3 w-[88%] -translate-x-1/2 rounded-b-lg bg-surface/80 blur-[1px]"
                        aria-hidden
                      />
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg font-medium text-foreground">
                            {resource.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted">
                            {resource.subtitle}
                          </p>
                        </div>
                        {isSelected ? (
                          <span className="shrink-0 rounded-full bg-primary/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                            Selected
                          </span>
                        ) : null}
                      </div>

                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
                        {resource.format}
                      </p>

                      <ul className="flex flex-wrap gap-2">
                        {resource.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="rounded-md border border-border/80 bg-background/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-subtle"
                          >
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </button>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={0.15}>
        <GlassCard
          glow="soft"
          variant="strong"
          className="relative mx-auto mt-10 max-w-2xl overflow-hidden p-6 sm:mt-12 sm:p-8"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-12 -left-12 size-32 rounded-full bg-secondary/10 blur-3xl"
            aria-hidden
          />

          <div className="relative space-y-5">
            <div className="text-center sm:text-left">
              <p className="text-eyebrow text-primary">Instant access</p>
              <h3 className="mt-2 font-display text-xl font-medium text-foreground sm:text-2xl">
                Unlock{" "}
                <span className="text-gradient-brand">
                  {selectedResource.title}
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                Submit your work email to receive the download link immediately.
                No spam — unsubscribe anytime.
              </p>
            </div>

            <EmailCaptureForm
              formId={formspreeLeadMagnetId}
              formType="lead-magnet"
              resource={selectedResource.title}
              inputId="lead-magnet-email"
              submitLabel="Unlock download"
              successTitle="You're in — check your inbox"
              successMessage={`Your download link for "${selectedResource.title}" is on its way. If you don't see it within a few minutes, check promotions or spam.`}
              layout="stacked"
              showEmailIcon
              helperText="Email required to unlock your free resource."
            />
          </div>
        </GlassCard>
      </FadeIn>
    </Section>
  );
}
