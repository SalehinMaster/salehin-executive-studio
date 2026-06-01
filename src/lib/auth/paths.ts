export const AUTH_ROUTES = {
  login: "/login",
  signup: "/signup",
  verifyEmail: "/verify-email",
  callback: "/auth/callback",
} as const;

export const PROTECTED_ROUTE_PREFIXES = ["/dashboard"] as const;

export const MINIMAL_CHROME_PREFIXES = [
  "/login",
  "/signup",
  "/verify-email",
  "/dashboard",
] as const;

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isAuthPage(pathname: string): boolean {
  return (
    pathname === AUTH_ROUTES.login ||
    pathname === AUTH_ROUTES.signup ||
    pathname === AUTH_ROUTES.verifyEmail
  );
}

export function usesMinimalChrome(pathname: string): boolean {
  return MINIMAL_CHROME_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function sanitizeRedirectPath(next: string | null | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/dashboard";
  }
  return next;
}
