"use client";

import { useCallback, useMemo } from "react";
import {
  trackConversion,
  trackCtaClick,
  trackFormSubmit,
  trackPageView,
} from "@/lib/analytics/track";
import type {
  ConversionParams,
  CtaClickParams,
  FormSubmitParams,
  PageViewParams,
} from "@/lib/analytics/types";

export function useAnalytics() {
  const trackPage = useCallback((params: PageViewParams) => {
    trackPageView(params);
  }, []);

  const trackForm = useCallback((params: FormSubmitParams) => {
    trackFormSubmit(params);
  }, []);

  const trackCta = useCallback((params: CtaClickParams) => {
    trackCtaClick(params);
  }, []);

  const trackConvert = useCallback((params: ConversionParams) => {
    trackConversion(params);
  }, []);

  return useMemo(
    () => ({
      trackPageView: trackPage,
      trackFormSubmit: trackForm,
      trackCtaClick: trackCta,
      trackConversion: trackConvert,
    }),
    [trackPage, trackForm, trackCta, trackConvert],
  );
}
