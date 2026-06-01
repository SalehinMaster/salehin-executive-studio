"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { PipelineStageCard } from "@/components/crm/pipeline-stage-card";
import { PIPELINE_STAGES } from "@/lib/crm/constants";
import type { CrmLead, LeadPipelineStage } from "@/lib/crm/types";

type PipelineBoardProps = {
  initialGrouped: Record<LeadPipelineStage, CrmLead[]>;
};

export function PipelineBoard({ initialGrouped }: PipelineBoardProps) {
  const router = useRouter();
  const [grouped, setGrouped] = useState(initialGrouped);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const onStageChange = useCallback(
    async (leadId: string, newStage: LeadPipelineStage) => {
      const previous = grouped;
      const lead = Object.values(grouped)
        .flat()
        .find((item) => item.id === leadId);

      if (!lead || lead.stage === newStage) return;

      const nextGrouped = { ...grouped };
      nextGrouped[lead.stage] = nextGrouped[lead.stage].filter((item) => item.id !== leadId);
      nextGrouped[newStage] = [
        { ...lead, stage: newStage },
        ...nextGrouped[newStage],
      ];
      setGrouped(nextGrouped);
      setUpdatingId(leadId);

      try {
        const response = await fetch(`/api/crm/leads/${leadId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stage: newStage }),
        });

        if (!response.ok) {
          setGrouped(previous);
        } else {
          router.refresh();
        }
      } catch {
        setGrouped(previous);
      } finally {
        setUpdatingId(null);
      }
    },
    [grouped, router],
  );

  return (
    <div className="relative">
      {updatingId ? (
        <p className="text-eyebrow mb-4 text-primary" role="status">
          Updating pipeline…
        </p>
      ) : null}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
        {PIPELINE_STAGES.map((stage) => (
          <div key={stage.id} className="snap-start shrink-0">
            <PipelineStageCard
              label={stage.label}
              description={stage.description}
              accent={stage.accent}
              leads={grouped[stage.id]}
              onStageChange={onStageChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
