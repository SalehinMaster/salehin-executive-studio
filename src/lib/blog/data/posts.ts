import type { BlogPost } from "@/lib/blog/types";

/**
 * Master post registry. At scale, split into per-category files:
 * `data/linkedin-growth.ts`, `data/personal-branding.ts`, etc.,
 * then spread into this array.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "linkedin-hook-framework-for-ceos",
    title: "The LinkedIn Hook Framework CEOs Use to Stop the Scroll",
    excerpt:
      "A repeatable hook architecture that earns attention without sacrificing executive tone — built for founders who refuse to sound like influencers.",
    category: "LinkedIn Growth",
    categorySlug: "linkedin-growth",
    publishedAt: "2026-05-12",
    readingTimeMinutes: 7,
    author: "Salehin",
    tags: ["hooks", "LinkedIn", "executive voice"],
    eyebrow: "Distribution",
    sections: [
      {
        heading: "Why most executive hooks fail",
        paragraphs: [
          "The scroll stops when tension is immediate and specific. Generic inspiration — \"Here's what I learned about leadership\" — signals commodity content before the reader processes a single word.",
          "Premium hooks anchor in a concrete moment: a board conversation, a revenue inflection, a hiring mistake. Specificity is the filter that separates operators from commentators.",
        ],
      },
      {
        heading: "The 3-line hook stack",
        paragraphs: [
          "Line one: pattern interrupt with a number, contrast, or contrarian claim tied to your domain.",
          "Line two: stakes — what was at risk for you, your team, or your investors.",
          "Line three: the promise of the post — the operating insight, not the moral.",
        ],
      },
    ],
  },
  {
    slug: "linkedin-commenting-strategy-for-pipeline",
    title: "Commenting Strategy That Builds Pipeline Without Cold Outreach",
    excerpt:
      "Strategic commenting is the highest-ROI distribution lever on LinkedIn — when it is systematic, not sporadic.",
    category: "LinkedIn Growth",
    categorySlug: "linkedin-growth",
    publishedAt: "2026-05-02",
    readingTimeMinutes: 6,
    author: "Salehin",
    tags: ["comments", "pipeline", "network effects"],
    sections: [
      {
        heading: "Comments are micro-assets",
        paragraphs: [
          "Every comment is a public proof of how you think. Buyers research operators in the comment sections of peers they already trust.",
          "Aim for additive insight: reframe, extend with data, or share a one-line case study. Never \"Great post!\" — that is invisible labor.",
        ],
      },
    ],
  },
  {
    slug: "personal-brand-positioning-for-founders",
    title: "Personal Brand Positioning for Founders in Crowded Categories",
    excerpt:
      "Positioning is the decision of what you will be known for — and what you will deliberately not compete on.",
    category: "Personal Branding",
    categorySlug: "personal-branding",
    publishedAt: "2026-04-28",
    readingTimeMinutes: 8,
    author: "Salehin",
    tags: ["positioning", "founders", "category design"],
    sections: [
      {
        heading: "Category of one, not category leader",
        paragraphs: [
          "Leaders in mature markets do not win by being \"better.\" They win by owning a wedge: the buyer, the problem, the mechanism, or the outcome only they can credibly claim.",
          "Document three proof points that no competitor can copy without your biography — then build every narrative around them.",
        ],
      },
    ],
  },
  {
    slug: "executive-narrative-architecture",
    title: "Executive Narrative Architecture: Story Systems That Scale",
    excerpt:
      "Your brand is not a bio — it is a library of stories engineered to reinforce one commercial thesis.",
    category: "Personal Branding",
    categorySlug: "personal-branding",
    publishedAt: "2026-04-15",
    readingTimeMinutes: 9,
    author: "Salehin",
    tags: ["storytelling", "narrative", "authority"],
    sections: [
      {
        heading: "The four story pillars",
        paragraphs: [
          "Origin: why you care — tied to market insight, not childhood unless it is strategically relevant.",
          "Operator: how you build — process, standards, and decisions under pressure.",
          "Proof: outcomes with numbers, names, or timelines your audience recognizes.",
          "Vision: where the category is going — and why you are structurally positioned to lead it.",
        ],
      },
    ],
  },
  {
    slug: "ai-content-workflows-for-executives",
    title: "AI Content Workflows for Executives Who Refuse to Sound Robotic",
    excerpt:
      "AI should compress research and drafting — never replace judgment, voice, or strategic intent.",
    category: "AI Branding",
    categorySlug: "ai-branding",
    publishedAt: "2026-04-08",
    readingTimeMinutes: 10,
    author: "Salehin",
    tags: ["AI", "workflow", "ghostwriting"],
    sections: [
      {
        heading: "Human-in-the-loop by design",
        paragraphs: [
          "The best AI branding stacks separate generation from governance: AI proposes, humans approve against a voice rubric and fact-check layer.",
          "Store exemplar posts, banned phrases, and proof libraries in a single source of truth — models perform when context is structured, not when prompts are clever.",
        ],
      },
    ],
  },
  {
    slug: "brand-voice-rubrics-for-ai-teams",
    title: "Brand Voice Rubrics Your AI Team Can Actually Follow",
    excerpt:
      "Rubrics turn subjective \"sounds like us\" feedback into pass-fail criteria models and editors can enforce at scale.",
    category: "AI Branding",
    categorySlug: "ai-branding",
    publishedAt: "2026-03-22",
    readingTimeMinutes: 7,
    author: "Salehin",
    tags: ["voice", "rubrics", "editorial QA"],
    sections: [
      {
        heading: "What belongs in a rubric",
        paragraphs: [
          "Sentence length bands, vocabulary tiers, metaphor policy, CTA style, and a list of anti-patterns (hype, hustle culture, empty questions).",
          "Score each draft 1–5 per dimension; ship only when composite scores exceed your threshold.",
        ],
      },
    ],
  },
  {
    slug: "content-repurposing-system-for-busy-ceos",
    title: "The Content Repurposing System Busy CEOs Actually Stick To",
    excerpt:
      "One flagship asset per week, atomized across formats — without multiplying creative burden.",
    category: "Content Marketing",
    categorySlug: "content-marketing",
    publishedAt: "2026-03-10",
    readingTimeMinutes: 8,
    author: "Salehin",
    tags: ["repurposing", "editorial", "efficiency"],
    sections: [
      {
        heading: "Anchor → atoms",
        paragraphs: [
          "Record or write one anchor piece: keynote take, investor update, or deep LinkedIn essay.",
          "Extract atoms: carousel frames, short posts, newsletter section, podcast talking points. Atoms inherit the thesis; they do not reinvent it.",
        ],
      },
    ],
  },
  {
    slug: "seo-topic-clusters-for-personal-brands",
    title: "SEO Topic Clusters for Personal Brands: Internal Linking That Compounds",
    excerpt:
      "Clusters signal topical authority to search engines — and guide buyers through a deliberate education journey.",
    category: "Content Marketing",
    categorySlug: "content-marketing",
    publishedAt: "2026-02-26",
    readingTimeMinutes: 9,
    author: "Salehin",
    tags: ["SEO", "topic clusters", "internal linking"],
    sections: [
      {
        heading: "Pillar and spoke architecture",
        paragraphs: [
          "A pillar page owns the head term; spokes answer long-tail questions and link back with descriptive anchor text.",
          "Related posts grids at the end of each article automate equity flow — especially when categories and tags align.",
        ],
      },
    ],
  },
  {
    slug: "linkedin-profile-optimization-2026",
    title: "LinkedIn Profile Optimization for Revenue Leaders (2026 Playbook)",
    excerpt:
      "Your profile is a landing page — headline, banner, and featured section must sell the next conversation.",
    category: "LinkedIn Growth",
    categorySlug: "linkedin-growth",
    publishedAt: "2026-02-14",
    readingTimeMinutes: 6,
    author: "Salehin",
    tags: ["profile", "conversion", "LinkedIn"],
    sections: [
      {
        heading: "Headline as offer",
        paragraphs: [
          "Replace job-title headlines with outcome headlines: who you help, what changes, and through what mechanism.",
          "Featured links should point to proof — case studies, newsletter, booking — not generic company pages.",
        ],
      },
    ],
  },
  {
    slug: "thought-leadership-vs-influencer-content",
    title: "Thought Leadership vs. Influencer Content: Know Which Game You Are Playing",
    excerpt:
      "The formats, metrics, and cadence differ. Mixing them dilutes authority and confuses buyers.",
    category: "Personal Branding",
    categorySlug: "personal-branding",
    publishedAt: "2026-01-30",
    readingTimeMinutes: 5,
    author: "Salehin",
    tags: ["thought leadership", "strategy", "metrics"],
    sections: [
      {
        heading: "Pick a lane",
        paragraphs: [
          "Thought leadership optimizes for trust density among a narrow ICP; influencer content optimizes for reach among a broad audience.",
          "Executives building seven-figure pipelines rarely need viral volume — they need the right 500 people to believe they are the default choice.",
        ],
      },
    ],
  },
];
