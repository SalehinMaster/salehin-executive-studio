export const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ||
  "https://calendly.com/calendly-demo/30min";

export const hasCalendlyConfig = Boolean(
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim(),
);
