import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { SiteChrome } from "@/components/layout/site-chrome";
import { createRootMetadata } from "@/lib/seo/metadata";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = createRootMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050816",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <AnalyticsScripts />
        <JsonLdScript />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
