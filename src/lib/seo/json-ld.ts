import { faqs, services } from "@/lib/home-content";
import { siteConfig, type SiteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo/metadata";

type JsonLd = Record<string, unknown>;

function organizationSchema(config: SiteConfig): JsonLd {
  return {
    "@type": "Organization",
    "@id": `${config.url}/#organization`,
    name: config.legalName,
    alternateName: config.shortName,
    url: config.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/opengraph-image"),
    },
    description: config.description,
    email: config.contactEmail,
    founder: {
      "@type": "Person",
      name: config.founder,
    },
    sameAs: [...config.sameAs],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: config.contactEmail,
      availableLanguage: ["English"],
    },
  };
}

function websiteSchema(config: SiteConfig): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${config.url}/#website`,
    url: config.url,
    name: config.name,
    description: config.description,
    inLanguage: config.language,
    publisher: { "@id": `${config.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${config.url}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

function serviceSchemas(config: SiteConfig): JsonLd[] {
  const provider = { "@id": `${config.url}/#organization` };

  return services.map((service) => ({
    "@type": "Service",
    "@id": `${config.url}/#service-${service.title.toLowerCase().replace(/\s+/g, "-")}`,
    name: service.title,
    description: service.outcomeHeadline,
    provider,
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    serviceType: "Personal Branding",
    audience: {
      "@type": "Audience",
      audienceType: "Founders, CEOs, and executive leaders",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/pricing"),
    },
  }));
}

function faqPageSchema(): JsonLd {
  return {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildRootJsonLdGraph(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(siteConfig),
      websiteSchema(siteConfig),
      ...serviceSchemas(siteConfig),
      faqPageSchema(),
    ],
  };
}
