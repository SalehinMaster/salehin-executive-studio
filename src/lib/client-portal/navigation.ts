import type { ClientPortalNavItem } from "@/lib/client-portal/types";

/** Phases 35–36 — Client dashboard sidebar navigation */
export const CLIENT_PORTAL_NAV: readonly ClientPortalNavItem[] = [
  {
    id: "welcome",
    label: "Welcome",
    description: "Onboarding setup & kickoff checklist",
  },
  {
    id: "project",
    label: "Project Details",
    description: "Engagement scope, timeline, and team",
  },
  {
    id: "goals",
    label: "Goals",
    description: "Authority outcomes and milestones",
  },
  {
    id: "preferences",
    label: "Content Preferences",
    description: "Voice, topics, and publishing rules",
  },
  {
    id: "resources",
    label: "Resources",
    description: "Upload brand assets and references",
  },
  {
    id: "deliverables",
    label: "Deliverables",
    description: "Latest work and approval feed",
  },
  {
    id: "queue",
    label: "Content Queue",
    description: "Upcoming posts and production status",
  },
  {
    id: "reports",
    label: "Performance",
    description: "Reach, engagement, and pipeline metrics",
  },
] as const;

export function getClientNavItem(
  id: ClientPortalNavItem["id"],
): ClientPortalNavItem {
  const item = CLIENT_PORTAL_NAV.find((n) => n.id === id);
  if (!item) throw new Error(`Unknown client portal section: ${id}`);
  return item;
}
