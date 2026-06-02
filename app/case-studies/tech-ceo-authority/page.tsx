"use client";

import { useState } from "react";
import Link from "next/link";

// --- GlassCard Component (Minimal, matches house style) ---
function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl shadow-[0_4px_32px_4px_#47bbfb15] bg-gradient-to-br from-blue-900/60 to-black/60 border border-blue-400/10 backdrop-blur-md p-6 md:p-9 " +
        className
      }
    >
      {children}
    </div>
  );
}

const faqs = [
  {
    q: "How quickly can results like this be achieved?",
    a: "While growth depends on baseline assets and sector, clients often see measurable momentum within the first 6-8 weeks after strategic profile redesign and audience dial-in. Viral scaling typically compounds in quarter 2-3.",
  },
  {
    q: "What's the role of ghostwriting in your process?",
    a: "We leverage proven ghostwriting workflows that preserve your voice, distill your IP, and ensure posts hit peak resonance—enabling scale while maintaining authenticity with high-value prospects.",
  },
  {
    q: "How is content topic selection handled for maximum reach?",
    a: "We use live audience data and proprietary frameworks to prioritize narrative themes, balancing viral potential with domain authority signals. Regular adjustments capitalize on pulse trends and algorithmic changes.",
  },
  {
    q: "Are these ghostwriting strategies platform-agnostic?",
    a: "While optimized for LinkedIn, the underlying frameworks adapt well to Twitter, personal blogs, and newsletter ecosystems for compound influence.",
  },
  {
    q: "What's required from the client for success?",
    a: "Minimal: A focused onboarding, biweekly async feedback, and candid access to your professional story. Our team handles the rest—from distribution to data tracking.",
  },
];

export default function TechCeoAuthorityCaseStudyPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#101629] via-black to-[#0d1626] flex flex-col items-center justify-start px-2 pb-12">

      {/* --- HEADER --- */}
      <header className="w-full max-w-5xl mx-auto pt-16 pb-2 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-[#c9fbff] via-blue-300 to-fuchsia-200 text-transparent bg-clip-text drop-shadow-lg mb-3 tracking-tight">
          Case Study: Scaling a Tech CEO&apos;s Brand to 100k+ Followers & 2M+ Monthly Impressions
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg md:text-xl text-blue-100/90 font-medium">
          An inside look at how a SaaS founder grew influence, pipeline, and category leadership—leveraging viral frameworks, bulletproof workflows, and a luxury positioning strategy on LinkedIn.
        </p>
      </header>

      {/* --- HERO METRICS --- */}
      <section className="w-full max-w-4xl flex flex-col md:flex-row gap-6 justify-center items-stretch my-10 px-2">
        <GlassCard className="flex-1 flex flex-col items-center text-center animate-fade-in">
          <span className="font-bold text-4xl text-blue-200">100,000+</span>
          <span className="uppercase tracking-wider text-xs text-blue-200/80 font-semibold mt-2 mb-0.5">
            LinkedIn Followers
          </span>
          <span className="text-blue-100/80 text-sm">
            12 to 100k in 19 months
          </span>
        </GlassCard>
        <GlassCard className="flex-1 flex flex-col items-center text-center animate-fade-in">
          <span className="font-bold text-4xl text-blue-200">2M+</span>
          <span className="uppercase tracking-wider text-xs text-blue-200/80 font-semibold mt-2 mb-0.5">
            Monthly Impressions
          </span>
          <span className="text-blue-100/80 text-sm">
            10,000+ avg engagements/mo
          </span>
        </GlassCard>
        <GlassCard className="flex-1 flex flex-col items-center text-center animate-fade-in">
          <span className="font-bold text-4xl text-blue-200">$4.2M</span>
          <span className="uppercase tracking-wider text-xs text-blue-200/80 font-semibold mt-2 mb-0.5">
            Attributed Pipeline
          </span>
          <span className="text-blue-100/80 text-sm">
            Surpassed in 16 months
          </span>
        </GlassCard>
      </section>

      {/* --- STRATEGY BREAKDOWN --- */}
      <section className="w-full max-w-4xl mx-auto my-12">
        <GlassCard className="mb-10 bg-gradient-to-br from-black/80 to-blue-900/30 border-blue-700/25">
          <h2 className="text-xl md:text-2xl font-bold text-blue-200 mb-2 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.1}>
              <circle cx="12" cy="12" r="10" className="stroke-blue-200/40" />
              <path d="M7 13.5l3 3 6-6" className="stroke-blue-300" />
            </svg>
            Viral Post Frameworks Applied
          </h2>
          <ul className="list-disc pl-6 text-blue-100/90 text-base font-medium space-y-2">
            <li>
              <span className="text-blue-200 font-semibold">Insight-Tease Hooking:</span> Lead with direct contrarian takeaways, followed by a high-drama personal anecdote or data visual.
            </li>
            <li>
              <span className="text-blue-200 font-semibold">Story Loops:</span> Introduced micro-stories to keep attention and boost dwell time (core for LinkedIn's algorithm).
            </li>
            <li>
              <span className="text-blue-200 font-semibold">Visual Frameworks:</span> Simple diagrams/flows via Canva, always <span className="italic">brand-matched</span> and optimized for mobile, shared natively.
            </li>
            <li>
              <span className="text-blue-200 font-semibold">Demand-Gen Callouts:</span> Strategic CTAs and category comments, prompting high-value conversation and reposts.
            </li>
          </ul>
        </GlassCard>

        <GlassCard className="mb-10 bg-gradient-to-br from-black/70 to-blue-900/20 border-blue-700/15">
          <h2 className="text-xl md:text-2xl font-bold text-blue-200 mb-2 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.1}>
              <path d="M17 17l-5-5-5 5" className="stroke-blue-300" />
              <circle cx="12" cy="12" r="10" className="stroke-blue-200/40" />
            </svg>
            Distribution & Algorithmic Secrets
          </h2>
          <ul className="list-disc pl-6 text-blue-100/90 text-base font-medium space-y-2">
            <li>
              <span className="text-blue-200 font-semibold">Engagement Pods & Warmup:</span> Timed engagement windows drive algorithmic 'seed', boosting velocity in first 30-90 minutes.
            </li>
            <li>
              <span className="text-blue-200 font-semibold">Pulse Posting:</span> Weekday pulse times mapped to C-level prospect logins; never weekends.
            </li>
            <li>
              <span className="text-blue-200 font-semibold">API Signal Scraping:</span> Monitoring concurrent trending keywords; agile post pivots to integrate current conversations.
            </li>
            <li>
              <span className="text-blue-200 font-semibold">Comment Bumping System:</span> Strategic commenting ladders among expert accounts to surface posts in secondary networks.
            </li>
          </ul>
        </GlassCard>

        <GlassCard className="mb-10 bg-gradient-to-br from-black/75 to-blue-900/30 border-blue-700/20">
          <h2 className="text-xl md:text-2xl font-bold text-blue-200 mb-2 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.1}>
              <rect width="16" height="16" x="4" y="4" rx="3" className="stroke-blue-200/40" />
              <path d="M8 12h8M12 8v8" className="stroke-blue-300" />
            </svg>
            Ghostwriting Workflow Scalability
          </h2>
          <ol className="list-decimal pl-6 text-blue-100/90 text-base font-medium space-y-2">
            <li>
              Weekly async interviews extracted CEO's POV and freshest market stories
            </li>
            <li>
              Content frameworks loaded into a Notion board for collaborative ideation and revision
            </li>
            <li>
              Approval flows and direct-to-draft scheduling through integrated Zapier automations
            </li>
            <li>
              Advanced plagiarism-check and AI fine-tune pass for brand voice lock-in
            </li>
            <li>
              Dedicated community manager for first-line DM/reply triage and conversion tracking
            </li>
          </ol>
        </GlassCard>

        <GlassCard className="mb-10 bg-gradient-to-br from-black/85 to-blue-900/30 border-blue-700/20">
          <h2 className="text-xl md:text-2xl font-bold text-blue-200 mb-2 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.1}>
              <ellipse cx="12" cy="12" rx="10" ry="8" className="stroke-blue-200/40" />
              <path d="M8 13s1.5 2 4 2 4-2 4-2" className="stroke-blue-300" />
            </svg>
            Profile Design Transformation
          </h2>
          <ul className="list-disc pl-6 text-blue-100/90 text-base font-medium space-y-2">
            <li>
              Custom banner + highlights bar: stacks proof, press, and high-ticket case studies above the fold
            </li>
            <li>
              Profile headline overhaul utilizing keyword clusters and the “Niche SaaS/Result/Proof” formula
            </li>
            <li>
              All links and CTAs redirected to trackable lead magnets and consultation booking forms
            </li>
            <li>
              Recommendations engineered for third-party proof and branded consistency
            </li>
          </ul>
        </GlassCard>

        <GlassCard className="mb-4 bg-gradient-to-br from-black/80 to-blue-900/20 border-blue-700/25">
          <h2 className="text-xl md:text-2xl font-bold text-blue-200 mb-2 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.1}>
              <path d="M3 3h18v18H3z" className="stroke-blue-200/40" />
              <path d="M9 9h6v6H9z" className="stroke-blue-300" />
            </svg>
            Engagement Metrics Tracking
          </h2>
          <div className="flex flex-col md:flex-row gap-6 items-center mt-3">
            <div className="flex-1">
              <ul className="list-disc pl-6 text-blue-100/90 text-base font-medium space-y-2">
                <li>Weekly dashboards for post reach, profile views, DM volume, and campaign attribution</li>
                <li>Alerting system for sudden spike tracking and viral post detection</li>
                <li>Quarterly reviews directly mapped to inbound pipeline and meeting bookings</li>
                <li>EMEA vs. North America audience growth breakdowns to optimize targeting</li>
              </ul>
            </div>
            <div className="flex-1 md:border-l md:border-blue-800/40 md:pl-7 pl-0">
              <div className="bg-blue-800/10 rounded-lg p-4 flex flex-col items-center max-w-full">
                <span className="block text-2xl font-bold text-blue-200 mb-2">Sample Metrics Snapshot</span>
                <div className="w-full flex flex-wrap gap-4 justify-center text-blue-100/80 mt-2">
                  <div className="text-center py-2 px-4 rounded-xl bg-blue-950/40">
                    <span className="block text-xl font-bold text-cyan-200">63.1%</span>
                    <span className="text-xs uppercase text-blue-100/70">Growth Rate YoY</span>
                  </div>
                  <div className="text-center py-2 px-4 rounded-xl bg-blue-950/40">
                    <span className="block text-xl font-bold text-cyan-200">8,478</span>
                    <span className="text-xs uppercase text-blue-100/70">Profile Views / 28d</span>
                  </div>
                  <div className="text-center py-2 px-4 rounded-xl bg-blue-950/40">
                    <span className="block text-xl font-bold text-cyan-200">539</span>
                    <span className="text-xs uppercase text-blue-100/70">DMs/mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* --- FAQ + CTA --- */}
      <section className="w-full max-w-4xl mx-auto mt-14 mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* --- FAQ ACCORDION --- */}
          <GlassCard className="flex-1 mb-2 bg-gradient-to-br from-black/80 to-blue-900/20 border-blue-700/25">
            <h2 className="font-bold text-xl text-blue-200 mb-5 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 4v16M4 12h16" className="stroke-blue-300" />
              </svg>
              FAQs for Premium Prospects
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={faq.q} className="rounded-lg border border-blue-800/30 overflow-hidden bg-blue-900/10">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="w-full py-3 px-4 flex justify-between items-center text-left focus:outline-none font-semibold text-base text-blue-100"
                    aria-expanded={openFAQ === i}
                  >
                    <span>{faq.q}</span>
                    <svg
                      className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                        openFAQ === i ? "rotate-45 text-blue-300" : "rotate-0 text-blue-400"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M12 5v14m7-7H5" />
                    </svg>
                  </button>
                  <div
                    className={`px-5 pb-4 pt-0 text-blue-100/90 text-base transition-all duration-400 ease-in-out ${
                      openFAQ === i ? "max-h-44 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                    style={{
                      transition: "all 0.4s cubic-bezier(.4,1.2,.6,1)",
                      overflow: "hidden",
                    }}
                  >
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* --- BOOK CONSULTATION CTA --- */}
          <GlassCard className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/60 to-black/10 border-blue-400/20">
            <span className="text-blue-200 uppercase text-xs tracking-widest font-semibold mb-4">
              Private Capacity: <span className="text-blue-300 font-bold">3 New Clients</span> this quarter
            </span>
            <h2 className="text-2xl font-extrabold text-blue-100 mb-3 text-center drop-shadow-glow">
              Ready to Scale Your Leadership Platform?
            </h2>
            <p className="text-base text-blue-100/80 mb-7 text-center">
              Discovery consultations are limited and by application only.<br />
              <span className="text-blue-300/90">
                High-integrity, zero-pitch. If you&apos;re a tech founder or executive with big ambitions, let&apos;s talk.
              </span>
            </p>
            <Link
              href="/consultation"
              className="inline-block px-7 py-3 rounded-xl bg-gradient-to-r from-blue-400/90 via-blue-700/80 to-cyan-400 font-bold text-base text-black shadow-lg transition-all hover:scale-105 hover:brightness-110 ring-1 ring-blue-300/40 neon-glow"
            >
              Book Consultation &rarr;
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full mt-20 pb-7 flex justify-center items-center">
        <span className="text-xs text-neutral-500 text-center">
          © 2026 Executive Studio. Crafted for founders & executives who <span className="text-blue-300">shape their category</span>.
        </span>
      </footer>

      {/* --- Minimal CSS for glass, animation, neon glow, accordion --- */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-16px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fade-in {
          animation: fade-in 0.36s cubic-bezier(.38,1.26,.41,1) both;
        }
        .neon-glow {
          box-shadow: 0 0 22px 2px #3ecaff99, 0 0 8px 1px #dcfeff22;
        }
        .drop-shadow-glow {
          text-shadow: 0 1px 22px #b0e7ff66, 0 1px 8px #95deff55;
        }
      `}</style>
    </main>
  );
}