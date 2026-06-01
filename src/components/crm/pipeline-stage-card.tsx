import { Users } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import type { CrmLead } from "@/lib/crm/types";
import { cn } from "@/lib/utils";
import { LeadCard } from "@/components/crm/lead-card";

type PipelineStageCardProps = {
  label: string;
  description: string;
  accent: string;
  leads: CrmLead[];
  onStageChange: (leadId: string, stage: CrmLead["stage"]) => void;
};

export function PipelineStageCard({
  label,
  description,
  accent,
  leads,
  onStageChange,
}: PipelineStageCardProps) {
  return (
    <GlassCard
      variant="strong"
      className="flex h-full min-h-[320px] min-w-[min(100%,280px)] flex-col sm:min-w-[260px]"
    >
      <div className="border-b border-border/80 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className={cn("text-[10px] font-semibold uppercase tracking-[0.2em]", accent)}>
              {label}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{description}</p>
          </div>
          <span className="glass-card flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground">
            <Users className="size-3.5 text-primary" aria-hidden />
            {leads.length}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-3 sm:p-4">
        {leads.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border-strong px-4 py-8 text-center">
            <p className="text-xs text-muted">No leads in this stage</p>
          </div>
        ) : (
          leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onStageChange={onStageChange} />
          ))
        )}
      </div>
    </GlassCard>
  );
}
