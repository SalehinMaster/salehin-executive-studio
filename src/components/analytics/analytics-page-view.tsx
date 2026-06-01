"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/analytics/track";

/**
 * Sends page_view on App Router navigations (GA4 send_page_view is disabled).
 */
export function AnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    if (lastTracked.current === pagePath) {
      return;
    }

    lastTracked.current = pagePath;
    trackPageView({ pagePath });
  }, [pathname, searchParams]);

  return null;
}
