"use client";

import Link from "next/link";
import { useState } from "react";

// Minimal GlassCard component (matching codebase style)
function GlassCard({
  children,
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-br from-emerald-950/70 to-black/60 border border-emerald-700/30 shadow-xl backdrop-blur-xl p-7 md:p-11 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

// Premium floating CTA
function FloatingCTA() {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="fixed z-40 bottom-12 right-8">
      <div className="relative group">
        <Link
          href="https://cal.com/executivestudio/brand-audit"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex items-center gap-4 px-7 py-4 rounded-2xl font-extrabold
            bg-gradient-to-r from-emerald-900/80 via-black/75 to-emerald-950/80
            shadow-[0_4px_42px_4px_rgba(16,192,121,0.19)]
            border border-emerald-400/40
            text-lg text-emerald-200 tracking-wide
            transition-all duration-200
            backdrop-blur-md
            cta-neon
            hover:scale-[1.045] hover:from-emerald-800/100 hover:border-emerald-400/60 hover:text-emerald-100
          `}
          style={{
            boxShadow:
              "0 0 32px 4px #10c07950, 0 0 5px 2px #2af57455, 0 1px 30px 0 #ffe08844",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <svg
            className={`w-7 h-7 text-emerald-300 transition-all drop-shadow-[0_0_10px_#2af574${hovered ? "ff" : "77"}]`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.1}
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" className="stroke-emerald-300/40" />
            <path
              d="M16.5 11.25c.55-.19 1.01-.77 1.01-1.37 0-3.59-2.92-6.5-6.51-6.5C7.91 3.38 5 6.3 5 9.87c0 .59.47 1.16 1.01 1.36l1.82.63c.54.18.98.76.98 1.36v2.39a3 3 0 006 0v-2.4c0-.59.45-1.17.98-1.35l1.71-.63z"
              className="stroke-emerald-400/70"
              strokeLinejoin="round"
            />
          </svg>
          <span>
            Schedule Premium Brand Audit
          </span>
        </Link>
        <div className="absolute -left-12 bottom-[82%] hidden group-hover:flex flex-col gap-0">
          <span className="text-xs bg-emerald-800/90 text-emerald-100 py-1 px-3 rounded-md shadow-lg backdrop-blur-md font-semibold animate-fade-in">
            Elite, confidential session
          </span>
        </div>
      </div>
    </div>
  );
}

export default function B2BFounderLeadsCaseStudy() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#0c111c] via-[#0a1810] to-[#151415] flex flex-col items-center justify-start px-2 pb-32 relative">
      {/* --- HEADER --- */}
      <header className="w-full max-w-5xl pt-16 md:pt-24 pb-3 mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-300 via-yellow-200 to-white inline-block text-transparent bg-clip-text drop-shadow-[0_1px_24px_#10c07999] mb-3 tracking-tight">
          How a B2B Founder Generated{" "}
          <span className="text-emerald-300 drop-shadow-[0_0_22px_#2af57477]">$50k</span> Inbound Pipeline in 90 Days via LinkedIn
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200/90 font-medium drop-shadow-sm">
          A candid, data-backed breakdown: The proven inbound strategy, wins, challenges, and how any expert founder can replicate the $50k pipeline playbook.
        </p>
      </header>

      {/* --- EXECUTIVE SUMMARY --- */}
      <section className="w-full max-w-4xl mx-auto flex flex-col gap-7 md:gap-10 mt-14">
        <GlassCard className="bg-gradient-to-br from-emerald-800/50 to-black/30 border-emerald-700/40">
          <h2 className="text-xl md:text-2xl font-bold text-emerald-200 mb-2 flex items-center gap-2">
            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.1}>
              <circle cx="12" cy="12" r="10" className="stroke-emerald-300/40" />
              <path d="M7 13.5l3 3 6-6" className="stroke-emerald-300" />
            </svg>
            Executive Summary
          </h2>
          <p className="text-neutral-200 mb-2 leading-relaxed">
            <span className="font-semibold text-emerald-200">Background:</span> B2B SaaS founder (premium consulting niche) with a dormant LinkedIn, zero paid ads, and a stale inbound pipeline. Goal: Validate a premium offer and build $50k+ in warm inbound deals in under 90 days. 
          </p>
          <ul className="list-disc pl-7 text-emerald-100/80 text-base font-medium space-y-1 mb-1">
            <li>Grew inbound pipeline from $0 to $50k+ (all self-booked demos)</li>
            <li>Generated 7 SQLs, 3 paid trials, 1 $24k fast-close</li>
            <li>All via organic LinkedIn—using a replicable, authority-focused content framework</li>
          </ul>
        </GlassCard>

        {/* --- CHALLENGES --- */}
        <GlassCard className="bg-gradient-to-br from-black/40 to-emerald-900/30 border-emerald-700/40">
          <h2 className="text-lg md:text-xl font-bold text-yellow-200 flex items-center gap-2 mb-2">
            <svg className="w-6 h-6 text-yellow-200" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <circle cx="12" cy="12" r="10" className="stroke-yellow-400/60" />
              <path d="M9.5 9.5L14.5 14.5M14.5 9.5L9.5 14.5" className="stroke-yellow-200/90" />
            </svg>
            Baseline Challenges
          </h2>
          <ul className="list-disc pl-7 text-neutral-100/80 text-base space-y-1">
            <li>Stale audience, 0 recent engagement, credibility gaps</li>
            <li>Old posts were dry, tactical "tips"—lacked authority signal</li>
            <li>No formal offer messaging or premium inbound flows</li>
            <li>Perceived as "just another consultant," not a category leader</li>
          </ul>
        </GlassCard>
      </section>

      {/* --- CONTENT STRATEGY FRAMEWORK --- */}
      <section className="w-full max-w-5xl mx-auto flex flex-col mt-14 gap-10">
        <GlassCard className="bg-gradient-to-br from-black/60 to-emerald-900/20 border-emerald-600/25">
          <h2 className="text-xl md:text-2xl font-bold text-emerald-100 flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.1}>
              <path d="M5 13l4 4L19 7" className="stroke-emerald-300" />
            </svg>
            The 7-Step Authority Content Framework
          </h2>
          <ol className="space-y-5 md:space-y-4 text-emerald-200/90 text-[1.08rem] pl-[2.2rem] font-semibold list-decimal">
            <li>
              <span className="text-emerald-300 font-bold">01. Blitz Audit</span>: Overhauled profile—headline, banner, & “talk track” to telegraph category expertise and outcomes. 
            </li>
            <li>
              <span className="text-emerald-300 font-bold">02. Warm Reactivation</span>: DM outreach to key ICPs (“flag-waving,” not pitching), + comments on top-target posts for 2 weeks. 
            </li>
            <li>
              <span className="text-emerald-300 font-bold">03. Narratives, Not Tips</span>: Pivoted content to bold takes, founder stories <span className="italic text-emerald-100/70">(vs. “how-to” posts)</span>. Key: Show, don’t teach. 
            </li>
            <li>
              <span className="text-emerald-300 font-bold">04. Category Proof</span>: Showcased client wins, benchmarks, “red flag” mistakes leaders make, and unique IP/frameworks (screenshots, PDFs).
            </li>
            <li>
              <span className="text-emerald-300 font-bold">05. Weekly Demand Trigger</span>: 1x/week “open my calendar” call-to-action, always with compelling, anti-pitch context.
            </li>
            <li>
              <span className="text-emerald-300 font-bold">06. Authority Multipliers</span>: Hosted audio events, 2 podcast guest appearances, and revived a LinkedIn newsletter.
            </li>
            <li>
              <span className="text-emerald-300 font-bold">07. Systematic Follow-up</span>: Documented all interest (DM, comment, like) in a CRM and added value-first follow-ups each week.
            </li>
          </ol>
        </GlassCard>
      </section>

      {/* --- METRICS TIMELINE SECTION --- */}
      <section className="w-full max-w-5xl mx-auto my-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Stat Card */}
        <GlassCard className="bg-gradient-to-br from-emerald-900/60 to-black/40 border-emerald-400/30 flex flex-col items-center text-center animate-fade-in shadow-[0_2px_30px_4px_#10c07922]">
          <span className="font-bold text-4xl text-emerald-300 drop-shadow-[0_0_12px_#10c07988]">$50k+</span>
          <span className="uppercase tracking-wider text-xs text-emerald-200/80 font-semibold mt-2 mb-0.5">Inbound Pipeline</span>
          <span className="text-emerald-100/70 text-sm">
            Booked in 87 Days
          </span>
        </GlassCard>
        <GlassCard className="bg-gradient-to-br from-black/60 to-emerald-800/20 border-emerald-400/20 flex flex-col items-center text-center animate-fade-in shadow-[0_2px_30px_4px_#10c07917]">
          <span className="font-bold text-3xl text-emerald-100">+626%</span>
          <span className="uppercase tracking-wider text-xs text-emerald-200/70 font-semibold mt-2 mb-0.5">Engagement</span>
          <span className="text-emerald-100/70 text-sm">
            (16 → 117 average/post)
          </span>
        </GlassCard>
        <GlassCard className="bg-gradient-to-br from-emerald-900/50 to-black/40 border-emerald-600/30 flex flex-col items-center text-center animate-fade-in shadow-[0_2px_30px_2px_#9bf4a422]">
          <span className="font-bold text-3xl text-emerald-200">7</span>
          <span className="uppercase tracking-wider text-xs text-emerald-200/70 font-semibold mt-2 mb-0.5">Sales Calls</span>
          <span className="text-emerald-100/70 text-sm">
            (SQLs in 3 months)
          </span>
        </GlassCard>
      </section>

      {/* --- KEY TAKEAWAYS --- */}
      <section className="w-full max-w-4xl mx-auto my-12">
        <GlassCard className="bg-gradient-to-br from-black/80 to-emerald-900/30 border-emerald-700/25">
          <h2 className="text-xl md:text-2xl font-bold text-emerald-200 mb-2 flex items-center gap-2">
            <svg className="w-6 h-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.1}>
              <circle cx="12" cy="12" r="10" className="stroke-emerald-200/40" />
              <path d="M7 13.5l3 3 6-6" className="stroke-emerald-300" />
            </svg>
            5 Elite Founder Takeaways
          </h2>
          <ul className="list-decimal pl-6 text-emerald-100/90 text-base font-medium space-y-2">
            <li><span className="text-emerald-200 font-semibold">Positioning beats tactics:</span> Signals of expertise (not “tips” or hacks) move premium buyers.</li>
            <li><span className="text-emerald-200 font-semibold">Profiles <span className="italic">sell</span> meetings:</span> Before a single DM, fix your banner, CTA, and proof.</li>
            <li><span className="text-emerald-200 font-semibold">Repeatable social proof:</span> Document and showcase frameworks, client stories, “category” benchmarks; not just testimonials.</li>
            <li><span className="text-emerald-200 font-semibold">Consistent narrative, not constant posting:</span> Weekly POVs and call-to-actions <strong>trump</strong> high-volume, low-quality posts.</li>
            <li><span className="text-emerald-200 font-semibold">Follow-up builds pipeline:</span> 72% of SQLs booked after a second touch or DM. Nurture all warm engagement.</li>
          </ul>
        </GlassCard>
      </section>

      {/* --- Floating CTA --- */}
      <FloatingCTA />

      {/* --- FOOTER --- */}
      <footer className="w-full mt-24 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500 text-center">
          © 2026 Executive Studio. Crafted for B2B founders and premium service experts.
        </span>
      </footer>

      {/* --- Minimal CSS for animation, glass, floating --- */}
      <style>{`
        @keyframes fade-in { from { opacity:0; transform: translateY(-16px);} to { opacity:1; transform:none;} }
        .animate-fade-in { animation: fade-in 0.4s cubic-bezier(.38,1.26,.41,1) both;}
        .cta-neon {
          box-shadow: 0 0 18px 2px #10c07980, 0 0 8px 2px #ffe08855;
        }
      `}</style>
    </main>
  );
}