import { getFormspreeEndpoint, formspreeNewsletterId } from "@/lib/formspree-config";
import { isBrevoConfigured } from "@/lib/newsletter/config";
import {
  subscribeContactToBrevo,
  triggerBrevoWelcomeEmail,
} from "@/lib/newsletter/brevo";
import type { NewsletterSource } from "@/lib/newsletter/config";

export type SubscribeNewsletterInput = {
  email: string;
  source: NewsletterSource;
};

export type SubscribeNewsletterResult =
  | { ok: true; provider: "brevo" | "formspree" }
  | { ok: false; error: string; status: number };

export async function subscribeToNewsletter({
  email,
  source,
}: SubscribeNewsletterInput): Promise<SubscribeNewsletterResult> {
  if (isBrevoConfigured) {
    const brevoResult = await subscribeContactToBrevo({ email, source });

    if (!brevoResult.ok) {
      return {
        ok: false,
        error: brevoResult.error,
        status: brevoResult.status ?? 502,
      };
    }

    await triggerBrevoWelcomeEmail(email);

    return { ok: true, provider: "brevo" };
  }

  if (formspreeNewsletterId) {
    const response = await fetch(getFormspreeEndpoint(formspreeNewsletterId), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        _subject: "Newsletter subscription",
        form_type: "newsletter",
        source,
      }),
    });

    const data = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };

    if (!response.ok) {
      return {
        ok: false,
        error: data.error ?? "Something went wrong. Please try again.",
        status: response.status,
      };
    }

    return { ok: true, provider: "formspree" };
  }

  return {
    ok: false,
    error:
      "Newsletter is not configured yet. Add BREVO_API_KEY and BREVO_NEWSLETTER_LIST_ID, or NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID.",
    status: 503,
  };
}
