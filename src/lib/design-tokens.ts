/**
 * JS mirror of CSS tokens — for animations, charts, or runtime theming.
 * Keep in sync with src/styles/tokens.css
 */
export const colors = {
  background: "#050816",
  foreground: "#F8FAFC",
  muted: "#94A3B8",
  subtle: "#64748B",
  primary: "#7C3AED",
  primaryHover: "#8B5CF6",
  secondary: "#06B6D4",
  secondaryHover: "#22D3EE",
  surface: "#0F1529",
  surfaceElevated: "#0A0F24",
  border: "rgba(248, 250, 252, 0.08)",
} as const;

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  section: 96,
  sectionLg: 144,
} as const;

export const radii = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  "2xl": 24,
} as const;

export const fonts = {
  sans: "var(--font-inter)",
  display: "var(--font-cormorant)",
} as const;
