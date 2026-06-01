export type LeadPipelineStage =
  | "new_lead"
  | "qualified_lead"
  | "discovery_call"
  | "proposal_sent"
  | "client_won"
  | "client_lost";

export type FunnelStep =
  | "homepage"
  | "lead_magnet"
  | "calendly_booking"
  | "discovery_call"
  | "proposal"
  | "client";

export type LeadSource =
  | "lead_magnet"
  | "newsletter"
  | "calendly"
  | "intake_form"
  | "manual"
  | "other";

export type BudgetRange =
  | "under_2500"
  | "2500_5000"
  | "5000_10000"
  | "over_10000"
  | "not_sure"
  | "custom";

export type CrmLead = {
  id: string;
  full_name: string;
  email: string | null;
  company: string | null;
  linkedin_url: string | null;
  website: string | null;
  phone: string | null;
  stage: LeadPipelineStage;
  source: LeadSource;
  business_goals: string | null;
  current_challenges: string | null;
  budget_range: BudgetRange | null;
  notes: string | null;
  metadata: Record<string, unknown>;
  last_contacted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type FunnelMetrics = {
  step: FunnelStep;
  count: number;
  uniqueSessions: number;
};

export type ClientIntakePayload = {
  fullName: string;
  company: string;
  linkedinUrl?: string;
  website?: string;
  businessGoals: string;
  currentChallenges: string;
  budgetRange: BudgetRange;
};

export type IntakeFormState = {
  fullName: string;
  company: string;
  linkedinUrl: string;
  website: string;
  businessGoals: string;
  currentChallenges: string;
  budgetRange: BudgetRange | "";
};
