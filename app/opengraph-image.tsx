import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — premium personal branding for executives`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background:
            "linear-gradient(145deg, #050816 0%, #0f0a24 45%, #0a1628 100%)",
          color: "#f4f4f5",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#a78bfa",
          }}
        >
          {siteConfig.shortName}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 500,
            lineHeight: 1.1,
            maxWidth: 900,
            background:
              "linear-gradient(90deg, #f4f4f5 0%, #c4b5fd 50%, #67e8f9 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {siteConfig.tagline}
        </div>
        <p
          style={{
            marginTop: 28,
            fontSize: 26,
            lineHeight: 1.45,
            color: "#a1a1aa",
            maxWidth: 820,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {siteConfig.description}
        </p>
      </div>
    ),
    { ...size },
  );
}
