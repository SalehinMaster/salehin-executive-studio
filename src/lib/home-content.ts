export const problemSolutionPairs = [
  {
    problem: {
      title: "Inconsistent content",
      description:
        "Sporadic posts that never compound. Your audience forgets you between bursts of activity.",
    },
    solution: {
      title: "AI-powered content systems",
      description:
        "Always-on pipelines that publish in your voice — calibrated, on-brand, and on schedule.",
    },
  },
  {
    problem: {
      title: "Low visibility",
      description:
        "Great work stays invisible. Competitors with weaker expertise dominate the feed.",
    },
    solution: {
      title: "LinkedIn authority building",
      description:
        "Strategic narratives and formats engineered to grow reach, trust, and inbound pipeline.",
    },
  },
  {
    problem: {
      title: "Weak positioning",
      description:
        "Your profile reads like a résumé, not a category leader. Buyers can't tell why you're different.",
    },
    solution: {
      title: "Personal branding strategy",
      description:
        "Clear positioning, proof, and story architecture that makes you the obvious choice.",
    },
  },
  {
    problem: {
      title: "Slow content creation",
      description:
        "Every post steals hours from building the business. Quality suffers when you're rushed.",
    },
    solution: {
      title: "Content automation",
      description:
        "AI workflows for research, drafting, and refinement — executive-grade output at scale.",
    },
  },
] as const;
export const services = [
  {
    title: "LinkedIn Ghostwriting",
    outcomeHeadline: "Turn feed presence into qualified pipeline",
    outcomes: [
      { metric: "4×", label: "inbound DMs & calls" },
      { metric: "12K+", label: "avg. monthly impressions" },
      { metric: "92%", label: "voice-match approval" },
    ],
  },
  {
    title: "Personal Branding Strategy",
    outcomeHeadline: "Own your category before buyers compare options",
    outcomes: [
      { metric: "3×", label: "profile visit → lead rate" },
      { metric: "#1", label: "positioning clarity score" },
      { metric: "48h", label: "to revised authority narrative" },
    ],
  },
  {
    title: "AI Content Systems",
    outcomeHeadline: "Ship authority-grade content without calendar drag",
    outcomes: [
      { metric: "85%", label: "less exec drafting time" },
      { metric: "24", label: "on-brand posts / month" },
      { metric: "340%", label: "reach lift in 90 days" },
    ],
  },
  {
    title: "Carousel Design",
    outcomeHeadline: "Stop the scroll. Hold attention. Drive action.",
    outcomes: [
      { metric: "2.8×", label: "higher save & share rate" },
      { metric: "67%", label: "more profile clicks" },
      { metric: "5.2%", label: "avg. engagement rate" },
    ],
  },
  {
    title: "Social Media Management",
    outcomeHeadline: "Compound visibility into trust — and trust into revenue",
    outcomes: [
      { metric: "2×", label: "inbound opportunity volume" },
      { metric: "180%", label: "follower quality index" },
      { metric: "Always-on", label: "authority cadence" },
    ],
  },
] as const;

export const featureTools = [
  {
    id: "linkedin-generator",
    title: "LinkedIn Generator",
    description:
      "Full posts engineered for reach, saves, and inbound — from a single strategic prompt.",
    span: "large" as const,
  },
  {
    id: "hook-generator",
    title: "Hook Generator",
    description: "Scroll-stopping openers calibrated to your audience and offer.",
    span: "default" as const,
  },
  {
    id: "bio-optimizer",
    title: "Bio Optimizer",
    description: "Profile copy that converts visitors into followers and leads.",
    span: "default" as const,
  },
  {
    id: "carousel-generator",
    title: "Carousel Generator",
    description: "Slide-by-slide narratives with premium visual hierarchy.",
    span: "wide" as const,
  },
  {
    id: "content-rewriter",
    title: "Content Rewriter",
    description: "Refine tone, tighten proof, and elevate clarity in one pass.",
    span: "default" as const,
  },
  {
    id: "cta-generator",
    title: "CTA Generator",
    description: "High-converting closes that drive comments, DMs, and bookings.",
    span: "default" as const,
  },
] as const;

