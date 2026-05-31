export const formspreeLeadMagnetId =
  process.env.NEXT_PUBLIC_FORMSPREE_LEAD_MAGNET_ID?.trim() || "";

export const formspreeNewsletterId =
  process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID?.trim() || "";

export function getFormspreeEndpoint(formId: string) {
  return `https://formspree.io/f/${formId}`;
}

export const hasFormspreeLeadMagnetConfig = Boolean(formspreeLeadMagnetId);
export const hasFormspreeNewsletterConfig = Boolean(formspreeNewsletterId);
