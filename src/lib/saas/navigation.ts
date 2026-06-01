import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bookmark,
  LayoutDashboard,
  Settings,
  Sparkles,
  Wand2,
} from "lucide-react";

export type SaasNavId =
  | "dashboard"
  | "ai-tools"
  | "saved"
  | "favorites"
  | "analytics"
  | "settings";

export type SaasNavItem = {
  id: SaasNavId;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

/** Phase 43 — SaaS client dashboard sidebar */
export const SAAS_NAV: readonly SaasNavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Overview, plan, and quick actions",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "ai-tools",
    label: "AI Tools",
    description: "Posts, hooks, bios, rewrites & carousels",
    href: "/dashboard/ai-tools",
    icon: Wand2,
  },
  {
    id: "saved",
    label: "Saved Outputs",
    description: "Your generation history",
    href: "/dashboard/saved",
    icon: Sparkles,
  },
  {
    id: "favorites",
    label: "Favorites",
    description: "Starred outputs you rely on",
    href: "/dashboard/favorites",
    icon: Bookmark,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Usage and performance insights",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    id: "settings",
    label: "Settings",
    description: "Account, security, and billing",
    href: "/dashboard/settings",
    icon: Settings,
  },
] as const;

export function getSaasNavItem(id: SaasNavId): SaasNavItem {
  const item = SAAS_NAV.find((entry) => entry.id === id);
  if (!item) throw new Error(`Unknown SaaS nav id: ${id}`);
  return item;
}

export function resolveActiveSaasNavId(pathname: string): SaasNavId {
  if (pathname === "/dashboard") return "dashboard";
  const match = SAAS_NAV.find(
    (item) => item.href !== "/dashboard" && pathname.startsWith(item.href),
  );
  return match?.id ?? "dashboard";
}
