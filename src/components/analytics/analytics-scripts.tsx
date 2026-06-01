import Script from "next/script";
import {
  clarityProjectId,
  gaMeasurementId,
  isAnalyticsEnabled,
  isClarityEnabled,
  isGaEnabled,
} from "@/lib/analytics/config";

/**
 * Third-party analytics — loaded after hydration with deferred strategies
 * to protect LCP and INP (Clarity uses lazyOnload).
 */
export function AnalyticsScripts() {
  if (!isAnalyticsEnabled()) {
    return null;
  }

  return (
    <>
      {isGaEnabled() ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', {
                send_page_view: false,
                anonymize_ip: true,
              });
            `}
          </Script>
        </>
      ) : null}

      {isClarityEnabled() ? (
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityProjectId}");
          `}
        </Script>
      ) : null}
    </>
  );
}
