"use client";

import { FileDown, RotateCcw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { ProposalPreview } from "@/components/proposal/proposal-preview";
import { ProposalPricingBlock } from "@/components/proposal/proposal-pricing-block";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  getProposalTemplate,
  PROPOSAL_SERVICE_BLOCKS,
  PROPOSAL_TEMPLATES,
} from "@/lib/proposal/data";
import {
  DEFAULT_PROPOSAL_DRAFT,
  type ProposalDraft,
  type ProposalServiceId,
  type ProposalTemplateId,
} from "@/lib/proposal/types";
import { trackFunnelStep } from "@/lib/crm/track-funnel";
import { cn } from "@/lib/utils";

const inputClassName = cn(
  "focus-ring min-h-11 w-full rounded-lg border border-border bg-surface/60 px-4 text-sm text-foreground placeholder:text-muted/70",
  "transition-colors hover:border-primary/30 focus:border-primary/50",
);

const textareaClassName = cn(inputClassName, "min-h-[100px] resize-y py-3");

function defaultValidUntil(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

export function ProposalBuilder() {
  const [draft, setDraft] = useState<ProposalDraft>(() => ({
    ...DEFAULT_PROPOSAL_DRAFT,
    validUntil: defaultValidUntil(),
  }));

  const applyTemplate = useCallback((templateId: ProposalTemplateId) => {
    const template = getProposalTemplate(templateId);
    const tierDefaults = Object.fromEntries(
      template.recommendedServices.map((serviceId) => {
        const block = PROPOSAL_SERVICE_BLOCKS.find((b) => b.id === serviceId);
        const tier = block?.tiers.find((t) => t.highlighted) ?? block?.tiers[0];
        return [serviceId, tier?.id ?? ""] as const;
      }),
    ) as Partial<Record<ProposalServiceId, string>>;

    setDraft((prev) => ({
      ...prev,
      templateId,
      cadence: template.defaultCadence,
      selectedServices: [...template.recommendedServices],
      selectedTierByService: { ...prev.selectedTierByService, ...tierDefaults },
      executiveSummary: template.description,
      projectTitle: `${template.name} — Proposal`,
    }));
    trackFunnelStep("proposal");
  }, []);

  const toggleService = (id: ProposalServiceId) => {
    setDraft((prev) => {
      const exists = prev.selectedServices.includes(id);
      const selectedServices = exists
        ? prev.selectedServices.filter((s) => s !== id)
        : [...prev.selectedServices, id];
      return { ...prev, selectedServices };
    });
  };

  const selectTier = (serviceId: ProposalServiceId, tierId: string) => {
    setDraft((prev) => ({
      ...prev,
      selectedTierByService: { ...prev.selectedTierByService, [serviceId]: tierId },
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices
        : [...prev.selectedServices, serviceId],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setDraft({ ...DEFAULT_PROPOSAL_DRAFT, validUntil: defaultValidUntil() });
  };

  const selectedCount = draft.selectedServices.length;

  const estimatedLabel = useMemo(() => {
    let hasCustom = false;
    let numericTotal = 0;
    for (const serviceId of draft.selectedServices) {
      const block = PROPOSAL_SERVICE_BLOCKS.find((b) => b.id === serviceId);
      const tierId =
        draft.selectedTierByService[serviceId] ??
        block?.tiers.find((t) => t.highlighted)?.id ??
        block?.tiers[0]?.id;
      const tier = block?.tiers.find((t) => t.id === tierId);
      if (!tier) continue;
      if (tier.price === "Custom") {
        hasCustom = true;
        continue;
      }
      const num = Number.parseInt(tier.price.replace(/[^0-9]/g, ""), 10);
      if (!Number.isNaN(num)) numericTotal += num;
    }
    if (hasCustom && numericTotal > 0) return `From $${numericTotal.toLocaleString()}+ /mo`;
    if (hasCustom) return "Custom investment";
    if (numericTotal > 0) return `~$${numericTotal.toLocaleString()} /mo combined`;
    return "Select services";
  }, [draft.selectedServices, draft.selectedTierByService]);

  return (
    <div className="proposal-builder">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:gap-10">
        <div className="space-y-8">
          <section aria-labelledby="templates-heading">
            <p className="text-eyebrow text-primary">Templates</p>
            <h2 id="templates-heading" className="mt-2 font-display text-xl text-foreground">
              Pre-built proposal frameworks
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {PROPOSAL_TEMPLATES.map((template) => {
                const active = draft.templateId === template.id;
                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => applyTemplate(template.id)}
                    className={cn(
                      "focus-ring rounded-xl border p-4 text-left transition-all",
                      active
                        ? "border-primary/45 bg-primary/10"
                        : "border-border bg-surface/40 hover:border-primary/25",
                    )}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary">
                      {template.subtitle}
                    </p>
                    <p className="mt-2 font-display text-base text-foreground">{template.name}</p>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">
                      {template.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <GlassCard className="space-y-5 p-5 sm:p-6">
            <p className="text-eyebrow text-secondary">Client details</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                  Client name
                </span>
                <input
                  className={inputClassName}
                  value={draft.clientName}
                  onChange={(e) => setDraft((p) => ({ ...p, clientName: e.target.value }))}
                  placeholder="Elena Vasquez"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                  Company
                </span>
                <input
                  className={inputClassName}
                  value={draft.company}
                  onChange={(e) => setDraft((p) => ({ ...p, company: e.target.value }))}
                  placeholder="Meridian Capital"
                />
              </label>
            </div>
            <label className="block space-y-2">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                Proposal title
              </span>
              <input
                className={inputClassName}
                value={draft.projectTitle}
                onChange={(e) => setDraft((p) => ({ ...p, projectTitle: e.target.value }))}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                  Valid until
                </span>
                <input
                  type="date"
                  className={inputClassName}
                  value={draft.validUntil}
                  onChange={(e) => setDraft((p) => ({ ...p, validUntil: e.target.value }))}
                />
              </label>
              <label className="block space-y-2">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                  Billing cadence
                </span>
                <select
                  className={inputClassName}
                  value={draft.cadence}
                  onChange={(e) =>
                    setDraft((p) => ({
                      ...p,
                      cadence: e.target.value as ProposalDraft["cadence"],
                    }))
                  }
                >
                  <option value="monthly">Monthly retainer</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="project">Project-based</option>
                </select>
              </label>
            </div>
            <label className="block space-y-2">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                Executive summary
              </span>
              <textarea
                className={textareaClassName}
                value={draft.executiveSummary}
                onChange={(e) => setDraft((p) => ({ ...p, executiveSummary: e.target.value }))}
              />
            </label>
          </GlassCard>

          <section aria-labelledby="services-heading">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-eyebrow text-primary">Premium pricing blocks</p>
                <h2 id="services-heading" className="mt-2 font-display text-xl text-foreground">
                  Core services
                </h2>
              </div>
              <p className="text-sm text-muted">
                {selectedCount} selected · <span className="text-foreground">{estimatedLabel}</span>
              </p>
            </div>
            <div className="mt-5 space-y-4">
              {PROPOSAL_SERVICE_BLOCKS.map((block) => (
                <ProposalPricingBlock
                  key={block.id}
                  block={block}
                  selected={draft.selectedServices.includes(block.id)}
                  selectedTierId={draft.selectedTierByService[block.id]}
                  onToggleService={toggleService}
                  onSelectTier={selectTier}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <div className="mb-4 flex flex-wrap gap-3 print:hidden">
            <Button type="button" variant="primary" className="gap-2" onClick={handlePrint}>
              <FileDown className="size-4" aria-hidden />
              Export / Print PDF
            </Button>
            <Button type="button" variant="ghost" className="gap-2" onClick={handleReset}>
              <RotateCcw className="size-4" aria-hidden />
              Reset
            </Button>
          </div>
          <ProposalPreview draft={draft} />
        </div>
      </div>
    </div>
  );
}
