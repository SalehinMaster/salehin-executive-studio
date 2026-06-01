"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Download,
  TrendingDown,
  TrendingUp,
  Upload,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { getClientNavItem } from "@/lib/client-portal/navigation";
import type {
  ClientPortalSectionId,
  ClientPortalState,
  ContentQueueStatus,
  DeliverableStatus,
  OnboardingStep,
} from "@/lib/client-portal/types";
import { cn } from "@/lib/utils";

const inputClassName = cn(
  "focus-ring min-h-10 w-full rounded-lg border border-border bg-surface/60 px-3 text-sm text-foreground",
);

const STATUS_STYLES: Record<DeliverableStatus, string> = {
  draft: "border-border text-muted bg-surface/50",
  in_review: "border-amber-500/40 text-amber-200 bg-amber-500/10",
  approved: "border-secondary/40 text-secondary bg-secondary/10",
  published: "border-primary/40 text-primary bg-primary/10",
};

const QUEUE_STYLES: Record<ContentQueueStatus, string> = {
  scheduled: "text-muted",
  in_production: "text-secondary",
  awaiting_approval: "text-amber-200",
  ready: "text-primary",
};

type SectionPanelProps = {
  sectionId: ClientPortalSectionId;
  state: ClientPortalState;
  onToggleOnboarding: (stepId: OnboardingStep["id"]) => void;
};

function SectionHeader({ sectionId }: { sectionId: ClientPortalSectionId }) {
  const nav = getClientNavItem(sectionId);
  return (
    <header className="mb-8">
      <p className="text-eyebrow text-primary">{nav.label}</p>
      <h1 className="mt-3 font-display text-2xl text-foreground sm:text-3xl">{nav.label}</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">{nav.description}</p>
    </header>
  );
}

