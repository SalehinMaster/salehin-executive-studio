"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SAAS_NAV } from "@/lib/saas/navigation";
import type { SaasNavId } from "@/lib/saas/navigation";
import { cn } from "@/lib/utils";

type SaasSidebarProps = {
  activeId: SaasNavId;
  displayName: string;
  planLabel: string;
  className?: string;
  onNavigate?: () => void;
};

export function SaasSidebar({
  activeId,
  displayName,
  planLabel,
  className,
  onNavigate,
}: SaasSidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-border/80 bg-surface-elevated/90 backdrop-blur-xl lg:w-72",
        className,
      )}
    >
      <div className="border-b border-border/80 px-5 py-5">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/15">
            <Sparkles className="size-4 text-primary" aria-hidden />
          </span>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-primary">
              Brand OS
            </p>
            <p className="font-display text-base text-foreground">Studio</p>
          </div>
        </div>
        <p className="mt-4 truncate text-sm font-medium text-foreground">{displayName}</p>
        <p className="mt-0.5 text-xs capitalize text-muted">{planLabel} plan</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="SaaS dashboard">
        <ul className="space-y-0.5">
          {SAAS_NAV.map((item) => {
            const Icon = item.icon;
            const active = activeId === item.id;
            const onboardingAttr =
              item.id === "ai-tools"
                ? "nav-ai-tools"
                : item.id === "saved"
                  ? "nav-saved"
                  : item.id === "analytics"
                    ? "nav-analytics"
                    : undefined;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  {...(onboardingAttr ? { "data-onboarding": onboardingAttr } : {})}
                  className={cn(
                    "focus-ring group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-all",
                    active
                      ? "bg-primary/15 text-foreground shadow-[inset_0_0_0_1px_rgba(124,58,237,0.25)]"
                      : "text-muted hover:bg-surface/80 hover:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon
                    className={cn(
                      "mt-0.5 size-4 shrink-0 transition-colors",
                      active ? "text-primary" : "text-subtle group-hover:text-foreground",
                    )}
                    aria-hidden
                  />
                  <span>
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-subtle">
                      {item.description}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border/80 px-5 py-4">
        <p className="text-[10px] uppercase tracking-[0.14em] text-subtle">
          Salehin Executive Studio
        </p>
        <p className="mt-1 text-xs text-muted">AI personal branding operating system</p>
      </div>
    </aside>
  );
}
