import { isClarityEnabled, isGaEnabled } from "@/lib/analytics/config";
import type {
  ConversionParams,
  CtaClickParams,
  FormSubmitParams,
  PageViewParams,
} from "@/lib/analytics/types";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
    clarity?: (method: string, ...args: unknown[]) => void;
  }
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

function gtag(...args: unknown[]): void {
  if (!isClient() || !isGaEnabled() || typeof window.gtag !== "function") {
    return;
  }
  window.gtag(...args);
}

function clarityEvent(eventName: string): void {
  if (!isClient() || !isClarityEnabled() || typeof window.clarity !== "function") {
    return;
  }
  window.clarity("event", eventName);
}

/** Manual SPA page views — GA config uses send_page_view: false. */
export function trackPageView({ pagePath, pageTitle }: PageViewParams): void {
  if (!isClient()) return;

  const path = pagePath.startsWith("/") ? pagePath : `/${pagePath}`;

  if (isGaEnabled()) {
    gtag("event", "page_view", {
      page_path: path,
      page_title: pageTitle ?? document.title,
      page_location: window.location.href,
    });
  }

  clarityEvent(`page_view:${path}`);
}

export function trackConversion({
  conversionName,
  value,
  currency = "USD",
  ...rest
}: ConversionParams): void {
  if (!isClient()) return;

  if (isGaEnabled()) {
    gtag("event", "conversion", {
      send_to: conversionName,
      event_category: "conversion",
      event_label: conversionName,
      value,
      currency,
      ...rest,
    });
    gtag("event", conversionName, {
      event_category: "conversion",
      ...rest,
    });
  }

  clarityEvent(`conversion:${conversionName}`);
}

export function trackFormSubmit(params: FormSubmitParams): void {
  if (!isClient()) return;

  const { formType, source, resource } = params;

  if (isGaEnabled()) {
    gtag("event", "form_submit", {
      event_category: "engagement",
      form_type: formType,
      form_source: source,
      resource,
    });
  }

  clarityEvent(`form_submit:${formType}`);

  trackConversion({
    conversionName: "form_submit",
    formType,
    source,
  });
}

export function trackCtaClick({
  ctaLabel,
  ctaLocation,
  destination,
  ctaType = "navigation",
}: CtaClickParams): void {
  if (!isClient()) return;

  if (isGaEnabled()) {
    gtag("event", "cta_click", {
      event_category: "engagement",
      cta_label: ctaLabel,
      cta_location: ctaLocation,
      link_url: destination,
      cta_type: ctaType,
    });
  }

  clarityEvent(`cta_click:${ctaLabel.replace(/\s+/g, "_").toLowerCase()}`);
}
