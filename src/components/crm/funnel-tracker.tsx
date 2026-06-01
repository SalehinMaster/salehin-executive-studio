"use client";

import { useEffect } from "react";
import { trackFunnelStep } from "@/lib/crm/track-funnel";
import type { FunnelStep } from "@/lib/crm/types";

type FunnelTrackerProps = {
  step: FunnelStep;
};

/** Records a funnel step once when mounted. */
export function FunnelTracker({ step }: FunnelTrackerProps) {
  useEffect(() => {
    trackFunnelStep(step);
  }, [step]);

  return null;
}
