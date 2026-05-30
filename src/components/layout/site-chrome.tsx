"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";

type SiteChromeProps = {
  children: React.ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();

  return (
    <>
      <Header key={pathname} pathname={pathname} />
      {children}
    </>
  );
}
