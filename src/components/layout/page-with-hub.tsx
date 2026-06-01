import { InternalLinkHub } from "@/components/layout/internal-link-hub";
import { PageShell } from "@/components/layout/page-shell";
import { PremiumPageCta } from "@/components/layout/premium-page-cta";
import { getContextualInternalLinks } from "@/lib/internal-links";

type PageWithHubProps = {
  title: string;
  description?: string;
  pathname: string;
  children?: React.ReactNode;
  ctaLocation: string;
  showNewsletterOnCta?: boolean;
};

export function PageWithHub({
  title,
  description,
  pathname,
  children,
  ctaLocation,
  showNewsletterOnCta = true,
}: PageWithHubProps) {
  const hubLinks = getContextualInternalLinks(pathname);

  return (
    <PageShell title={title} description={description}>
      {children}
      <div className="space-y-10 md:space-y-12">
        <InternalLinkHub links={hubLinks} />
        <PremiumPageCta
          location={ctaLocation}
          showNewsletter={showNewsletterOnCta}
        />
      </div>
    </PageShell>
  );
}
