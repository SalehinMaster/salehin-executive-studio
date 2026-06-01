"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { ClientSectionPanel } from "@/components/client-portal/client-section-panels";
import { ClientSidebar } from "@/components/client-portal/client-sidebar";
import { DashboardSignOutButton } from "@/components/dashboard/sign-out-button";
import { createDefaultClientPortalState } from "@/lib/client-portal/default-state";
import type {
  ClientPortalSectionId,
  ClientPortalState,
  OnboardingStep,
} from "@/lib/client-portal/types";
import { cn } from "@/lib/utils";

type ClientPortalDashboardProps = {
  displayName: string;
  email: string;
  companyLabel?: string;
};

export function ClientPortalDashboard({
  displayName,
  email,
  companyLabel,
}: ClientPortalDashboardProps) {
  const [activeSection, setActiveSection] = useState<ClientPortalSectionId>("welcome");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [state, setState] = useState<ClientPortalState>(() =>
    createDefaultClientPortalState(displayName),
  );

  const onToggleOnboarding = useCallback((stepId: OnboardingStep["id"]) => {
    setState((prev) => ({
      ...prev,
      onboardingSteps: prev.onboardingSteps.map((step) =>
        step.id === stepId ? { ...step, completed: !step.completed } : step,
      ),
    }));
  }, []);

  return (
    <div className="client-portal -mx-container-x flex min-h-[calc(100dvh-var(--header-height)-1px)] flex-col md:-mx-container-x-md">
      <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-elevated/60 px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground"
          aria-expanded={mobileNavOpen}
          aria-controls="client-mobile-nav"
        >
          <Menu className="size-4" aria-hidden />
          Menu
        </button>
        <Link href="/dashboard" className="text-xs text-muted hover:text-primary">
          Studio dashboard
        </Link>
      </div>

      <div className="flex min-h-0 flex-1">
        <ClientSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          displayName={displayName}
          companyLabel={companyLabel}
          className="hidden w-72 shrink-0 md:flex"
        />

        {mobileNavOpen ? (
          <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
            <button
              type="button"
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              aria-label="Close navigation"
              onClick={() => setMobileNavOpen(false)}
            />
            <div
              id="client-mobile-nav"
              className="absolute inset-y-0 left-0 w-[min(100%,20rem)] shadow-2xl"
            >
              <ClientSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                displayName={displayName}
                companyLabel={companyLabel}
                className="h-full"
                onNavigate={() => setMobileNavOpen(false)}
              />
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="focus-ring absolute right-3 top-3 rounded-lg border border-border p-2"
                aria-label="Close menu"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="hidden items-center justify-between gap-4 border-b border-border/80 px-6 py-4 md:flex lg:px-10">
            <p className="text-xs text-muted">{email}</p>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="focus-ring text-xs text-muted transition-colors hover:text-primary"
              >
                Content studio
              </Link>
              <DashboardSignOutButton />
            </div>
          </div>

          <main className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-10 lg:py-10">
            <ClientSectionPanel
              sectionId={activeSection}
              state={state}
              onToggleOnboarding={onToggleOnboarding}
            />
          </main>

          <div className="border-t border-border/80 px-4 py-4 md:hidden">
            <DashboardSignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
