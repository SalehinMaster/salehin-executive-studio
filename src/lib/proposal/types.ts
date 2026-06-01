/** Phase 34 — Proposal system types */

export type ProposalServiceId =
  | "linkedin_ghostwriting"
  | "personal_branding"
  | "ai_content_systems"
  | "carousel_design";

export type ProposalTemplateId =
  | "executive_partnership"
  | "authority_sprint"
  | "content_os_launch";

export type ProposalBillingCadence = "monthly" | "quarterly" | "project";

export interface ProposalServiceTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  deliverables: readonly string[];
  highlighted?: boolean;
}

export interface ProposalServiceBlock {
  id: ProposalServiceId;
  title: string;
  tagline: string;
  icon: "pen" | "target" | "bot" | "layout";
  tiers: readonly ProposalServiceTier[];
}

export interface ProposalTemplate {
  id: ProposalTemplateId;
  name: string;
  subtitle: string;
  description: string;
  recommendedServices: readonly ProposalServiceId[];
  defaultCadence: ProposalBillingCadence;
  accent: "primary" | "secondary";
}

export interface ProposalDraft {
  templateId: ProposalTemplateId;
  clientName: string;
  company: string;
  projectTitle: string;
  validUntil: string;
  cadence: ProposalBillingCadence;
  selectedServices: ProposalServiceId[];
  selectedTierByService: Partial<Record<ProposalServiceId, string>>;
  executiveSummary: string;
  termsNote: string;
}

export const DEFAULT_PROPOSAL_DRAFT: ProposalDraft = {
  templateId: "executive_partnership",
  clientName: "",
  company: "",
  projectTitle: "Authority Partnership Proposal",
  validUntil: "",
  cadence: "monthly",
  selectedServices: ["linkedin_ghostwriting", "personal_branding"],
  selectedTierByService: {},
  executiveSummary:
    "A white-glove authority partnership designed to compound your LinkedIn presence into qualified pipeline — with strategy, AI infrastructure, and premium creative execution.",
  termsNote:
    "30-day satisfaction guarantee · No long-term lock-in · All assets and workflows transfer to you at engagement end.",
};
