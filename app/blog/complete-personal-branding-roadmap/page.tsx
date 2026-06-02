"use client";

import React, { useState } from "react";
import Link from "next/link";

// --- GLASSCARD COMPONENT ---
function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-br from-neutral-900/80 to-black/90 border border-neutral-700/40 backdrop-blur-2xl shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
}

// --- FAQ ACCORDION COMPONENT ---
function FAQAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-cyan-900/40">
      {items.map((item, idx) => (
        <div key={item.question} className="py-2">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full text-left px-0 py-2 flex items-center justify-between text-cyan-100 font-semibold focus:outline-none"
            aria-expanded={openIndex === idx}
            aria-controls={`faq-content-${idx}`}
          >
            <span>{item.question}</span>
            <span className="ml-3 text-cyan-300 text-lg select-none">
              {openIndex === idx ? "–" : "+"}
            </span>
          </button>
          <div
            id={`faq-content-${idx}`}
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === idx ? "max-h-96 mt-1 opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={openIndex !== idx}
          >
            <p className="pl-1 pr-1 text-neutral-200 text-sm mb-1">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- FAQ DATA ---
const faqItems = [
  {
    question: "How long does building a personal brand actually take?",
    answer:
      "It depends on your baseline, resources, and goals, but most founders and executives need at least 6-18 months for significant traction. Deep trust and industry authority compound over years, not weeks—but strategic actions can accelerate outcomes.",
  },
  {
    question: "Do I need to be present on every social platform?",
    answer:
      "No. Select 1-2 core channels where your audience is most engaged (e.g., LinkedIn and podcasts for B2B; Instagram and YouTube for creative/consumer leadership), then syndicate elsewhere for distribution efficiency as you scale.",
  },
  {
    question: "How do I track the ROI of personal branding?",
    answer:
      "Set clear KPIs early (e.g., inbound deal quality, speaking invitations, referral volume, pipeline velocity, new lead sources, media mentions). Use attribution tracking in your CRM, monitor share-of-voice analytics, and survey your network for qualitative insights.",
  },
  {
    question: "Should I work with ghostwriters or an agency?",
    answer:
      "If you have the budget, working with a strategic partner accelerates content, positioning, and amplification. Still, executive access/authenticity is critical. Consider hybrid approaches: you ideate, a partner polishes and syndicates.",
  },
  {
    question: "What mistakes stall personal brands?",
    answer:
      "Inconsistent messaging, generic or 'follower-chasing' content, ignoring narrative pacing, failing to engage, and neglecting true expertise/insights. Success comes from relentless clarity, real value, and relationship stewardship.",
  },
];

// --- ROADMAP STEPS DATA ---
const roadmapSections = [
  {
    title: "1. Discover & Architect Your Brand Pillars",
    color: "cyan-200",
    content: (
      <>
        <p>
          True personal branding begins with radical self-clarity. Before outward expression, you must define the strategic foundations others will recognize, trust, and advocate for.
        </p>
        <ul className="list-disc ml-6 text-cyan-100/80 mt-3 space-y-1 text-sm">
          <li>
            <span className="font-semibold text-cyan-300">Purpose:</span> Why do you exist in business? Identify your “core why”—not just for profit, but legacy.
          </li>
          <li>
            <span className="font-semibold text-blue-200">Values:</span> Which principles are non-negotiable in how you operate, lead, and communicate?
          </li>
          <li>
            <span className="font-semibold text-emerald-200">Edge:</span> What unique combination of expertise, worldview, or methodology makes you irreplaceable?
          </li>
          <li>
            <span className="font-semibold text-cyan-300">Signature Topics:</span> Which 1-3 themes can you “own” in the public narrative?
          </li>
        </ul>
        <div className="mt-3 text-blue-200/90 text-xs italic">
          Tip: Map your Brand DNA visually. What “3 words” do you want your market to remember after one encounter?
        </div>
      </>
    ),
  },
  {
    title: "2. Position & Validate Your Executive Narrative",
    color: "blue-200",
    content: (
      <>
        <p>
          Translate your strategy into a magnetic “first impression.” Next-gen leaders frame their story not as a résumé, but as a living value promise. Get feedback; test resonance in your market.
        </p>
        <ol className="list-decimal ml-6 text-blue-100/90 mt-3 space-y-1 text-sm">
          <li>
            <span className="font-semibold text-blue-300">Unique Value Proposition (UVP):</span> Answer: “Why should someone trust you to solve their pressing problem?”
          </li>
          <li>
            <span className="font-semibold text-cyan-300">Signature Storyline:</span> Share narratives that reinforce humility, resolve, and vision—built for earned media and virality.
          </li>
          <li>
            <span className="font-semibold text-emerald-200">Positioning Audit:</span> Analyze competitor brands. What do they say—and what do they NOT say? Occupy that whitespace.
          </li>
        </ol>
        <div className="mt-3 text-blue-200/90 text-xs italic">
          Most founders under-invest here: “If you don’t anchor the story, the market will invent one for you.”
        </div>
      </>
    ),
  },
  {
    title: "3. Optimize Professional Platforms (LinkedIn, Website, & Media Assets)",
    color: "emerald-200",
    content: (
      <>
        <p>
          You only get one reputation. Ensure your digital front doors communicate credibility, elegance, and differentiation—at a glance and in every detail.
        </p>
        <ul className="list-disc ml-6 text-emerald-100 mt-3 space-y-1 text-sm">
          <li>
            <span className="font-semibold text-emerald-300">LinkedIn:</span> Rewrite headline, summary, and work history for authority—not just roles. Use proof points and leadership outcomes.
          </li>
          <li>
            <span className="font-semibold text-cyan-200">Website:</span> Host a personal or founder site. Feature press, testimonials, and a strong “About + Vision” page. Integrate newsletter or lead magnet signup.
          </li>
          <li>
            <span className="font-semibold text-blue-200">Media Kit:</span> Build an on-brand, media-ready PDF (bio, imagery, brand assets, publication quotes).
          </li>
        </ul>
        <div className="mt-3 text-emerald-200/90 text-xs italic">
          “Luxury is detail—all roads lead to the first Google page, and it must feel ‘by design’.”
        </div>
      </>
    ),
  },
  {
    title: "4. Build Content Systems for Thought Leadership",
    color: "cyan-100",
    content: (
      <>
        <p>
          Consistency amplifies authority. Map your topics, workflows, and distribution pipelines to build omnipresence without burnout.
        </p>
        <ol className="list-decimal ml-6 text-cyan-100/90 mt-3 space-y-1 text-sm">
          <li>
            <span className="font-semibold text-cyan-200">Signature Series:</span> Launch a recurring content sequence (eg: “Founder Lessons Fridays” or “Executive Q&A”).
          </li>
          <li>
            <span className="font-semibold text-blue-200">“MVP” Content Stack:</span> Short-form posts, carousel explainers, and 3-minute videos. Use AI tools for efficiency, but infuse with personal insights.
          </li>
          <li>
            <span className="font-semibold text-emerald-200">Content Calendar:</span> Plan themes, launches, and engagement blocks for 60-90 days in advance. Evaluate what resonates weekly.
          </li>
        </ol>
        <div className="mt-3 text-cyan-300/80 text-xs italic">
          Content done well = attracts allies, partnerships, and “inbound deal flow” at scale.
        </div>
      </>
    ),
  },
  {
    title: "5. Amplify Credibility With Earned Media & Social Proof",
    color: "violet-200",
    content: (
      <>
        <p>
          Trust is public. Elevate your profile through association and amplification—let others do your talking.
        </p>
        <ul className="list-disc ml-6 text-violet-100/90 mt-3 space-y-1 text-sm">
          <li>
            <span className="font-semibold text-violet-300">Earned Media:</span> Guest articles, podcast features, industry panels, or leadership roundtables.
          </li>
          <li>
            <span className="font-semibold text-blue-300">Testimonials:</span> Collect and showcase founder, client, and peer endorsements in every channel.
          </li>
          <li>
            <span className="font-semibold text-cyan-300">Awards/Recognitions:</span> Apply for “top entrepreneur” or industry “innovator” lists to shortcut trust.
          </li>
        </ul>
        <div className="mt-3 text-violet-200/80 text-xs italic">
          Each validation = one less objection in a high-stakes deal or partnership.
        </div>
      </>
    ),
  },
  {
    title: "6. Unlock and Monetize Multi-Channel Opportunities",
    color: "gold",
    content: (
      <>
        <p>
          Once authority compounds, your platform is built for scale: product launches, new ventures, deal flow, or recurring revenue. Distribute your expertise, not just your offers.
        </p>
        <ol className="list-decimal ml-6 text-yellow-200 mt-3 space-y-1 text-sm">
          <li>
            <span className="font-semibold text-yellow-200">Premium IP:</span> Turn knowledge into courses, masterclasses, or proprietary frameworks.
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Keynote Speaking:</span> Command top stages and craft high-ROI event narratives.
          </li>
          <li>
            <span className="font-semibold text-yellow-300">Licensing & Partnerships:</span> Monetize authority via joint ventures, media syndication, or lucrative brand ambassador roles.
          </li>
        </ol>
        <div className="mt-3 text-yellow-300/90 text-xs italic">
          “The best founder brands launch movements, not just products.”
        </div>
      </>
    ),
  },
];

// --- METRIC GUIDE DATA ---
const metricKPIList = [
  {
    title: "Brand Awareness Metrics",
    points: [
      "Google Search volume for your name/firm",
      "Media features, podcast invitations, event appearances",
      "Social profile visits and follower growth (track % of right-fit prospects, not just raw volume)",
    ],
  },
  {
    title: "Engagement & Thought Leadership",
    points: [
      "Average post saves, shares, and DM replies (not just public likes)",
      "Qualified comments and strategic inbound (deal/leads, partnership, press)",
      "Newsletter open rates and forward/share volume",
    ],
  },
  {
    title: "Trust & Authority Validation",
    points: [
      "Testimonials published/received per quarter",
      "Mentions in industry communities or peer round-ups",
      "Third-party awards or recognitions earned",
    ],
  },
  {
    title: "Revenue & Opportunity Metrics",
    points: [
      "Pipeline attribution (from personal brand assets vs. paid ads/other sources)",
      "Referrals from content, media, or key opinion leaders",
      "New business, consulting, or partnership deals attributed to personal brand equity",
    ],
  },
  {
    title: "Personal Influence Expansion",
    points: [
      "Trend: Number of strategic ‘asks’ fielded each quarter",
      "Invitations to exclusive events, groups, masterminds",
      "Organic syndication: major company or influencer accounts sharing your expertise",
    ],
  },
];

// --- MAIN PAGE COMPONENT ---
export default function CompletePersonalBrandingRoadmapPage() {
  return (
    <main className="bg-gradient-to-tr from-neutral-950 via-black to-neutral-900 min-h-screen w-full pt-2 text-neutral-100 pb-16">
      {/* HERO SECTION */}
      <section className="max-w-3xl mx-auto mt-8 md:mt-16 px-4 md:px-0 mb-8">
        <GlassCard className="py-10 px-8 md:px-16 flex flex-col items-center bg-gradient-to-tr from-cyan-900/80 to-black/80 border border-cyan-400/25">
          <h1 className="text-3xl md:text-5xl font-extrabold text-cyan-200 mb-4 text-center tracking-tight">
            The Complete Personal Branding Roadmap (2026 Edition)
          </h1>
          <p className="text-center text-lg md:text-xl text-neutral-300 max-w-2xl mb-4">
            Build undeniable market authority step-by-step—from your “brand DNA” to monetized multi-channel influence. <span className="font-bold text-cyan-300">Founder-tested playbooks, KPI frameworks, and luxury brand strategy secrets—no fluff.</span>
          </p>
          <div className="mt-2 text-cyan-100/90 text-xs font-mono text-center max-w-lg">
            Updated for 2026: Position yourself for AI-era market disruption, C-suite buy-in, and inbound deal flow. <br />The strategy trusted by founders, VCs, and high-growth executives worldwide.
          </div>
        </GlassCard>
      </section>

      {/* ROADMAP SECTIONS */}
      <article className="max-w-3xl mx-auto px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-100 mb-6 mt-12 text-center">
          Chronological Milestone Roadmap
        </h2>
        <ol className="space-y-8">
          {roadmapSections.map((step, i) => (
            <li key={step.title}>
              <GlassCard
                className={`p-7 md:p-10 ${
                  i === 0
                    ? "border-cyan-400/40"
                    : i === roadmapSections.length - 1
                    ? "border-yellow-300/40"
                    : i % 2 === 0
                    ? "border-emerald-200/30"
                    : "border-blue-400/25"
                }`}
              >
                <h3
                  className={`text-xl md:text-2xl font-extrabold mb-2 ${
                    step.color === "cyan-200"
                      ? "text-cyan-200"
                      : step.color === "blue-200"
                      ? "text-blue-200"
                      : step.color === "emerald-200"
                      ? "text-emerald-200"
                      : step.color === "cyan-100"
                      ? "text-cyan-100"
                      : step.color === "violet-200"
                      ? "text-violet-200"
                      : step.color === "gold"
                      ? "text-yellow-200"
                      : "text-cyan-200"
                  }`}
                >
                  {step.title}
                </h3>
                <div className="prose prose-invert prose-sm text-neutral-200 max-w-none">
                  {step.content}
                </div>
              </GlassCard>
            </li>
          ))}
        </ol>
      </article>

      {/* METRICS & KPI TRACKING */}
      <section className="max-w-3xl mx-auto mt-16 mb-20 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-100 mb-6 text-center">
          KPIs & Metrics: Track the Value of Your Personal Brand
        </h2>
        <GlassCard className="py-8 px-6 md:px-12 flex flex-col space-y-5">
          <p className="mb-1 text-neutral-300 text-md text-center">
            World-class brands don’t just create, they measure. Use these KPIs to track progress, unlock data-driven improvements, and prove ROI to stakeholders and partners.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metricKPIList.map((kpi) => (
              <div key={kpi.title}>
                <h4 className="font-bold text-cyan-300 mb-2 text-lg">{kpi.title}</h4>
                <ul className="list-disc ml-5 text-cyan-100/90 text-sm">
                  {kpi.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-5 text-blue-200/90 text-xs italic text-center">
            “What gets measured, gets improved: Set KPIs, track monthly, and review market shifts at least quarterly.”
          </div>
        </GlassCard>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto mb-20 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
          The Ultimate Personal Branding FAQ
        </h2>
        <FAQAccordion items={faqItems} />
      </section>

      {/* HIGH-CONVERTING MASTERCLASS CTA */}
      <section className="flex flex-col items-center my-20 px-4">
        <GlassCard className="py-12 px-8 md:px-16 max-w-xl w-full flex flex-col items-center bg-gradient-to-r from-cyan-900/70 to-cyan-950/90 border border-cyan-400/25 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-cyan-200 mb-3">
            Enroll in the 2026 Personal Brand Masterclass
          </h2>
          <p className="text-center max-w-xl mx-auto mb-5 text-neutral-300 text-lg">
            Fast-track your reputation, revenue, and global impact. <span className="text-blue-200 font-semibold">Join our exclusive masterclass</span> for elite founders and executives—tight cohorts, hands-on frameworks, private expert Q&A.
          </p>
          <Link
            href="https://forms.gle/personal-brand-masterclass"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 mt-2 rounded-2xl font-semibold bg-gradient-to-r from-cyan-800 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-400 transition-colors"
          >
            Apply for the Masterclass →
          </Link>
          <p className="mt-3 text-xs text-neutral-400 italic">
            Limited seats. No cold pitches. Confidential founder-to-founder environment.
          </p>
        </GlassCard>
      </section>

      {/* FOOTER */}
      <footer className="w-full mt-16 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500 text-center">
          © 2026 Executive Studio. Crafted for visionaries and founders shaping tomorrow.
        </span>
      </footer>
    </main>
  );
}