export const portfolioItems = [
  {
    title: "Meridian Capital",
    category: "LinkedIn · AI Systems",
    description:
      "Full personal branding OS for a fintech CEO — 4× inbound pipeline in 90 days through authority-led content.",
  },
  {
    title: "Northline Health",
    category: "Strategy · Carousels",
    description:
      "Unified executive narrative and carousel engine across product launches, press, and investor communications.",
  },
  {
    title: "Atlas Ventures",
    category: "Authority Building",
    description:
      "Social authority system supporting a Series B fundraise — investors engaged before the first meeting.",
  },
] as const;

export const socialProofMetrics = [
  { value: "10M+", label: "Content impressions delivered", trend: "+127% YoY" },
  { value: "200+", label: "Founders & executives served", trend: "Across 14 industries" },
  { value: "4.2×", label: "Avg. engagement lift", trend: "Within 90 days" },
  { value: "92%", label: "Client retention rate", trend: "12-month rolling" },
] as const;

export const socialProofClients = [
  { initials: "EV", name: "Elena V.", company: "Meridian Capital" },
  { initials: "JO", name: "James O.", company: "Northline Health" },
  { initials: "PS", name: "Priya S.", company: "Atlas Ventures" },
  { initials: "MR", name: "Marcus R.", company: "Vertex AI" },
  { initials: "AL", name: "Amira L.", company: "ScaleForge" },
  { initials: "DK", name: "David K.", company: "Summit Labs" },
] as const;

export const authorityBadges = [
  "LinkedIn Top Voice",
  "Forbes Council",
  "TechCrunch Featured",
  "Y Combinator Alumni",
] as const;

export const engagementImprovements = [
  { metric: "Profile views", before: 820, after: 12400, unit: "/mo" },
  { metric: "Post engagement", before: 1.2, after: 5.8, unit: "% rate" },
  { metric: "Inbound DMs", before: 3, after: 28, unit: "/mo" },
] as const;

export const caseStudies = [
  {
    client: "Elena Vasquez",
    role: "CEO, Meridian Capital",
    industry: "Fintech",
    before:
      "2.1K followers, sporadic posting, zero inbound pipeline from LinkedIn despite $40M AUM.",
    strategy:
      "Authority narrative repositioning, AI content pipeline, weekly thought-leadership carousels targeting CFO personas.",
    after:
      "18.4K followers, consistent 3× weekly publishing, recognized voice in fintech leadership.",
    results: [
      { metric: "4×", label: "inbound pipeline" },
      { metric: "340%", label: "reach increase" },
      { metric: "12", label: "speaking invites" },
    ],
  },
  {
    client: "James Okonkwo",
    role: "Founder, Northline Health",
    industry: "HealthTech",
    before:
      "Strong clinical expertise invisible online. Competitors with less depth dominated the feed.",
    strategy:
      "Personal brand architecture, hook-first content system, investor-grade narrative for Series A positioning.",
    after:
      "Category authority in digital health innovation with 2.8× profile-to-lead conversion.",
    results: [
      { metric: "2.8×", label: "profile → lead rate" },
      { metric: "890%", label: "impression growth" },
      { metric: "$4.2M", label: "Series A raised" },
    ],
  },
  {
    client: "Priya Shah",
    role: "Managing Partner, Atlas Ventures",
    industry: "Venture Capital",
    before:
      "Deal flow dependent on warm intros. LinkedIn presence read like a static résumé.",
    strategy:
      "Thesis-led content engine, LP-facing authority posts, AI-assisted deal memo summaries as content.",
    after:
      "Top-of-mind for founders pre-fundraise. Inbound deal flow doubled within two quarters.",
    results: [
      { metric: "2×", label: "inbound deal flow" },
      { metric: "67%", label: "LP engagement lift" },
      { metric: "#1", label: "VC voice index" },
    ],
  },
] as const;

