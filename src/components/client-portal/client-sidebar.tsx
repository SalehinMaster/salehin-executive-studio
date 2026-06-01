"use client";

import {
  BarChart3,
  ClipboardList,
  FolderUp,
  LayoutDashboard,
  ListOrdered,
  Package,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import { CLIENT_PORTAL_NAV } from "@/lib/client-portal/navigation";
import type { ClientPortalSectionId } from "@/lib/client-portal/types";
import { cn } from "@/lib/utils";

const SECTION_ICONS: Record<ClientPortalSectionId, LucideIcon> = {
  welcome: Sparkles,
  project: LayoutDashboard,
  goals: Target,
  preferences: ClipboardList,
  resources: FolderUp,
  deliverables: Package,
  queue: ListOrdered,
  reports: BarChart3,
};

type ClientSidebarProps = {
  activeSection: ClientPortalSectionId;
  onSectionChange: (id: ClientPortalSectionId) => void;
  displayName: string;
  companyLabel?: string;
  className?: string;
  onNavigate?: () => void;
};

export function ClientSidebar({
  activeSection,
  onSectionChange,
  displayName,
  companyLabel,
  className,
  onNavigate,
}: ClientSidebarProps) {
  const handleSelect = (id: ClientPortalSectionId) => {
    onSectionChange(id);
    onNavigate?.();
  };

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-surface-elevated/80",
        className,
      )}
    >
      <div className="border-b border-border/80 px-5 py-6">
        <p className="text-eyebrow text-primary">Client portal</p>
        <p className="mt-3 font-display text-lg text-foreground">{displayName}</p>
        {companyLabel ? (
          <p className="mt-1 text-xs text-muted">{companyLabel}</p>
        ) : null}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Client dashboard">
        <ul className="space-y-1">
          {CLIENT_PORTAL_NAV.map((item) => {
            const Icon = SECTION_ICONS[item.id];
            const active = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={cn(
                    "focus-ring flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors",
                    active
                      ? "bg-primary/15 text-foreground"
                      : "text-muted hover:bg-surface/80 hover:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      active ? "text-primary" : "text-subtle",
                    )}
                    aria-hidden
                  />
                  <span>
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-subtle">
                      {item.description}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border/80 px-5 py-4">
        <p className="text-[10px] uppercase tracking-[0.14em] text-subtle">
          Salehin Executive Studio
        </p>
        <p className="mt-1 text-xs text-muted">White-glove authority partnership</p>
      </div>
    </aside>
  );
}
