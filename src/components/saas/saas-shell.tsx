"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { DashboardSignOutButton } from "@/components/dashboard/sign-out-button";
import { SaasSidebar } from "@/components/saas/saas-sidebar";
import { resolveActiveSaasNavId } from "@/lib/saas/navigation";
import { cn } from "@/lib/utils";

type SaasShellProps = {
  displayName: string;
  planLabel: string;
  children: ReactNode;
};

export function SaasShell({ displayName, planLabel, children }: SaasShellProps) {
  const pathname = usePathname();
  const activeId = resolveActiveSaasNavId(pathname);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="saas-shell flex min-h-[100dvh] flex-col">
      <div className="flex items-center justify-between gap-4 border-b border-border/80 bg-surface-elevated/50 px-4 py-3 backdrop-blur-md lg:hidden">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground"
          aria-expanded={mobileNavOpen}
          aria-controls="saas-mobile-nav"
        >
          <Menu className="size-4" aria-hidden />
          Menu
        </button>
        <Link href="/" className="text-xs text-muted hover:text-primary">
          Marketing site
        </Link>
      </div>

      <div className="flex min-h-0 flex-1">
        <SaasSidebar
          activeId={activeId}
          displayName={displayName}
          planLabel={planLabel}
          className="hidden lg:flex"
        />

        {mobileNavOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
            <button
              type="button"
              className="absolute inset-0 bg-background/85 backdrop-blur-sm"
              aria-label="Close navigation"
              onClick={() => setMobileNavOpen(false)}
            />
            <div
              id="saas-mobile-nav"
              className="absolute inset-y-0 left-0 w-[min(100%,18rem)] shadow-2xl"
            >
              <SaasSidebar
                activeId={activeId}
                displayName={displayName}
                planLabel={planLabel}
                className="h-full"
                onNavigate={() => setMobileNavOpen(false)}
              />
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="focus-ring absolute top-3 right-3 flex size-9 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="hidden items-center justify-between gap-4 border-b border-border/80 px-6 py-4 lg:flex">
            <div />
            <div className="flex items-center gap-3">
              <DashboardSignOutButton />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>

          <footer className="border-t border-border/80 px-4 py-3 lg:hidden">
            <DashboardSignOutButton />
          </footer>
        </div>
      </div>
    </div>
  );
}
