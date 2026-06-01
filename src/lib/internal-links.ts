/**
 * Central internal linking map — SEO hub + conversion paths.
 */
export const conversionPaths = {
  scheduling: "/contact#scheduling",
  contact: "/contact",
  intake: "/intake",
  crm: "/crm",
  salesFunnel: "/crm/funnel",
  leadMagnet: "/#lead-magnet",
  homeCta: "/#cta",
  pricing: "/pricing",
  pricingAnchor: "/#pricing",
  services: "/services",
  portfolio: "/portfolio",
  blog: "/blog",
  caseStudiesHome: "/#case-studies",
  aiDemo: "/#ai-demo",
} as const;

export type InternalLinkItem = {
  href: string;
  label: string;
  description: string;
};

export const coreHubLinks: InternalLinkItem[] = [
  {
    href: conversionPaths.services,
    label: "Services",
    description: "LinkedIn ghostwriting, AI systems, and authority infrastructure.",
  },
  {
    href: conversionPaths.pricing,
    label: "Pricing",
    description: "Transparent tiers for founders and executives.",
  },
  {
    href: conversionPaths.portfolio,
    label: "Portfolio & case studies",
    description: "Measured outcomes from leaders who compounded visibility.",
  },
  {
    href: conversionPaths.blog,
    label: "Insights & blog",
    description: "Playbooks on LinkedIn growth, AI branding, and content marketing.",
  },
  {
    href: conversionPaths.contact,
    label: "Contact",
    description: "Book a strategy call or start a scoped conversation.",
  },
  {
    href: "/about",
    label: "About",
    description: "The studio behind executive personal branding systems.",
  },
];

const pageContextLinks: Record<string, InternalLinkItem[]> = {
  "/services": [
    {
      href: conversionPaths.pricing,
      label: "View pricing",
      description: "Match your stage to the right investment tier.",
    },
    {
      href: conversionPaths.portfolio,
      label: "See results",
      description: "Case studies and portfolio proof.",
    },
    {
      href: conversionPaths.blog,
      label: "Read insights",
      description: "Authority playbooks from the content hub.",
    },
  ],
  "/pricing": [
    {
      href: conversionPaths.services,
      label: "Explore services",
      description: "What each tier delivers in practice.",
    },
    {
      href: conversionPaths.portfolio,
      label: "Proof & portfolio",
      description: "Before-and-after transformations.",
    },
    {
      href: conversionPaths.scheduling,
      label: "Book a strategy call",
      description: "30 minutes — fit, scope, and availability.",
    },
  ],
  "/portfolio": [
    {
      href: conversionPaths.services,
      label: "Service stack",
      description: "Five capabilities under one operating system.",
    },
    {
      href: conversionPaths.pricing,
      label: "Investment tiers",
      description: "Plans built to compound authority.",
    },
    {
      href: conversionPaths.blog,
      label: "Latest insights",
      description: "SEO hub for executive branding topics.",
    },
  ],
  "/blog": [
    {
      href: conversionPaths.services,
      label: "Services",
      description: "Turn insights into an installed authority system.",
    },
    {
      href: conversionPaths.pricing,
      label: "Pricing",
      description: "Pick the tier that matches your growth stage.",
    },
    {
      href: conversionPaths.leadMagnet,
      label: "Free resources",
      description: "Executive playbooks — one email to unlock.",
    },
  ],
  "/about": [
    {
      href: conversionPaths.services,
      label: "Services",
      description: "How we install personal branding OS for leaders.",
    },
    {
      href: conversionPaths.portfolio,
      label: "Portfolio",
      description: "Leaders who turned visibility into pipeline.",
    },
    {
      href: conversionPaths.blog,
      label: "Insights",
      description: "Weekly authority briefings and playbooks.",
    },
  ],
  "/contact": [
    {
      href: conversionPaths.services,
      label: "Services overview",
      description: "Scope what you need before the call.",
    },
    {
      href: conversionPaths.pricing,
      label: "Pricing",
      description: "Understand investment before booking.",
    },
    {
      href: conversionPaths.leadMagnet,
      label: "Free resources",
      description: "Not ready to book? Start with playbooks.",
    },
  ],
};

function normalizePath(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.replace(/\/$/, "") || "/";
}

/** Contextual spiderweb links for a route (excludes current path). */
export function getContextualInternalLinks(pathname: string): InternalLinkItem[] {
  const normalized = normalizePath(pathname);

  if (normalized.startsWith("/blog/") && normalized !== "/blog") {
    return [
      {
        href: conversionPaths.blog,
        label: "All insights",
        description: "Browse the full content hub.",
      },
      {
        href: conversionPaths.services,
        label: "Services",
        description: "Install what you read about.",
      },
      {
        href: conversionPaths.pricing,
        label: "Pricing",
        description: "Choose your investment tier.",
      },
      {
        href: conversionPaths.scheduling,
        label: "Book a strategy call",
        description: "Talk through fit and scope.",
      },
    ];
  }

  const contextual = pageContextLinks[normalized];
  if (contextual) {
    return contextual;
  }

  return coreHubLinks
    .filter((link) => normalizePath(link.href.split("#")[0] ?? link.href) !== normalized)
    .slice(0, 5);
}
