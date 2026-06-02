"use client";

import { useState } from "react";
import Link from "next/link";

// GlassCard Component (premium translucent dark card)
function GlassCard({
  children,
  className = "",
  as = "div",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  [x: string]: any;
}) {
  const As = as;
  return (
    <As
      className={`relative rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl shadow-xl transition-shadow hover:shadow-2xl ${className}`}
      {...props}
    >
      {children}
    </As>
  );
}

// FloatingBadge Component
function FloatingBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 rounded-full bg-gradient-to-tr from-neutral-800 via-black to-neutral-700 border border-white/20 px-6 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-black/40 backdrop-blur-md">
      {children}
    </span>
  );
}

// FAQ Accordion
function FAQAccordion({
  items,
}: {
  items: { question: string; answer: React.ReactNode }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <GlassCard
          key={i}
          className={`overflow-hidden transition-all ${openIndex === i ? "border-blue-500/40 shadow-blue-700/15" : ""}`}
        >
          <button
            className="w-full flex justify-between items-center px-6 py-5 text-left group outline-none"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            aria-controls={`faq-content-${i}`}
          >
            <span className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
              {item.question}
            </span>
            <svg
              className={`w-6 h-6 ml-2 transform transition-transform duration-300 ${
                openIndex === i ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            id={`faq-content-${i}`}
            className={`transition-all duration-400 px-6 ${
              openIndex === i
                ? "max-h-96 opacity-100 py-2"
                : "max-h-0 opacity-0 py-0"
            }`}
            style={{ overflow: "hidden" }}
          >
            <div className="text-neutral-200 text-base">{item.answer}</div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

// Floating CTA Card
function FloatingCTA() {
  return (
    <div className="fixed bottom-8 right-8 z-50 max-w-xs w-full">
      <GlassCard className="p-6 shadow-2xl border-blue-700/30 hover:scale-[1.03] transition-transform">
        <div className="flex flex-col items-center space-y-2">
          <span className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white text-xs font-bold tracking-widest shadow-blue-800/40 shadow-lg mb-2">
            Next Step
          </span>
          <h3 className="text-lg font-bold text-white text-center mb-2">
            Ready to Elevate Your LinkedIn Authority?
          </h3>
          <p className="text-sm text-neutral-300 text-center mb-4">
            Get your bespoke LinkedIn Authority Audit or schedule a strategic consultation.
          </p>
          <Link
            href="/contact"
            className="w-full inline-block bg-gradient-to-tr from-blue-700 via-sky-600 to-cyan-500 text-white font-semibold rounded-lg text-center px-4 py-2 shadow-lg shadow-blue-900/40 hover:from-blue-800 hover:to-cyan-400 hover:scale-105 transition"
          >
            Book a Free Consult →
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}

// Article Sections Data ----------------------------------------------

// FAQ content
const faqItems = [
  {
    question: "How is building authority on LinkedIn different in 2026?",
    answer: (
      <>
        <p>
          In 2026, LinkedIn’s algorithm and user behavior prioritize authentic, expert-driven content amplified by cutting-edge AI tools. The dominance of AI-generated noise has made trust even more scarce. Founders must demonstrate experiential insight, transparency, and use advanced tools to personalize and automate authority-building—without losing human touch.
        </p>
      </>
    ),
  },
  {
    question: "What AI tools give founders a real competitive advantage?",
    answer: (
      <>
        <ul className="list-disc pl-4">
          <li>
            <strong>Content Repurposing AI</strong> (e.g., OpusClip, Castmagic) to atomize longform insights for omnichannel presence.
          </li>
          <li>
            <strong>LinkedIn GPTs & Intelligent Assistants</strong> to automate engagement, DMs, and personalized follow-ups.
          </li>
          <li>
            <strong>2026 SEO Content Architects</strong> for intent-aligned strategic content structures and topic clustering.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "How often should founders post on LinkedIn for authority?",
    answer: (
      <>
        <p>
          Authority is now a function of consistency and strategic signal, not just frequency. Founders benefit from 2–3 high-value original posts per week, reinforced by daily engagement (comments, curated shares, Q&A) to seed trust and relevance without overwhelming their feed.
        </p>
      </>
    ),
  },
  {
    question: "Should founders use AI to write all their LinkedIn content?",
    answer: (
      <>
        <p>
          No—AI should be a copilot, not an autopilot. Use AI for idea generation, drafting, and optimization, but infuse your own stories, frameworks, and unique viewpoints. Hybrid content (human + AI) consistently outperforms in authority and engagement metrics for 2026.
        </p>
      </>
    ),
  },
];

// Main Page Component ------------------------------------------------
export default function HowFoundersBuildAuthority2026Page() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-black via-neutral-900 to-blue-950 pb-32 text-neutral-200 flex flex-col items-center">
      {/* Floating CTA Card */}
      <FloatingCTA />
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center pt-20 pb-12 min-h-[50vh] relative px-4">
        <GlassCard className="max-w-3xl mx-auto px-10 py-12 md:py-16 md:px-16 text-center relative">
          <FloatingBadge>2026 Authority Playbook</FloatingBadge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white bg-gradient-to-br from-blue-400 via-white/60 to-blue-700 bg-clip-text text-transparent mb-6 drop-shadow-sm tracking-tight">
            How Founders Can Build Authority on LinkedIn in 2026
          </h1>
          <p className="mt-4 text-xl text-neutral-200 font-light leading-8">
            The 2026 complete guide to mastering LinkedIn authority in an AI-driven era. Techniques, frameworks, and tools to earn trust, attract inbound, and lead your industry—based on the latest trends, search signals, and winning founder playbooks.
          </p>
          <div className="mt-8 flex flex-col items-center space-y-2">
            <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-cyan-900 to-blue-700 text-xs uppercase font-medium tracking-widest text-cyan-200 shadow">
              Updated for LinkedIn&apos;s 2026 Algorithm & AI Tools
            </span>
            <span className="inline-block px-4 py-1 rounded-full border border-blue-400/40 text-xs uppercase font-semibold tracking-wider text-blue-300 bg-white/5 backdrop-blur-sm shadow-inner">
              Deep-Dive Strategic Article
            </span>
          </div>
        </GlassCard>
      </section>
      {/* Main Body */}
      <article className="w-full max-w-3xl mx-auto space-y-16 px-4 md:px-0">
        {/* Section 1: The 2026 LinkedIn Landscape */}
        <section>
          <GlassCard as="section" className="p-8 md:p-12 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow">
              Understanding LinkedIn Authority in 2026
            </h2>
            <p className="text-lg font-extralight text-neutral-200 mb-6">
              LinkedIn's 2026 ecosystem is unlike any before: AI-generated content is ubiquitous, trust signals and genuine expertise surface above noise, and strategic founders use technology to build relationships at scale. Today, "authority" isn’t just follower count—it’s trust, depth, participation, and your perception as a problem solver in your niche.
            </p>
            <ul className="space-y-2 list-inside list-disc text-base text-blue-200/80">
              <li>
                <strong>Signal Over Volume:</strong> LinkedIn’s algorithm now rewards "signal density": depth, consistency, topical relevance and genuine conversation.
              </li>
              <li>
                <strong>AI Content Flood:</strong> With generative tools everywhere, only hybrid (human + AI) perspectives, case studies, and thought frameworks earn engagement.
              </li>
              <li>
                <strong>Relationship-Driven Outreach:</strong> Authority is measured in inbound opportunities, not just vanity metrics.
              </li>
            </ul>
          </GlassCard>
        </section>
        {/* Section 2: Strategic Frameworks for Authority */}
        <section>
          <GlassCard as="section" className="p-8 md:p-12 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow">
              Strategic Frameworks: How Founders Engineer Influence
            </h2>
            <p className="mb-6 text-neutral-300">
              Founders who win in 2026 deploy structured, proven frameworks for building trust and visibility. Here are three blueprints:
            </p>
            <div className="grid gap-8">
              <GlassCard as="section" className="p-5 shadow-inner border-blue-400/10 hover:border-blue-300/40">
                <h3 className="text-lg font-bold text-blue-200 mb-2">1. The Authority Pyramid Framework</h3>
                <ul className="pl-5 list-decimal text-base text-neutral-200/90 space-y-1">
                  <li>
                    <strong>Expertise Foundation:</strong> Share signature processes, case studies, and unique "point-of-view" content weekly.
                  </li>
                  <li>
                    <strong>Proof & Social Trust:</strong> Showcase client outcomes, testimonials, and data snapshots—tagging collaborators, not just clients.
                  </li>
                  <li>
                    <strong>Conversation & Community:</strong> Spark discussion in comments, run LinkedIn Audio rooms, and incentivize peers to remix your ideas.
                  </li>
                </ul>
              </GlassCard>
              <GlassCard as="section" className="p-5 shadow-inner border-blue-400/10 hover:border-blue-300/40">
                <h3 className="text-lg font-bold text-blue-200 mb-2">2. The AI-Augmented Content System</h3>
                <ul className="pl-5 list-decimal text-base text-neutral-200/90 space-y-1">
                  <li>
                    <strong>Content OS:</strong> Use AI tools (e.g., OpusClip, LinkedIn GPTs) to ideate, draft, and repurpose content 10x faster.
                  </li>
                  <li>
                    <strong>Human Filter:</strong> Layer in founder perspective, original stories, and nuanced takes to differentiate from AI-generated sameness.
                  </li>
                  <li>
                    <strong>Feedback Loops:</strong> Leverage analytics, polls, and direct DMs to tailor content to audience resonance.
                  </li>
                </ul>
              </GlassCard>
              <GlassCard as="section" className="p-5 shadow-inner border-blue-400/10 hover:border-blue-300/40">
                <h3 className="text-lg font-bold text-blue-200 mb-2">3. The 2026 Search Intent Ladder</h3>
                <ul className="pl-5 list-decimal text-base text-neutral-200/90 space-y-1">
                  <li>
                    <strong>SEO Signal Research:</strong> Target 2026 LinkedIn and off-platform search queries—pain points, buyer intent, key questions.
                  </li>
                  <li>
                    <strong>Topic Clustering:</strong> Map pillar topics and create interlinked content for algorithmic relevance.
                  </li>
                  <li>
                    <strong>Authority Boosters:</strong> Collaborate with niche influencers, guest-post on industry pages, and earn backlinks to your LinkedIn content.
                  </li>
                </ul>
              </GlassCard>
            </div>
          </GlassCard>
        </section>
        {/* Section 3: AI Tools & Content Systems */}
        <section>
          <GlassCard as="section" className="p-8 md:p-12 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow">
              The 2026 AI Toolbox for LinkedIn Authority
            </h2>
            <p className="mb-6 text-neutral-300">
              The game has changed: LinkedIn-native and ecosystem AI tools automate much of the busywork, so you focus on insight and relationships. Here’s what top founders use:
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              <GlassCard className="p-5 shadow-inner border-cyan-500/20">
                <h3 className="font-semibold text-cyan-300 mb-2">OpusClip / Castmagic</h3>
                <p className="text-neutral-200">
                  Transform webinars, podcasts, and writing into high-leverage short-form posts, carousels, and video clips—atomizing authority at scale.
                </p>
              </GlassCard>
              <GlassCard className="p-5 shadow-inner border-cyan-500/20">
                <h3 className="font-semibold text-cyan-300 mb-2">LinkedIn GPTs & Messaging AIs</h3>
                <p className="text-neutral-200">
                  Automate engagement: batch personalized DMs, nurture inbound leads, and schedule content drafts with context-aware AI assistants.
                </p>
              </GlassCard>
              <GlassCard className="p-5 shadow-inner border-cyan-500/20">
                <h3 className="font-semibold text-cyan-300 mb-2">2026 SEO Architects</h3>
                <p className="text-neutral-200">
                  AI that analyzes LinkedIn’s semantic search and surface new keyword opportunities, recommended content clusters, and visibility gaps.
                </p>
              </GlassCard>
              <GlassCard className="p-5 shadow-inner border-cyan-500/20">
                <h3 className="font-semibold text-cyan-300 mb-2">Content Scheduling Suites</h3>
                <p className="text-neutral-200">
                  Seamless publishing and optimization: adjust posting times for engagement curves and automate re-sharing of evergreen authority assets.
                </p>
              </GlassCard>
            </div>
          </GlassCard>
        </section>
        {/* Section 4: Authority Content Playbook */}
        <section>
          <GlassCard as="section" className="p-8 md:p-12 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow">
              Blueprint: Building a 30-Day LinkedIn Authority Engine
            </h2>
            <p className="mb-6 text-neutral-300">
              Here’s a 4-week proven approach, tailored for 2026’s founder-operators and solo leaders:
            </p>
            <div className="space-y-5">
              <GlassCard className="p-4 border-blue-700/15">
                <h3 className="font-semibold text-blue-100 mb-1">Week 1: Diagnose & Map</h3>
                <ul className="list-disc pl-4 text-sm text-neutral-200/90">
                  <li>Audit your profile & previous posts for topical focus, proof, and gaps.</li>
                  <li>Map your Ideal Authority Persona using AI analyzers.</li>
                  <li>Define core expertise, niche pain points, and audience search intent.</li>
                </ul>
              </GlassCard>
              <GlassCard className="p-4 border-blue-700/15">
                <h3 className="font-semibold text-blue-100 mb-1">Week 2: Content Foundation</h3>
                <ul className="list-disc pl-4 text-sm text-neutral-200/90">
                  <li>Draft one signature post, one case study/story, and one contrarian opinion piece. Use AI for ideation and outline, but write the final version in your voice.</li>
                  <li>Automate atomization and schedule “clips” using repurposing AI.</li>
                </ul>
              </GlassCard>
              <GlassCard className="p-4 border-blue-700/15">
                <h3 className="font-semibold text-blue-100 mb-1">Week 3: Engagement Engine</h3>
                <ul className="list-disc pl-4 text-sm text-neutral-200/90">
                  <li>Identify & engage with 10+ adjacent influencers’ content daily (insightful comments & thoughtful reactions).</li>
                  <li>Run a LinkedIn Q&A or panel, leveraging community-building AI prompts.</li>
                </ul>
              </GlassCard>
              <GlassCard className="p-4 border-blue-700/15">
                <h3 className="font-semibold text-blue-100 mb-1">Week 4: Authority Boost</h3>
                <ul className="list-disc pl-4 text-sm text-neutral-200/90">
                  <li>Showcase outcomes (testimonials, metrics, screenshots) in carousel or video form.</li>
                  <li>Collaborate on content with a peer founder or micro-influencer for exponential reach.</li>
                  <li>Review analytics and refine next month’s plan using AI-powered insights.</li>
                </ul>
              </GlassCard>
            </div>
          </GlassCard>
        </section>
        {/* Section 5: Advanced — 2026 Search Intent & LinkedIn SEO */}
        <section>
          <GlassCard as="section" className="p-8 md:p-12 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow">
              LinkedIn SEO & Search Intent Mastery: What Works in 2026
            </h2>
            <p className="mb-6 text-neutral-300">
              LinkedIn has become a search platform, not just a networking platform. Your profile, posts, and engagements must be search-optimized:
            </p>
            <ul className="space-y-2 list-disc list-inside text-base text-cyan-200/80">
              <li>
                <strong>Semantic Keyword Mapping:</strong> Integrate 2026’s trending keywords and pain points in headlines, posts, and About sections.
              </li>
              <li>
                <strong>Topic Cluster Linking:</strong> Internally link your posts, articles, and features—signal to LinkedIn what you’re known for.
              </li>
              <li>
                <strong>Rich Media Signals:</strong> Mix in carousels, videos, and polls (boosts on-platform time and shares).
              </li>
              <li>
                <strong>Off-platform Signals:</strong> Earn backlinks from podcasts, press, and guest posts to supercharge LinkedIn profile authority.
              </li>
            </ul>
            <div className="mt-6">
              <GlassCard className="p-6 border-cyan-500/20 shadow-inner">
                <h3 className="font-bold text-cyan-200 mb-3">2026 Search Intent Example Queries</h3>
                <ul className="list-disc pl-6 text-cyan-100/90 text-sm space-y-1">
                  <li>best AI-driven LinkedIn content system for founders 2026</li>
                  <li>how to build trust on LinkedIn post-LLM era</li>
                  <li>LinkedIn SEO strategies for SaaS founders in 2026</li>
                  <li>case studies of LinkedIn authority growth with AI</li>
                </ul>
                <p className="mt-2 text-cyan-100/80 text-xs italic">
                  These intent-driven queries should inform your content targeting and authority pillars.
                </p>
              </GlassCard>
            </div>
          </GlassCard>
        </section>
        {/* Section 6: FAQ */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqItems} />
        </section>
        {/* Section 7: Final CTA Inline */}
        <section>
          <GlassCard className="my-12 py-8 px-6 flex flex-col items-center bg-gradient-to-tr from-blue-900/60 to-black/70 border border-blue-400/20">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center text-blue-200 mb-3">
              Start Building Your Authority Today
            </h2>
            <p className="text-center max-w-2xl mx-auto mb-5 text-neutral-300 text-lg">
              Ready to become the go-to founder in your industry? Leverage these frameworks, deploy next-gen AI tools, and out-position the competition on LinkedIn.
            </p>
            <Link
              href="/contact"
              className="px-8 py-3 mt-2 rounded-2xl font-semibold bg-gradient-to-r from-blue-800 to-blue-500 text-white shadow-lg hover:from-cyan-700 hover:to-blue-400 transition-colors"
            >
              Let’s Talk LinkedIn Strategy →
            </Link>
          </GlassCard>
        </section>
      </article>
      {/* Footer */}
      <footer className="w-full mt-24 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500">© 2026 Executive Studio. Crafted for founders who lead.</span>
      </footer>
    </main>
  );
}