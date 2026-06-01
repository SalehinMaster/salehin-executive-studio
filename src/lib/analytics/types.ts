export type AnalyticsEventName =
  | "page_view"
  | "conversion"
  | "form_submit"
  | "cta_click";

export type FormSubmitParams = {
  formType: "lead-magnet" | "newsletter" | string;
  source?: string;
  resource?: string;
};

export type ConversionParams = {
  conversionName: string;
  value?: number;
  currency?: string;
  formType?: string;
  source?: string;
  tierId?: string;
};

export type CtaClickParams = {
  ctaLabel: string;
  ctaLocation?: string;
  destination?: string;
  ctaType?: "calendly" | "navigation" | "external";
};

export type PageViewParams = {
  pagePath: string;
  pageTitle?: string;
};
