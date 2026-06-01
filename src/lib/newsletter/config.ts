/**
 * Brevo (Sendinblue) integration — server-only secrets.
 * Welcome automation: set BREVO_WELCOME_TEMPLATE_ID when ready to trigger workflows.
 */
export const brevoApiKey = process.env.BREVO_API_KEY?.trim() ?? "";

export const brevoNewsletterListId = Number.parseInt(
  process.env.BREVO_NEWSLETTER_LIST_ID ?? "",
  10,
);

export const brevoWelcomeTemplateId = Number.parseInt(
  process.env.BREVO_WELCOME_TEMPLATE_ID ?? "",
  10,
);

export const isBrevoConfigured =
  Boolean(brevoApiKey) && Number.isFinite(brevoNewsletterListId);

export const newsletterSources = [
  "footer",
  "home-cta",
  "home-newsletter",
  "portfolio",
  "inline",
] as const;

export type NewsletterSource = (typeof newsletterSources)[number];

export function isNewsletterSource(value: string): value is NewsletterSource {
  return (newsletterSources as readonly string[]).includes(value);
}
