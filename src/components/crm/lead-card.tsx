"use client";

import { Building2, Mail } from "lucide-react";
import { PIPELINE_STAGES } from "@/lib/crm/constants";
import type { CrmLead, LeadPipelineStage } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

type LeadCardProps = {
  lead: CrmLead;
  onStageChange: (leadId: string, stage: LeadPipelineStage) => void;
};

export function LeadCard({ lead, onStageChange }: LeadCardProps) {
  return (
    <article className="glass-card space-y-3 rounded-lg p-3.5 transition-colors hover:border-primary/30">
      <div>
        <p className="text-sm font-medium text-foreground">{lead.full_name}</p>
        {lead.company ? (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
            <Building2 className="size-3 shrink-0" aria-hidden />
            {lead.company}
          </p>
        ) : null}
        {lead.email ? (
          <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted">
            <Mail className="size-3 shrink-0" aria-hidden />
            {lead.email}
          </p>
        ) : null}
      </div>

      <label className="block">
        <span className="sr-only">Move {lead.full_name} to stage</span>
        <select
          value={lead.stage}
          onChange={(event) =>
            onStageChange(lead.id, event.target.value as LeadPipelineStage)
          }
          className={cn(
            "focus-ring w-full rounded-lg border border-border bg-surface/60 px-2.5 py-2 text-xs text-foreground",
            "transition-colors hover:border-primary/40",
          )}
        >
          {PIPELINE_STAGES.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.label}
            </option>
          ))}
        </select>
      </label>
    </article>
  );
}
