const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export type EmailValidationResult =
  | { valid: true; normalized: string }
  | { valid: false; error: string };

export function validateEmail(raw: string): EmailValidationResult {
  const normalized = raw.trim().toLowerCase();

  if (!normalized) {
    return { valid: false, error: "Email is required." };
  }

  if (normalized.length > 254) {
    return { valid: false, error: "Email address is too long." };
  }

  if (!EMAIL_PATTERN.test(normalized)) {
    return { valid: false, error: "Enter a valid email address." };
  }

  const [, domain] = normalized.split("@");
  if (!domain?.includes(".")) {
    return { valid: false, error: "Enter a valid email address." };
  }

  return { valid: true, normalized };
}
