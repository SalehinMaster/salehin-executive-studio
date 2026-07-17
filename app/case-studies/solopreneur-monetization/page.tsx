"use client";

import Link from "next/link";
import { GlassCard } from '../../../src/components/ui/glass-card';
import FloatingCTA from '../../../src/components/ui/FloatingCTA';

export default function SolopreneurMonetizationCaseStudy() {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-br from-black via-neutral-950 to-neutral-900 px-2 pb-12 pt-10 md:pt-16">
      {/* --- HERO --- */}
      <section className="max-w-5xl mx-auto w-full flex flex-col items-center gap-6 mb-10">
        <GlassCard className="bg-gradient-to-br from-[#121217]/80 to-black/50 border border-neutral-800/50 p-7 md:p-12 shadow-[0_4px_32px_1px_#ffe08822] flex flex-col items-center animate-fade-in">
          <h1 className="text-2xl md:text-4xl font-extrabold text-amber-100 text-center tracking-tight mb-2 drop-shadow-[0_0_12px_#ffe08877]">
            Monetizing a Solopreneur Brand: <br className="hidden md:block" />
            <span className="block text-amber-300">“0 to $10k/mo” with One Digital Asset</span>
          </h1>
          <p className="text-lg md:text-xl text-amber-100/90 text-center font-medium mb-3 max-w-2xl">
            How one LinkedIn creator built, launched, and scaled a digital product funnel to five figures per month —
            <span className="text-amber-200/80 font-semibold"> without hiring or ads.</span>
          </p>
          <div className="flex items-center gap-3 mt-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-900/80 text-amber-100/90 tracking-wider border border-amber-700/30 shadow-[0_1px_6px_#ffe08822]">
              2026 CASE STUDY
            </span>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-neutral-800/80 text-neutral-200/70 tracking-wide border border-neutral-700/30">
              LinkedIn Solopreneur
            </span>
          </div>
        </GlassCard>
      </section>

      {/* --- METRICS OVERVIEW --- */}
      <section className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-center mb-12">
        <GlassCard className="bg-gradient-to-br from-amber-950/60 to-black/30 border-amber-600/30 w-44 h-36 flex flex-col justify-center items-center text-center animate-fade-in shadow-[0_2px_30px_2px_#ffe08833]">
          <span className="text-4xl font-bold text-amber-200 drop-shadow-[0_0_8px_#ffe08888]">$10.3k</span>
          <span className="uppercase tracking-wider text-xs text-amber-200/70 font-semibold mt-2 mb-0.5">Monthly Revenue</span>
          <span className="text-amber-100/70 text-xs">(3 months post-launch)</span>
        </GlassCard>
        <GlassCard className="bg-gradient-to-br from-neutral-900/60 to-black/40 border-amber-700/25 w-44 h-36 flex flex-col justify-center items-center text-center animate-fade-in shadow-[0_2px_30px_2px_#ffe08822]">
          <span className="text-4xl font-bold text-amber-100 drop-shadow-[0_0_6px_#ffe08899]">4.2%</span>
          <span className="uppercase tracking-wider text-xs text-amber-100/70 font-semibold mt-2 mb-0.5">Sales Conversion</span>
          <span className="text-amber-100/70 text-xs">(Landing Page CVR)</span>
        </GlassCard>
        <GlassCard className="bg-gradient-to-br from-amber-900/50 to-black/35 border-amber-700/25 w-44 h-36 flex flex-col justify-center items-center text-center animate-fade-in shadow-[0_2px_30px_2px_#ffe08811]">
          <span className="text-4xl font-bold text-amber-200">1,670</span>
          <span className="uppercase tracking-wider text-xs text-amber-100/70 font-semibold mt-2 mb-0.5">Product Buyers</span>
          <span className="text-amber-100/70 text-xs">(Q1 Cohort)</span>
        </GlassCard>
        <GlassCard className="bg-gradient-to-br from-neutral-950/60 to-amber-950/20 border border-amber-700/15 w-44 h-36 flex flex-col justify-center items-center text-center animate-fade-in shadow-[0_2px_30px_2px_#ffe08813]">
          <span className="text-4xl font-bold text-amber-100">0</span>
          <span className="uppercase tracking-wider text-xs text-amber-100/70 font-semibold mt-2 mb-0.5">Paid Ads</span>
          <span className="text-amber-100/60 text-xs">(Organic Only)</span>
        </GlassCard>
      </section>

      {/* --- FUNNEL TEARDOWN --- */}
      <section className="w-full max-w-3xl mx-auto mb-12">
        <GlassCard className="bg-gradient-to-br from-black/80 to-amber-950/30 border border-amber-900/30 px-6 md:px-10 py-8 md:py-12 shadow-[0_2px_34px_6px_#ffe08822] animate-fade-in">
          <h2 className="text-xl md:text-2xl font-bold text-amber-200 mb-5 flex items-center gap-2">
            <svg className="w-6 h-6 text-amber-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.1}>
              <circle cx="12" cy="12" r="10" className="stroke-amber-200/30" />
              <path d="M7 13.5l3 3 6-6" className="stroke-amber-300" />
            </svg>
            Step-by-Step: The $10k/mo Solopreneur Funnel
          </h2>
          <ol className="list-decimal pl-6 text-amber-100/90 text-base font-medium space-y-4">
            <li>
              <span className="text-amber-200 font-semibold">Magnetize Audience:</span>{" "}
              Authority posts and “micro-case studies” build trust, pre-selling the single offer.
              <span className="block text-amber-100/70 text-xs mt-1 ml-2">
                • Daily (30min) proof content—wins, frameworks, screenshots.
              </span>
            </li>
            <li>
              <span className="text-amber-200 font-semibold">High-Converting Asset:</span>{" "}
              The digital product (an “Ultimate System” Notion template) offered with premium positioning.
              <span className="block text-amber-100/70 text-xs mt-1 ml-2">
                • $47 price with “behind-the-scenes” videos, actionable swipe files, and bonus resources.
              </span>
            </li>
            <li>
              <span className="text-amber-200 font-semibold">Frictionless Lead Capture:</span>{" "}
              LinkedIn post CTA feeds directly to a glowing, single-page email opt-in.
              <span className="block text-amber-100/70 text-xs mt-1 ml-2">
                • &gt;38% opt-in conversion; no complicated branching or quizzes.
              </span>
            </li>
            <li>
              <span className="text-amber-200 font-semibold">Automated Warm-Up:</span>{" "}
              Email welcome sequence nurtures with story, case study, and “win montage” format.
              <span className="block text-amber-100/70 text-xs mt-1 ml-2">
                • 3-day micro-launch, urgency-only in final message.
              </span>
            </li>
            <li>
              <span className="text-amber-200 font-semibold">Conversion Event:</span>{" "}
              Direct reply and storytelling on LinkedIn and email drive urgency and volume.
              <span className="block text-amber-100/70 text-xs mt-1 ml-2">
                • 84% of first-week buyers respond to value-packed DMs.
              </span>
            </li>
          </ol>
        </GlassCard>
      </section>

      {/* --- DIGITAL PRODUCT OPTIMIZATION STRATEGY --- */}
      <section className="w-full max-w-3xl mx-auto mb-12">
        <GlassCard className="bg-gradient-to-br from-black/80 to-amber-950/30 border border-amber-800/40 px-6 md:px-10 py-8 md:py-12 shadow-[0_3px_34px_8px_#ffe08829] animate-fade-in">
          <h2 className="text-xl md:text-2xl font-bold text-amber-100 mb-5 flex items-center gap-2">
            <svg className="w-6 h-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.1}>
              <circle cx="12" cy="12" r="10" className="stroke-amber-200/40" />
              <path d="M7 13.5l3 3 6-6" className="stroke-amber-300" />
            </svg>
            Digital Product Optimization Levers
          </h2>
          <ul className="list-disc pl-6 text-amber-100/90 text-base font-medium space-y-3">
            <li>
              <span className="text-amber-200 font-semibold">Irresistible Premise:</span> “Blueprint” style products with step-by-step results get higher perceived value than generic guides/templates.
            </li>
            <li>
              <span className="text-amber-200 font-semibold">Premium Packaging:</span> Custom cover art, bite-sized launch demos, and buyer screenshots build FOMO and trust.
            </li>
            <li>
              <span className="text-amber-200 font-semibold">Always-Evolving Bonuses:</span> Quarterly “insider packs” (not discounts) rewarded repeat buyers; drives viral shares.
            </li>
            <li>
              <span className="text-amber-200 font-semibold">Built-in Community:</span> Private invite to post-purchase Q&A call or micro-forum = 3x higher upsell rate.
            </li>
            <li>
              <span className="text-amber-200 font-semibold">One-Click Delivery:</span> Automated access email via checkout—no DM or wait, triggers instant share posts.
            </li>
          </ul>
        </GlassCard>
      </section>

      {/* --- LAUNCH SEQUENCES LAYOUT --- */}
      <section className="w-full max-w-3xl mx-auto mb-12">
        <GlassCard className="bg-gradient-to-br from-black/90 to-amber-950/20 border border-amber-800/50 px-6 md:px-10 py-8 md:py-12 shadow-[0_3px_40px_6px_#ffe08819] animate-fade-in">
          <h2 className="text-xl md:text-2xl font-bold text-amber-100 mb-5 flex items-center gap-2">
            <svg className="w-6 h-6 text-amber-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.1}>
              <circle cx="12" cy="12" r="10" className="stroke-amber-100/30" />
              <path d="M7 13.5l3 3 6-6" className="stroke-amber-200" />
            </svg>
            Automated Launch Sequence (Proven Playbook)
          </h2>
          <ol className="list-decimal pl-6 text-amber-100/90 text-base font-medium space-y-4">
            <li>
              <span className="text-amber-200 font-semibold">Day 1:</span> Soft “story-first” launch on personal LinkedIn; momentum-building with preview content.
            </li>
            <li>
              <span className="text-amber-200 font-semibold">Day 2:</span> Pre-drafted case study and FAQ drip via email (plus LinkedIn carousel boosting urgency).
            </li>
            <li>
              <span className="text-amber-200 font-semibold">Day 3:</span> “Behind the product” livestream or Q&A for prospects; follow-up DMs to high-interest comments.
            </li>
            <li>
              <span className="text-amber-200 font-semibold">Day 4:</span> Direct testimonial montage (email + LinkedIn Stories); prime audience for deadline CTA.
            </li>
            <li>
              <span className="text-amber-200 font-semibold">Final 24h:</span> Last-call email, DMs, and a public “buyer count” post (social proof spike). Scarcity triggers most sales.
            </li>
          </ol>
        </GlassCard>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="max-w-2xl mx-auto mb-12 w-full">
        <GlassCard className="relative bg-gradient-to-br from-amber-900/70 to-black/70 border border-amber-700/30 px-7 md:px-14 py-9 md:py-14 flex flex-col items-center text-center shadow-[0_6px_38px_8px_#ffe08833] animate-fade-in">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            {/* Glowing orb accent */}
            <span className="block w-14 h-14 rounded-full bg-amber-400/20 blur-xl neon-glow"></span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-50 mb-3 drop-shadow-[0_1px_18px_#ffe08888]">
            Want This Funnel? Get The Full Playbook & Templates
          </h2>
          <p className="text-lg text-amber-200/90 mb-7 font-medium">
            Download our 30-Day Solopreneur LinkedIn Plan &amp; Buyer Psychology Checklist.<br/>
            <span className="text-amber-100/80">Audit your profile, craft your product offer, and steal the launch sequence.</span>
          </p>
          <div className="flex flex-col items-center gap-4 w-full md:w-auto">
            <Link
              href="/lead-magnets/30-day-branding-plan"
              className="cta-neon bg-gradient-to-r from-amber-400/95 via-amber-600/90 to-yellow-400/80 text-black font-bold px-7 py-3 rounded-xl text-lg ring-1 ring-amber-300/30 shadow-lg hover:scale-105 hover:brightness-110 transition-all"
            >
              Get The Free Plan &rarr;
            </Link>
            <Link
              href="/lead-magnets/profile-checklist"
              className="underline text-amber-200/80 font-semibold text-base hover:text-amber-50 hover:drop-shadow-glow transition"
            >
              Free Profile Audit Checklist
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* --- Floating Sticky CTA --- */}
      <FloatingCTA
        headline="Want to Monetize Your LinkedIn Audience?"
        subheadline="Download our lead magnet or book a branding session to accelerate your solopreneur journey."
        ctaLabel="Get the Free Plan"
        href="/lead-magnets/30-day-branding-plan"
      />

      {/* --- FOOTER --- */}
      <footer className="w-full mt-24 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500 text-center">
          © 2026 Executive Studio. Crafted for solopreneurs and creators who build premium income streams.
        </span>
      </footer>

      {/* --- Minimal CSS for animation, glass, neon, loader --- */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-16px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fade-in {
          animation: fade-in 0.46s cubic-bezier(.38,1.26,.41,1) both;
        }
        .cta-neon {
          box-shadow: 0 0 22px 2px #ffe08899, 0 0 10px 2px #ffe08855;
        }
        .neon-glow {
          box-shadow: 0 0 34px 7px #ffe08855, 0 0 12px 2px #fde68a88;
        }
        .drop-shadow-glow {
          text-shadow: 0 1px 18px #ffe08877, 0 1px 8px #ffe08866;
        }
      `}</style>
    </main>
  );
}