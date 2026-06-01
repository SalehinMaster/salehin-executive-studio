import { conversionPaths } from "@/lib/internal-links";

export const routes = [
  { href: "/", label: "Home" },
  { href: conversionPaths.services, label: "Services" },
  { href: conversionPaths.portfolio, label: "Portfolio" },
  { href: conversionPaths.blog, label: "Insights" },
  { href: conversionPaths.pricing, label: "Pricing" },
  { href: "/about", label: "About" },
  { href: conversionPaths.contact, label: "Contact" },
] as const;

export const strategyCallHref = conversionPaths.scheduling;
export const schedulingHref = conversionPaths.scheduling;
export const dashboardHref = "/dashboard";
export const clientPortalHref = "/client";
export const proposalHref = "/proposal";
