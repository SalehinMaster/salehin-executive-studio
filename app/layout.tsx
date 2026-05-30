import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { SiteChrome } from "@/components/layout/site-chrome";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Salehin Executive Studio — AI-Powered Personal Branding OS",
  description:
    "Premium personal branding infrastructure for founders, CEOs, and leaders — LinkedIn ghostwriting, strategy, AI content systems, and authority building.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
