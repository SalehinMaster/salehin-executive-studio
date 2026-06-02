'use client';

import React, { useState } from "react";
import Link from "next/link";

// --- GlassCard Component ---
function GlassCard({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/15 bg-gradient-to-br from-slate-900/70 to-blue-950/80 backdrop-blur-xl shadow-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// --- FAQ Accordion Component ---
function FAQAccordion({
  items,
}: {
  items: { question: string; answer: React.ReactNode }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <GlassCard
          key={i}
          className={`transition-all px-6 py-4 ${openIndex === i ? "border-blue-400/40" : "border-white/10"
            }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center text-left focus:outline-none"
            aria-expanded={openIndex === i}
          >
            <span className="font-semibold text-white text-base">
              {item.question}
            </span>
            <span className="ml-3 text-blue-300 text-xl">
              {openIndex === i ? "−" : "+"}
            </span>
          </button>
          {openIndex === i && (
            <div className="mt-2 text-cyan-100/90 text-sm">{item.answer}</div>
          )}
        </GlassCard>
      ))}
    </div>
  );
}

// --- Quiz/Checklist for Founder Decision ---
const founderChecklist = [
  {
    text: "I have at least 4-6 hours per week to ideate, draft, edit, and publish high-quality posts.",
    impact: "DIY-Favored"
  },
  {
    text: "Maintaining an unfiltered, personal tone outweighs all other priorities.",
    impact: "DIY-Favored"
  },
  {
    text: "My brand already has a clear, documented content style guide.",
    impact: "Both"
  },
  {
    text: "I struggle to consistently post or find myself missing LinkedIn opportunities.",
    impact: "Ghostwriting-Favored"
  },
  {
    text: "My hourly rate (or opportunity cost) is higher than $400/hr.",
    impact: "Ghostwriting-Favored"
  },
  {
    text: "Confidentiality and NDA protections are non-negotiable for me.",
    impact: "Both"
  },
  {
    text: "I'm a founder or executive with complex stories, white papers, or PR to share.",
    impact: "Ghostwriting-Favored"
  },
];

function ChecklistQuiz() {
  const [checked, setChecked] = useState<boolean[]>(
    Array(founderChecklist.length).fill(false)
  );
  let diy = 0, ghost = 0;
  checked.forEach((is, i) => {
    if (is) {
      if (founderChecklist[i].impact === "Ghostwriting-Favored") ghost++;
      if (founderChecklist[i].impact === "DIY-Favored") diy++;
    }
  });
  return (
    <GlassCard className="p-6 mb-8 border-cyan-400/20">
      <h3 className="text-xl font-bold text-cyan-200 mb-2">
        Should You DIY or Hire a Ghostwriter? (Quiz)
      </h3>
      <form className="space-y-3 mb-4">
        {founderChecklist.map((q, i) => (
          <label key={i} className="flex gap-3 items-start cursor-pointer select-none">
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={e => {
                const next = [...checked];
                next[i] = e.target.checked;
                setChecked(next);
              }}
              className="accent-blue-500 mt-1"
            />
            <span className="text-neutral-100/90 text-base">{q.text}</span>
          </label>
        ))}
      </form>
      <div className="mt-3">
        <GlassCard className="bg-gradient-to-r from-blue-900/80 to-black/50 border-blue-400/20 p-4">
          <span className="block text-cyan-200 font-semibold mb-1 text-sm uppercase tracking-wide">
            {(() => {
              if (ghost > diy && ghost > 1) return "Ghostwriting is Strongly Favored";
              if (diy > ghost && diy > 1) return "DIY May Be Your Best Bet";
              return "Consider a Hybrid or Consulting Solution";
            })()}
          </span>
          <span className="text-xs text-neutral-400">
            Tip: Your optimal route combines ROI, authenticity, and consistency. See your pattern above.
          </span>
        </GlassCard>
      </div>
    </GlassCard>
  );
}

// --- ROI Comparison Table ---
const pricingTable = [
  {
    plan: "DIY (Founder-Led)",
    monthly: "$0 direct, but 15–20+ hours of your time",
    details:
      "You invest your own time ideating, writing, editing, and publishing. Hidden cost: time away from growth, product, or sales. Outsourced design/video skills still advisable.",
    roi: "High authenticity, variable consistency, lowest direct spend"
  },
  {
    plan: "Fractional Ghostwriter (Premium Agency)",
    monthly: "$2000–$6000+ /mo",
    details:
      "Full-service: strategy calls, outline, research, personal storytelling, post-level ROI tracking, brand-safe voice. Most agencies cater to execs/founders; scale from 4-12 posts/month.",
    roi: "Highest consistency & polish, time-rich, lowest founder input"
  },
  {
    plan: "Freelance Ghostwriter",
    monthly: "$800–$3000 /mo",
    details:
      "Solo operator, often part-time. Helps with drafting & editing, but may lack in-depth brand guardianship, research for strategic direction, or advanced analytics.",
    roi: "Good value, but variable reliability, limited scale, may lack replacements for vacation/illness"
  }
];

// --- FAQ Items ---
const faqItems = [
  {
    question: "What's the difference between a premium agency and a freelance ghostwriter?",
    answer: (
      <>
        <strong className="text-blue-200">Agency:</strong> Offers brand-matched, team-based content (multiple writers, strategist, editor) and robust security protocols. Ideal for founders wanting scale, confidentiality, guaranteed delivery, and a higher investment.<br /><br />
        <strong className="text-cyan-200">Freelancer:</strong> A talented individual who may be more agile and affordable, but riskier (sickness, bandwidth, process gaps). Great for founders with time to guide/co-edit content.
      </>
    ),
  },
  {
    question: "Can a ghostwriter truly match my voice and opinions?",
    answer: (
      <>
        The best ghostwriters invest in deep brand immersions, interviews, and voice sampling. Top agencies even create 'voice mirrors'—repositories of phrases, slang, and tone unique to you. DIY is unmatched for authenticity, but expert ghostwriters can get close.<br /><br />
        Request writing samples and a collaborative content calendar to ensure alignment.
      </>
    ),
  },
  {
    question: "Is ghostwriting against LinkedIn’s guidelines or frowned upon?",
    answer: (
      <>
        No—so long as the posts authentically reflect your real views and don’t mislead about authorship. LinkedIn’s priority is transparency (avoid AI-only posts or fake testimonials).
      </>
    ),
  },
  {
    question: "How can I measure the ROI of ghostwriting vs DIY?",
    answer: (
      <>
        Track KPIs: profile views, inbound messages, engagement rates, qualified leads, and time saved. Agencies often supply dashboards; for DIY, build simple content/lead trackers in Notion or Sheets.
      </>
    ),
  },
];

// --- Main Page Component ---
export default function LinkedInGhostwritingVsDIYPage() {
  return (
    <main className="bg-gradient-to-br from-[#090c17] via-[#111622] to-[#030712] min-h-screen w-full pb-24">
      {/* HEADER */}
      <header className="max-w-3xl mx-auto pt-12 pb-6 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-400 mb-4">
          LinkedIn Ghostwriting vs DIY Content: ROI, Authenticity & The Founder’s Dilemma
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 font-medium mb-3">
          Should you build your LinkedIn presence with your own words or bring in an expert ghostwriter? Explore the time, money, and authenticity tradeoffs—plus get a founder checklist and premium agency insights—so you can decide with confidence for 2026 and beyond.
        </p>
        <span className="font-mono text-xs text-fuchsia-300 tracking-wide">
          By Executive Studio • 2026 Authority Series
        </span>
      </header>

      {/* HERO / INTRO */}
      <section className="max-w-2xl mx-auto mb-12 px-4">
        <GlassCard className="p-8 md:p-10 border-cyan-400/15 text-neutral-100 text-base leading-7">
          <p className="mb-3">
            <span className="text-blue-200 font-semibold">Fact:</span> 83% of founders plan to double down on personal brand content in 2026—yet less than a third will post regularly for more than six months.
          </p>
          <p className="mb-5">
            Why? Crafting compelling LinkedIn content takes time, creative energy, and ruthless consistency. For time-starved leaders, that spells a problem—until you consider the rising tide of specialist ghostwriters, both agencies and top freelancers.
          </p>
          <p className="mb-7 text-cyan-200 font-semibold">
            Should you write it yourself or hire a pro? Let’s break down costs, ROI, and authenticity so you can win with your LinkedIn strategy.
          </p>
        </GlassCard>
      </section>

      {/* SECTION: The Real Costs of DIY vs Ghostwriting */}
      <section className="max-w-3xl mx-auto mb-16 px-4">
        <GlassCard className="p-8 mb-8 border-pink-300/10">
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-200 mb-3">
            Understanding the Real ROI: Time, Money, & Brand Equity
          </h2>
          <ul className="space-y-3 mb-4 text-neutral-100/90 text-base list-disc pl-5">
            <li>
              <span className="font-semibold text-cyan-300">DIY Content:</span> All brand stories, creative energy, and nuances flow directly from you. It’s the gold standard for authenticity, thought leadership, and network intimacy—but it’s time-intensive and inconsistent under pressure.
            </li>
            <li>
              <span className="font-semibold text-blue-300">Agency/Freelance Ghostwriting:</span> Outsource ideation, research, drafts, and post-scheduling. Top ghostwriters act as strategic partners and voice mimics. The tradeoff: monthly cost, but you reclaim time for high-leverage activities.
            </li>
            <li>
              <span className="font-semibold text-fuchsia-300">Hidden Costs:</span> DIY isn’t “free.” Your hourly value, lost deals, and missed consistency must be factored in.
            </li>
          </ul>
          <p className="text-neutral-400 text-[15px]">
            In both scenarios, brand equity grows with <span className="text-cyan-300 font-semibold">consistency</span> and <span className="text-fuchsia-300 font-semibold">relevancy</span>&nbsp;— regardless of authorship.
          </p>
        </GlassCard>

        {/* ROI PRICING TABLE */}
        <div className="overflow-x-auto mb-8">
          <GlassCard className="min-w-[600px] md:min-w-0 p-0 border-blue-400/20">
            <table className="w-full table-auto border-separate border-spacing-y-2 text-sm text-left">
              <thead>
                <tr>
                  <th className="py-4 px-4 text-cyan-200 font-bold">Solution</th>
                  <th className="py-4 px-4 text-blue-200 font-bold text-center">Monthly Cost</th>
                  <th className="py-4 px-4 text-fuchsia-200 font-bold">Key Details</th>
                  <th className="py-4 px-4 text-pink-200 font-bold">ROI Snapshot</th>
                </tr>
              </thead>
              <tbody>
                {pricingTable.map((row, i) => (
                  <tr key={i} className="transition hover:bg-cyan-900/20">
                    <td className="py-4 px-4 font-semibold text-base">{row.plan}</td>
                    <td className="py-4 px-4 text-center text-cyan-100">{row.monthly}</td>
                    <td className="py-4 px-4 text-neutral-100/90">{row.details}</td>
                    <td className="py-4 px-4 text-neutral-100">{row.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>

        <p className="text-neutral-400 text-[15px] italic">
          Source: 2025-2026 ghostwriting agency proposals & founder LinkedIn studies. Figures may vary by niche, volume, and geography.
        </p>
      </section>

      {/* SECTION: The Authenticity Equation */}
      <section className="max-w-3xl mx-auto mb-14 px-4">
        <GlassCard className="p-7 border-fuchsia-500/15">
          <h3 className="text-xl text-fuchsia-200 font-bold mb-3">
            Does Ghostwriting Dilute Your Voice?
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-100 text-base mb-3">
            <li>
              Modern ghostwriting is <span className="font-semibold text-cyan-300">collaborative</span>, not just “outsourced.” Top partners conduct interviews, study your syntax, and mirror your real insights.
            </li>
            <li>
              <span className="font-semibold text-blue-200">DIY</span> works best if you have the time, discipline, and a personal point-of-view shaped by lived experience.
            </li>
            <li>
              <span className="font-semibold text-amber-200">Advanced Option:</span> Consider a hybrid—ghostwriter drafts, you add a final ‘imprint’ before publishing.
            </li>
          </ul>
          <p className="text-xs text-neutral-400 italic">Truth: The best founders don’t abandon authenticity— they build systems to scale it.</p>
        </GlassCard>
      </section>

      {/* SECTION: Decision Checklist/Quiz */}
      <section className="max-w-2xl mx-auto mb-20 px-4">
        <ChecklistQuiz />
      </section>

      {/* SECTION: Founder FAQ */}
      <section className="max-w-3xl mx-auto mb-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Agency vs Freelancer? Your Top Ghostwriting Questions, Answered
        </h2>
        <FAQAccordion items={faqItems} />
      </section>

      {/* SECTION: Deep Dive - Which Is Best for Brand Growth in 2026? */}
      <section className="max-w-2xl mx-auto mb-16 px-4">
        <GlassCard className="p-7 border-blue-400/15">
          <h3 className="text-xl font-bold text-blue-200 mb-2">
            Who Wins for Brand & Deal Flow?
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-100 text-base mb-2">
            <li>
              <span className="font-semibold text-cyan-300">DIY founders</span> build credibility fastest <span className="italic text-neutral-200">if</span> they post original stories weekly—especially failures, lessons, and peer/market commentary.
            </li>
            <li>
              <span className="font-semibold text-pink-300">Agency ghostwriting</span> drives exponential growth when you need volume, polish, and data-driven content hybrids—for example, when scaling fundraising, launches, or CEO thought leadership.
            </li>
            <li>
              <span className="font-semibold text-fuchsia-300">Freelancer partnership</span> suits those with tight budgets who value creativity and can accept process risk (e.g., coverage gaps, less security).
            </li>
            <li>
              <span className="font-semibold text-emerald-200">Hybrid:</span> Several top founders batch ideas monthly, then let pros craft and schedule while retaining ‘final say’.
            </li>
          </ul>
          <p className="text-xs text-blue-100/80 mt-3 italic">
            No one path is objectively “best”—the most successful campaigns evolve with your growth stage, audience feedback, and time leverage.
          </p>
        </GlassCard>
      </section>

      {/* SECTION: Final Premium CTA */}
      <section className="flex flex-col items-center my-20 px-4">
        <GlassCard className="py-10 px-8 md:px-16 max-w-xl w-full flex flex-col items-center bg-gradient-to-r from-blue-900/70 to-black/80 border border-blue-400/25 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-blue-200 mb-3">
            Want Executive-Grade Ghostwriting or LinkedIn Growth Audit?
          </h2>
          <p className="text-center max-w-xl mx-auto mb-5 text-neutral-300 text-lg">
            Book a private consult with our founder agency. Discuss high-impact ghostwriting, content strategy, and plug-and-play LinkedIn systems. <span className="text-cyan-200 font-semibold">Confidential. Zero hard sell.</span>
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 mt-2 rounded-2xl font-semibold bg-gradient-to-r from-cyan-800 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-400 transition-colors"
          >
            Book My Strategy Call →
          </Link>
          <p className="mt-3 text-xs text-neutral-400 italic">
            By application only. Discreet, founder-to-founder advisory.
          </p>
        </GlassCard>
      </section>

      {/* FOOTER */}
      <footer className="w-full mt-16 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500">
          © 2026 Executive Studio. Crafted for creators, founders, and leaders.
        </span>
      </footer>
    </main>
  );
}