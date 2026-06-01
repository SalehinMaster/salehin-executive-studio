import { PageWithHub } from "@/components/layout/page-with-hub";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Premium AI-powered personal branding for founders, CEOs, creators, coaches, and consultants.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageWithHub
      pathname="/about"
      ctaLocation="about"
      title="About"
      description="Salehin Executive Studio is the AI-Powered Personal Branding Operating System for leaders who need authority, visibility, and revenue — engineered with the precision of a product company, not a content agency."
    />
  );
}
