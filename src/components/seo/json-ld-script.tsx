import { buildRootJsonLdGraph } from "@/lib/seo/json-ld";

export function JsonLdScript() {
  const jsonLd = buildRootJsonLdGraph();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
