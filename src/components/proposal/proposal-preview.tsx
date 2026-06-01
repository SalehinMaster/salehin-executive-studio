"use client";

import { Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import {
  getProposalServiceBlock,
  getProposalTemplate,
  PROPOSAL_SERVICE_BLOCKS,
} from "@/lib/proposal/data";
import type { ProposalDraft } from "@/lib/proposal/types";
import { cn } from "@/lib/utils";

type ProposalPreviewProps = {
  draft: ProposalDraft;
  className?: string;
};

function formatValidUntil(iso: string): string {
  if (!iso) return "30 days from acceptance";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function ProposalPreview({ draft, className }: ProposalPreviewProps) {
  const template = getProposalTemplate(draft.templateId);
  const clientLabel =
    draft.clientName && draft.company
      ? `${draft.clientName} · ${draft.company}`
      : draft.clientName || draft.company || "Your organization";

  const lineItems = draft.selectedServices
    .map((serviceId) => {
      const block = getProposalServiceBlock(serviceId);
      const tierId =
        draft.selectedTierByService[serviceId] ??
        block.tiers.find((t) => t.highlighted)?.id ??
        block.tiers[0]?.id;
      const tier = block.tiers.find((t) => t.id === tierId);
      if (!tier) return null;
      return { block, tier };
    })
    .filter(Boolean);

  const cadenceLabel =
    draft.cadence === "monthly"
      ? "Monthly retainer"
      : draft.cadence === "quarterly"
        ? "Quarterly investment"
        : "Project-based engagement";

  return (
    <GlassCard
      variant="strong"
      glow="soft"
      className={cn(
        "proposal-preview proposal-preview-document overflow-hidden print:shadow-none",
        className,
      )}
    >
      <div className="border-b border-border/80 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 px-6 py-8 sm:px-10 sm:py-10">
        <p className="text-eyebrow text-primary">Salehin Executive Studio</p>
        <h2 className="mt-4 font-display text-2xl text-foreground sm:text-3xl">
          {draft.projectTitle}
        </h2>
        <p className="mt-2 text-sm text-muted">Prepared for {clientLabel}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
            <Sparkles className="size-3.5" aria-hidden />
            {template.name}
          </span>
          <span className="rounded-full border border-border-strong px-3 py-1 text-xs text-muted">
            {cadenceLabel}
          </span>
        </div>
      </div>

      <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
        <section>
          <p className="text-eyebrow text-secondary">Executive summary</p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/90">
            {draft.executiveSummary}
          </p>
        </section>

        <section>
          <p className="text-eyebrow text-secondary">Investment overview</p>
          {lineItems.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {lineItems.map((item) =>
                item ? (
                  <li
                    key={item.block.id}
                    className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-border bg-surface/40 px-4 py-4"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.block.title}</p>
                      <p className="mt-1 text-xs text-muted">{item.tier.name} tier</p>
                      <ul className="mt-3 space-y-1">
                        {item.tier.deliverables.slice(0, 3).map((d) => (
                          <li key={d} className="text-xs text-muted">
                            · {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="shrink-0 font-display text-xl text-foreground">
                      {item.tier.price}
                      <span className="text-sm text-muted">{item.tier.period}</span>
                    </p>
                  </li>
                ) : null,
              )}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">
              Select services to populate your proposal investment table.
            </p>
          )}
        </section>

        <section>
          <p className="text-eyebrow text-secondary">Included capabilities</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PROPOSAL_SERVICE_BLOCKS.filter((b) => draft.selectedServices.includes(b.id)).map(
              (block) => (
                <div
                  key={block.id}
                  className="rounded-lg border border-border/80 px-4 py-3 text-sm text-muted"
                >
                  <span className="font-medium text-foreground">{block.title}</span>
                  <span className="block mt-1 text-xs">{block.tagline}</span>
                </div>
              ),
            )}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface/30 p-5">
          <p className="text-eyebrow text-muted">Terms</p>
          <p className="mt-2 text-sm text-muted">{draft.termsNote}</p>
          <p className="mt-4 text-xs text-subtle">
            Valid until {formatValidUntil(draft.validUntil)} · Proposal ID generated on export
          </p>
        </section>
      </div>
    </GlassCard>
  );
}
