import type { BudgetRange, FunnelStep, LeadPipelineStage } from "@/lib/crm/types";

/** Exact pipeline stage labels (Phase 31). */
export const PIPELINE_STAGES: readonly {
  id: LeadPipelineStage;
  label: string;
  description: string;
  accent: string;
}[] = [
  {
    id: "new_lead",
    label: "New Lead",
    description: "Inbound interest — not yet qualified.",
    accent: "text-secondary",
  },
  {
    id: "qualified_lead",
    label: "Qualified Lead",
    description: "Fit confirmed — ready for discovery.",
    accent: "text-primary",
  },
  {
    id: "discovery_call",
    label: "Discovery Call",
    description: "Strategy call scheduled or completed.",
    accent: "text-primary",
  },
  {
    id: "proposal_sent",
    label: "Proposal Sent",
    description: "Scope and investment delivered.",
    accent: "text-gradient-brand",
  },
  {
    id: "client_won",
    label: "Client Won",
    description: "Signed and onboarding initiated.",
    accent: "text-emerald-400",
  },
  {
    id: "client_lost",
    label: "Client Lost",
    description: "Closed — not proceeding at this time.",
    accent: "text-muted",
  },
] as const;

/** Sales funnel user flow (Phase 32). */
export const FUNNEL_STEPS: readonly {
  id: FunnelStep;
  label: string;
  description: string;
  href?: string;
}[] = [
  {
    id: "homepage",
    label: "Homepage",
    description: "Executive authority positioning and proof.",
    href: "/",
  },
  {
    id: "lead_magnet",
    label: "Lead Magnet",
    description: "Playbook download and email capture.",
    href: "/#lead-magnet",
  },
  {
    id: "calendly_booking",
    label: "Calendly Booking",
    description: "Strategy call scheduled via Calendly.",
    href: "/contact#scheduling",
  },
  {
    id: "discovery_call",
    label: "Discovery Call",
    description: "Fit, scope, and authority goals aligned.",
  },
  {
    id: "proposal",
    label: "Proposal",
    description: "Custom engagement and investment outlined.",
  },
  {
    id: "client",
    label: "Client",
    description: "Signed partner — onboarding in progress.",
    href: "/intake",
  },
] as const;

export const BUDGET_RANGE_OPTIONS: readonly {
  value: BudgetRange;
  label: string;
}[] = [
  { value: "under_2500", label: "Under $2,500 / month" },
  { value: "2500_5000", label: "$2,500 – $5,000 / month" },
  { value: "5000_10000", label: "$5,000 – $10,000 / month" },
  { value: "over_10000", label: "$10,000+ / month" },
  { value: "not_sure", label: "Not sure yet" },
  { value: "custom", label: "Custom / Enterprise" },
] as const;

export function getPipelineStageLabel(stage: LeadPipelineStage): string {
  return PIPELINE_STAGES.find((s) => s.id === stage)?.label ?? stage;
}

export function getBudgetRangeLabel(range: BudgetRange): string {
  return BUDGET_RANGE_OPTIONS.find((o) => o.value === range)?.label ?? range;
}

export function getFunnelStepLabel(step: FunnelStep): string {
  return FUNNEL_STEPS.find((s) => s.id === step)?.label ?? step;
}