export const testimonials = [
  {
    quote:
      "They didn't sell us posts. They installed an operating system. My visibility finally matches the company I'm building.",
    name: "Elena Vasquez",
    role: "CEO, Meridian Capital",
    initials: "EV",
    hasVideo: true,
    videoDuration: "2:14",
  },
  {
    quote:
      "AI-powered execution with zero generic output. Every piece sounds like me — because the infrastructure was built first.",
    name: "James Okonkwo",
    role: "Founder, Northline Health",
    initials: "JO",
    hasVideo: true,
    videoDuration: "1:48",
  },
  {
    quote:
      "Inbound doubled. Speaking invites tripled. That's what happens when your personal brand runs like infrastructure.",
    name: "Priya Shah",
    role: "Managing Partner, Atlas Ventures",
    initials: "PS",
    hasVideo: false,
    videoDuration: null,
  },
  {
    quote:
      "Within 90 days my LinkedIn became our top inbound channel. The ROI on this system is absurd compared to paid ads.",
    name: "Marcus Reid",
    role: "Founder & CEO, Vertex AI",
    initials: "MR",
    hasVideo: true,
    videoDuration: "3:02",
  },
] as const;

export const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    description: "For founders ready to establish authority with a consistent content engine.",
    price: "$2,500",
    period: "/month",
    features: [
      "8 LinkedIn posts per month",
      "AI content pipeline setup",
      "Profile & bio optimization",
      "Monthly strategy sync",
      "Basic analytics dashboard",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    id: "professional",
    name: "Professional",
    description: "The complete authority system — strategy, content, design, and optimization.",
    price: "$5,000",
    period: "/month",
    features: [
      "16 posts + 4 carousels per month",
      "Full personal brand strategy",
      "AI content OS with voice training",
      "Engagement & DM management",
      "Bi-weekly strategy calls",
      "Priority support & revisions",
    ],
    cta: "Start Professional",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "executive",
    name: "Executive",
    description: "White-glove partnership for C-suite leaders who need maximum market presence.",
    price: "Custom",
    period: "",
    features: [
      "Unlimited content & formats",
      "Dedicated brand strategist",
      "Multi-platform distribution",
      "PR & media positioning",
      "Executive ghostwriting",
      "Quarterly brand audits",
    ],
    cta: "Book Executive Call",
    highlighted: false,
  },
] as const;

