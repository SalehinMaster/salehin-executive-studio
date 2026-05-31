"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { AuthModal } from "@/components/auth/auth-modal";
import { AuthProvider } from "@/components/auth/auth-provider";

type SiteChromeProps = {
  children: React.ReactNode;
};

function SiteChromeInner({ children }: SiteChromeProps) {
  const pathname = usePathname();

  return (
    <>
      <Header key={pathname} pathname={pathname} />
      {children}
      <AuthModal />
    </>
  );
}

export function SiteChrome({ children }: SiteChromeProps) {
  return (
    <Suspense fallback={null}>
      <AuthProvider>
        <SiteChromeInner>{children}</SiteChromeInner>
      </AuthProvider>
    </Suspense>
  );
}