export function ClientSectionPanel({
  sectionId,
  state,
  onToggleOnboarding,
}: SectionPanelProps) {
  switch (sectionId) {
    case "welcome":
      return (
        <>
          <SectionHeader sectionId="welcome" />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <GlassCard variant="strong" glow="soft" className="p-6 sm:p-8">
              <p className="text-eyebrow text-secondary">Onboarding setup</p>
              <h2 className="mt-2 font-display text-xl text-foreground">
                Welcome to your authority partnership
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Complete these steps so your strategist can calibrate voice, access, and
                publishing cadence before your first post goes live.
              </p>
              <ul className="mt-6 space-y-3">
                {state.onboardingSteps.map((step) => (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => onToggleOnboarding(step.id)}
                      className="focus-ring flex w-full items-start gap-3 rounded-lg border border-border bg-surface/40 px-4 py-4 text-left transition-colors hover:border-primary/30"
                    >
                      {step.completed ? (
                        <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden />
                      ) : (
                        <Circle className="size-5 shrink-0 text-subtle" aria-hidden />
                      )}
                      <span>
                        <span className="block text-sm font-medium text-foreground">
                          {step.title}
                        </span>
                        <span className="mt-1 block text-xs text-muted">{step.description}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard className="p-6">
              <p className="text-eyebrow text-muted">Progress</p>
              <p className="mt-3 font-display text-4xl text-foreground">
                {Math.round(
                  (state.onboardingSteps.filter((s) => s.completed).length /
                    state.onboardingSteps.length) *
                    100,
                )}
                %
              </p>
              <p className="mt-2 text-sm text-muted">Onboarding checklist complete</p>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-gradient-brand transition-all"
                  style={{
                    width: `${(state.onboardingSteps.filter((s) => s.completed).length / state.onboardingSteps.length) * 100}%`,
                  }}
                />
              </div>
            </GlassCard>
          </div>
        </>
      );

    case "project":
      return (
        <>
          <SectionHeader sectionId="project" />
          <GlassCard variant="strong" className="p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-eyebrow text-muted">Engagement</p>
                <p className="mt-2 font-display text-xl text-foreground">
                  {state.project.engagementName}
                </p>
              </div>
              <div>
                <p className="text-eyebrow text-muted">Status</p>
                <p className="mt-2 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-wide text-primary">
                  {state.project.status.replace("_", " ")}
                </p>
              </div>
              <div>
                <p className="text-eyebrow text-muted">Start date</p>
                <p className="mt-2 text-sm text-foreground">{state.project.startDate}</p>
              </div>
              <div>
                <p className="text-eyebrow text-muted">Strategist</p>
                <p className="mt-2 text-sm text-foreground">{state.project.strategist}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-eyebrow text-muted">Primary contact</p>
                <p className="mt-2 text-sm text-foreground">{state.project.primaryContact}</p>
              </div>
            </div>
            <div className="mt-8 border-t border-border/80 pt-6">
              <p className="text-eyebrow text-secondary">Active services</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {state.project.services.map((service) => (
                  <li
                    key={service}
                    className="rounded-full border border-border-strong px-3 py-1 text-xs text-muted"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </>
      );

    case "goals":
      return (
        <>
          <SectionHeader sectionId="goals" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {state.goals.map((goal) => (
              <GlassCard key={goal.id} hover className="p-5 sm:p-6">
                <h3 className="font-display text-lg text-foreground">{goal.title}</h3>
                <p className="mt-2 text-sm text-muted">Target: {goal.target}</p>
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-muted">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
                    <div
                      className="h-full rounded-full bg-primary/80"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
                <p className="mt-4 text-xs text-subtle">
                  Due {new Date(goal.dueDate).toLocaleDateString(undefined, { dateStyle: "medium" })}
                </p>
              </GlassCard>
            ))}
          </div>
        </>
      );

    case "preferences":
      return (
        <>
          <SectionHeader sectionId="preferences" />
          <GlassCard className="divide-y divide-border/80 overflow-hidden">
            {state.preferences.map((pref) => (
              <div key={pref.id} className="grid gap-2 p-5 sm:grid-cols-[140px_1fr] sm:gap-6">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                  {pref.label}
                </p>
                <input
                  className={inputClassName}
                  defaultValue={pref.value}
                  aria-label={pref.label}
                />
              </div>
            ))}
          </GlassCard>
          <p className="mt-4 text-xs text-subtle">
            Preferences sync with your strategist on save — backend wiring ships in a future phase.
          </p>
        </>
      );

    case "resources":
      return (
        <>
          <SectionHeader sectionId="resources" />
          <GlassCard className="border-dashed border-primary/25 p-8 text-center">
            <Upload className="mx-auto size-8 text-primary/70" aria-hidden />
            <p className="mt-4 text-sm font-medium text-foreground">Upload brand resources</p>
            <p className="mt-2 text-xs text-muted">
              PDFs, headshots, logos, and voice samples — drag & drop or browse
            </p>
            <Button type="button" variant="secondary" className="mt-6">
              Choose files
            </Button>
          </GlassCard>
          <ul className="mt-6 space-y-3">
            {state.resources.map((file) => (
              <li key={file.id}>
                <GlassCard className="flex flex-wrap items-center justify-between gap-4 p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="mt-1 text-xs text-muted">
                      {file.type} · {file.sizeLabel} ·{" "}
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="focus-ring inline-flex items-center gap-2 text-xs text-secondary hover:text-secondary-hover"
                  >
                    <Download className="size-3.5" aria-hidden />
                    Download
                  </button>
                </GlassCard>
              </li>
            ))}
          </ul>
        </>
      );

    case "deliverables":
      return (
        <>
          <SectionHeader sectionId="deliverables" />
          <ul className="space-y-4">
            {state.deliverables.map((item) => (
              <li key={item.id}>
                <GlassCard hover className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-muted">{item.type}</p>
                      <h3 className="mt-1 font-display text-lg text-foreground">{item.title}</h3>
                      {item.preview ? (
                        <p className="mt-2 line-clamp-2 text-sm text-muted">{item.preview}</p>
                      ) : null}
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                        STATUS_STYLES[item.status],
                      )}
                    >
                      {item.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="mt-4 text-xs text-subtle">
                    Updated{" "}
                    {new Date(item.updatedAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </GlassCard>
              </li>
            ))}
          </ul>
        </>
      );

    case "queue":
      return (
        <>
          <SectionHeader sectionId="queue" />
          <div className="space-y-3">
            {state.queue.map((item, index) => (
              <GlassCard
                key={item.id}
                className="flex flex-wrap items-center gap-4 p-4 sm:p-5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-xs font-medium text-muted">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {item.format} ·{" "}
                    {new Date(item.scheduledFor).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <span
                  className={cn(
                    "text-xs font-medium uppercase tracking-wide",
                    QUEUE_STYLES[item.status],
                  )}
                >
                  {item.status.replace(/_/g, " ")}
                </span>
              </GlassCard>
            ))}
          </div>
        </>
      );

    case "reports":
      return (
        <>
          <SectionHeader sectionId="reports" />
          <div className="space-y-6">
            {state.reports.map((report) => (
              <GlassCard key={report.id} variant="strong" glow="soft" className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-eyebrow text-secondary">Performance report</p>
                    <h3 className="mt-2 font-display text-xl text-foreground">{report.period}</h3>
                  </div>
                  <button
                    type="button"
                    className="focus-ring inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-hover"
                  >
                    Full report
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </button>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{report.summary}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {report.metrics.map((metric) => (
                    <div
                      key={metric.id}
                      className="rounded-lg border border-border bg-surface/40 p-4"
                    >
                      <p className="text-xs text-muted">{metric.label}</p>
                      <p className="mt-2 font-display text-2xl text-foreground">{metric.value}</p>
                      <p
                        className={cn(
                          "mt-1 flex items-center gap-1 text-xs",
                          metric.trend === "up" && "text-secondary",
                          metric.trend === "down" && "text-red-300",
                          metric.trend === "neutral" && "text-subtle",
                        )}
                      >
                        {metric.trend === "up" ? (
                          <TrendingUp className="size-3" aria-hidden />
                        ) : metric.trend === "down" ? (
                          <TrendingDown className="size-3" aria-hidden />
                        ) : null}
                        {metric.change}
                      </p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      );

    default:
      return null;
  }
}