export const faqs = [
  {
    id: "pricing-investment",
    category: "Pricing",
    question: "How much does a personal branding engagement cost?",
    answer:
      "Plans start at $2,500/month for founders establishing authority, $5,000/month for the full Professional system, and custom Executive partnerships for C-suite leaders. Every tier includes strategy, AI infrastructure, and measurable outcomes — with a 30-day satisfaction guarantee and no long-term lock-in.",
  },
  {
    id: "pricing-included",
    category: "Pricing",
    question: "What's included vs. what costs extra?",
    answer:
      "All plans include voice-calibrated AI pipelines, profile optimization, strategy syncs, and analytics. Add-ons like PR positioning, multi-platform distribution, or dedicated ghostwriting are scoped during your strategy call — never hidden in fine print.",
  },
  {
    id: "delivery-timeline",
    category: "Delivery",
    question: "How quickly can we go live?",
    answer:
      "Most Personal Branding OS builds launch in 8–12 weeks: two weeks for diagnosis and positioning, four to six for content architecture and AI training, then two to four for publishing cadence and optimization. Retainer clients often see first posts within 14 days of kickoff.",
  },
  {
    id: "delivery-onboarding",
    category: "Delivery",
    question: "What does onboarding look like?",
    answer:
      "We start with a deep-dive strategy session, voice and audience audit, competitive positioning review, and content pillar mapping. You receive a documented brand architecture, approval workflows, and a live publishing calendar before a single post goes out.",
  },
  {
    id: "linkedin-growth",
    category: "LinkedIn Growth",
    question: "How fast will I see growth on LinkedIn?",
    answer:
      "Clients typically see measurable lift within 30–45 days — profile views, engagement rate, and inbound DMs. Compounding authority results (4× pipeline, speaking invites, category recognition) land in the 90-day window when cadence and narrative stay consistent.",
  },
  {
    id: "linkedin-voice",
    category: "LinkedIn Growth",
    question: "Do you ghostwrite in my actual voice?",
    answer:
      "Yes. We build a voice model from your existing content, calls, and approved samples — then run every draft through human editorial review. Our 92% voice-match approval rate exists because the infrastructure is trained on you, not a template.",
  },
  {
    id: "branding-difference",
    category: "Personal Branding",
    question: "How is this different from a marketing agency?",
    answer:
      "Agencies ship campaigns. We install operating systems — strategy, AI workflows, design systems, and publishing infrastructure that compound without you in every draft. You're building category authority, not renting attention.",
  },
  {
    id: "branding-results",
    category: "Personal Branding",
    question: "What results should I expect in 90 days?",
    answer:
      "Profile visits up 3–10×, engagement rates above 4%, consistent inbound DMs, and a recognizable point of view in your market. Exact metrics depend on your starting point — we benchmark in week one and report against it monthly.",
  },
  {
    id: "ai-generic",
    category: "AI Systems",
    question: "Will AI make my content sound generic?",
    answer:
      "Not when it's built correctly. Generic output comes from generic prompts. Our systems use your voice profile, proof library, audience personas, and editorial guardrails — AI handles speed; humans own strategy and final approval.",
  },
  {
    id: "ai-ownership",
    category: "AI Systems",
    question: "Who owns the content and systems we build?",
    answer:
      "You do. All content, brand assets, prompt libraries, and workflow documentation belong to you. We hand off the full stack at engagement end — no platform lock-in, no hostage data.",
  },
] as const;

export const leadMagnetResources = [
  {
    id: "linkedin-hooks-pdf",
    title: "100 LinkedIn Hooks PDF",
    subtitle: "Scroll-stopping openers for every post format",
    format: "PDF · 24 pages",
    accent: "from-primary/80 via-primary/50 to-secondary/40",
    highlights: ["Hook formulas", "Industry variants", "CTA pairings"],
  },
  {
    id: "linkedin-profile-checklist",
    title: "LinkedIn Profile Checklist",
    subtitle: "Audit every section buyers actually read",
    format: "Checklist · 12 sections",
    accent: "from-secondary/70 via-cyan-500/40 to-primary/30",
    highlights: ["Headline scorecard", "Proof blocks", "SEO keywords"],
  },
  {
    id: "personal-branding-guide",
    title: "Personal Branding Guide",
    subtitle: "Position, narrative, and content pillars in one playbook",
    format: "Guide · 36 pages",
    accent: "from-violet-600/70 via-primary/50 to-fuchsia-500/30",
    highlights: ["Positioning map", "Voice framework", "90-day plan"],
  },
] as const;

export const footerBrandStatement =
  "We install personal branding operating systems for founders and executives who need market trust at scale — strategy, AI content infrastructure, and LinkedIn authority that compounds.";

export const footerNavColumns = [
  {
    title: "Product",
    links: [
      { label: "Services", href: "/services" },
      { label: "AI Demo", href: "/#ai-demo" },
      { label: "Pricing", href: "/pricing" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case Studies", href: "/#case-studies" },
      { label: "Contact", href: "/contact" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Free Resources", href: "/#lead-magnet" },
      { label: "LinkedIn Tools", href: "/#tools" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "FAQ", href: "/#faq" },
      { label: "Pitch Deck", href: "/pitch" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
] as const;

export const footerSocialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "linkedin" as const,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: "x" as const,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "instagram" as const,
  },
] as const;
