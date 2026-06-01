import type {
  ProposalServiceBlock,
  ProposalTemplate,
} from "@/lib/proposal/types";

/** Phase 34 — Pre-built proposal templates */
export const PROPOSAL_TEMPLATES: readonly ProposalTemplate[] = [
  {
    id: "executive_partnership",
    name: "Executive Partnership",
    subtitle: "Full-stack authority OS",
    description:
      "White-glove engagement for C-suite leaders — strategy, ghostwriting, AI systems, and carousel creative under one partnership.",
    recommendedServices: [
      "linkedin_ghostwriting",
      "personal_branding",
      "ai_content_systems",
      "carousel_design",
    ],
    defaultCadence: "monthly",
    accent: "primary",
  },
  {
    id: "authority_sprint",
    name: "Authority Sprint",
    subtitle: "90-day positioning launch",
    description:
      "Focused repositioning and publishing cadence to establish category leadership fast — ideal before fundraise, launch, or keynote season.",
    recommendedServices: ["personal_branding", "linkedin_ghostwriting", "carousel_design"],
    defaultCadence: "project",
    accent: "secondary",
  },
  {
    id: "content_os_launch",
    name: "Content OS Launch",
    subtitle: "AI infrastructure + scale",
    description:
      "Install voice-calibrated AI pipelines and publishing operations so your team ships executive-grade content without calendar drag.",
    recommendedServices: ["ai_content_systems", "linkedin_ghostwriting"],
    defaultCadence: "monthly",
    accent: "primary",
  },
] as const;

/** Phase 34 — Premium pricing blocks per core service */
export const PROPOSAL_SERVICE_BLOCKS: readonly ProposalServiceBlock[] = [
  {
    id: "linkedin_ghostwriting",
    title: "LinkedIn Ghostwriting",
    tagline: "Turn feed presence into qualified pipeline",
    icon: "pen",
    tiers: [
      {
        id: "ghost_starter",
        name: "Cadence",
        price: "$2,500",
        period: "/mo",
        description: "Consistent authority publishing in your voice.",
        deliverables: [
          "8 LinkedIn posts / month",
          "Voice calibration & approval workflow",
          "Hook + narrative architecture",
          "Monthly performance snapshot",
        ],
      },
      {
        id: "ghost_pro",
        name: "Pipeline",
        price: "$4,200",
        period: "/mo",
        description: "Higher volume with engagement-aware scripting.",
        deliverables: [
          "16 posts + comment strategy",
          "DM-ready CTA frameworks",
          "Bi-weekly strategy sync",
          "Competitive narrative monitoring",
        ],
        highlighted: true,
      },
      {
        id: "ghost_exec",
        name: "Executive",
        price: "Custom",
        period: "",
        description: "Unlimited ghostwriting with dedicated strategist.",
        deliverables: [
          "Unlimited posts & formats",
          "Same-day revision SLA",
          "Executive thought-leadership series",
          "Speaking & PR narrative support",
        ],
      },
    ],
  },
  {
    id: "personal_branding",
    title: "Personal Branding",
    tagline: "Own your category before buyers compare options",
    icon: "target",
    tiers: [
      {
        id: "brand_foundation",
        name: "Foundation",
        price: "$3,800",
        period: "project",
        description: "Positioning, narrative, and profile transformation.",
        deliverables: [
          "Category positioning workshop",
          "Authority narrative & proof stack",
          "LinkedIn profile + banner overhaul",
          "Content pillar map (12 months)",
        ],
      },
      {
        id: "brand_growth",
        name: "Growth",
        price: "$2,800",
        period: "/mo",
        description: "Ongoing brand stewardship and market signals.",
        deliverables: [
          "Quarterly positioning refresh",
          "Audience & competitor intelligence",
          "Messaging for launches & PR",
          "Brand asset library maintenance",
        ],
        highlighted: true,
      },
      {
        id: "brand_enterprise",
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Multi-stakeholder executive brand architecture.",
        deliverables: [
          "C-suite + leadership team alignment",
          "Investor & board narrative kits",
          "Media training briefs",
          "Annual brand audit & roadmap",
        ],
      },
    ],
  },
  {
    id: "ai_content_systems",
    title: "AI Content Systems",
    tagline: "Ship authority-grade content without calendar drag",
    icon: "bot",
    tiers: [
      {
        id: "ai_build",
        name: "Build",
        price: "$6,500",
        period: "project",
        description: "Voice-trained AI pipeline installation.",
        deliverables: [
          "Voice & tone model training",
          "Prompt library + guardrails",
          "Approval workflow documentation",
          "Team handoff & training session",
        ],
        highlighted: true,
      },
      {
        id: "ai_operate",
        name: "Operate",
        price: "$1,800",
        period: "/mo",
        description: "Managed optimization and model refinement.",
        deliverables: [
          "Monthly model tuning",
          "New format & template expansion",
          "Quality scoring dashboard",
          "Priority engineering support",
        ],
      },
      {
        id: "ai_enterprise",
        name: "Enterprise OS",
        price: "Custom",
        period: "",
        description: "Multi-brand, multi-channel content infrastructure.",
        deliverables: [
          "Cross-platform distribution layer",
          "Compliance & review workflows",
          "API integrations (Notion, Slack)",
          "Dedicated solutions architect",
        ],
      },
    ],
  },
  {
    id: "carousel_design",
    title: "Carousel Design",
    tagline: "Stop the scroll. Hold attention. Drive action.",
    icon: "layout",
    tiers: [
      {
        id: "carousel_essentials",
        name: "Essentials",
        price: "$1,200",
        period: "/mo",
        description: "Premium slide narratives on a reliable cadence.",
        deliverables: [
          "4 carousels / month",
          "Brand-aligned visual system",
          "Copy + slide structure included",
          "Source file delivery",
        ],
      },
      {
        id: "carousel_scale",
        name: "Scale",
        price: "$2,400",
        period: "/mo",
        description: "High-volume carousel engine for campaigns.",
        deliverables: [
          "8 carousels + launch variants",
          "A/B cover concepts",
          "Repurposing from long-form content",
          "48-hour turnaround SLA",
        ],
        highlighted: true,
      },
      {
        id: "carousel_studio",
        name: "Design Studio",
        price: "Custom",
        period: "",
        description: "Dedicated design pod for multi-executive teams.",
        deliverables: [
          "Unlimited carousel requests",
          "Motion & static format variants",
          "Brand system documentation",
          "Same-week campaign sprints",
        ],
      },
    ],
  },
] as const;

export function getProposalTemplate(id: ProposalTemplate["id"]): ProposalTemplate {
  const found = PROPOSAL_TEMPLATES.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown proposal template: ${id}`);
  return found;
}

export function getProposalServiceBlock(
  id: ProposalServiceBlock["id"],
): ProposalServiceBlock {
  const found = PROPOSAL_SERVICE_BLOCKS.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown proposal service: ${id}`);
  return found;
}
