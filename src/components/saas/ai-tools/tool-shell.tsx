"use client";

import type { ReactNode } from "react";
import { CopyButton } from "@/components/saas/ai-tools/copy-button";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

type ToolShellProps = {
  form: ReactNode;
  results: ReactNode;
  className?: string;
};

export function ToolShell({ form, results, className }: ToolShellProps) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]", className)}>
      <GlassCard variant="strong" glow="soft" className="space-y-5 p-6">
        {form}
      </GlassCard>
      <GlassCard glow="primary" className="flex min-h-[320px] flex-col p-6">
        {results}
      </GlassCard>
    </div>
  );
}

type ResultCardProps = {
  label: string;
  accent?: "primary" | "secondary" | "muted";
  children: ReactNode;
  copyText?: string;
  className?: string;
};

const accentMap = {
  primary: "text-primary",
  secondary: "text-secondary",
  muted: "text-muted",
} as const;

export function ResultCard({
  label,
  accent = "muted",
  children,
  copyText,
  className,
}: ResultCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/80 bg-surface/30 p-4 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className={cn("text-eyebrow", accentMap[accent])}>{label}</p>
        {copyText ? <CopyButton text={copyText} /> : null}
      </div>
      {children}
    </div>
  );
}

type ResultsHeaderProps = {
  title?: string;
  model?: string | null;
  emptyMessage: string;
  hasOutput: boolean;
  children: ReactNode;
};

export function ResultsPanel({
  title = "Output",
  model,
  emptyMessage,
  hasOutput,
  children,
}: ResultsHeaderProps) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-eyebrow text-muted">{title}</p>
        {model ? (
          <span className="rounded-full border border-border bg-surface/50 px-2 py-0.5 text-[10px] text-subtle">
            {model}
          </span>
        ) : null}
      </div>
      {hasOutput ? (
        <div className="flex-1 space-y-4 overflow-y-auto">{children}</div>
      ) : (
        <p className="flex flex-1 items-center justify-center py-16 text-center text-sm text-muted">
          {emptyMessage}
        </p>
      )}
    </>
  );
}
