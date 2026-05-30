export type LinkedInPostPreview = {
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
};

type PostTemplate = LinkedInPostPreview & {
  keywords: string[];
};

const defaultTopic = "personal branding";

const templates: PostTemplate[] = [
  {
    keywords: ["ai", "automation", "workflow", "system"],
    hook: "Most founders are still writing LinkedIn posts manually in 2026.\n\nThat's a $50K/year mistake.",
    body: "The leaders winning inbound aren't \"more creative.\"\n\nThey run content like infrastructure:\n→ Voice-calibrated AI pipelines\n→ Proof-led narratives\n→ Consistent authority cadence\n\nWhen your expertise compounds in public, buyers arrive pre-sold.\n\nYou don't need more hours. You need a system that ships while you build.",
    cta: "Want the exact workflow we install for CEOs?\n\nComment SYSTEM — I'll send the blueprint.",
    hashtags: [
      "#PersonalBranding",
      "#Founders",
      "#AIContent",
      "#LinkedInGrowth",
      "#ExecutivePresence",
    ],
  },
  {
    keywords: ["lead", "sales", "pipeline", "revenue", "client"],
    hook: "We doubled inbound pipeline in 90 days.\n\nZero paid ads. One channel: LinkedIn authority.",
    body: "The playbook wasn't \"post more.\"\n\nIt was:\n1. Sharp positioning (buyers knew why us)\n2. High-signal hooks (stopped the scroll)\n3. Proof-rich body copy (built trust fast)\n4. CTAs that started conversations\n\nAuthority isn't vanity metrics.\n\nIt's qualified conversations showing up in your inbox every week.",
    cta: "Building a B2B offer and tired of cold outreach?\n\nDM me PIPELINE — I'll share what we'd prioritize first.",
    hashtags: [
      "#B2BMarketing",
      "#InboundLeads",
      "#LinkedInStrategy",
      "#FounderLedSales",
      "#Growth",
    ],
  },
  {
    keywords: ["brand", "positioning", "authority", "executive", "ceo"],
    hook: "Your LinkedIn profile isn't a résumé.\n\nIt's your highest-leverage sales asset.",
    body: "If a decision-maker lands on your profile and can't answer:\n• What you stand for\n• Who you help\n• Why you're the obvious choice\n\n…you're losing deals silently.\n\nPersonal branding isn't aesthetics.\n\nIt's category ownership — told with proof, cadence, and narrative discipline.",
    cta: "Rewriting your profile this quarter?\n\nSave this post and comment AUTHORITY for our 5-point audit checklist.",
    hashtags: [
      "#ExecutiveBranding",
      "#ThoughtLeadership",
      "#CEOLife",
      "#PersonalBrand",
      "#Leadership",
    ],
  },
  {
    keywords: ["carousel", "design", "visual", "creative"],
    hook: "Carousels aren't \"pretty slides.\"\n\nThey're compressed keynotes that earn saves.",
    body: "The highest-performing carousels we ship follow one rule:\n\nOne idea per slide. Proof on every third frame.\n\nWhen design meets narrative architecture:\n→ Saves spike (algorithm fuel)\n→ Profile visits jump\n→ DMs reference specific slides\n\nVisual authority compounds faster than text-only posting.",
    cta: "Want our carousel structure template?\n\nComment CAROUSEL and I'll send the framework.",
    hashtags: [
      "#CarouselDesign",
      "#LinkedInTips",
      "#ContentDesign",
      "#BrandBuilding",
      "#SocialSelling",
    ],
  },
];

function pickTemplate(topic: string): PostTemplate {
  const normalized = topic.trim().toLowerCase() || defaultTopic;
  const words = normalized.split(/\s+/);

  let best = templates[0]!;
  let bestScore = 0;

  for (const template of templates) {
    const score = template.keywords.reduce((acc, keyword) => {
      if (normalized.includes(keyword)) return acc + 2;
      if (words.some((w) => w.startsWith(keyword.slice(0, 4)))) return acc + 1;
      return acc;
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      best = template;
    }
  }

  return best;
}

function personalizeHook(hook: string, topic: string): string {
  const trimmed = topic.trim();
  if (!trimmed || trimmed.length < 3) return hook;

  const firstLine = hook.split("\n")[0] ?? hook;
  if (firstLine.length > 80) return hook;

  return hook.replace(
    /^Most founders/,
    `Most leaders in ${trimmed} `,
  );
}

export function generateLinkedInPost(topic: string): LinkedInPostPreview {
  const template = pickTemplate(topic);
  const displayTopic = topic.trim() || "your niche";

  return {
    hook: personalizeHook(template.hook, displayTopic),
    body: template.body,
    cta: template.cta,
    hashtags: template.hashtags,
  };
}

export const demoSuggestions = [
  "AI content systems for founders",
  "B2B pipeline on LinkedIn",
  "Executive personal branding",
] as const;
