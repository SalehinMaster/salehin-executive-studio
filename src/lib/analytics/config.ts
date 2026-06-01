/**
 * Analytics IDs — set in production via environment variables.
 * Scripts load only when at least one ID is configured.
 */
export const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

export const clarityProjectId =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim() || "";

export function isGaEnabled(): boolean {
  return gaMeasurementId.length > 0;
}

export function isClarityEnabled(): boolean {
  return clarityProjectId.length > 0;
}

export function isAnalyticsEnabled(): boolean {
  return isGaEnabled() || isClarityEnabled();
}
