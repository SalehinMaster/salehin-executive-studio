import type { KnowledgeArticle, KnowledgeCategory } from "@/lib/knowledge/types";

const articles: KnowledgeArticle[] = [
  {
    slug: "linkedin-profile-optimization-checklist",
    title: "LinkedIn Profile Optimization Checklist",
    excerpt:
      "A field-tested sequence for headline, banner, featured, and proof blocks that convert profile views into booked calls.",
    category: "LinkedIn Growth",
    readMinutes: 8,
    tags: ["profile", "conversion", "headline"],
    updatedAt: "2026-05-12",
    body: [
      "Start with a buyer-centric headline: who you help, the outcome, and your mechanism — not your job title alone.",
      "Replace generic banners with a single proof line and a visual that reinforces category authority.",
      "Curate Featured with one lead magnet, one case study, and one flagship post — remove everything that dilutes the narrative.",
      "Pin a post that demonstrates transformation, not tips. Executives buy trajectory, not tactics.",
    ],
  },
  {
    slug: "comment-to-dm-pipeline",
    title: "Comment-to-DM Pipeline for Inbound",
    excerpt:
      "Turn high-signal engagement into qualified conversations without sounding salesy or burning executive tone.",
    category: "LinkedIn Growth",
    readMinutes: 6,
    tags: ["engagement", "inbound", "DMs"],
    updatedAt: "2026-05-18",
    body: [
      "Define three comment archetypes you will always respond to: category questions, proof challenges, and partnership signals.",
      "Use public replies to add one insight, then invite depth in DMs only when the thread warrants it.",
      "Track reply-to-call ratio weekly; optimize hooks and CTAs before increasing posting volume.",
    ],
  },
  {
    slug: "executive-positioning-statement",
    title: "Executive Positioning Statement Framework",
    excerpt:
      "Build a one-page narrative architecture that aligns sales, content, and speaking — so every touchpoint compounds.",
    category: "Personal Branding",
    readMinutes: 10,
    tags: ["positioning", "narrative", "authority"],
    updatedAt: "2026-04-28",
    body: [
      "Anchor on a category POV: what must the market believe about the future, and why are you the guide?",
      "Document three proof pillars — client outcomes, operator credibility, and third-party validation.",
      "Map each pillar to one recurring content series and one sales asset.",
    ],
  },
  {
    slug: "founder-origin-story-system",
    title: "Founder Origin Story System",
    excerpt:
      "Modular story beats you can deploy across keynotes, podcasts, and LinkedIn without repeating the same anecdote.",
    category: "Personal Branding",
    readMinutes: 7,
    tags: ["story", "founder", "trust"],
    updatedAt: "2026-05-02",
    body: [
      "Separate catalyst, struggle, insight, and proof into discrete modules — mix per channel.",
      "Lead with market tension, not biography. Executives buy relevance first.",
      "End every story asset with a single belief shift you want the audience to adopt.",
    ],
  },
  {
    slug: "voice-calibrated-ai-prompts",
    title: "Voice-Calibrated AI Prompt Library",
    excerpt:
      "Prompt patterns that preserve executive tone while accelerating research, drafting, and revision cycles.",
    category: "AI Content",
    readMinutes: 9,
    tags: ["prompts", "voice", "workflow"],
    updatedAt: "2026-05-22",
    body: [
      "Store a voice rubric: sentence length, banned phrases, proof density, and CTA style.",
      "Run generate → critique → tighten as three explicit steps; never publish first drafts.",
      "Version prompts per content type: insight posts, case studies, and event recaps.",
    ],
  },
  {
    slug: "human-in-the-loop-review",
    title: "Human-in-the-Loop Review SOP",
    excerpt:
      "Quality gates that keep AI-assisted content on-brand and legally safe for regulated industries.",
    category: "AI Content",
    readMinutes: 5,
    tags: ["QA", "compliance", "review"],
    updatedAt: "2026-05-08",
    body: [
      "Check factual claims, client anonymity, and competitive references on every draft.",
      "Use a two-pass review: strategist for narrative, operator for accuracy.",
      "Log change reasons to retrain prompts — compound quality over time.",
    ],
  },
  {
    slug: "content-pillar-matrix",
    title: "Content Pillar Matrix",
    excerpt:
      "Plan a quarter of executive content from four pillars without creative fatigue or off-brand tangents.",
    category: "Content Strategy",
    readMinutes: 8,
    tags: ["pillars", "calendar", "planning"],
    updatedAt: "2026-04-15",
    body: [
      "Assign weekly weightings across education, proof, perspective, and culture — adjust by funnel stage.",
      "Pair each pillar with one measurable outcome: saves, replies, inbound, or booked calls.",
      "Refresh pillars quarterly; retire themes that no longer match GTM priorities.",
    ],
  },
  {
    slug: "thought-leadership-series-design",
    title: "Thought Leadership Series Design",
    excerpt:
      "Structure multi-part series that build anticipation and demonstrate depth without overwhelming your calendar.",
    category: "Content Strategy",
    readMinutes: 6,
    tags: ["series", "cadence", "LinkedIn"],
    updatedAt: "2026-05-14",
    body: [
      "Open with a contrarian thesis; deliver parts as evidence, framework, and implementation.",
      "Use consistent visual branding and numbering so followers recognize the arc.",
      "Close with a soft CTA tied to the series outcome — audit, playbook, or strategy call.",
    ],
  },
];

export function getKnowledgeArticles(): KnowledgeArticle[] {
  return [...articles].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getKnowledgeArticleBySlug(
  slug: string,
): KnowledgeArticle | undefined {
  return articles.find((article) => article.slug === slug);
}

export function filterKnowledgeByCategory(
  items: KnowledgeArticle[],
  category: KnowledgeCategory | "all",
): KnowledgeArticle[] {
  if (category === "all") return items;
  return items.filter((item) => item.category === category);
}

export function searchKnowledgeArticles(
  items: KnowledgeArticle[],
  query: string,
): KnowledgeArticle[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;

  return items.filter((item) => {
    const haystack = [
      item.title,
      item.excerpt,
      item.category,
      ...item.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

export function getArticlesByCategory(
  category: KnowledgeCategory,
): KnowledgeArticle[] {
  return articles.filter((article) => article.category === category);
}
