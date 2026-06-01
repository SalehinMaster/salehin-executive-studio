import type { FunnelStep } from "@/lib/crm/types";

const SESSION_KEY = "ses_funnel_session_id";

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";

  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `ses_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/** Fire-and-forget funnel step tracking (Phase 32). */
export function trackFunnelStep(step: FunnelStep): void {
  if (typeof window === "undefined") return;

  void fetch("/api/funnel/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      step,
      sessionId: getOrCreateSessionId(),
      pagePath: window.location.pathname + window.location.hash,
      referrer: document.referrer || undefined,
    }),
    keepalive: true,
  }).catch(() => {
    /* non-blocking */
  });
}
