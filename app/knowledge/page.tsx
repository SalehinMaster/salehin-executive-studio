import { KnowledgeBase } from "@/components/knowledge/knowledge-base";
import { PageShell } from "@/components/layout/page-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { getKnowledgeArticles } from "@/lib/knowledge/articles";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Knowledge Base",
  description:
    "Executive playbooks for LinkedIn growth, personal branding, AI content, and content strategy.",
  path: "/knowledge",
  noIndex: true,
});

export default function KnowledgeBasePage() {
  const articles = getKnowledgeArticles();

  return (
    <PageShell
      title="Knowledge base"
      description="Searchable playbooks and SOPs — categorized for scale as your studio grows."
    >
      <div className="mb-8 flex flex-wrap gap-3">
        <ButtonLink href="/support" variant="secondary">
          Support center
        </ButtonLink>
        <ButtonLink href="/dashboard" variant="ghost">
          Dashboard
        </ButtonLink>
      </div>
      <KnowledgeBase articles={articles} />
    </PageShell>
  );
}
