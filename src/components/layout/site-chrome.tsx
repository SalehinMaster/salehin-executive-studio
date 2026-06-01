"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { AnalyticsPageView } from "@/components/analytics/analytics-page-view";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthModal } from "@/components/auth/auth-modal";
import { AuthProvider } from "@/components/auth/auth-provider";
import { CalendlyModal } from "@/components/scheduling/calendly-modal";
import { CalendlyProvider } from "@/components/scheduling/calendly-provider";
import { ToastProvider } from "@/components/ui/toast-provider";

type SiteChromeProps = {
  children: React.ReactNode;
};

function SiteChromeInner({ children }: SiteChromeProps) {
  const pathname = usePathname();

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsPageView />
      </Suspense>
      <Header key={pathname} pathname={pathname} />
      {children}
      <Footer />
      <AuthModal />
      <CalendlyModal />
    </>
  );
}

export function SiteChrome({ children }: SiteChromeProps) {
  return (
    <Suspense fallback={null}>
      <AuthProvider>
        <CalendlyProvider>
          <ToastProvider>
            <SiteChromeInner>{children}</SiteChromeInner>
          </ToastProvider>
        </CalendlyProvider>
      </AuthProvider>
    </Suspense>
  );
}
