import { PageWithHub } from "@/components/layout/page-with-hub";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "LinkedIn ghostwriting, personal branding strategy, AI content systems, carousel design, and social media authority building.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PageWithHub
      pathname="/services"
      ctaLocation="services"
      title="Services"
      description="Five integrated capabilities — LinkedIn Ghostwriting, Personal Branding Strategy, AI Content Systems, Carousel Design, and Social Media Authority Building — unified under one operating system for growth and trust."
    />
  );
}
