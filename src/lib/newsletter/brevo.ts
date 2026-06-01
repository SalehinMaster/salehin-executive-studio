import {
  brevoApiKey,
  brevoNewsletterListId,
  brevoWelcomeTemplateId,
  type NewsletterSource,
} from "@/lib/newsletter/config";

const BREVO_API_BASE = "https://api.brevo.com/v3";

type BrevoContactPayload = {
  email: string;
  attributes?: Record<string, string | number | boolean>;
  listIds: number[];
  updateEnabled: boolean;
};

type BrevoErrorBody = {
  message?: string;
  code?: string;
};

export type BrevoSubscribeResult =
  | { ok: true; contactId?: number }
  | { ok: false; error: string; status?: number };

export async function subscribeContactToBrevo({
  email,
  source,
}: {
  email: string;
  source: NewsletterSource;
}): Promise<BrevoSubscribeResult> {
  const payload: BrevoContactPayload = {
    email,
    listIds: [brevoNewsletterListId],
    updateEnabled: true,
    attributes: {
      SOURCE: source,
      SUBSCRIBED_AT: new Date().toISOString(),
      LEAD_TYPE: "newsletter",
      ...(Number.isFinite(brevoWelcomeTemplateId)
        ? { WELCOME_PENDING: true }
        : {}),
    },
  };

  const response = await fetch(`${BREVO_API_BASE}/contacts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": brevoApiKey,
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = (await response.json().catch(() => ({}))) as {
      id?: number;
    };
    return { ok: true, contactId: data.id };
  }

  const errorBody = (await response.json().catch(() => ({}))) as BrevoErrorBody;
  const message = errorBody.message ?? "Unable to subscribe at this time.";

  if (
    response.status === 400 &&
    /already exist|duplicate/i.test(message)
  ) {
    return { ok: true };
  }

  return { ok: false, error: message, status: response.status };
}

/**
 * Future: trigger Brevo transactional welcome email or automation workflow.
 * Wire BREVO_WELCOME_TEMPLATE_ID and call from the subscribe route when ready.
 */
export async function triggerBrevoWelcomeEmail(_email: string): Promise<void> {
  if (!Number.isFinite(brevoWelcomeTemplateId)) return;
  // Placeholder for Phase 30 automation — implement when template ID is set.
}
