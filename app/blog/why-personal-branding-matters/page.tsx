"use client";

import Link from "next/link";
import { GlassCard } from '../../../src/components/ui/glass-card';
import FAQAccordion from "@/components/FAQAccordion";

const faqItems = [
  {
    question: "Is personal branding only for influencers, not serious business owners?",
    answer: (
      <>
        No. The modern personal brand isn’t about vanity—it’s a founder’s force multiplier. Executive visibility drives trust, earns inbound leads, and mitigates both talent and capital risk. <b>In 2026, most deal flow and highest-quality hires trace back to the founder’s reputation—online and off.</b>
      </>
    ),
  },
  {
    question: "How do I establish authority without looking self-promotional?",
    answer: (
      <>
        Focus on being useful, not loud. Publish behind-the-scenes insights, frameworks, and transparent lessons. Comment meaningfully on peer trends. Spotlight your team and customer progress. <span className="font-semibold">Lead with value and results—never boast.</span>
      </>
    ),
  },
  {
    question: "Can a personal brand really drive inbound leads at the enterprise level?",
    answer: (
      <>
        Absolutely. Executive brand equity shortens sales cycles and opens doors otherwise closed by RFPs and cold outreach. Decision makers often research founders before companies; public authority provides crucial social proof and deal confidence.
      </>
    ),
  },
  {
    question: "What about brand risk—what if I make a PR mistake?",
    answer: (
      <>
        <span className="font-semibold text-pink-300">Reputation risk</span> is real, but managed authority provides an <span className="italic">insurance policy</span>. Consistent, transparent communication and community engagement create reputational buffers, speeding recovery and retaining loyalty if errors occur.
      </>
    ),
  },
  {
    question: "How much time per week does this require?",
    answer: (
      <>
        Founder-led branding can start at 1 hour a week: <ul className="list-disc pl-5 mt-2">
          <li>30 min crafting or delegating one original insight post</li>
          <li>10 min replying to comments/DMs</li>
          <li>20 min engaging on peer posts</li>
        </ul>
        Systems and ghostwriting can further compress the lift—without sacrificing authenticity.
      </>
    ),
  },
  {
    question: "What if my industry is highly regulated or 'boring'?",
    answer: (
      <>
        The biggest opportunity is often in 'dry' competitive fields. Most leaders are silent—those who share expertise respectfully become sought-after reference points. <b>Brand equity is portable:</b> it follows you across companies, even in compliance-heavy niches.
      </>
    ),
  },
  {
    question: "Should I use professional ghostwriters?",
    answer: (
      <>
        Many top executives mix founder voice with expert support (editors, researchers, or ghostwriters). It’s vital, however, to set vision, call the shots, and approve all public-facing content for authenticity and ethics.
      </>
    ),
  },
  {
    question: "How do I align personal brand with company brand?",
    answer: (
      <>
        Position your personal brand as the ethos and visionary extension of your company’s mission. Demonstrate both <span className="font-semibold text-cyan-200">personal conviction</span> and <span className="font-semibold text-blue-200">organizational outcomes</span>; they compound, not compete.
      </>
    ),
  }
];

export default function WhyPersonalBrandingMattersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-black via-blue-950 to-neutral-900 pb-10">
      {/* HERO */}
      <section className="relative flex flex-col items-center pt-12 pb-16 px-4">
        <GlassCard className="max-w-3xl w-full px-8 py-14 flex flex-col items-center bg-gradient-to-br from-blue-900/60 via-black/60 to-neutral-900/70 backdrop-blur-2xl border border-blue-400/25 shadow-2xl">
          <h1 className="font-extrabold text-4xl md:text-5xl text-center mb-4 text-cyan-200 tracking-tight">
            Why Personal Branding Matters for Business Owners
          </h1>
          <p className="text-lg md:text-2xl text-center text-neutral-200 max-w-2xl mb-2">
            Build Equity. Drive Inbound. Safeguard Your Legacy.
          </p>
          <p className="text-base text-neutral-300 text-center max-w-2xl mb-2">
            In 2026, executive reputation isn’t just a “nice to have”—it determines who wins in growth, risk, and talent. Here’s how world-class founders harness personal authority for predictable advantage.
          </p>
        </GlassCard>
      </section>

      {/* THE STRATEGIC CASE */}
      <section className="max-w-3xl mx-auto mb-16 md:mb-24 px-4">
        <GlassCard className="p-10 md:p-14 bg-gradient-to-r from-blue-950 via-black to-black border border-cyan-700/15 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-200 mb-4">
            Founder Authority: The Ultimate Undervalued Equity
          </h2>
          <p className="text-neutral-100 text-lg mb-5">
            <span className="font-semibold text-cyan-400">What is personal brand equity?</span> It’s the compounding trust, visibility, and deal flow a founder accrues in public. Companies rise and fall—<span className="font-bold text-cyan-300">your reputation endures</span>, shaping everything from partnerships to valuations.
          </p>
          <ul className="list-disc pl-6 text-neutral-100/90 space-y-2 text-[16px] mb-5">
            <li>
              <span className="font-semibold text-blue-200">Predictable Inbound:</span>{" "}
              70%+ of B2B buyers now vet founders personally before shortlisting vendors.
            </li>
            <li>
              <span className="font-semibold text-violet-300">Talent Magnet:</span>{" "}
              Top candidates join teams where leadership is visible, credible, and mission-driven.
            </li>
            <li>
              <span className="font-semibold text-pink-200">Defensible Valuations:</span>{" "}
              Investors increasingly discount “faceless” companies—and reward high-trust executives with premium multiples.
            </li>
            <li>
              <span className="font-semibold text-emerald-200">Crisis Resilience:</span>{" "}
              When reputation or market shocks hit, founder narrative is the difference between bounce-back and business loss.
            </li>
          </ul>
          <p className="text-cyan-100/80 italic text-sm">
            “Younger buyers—enterprise and SMB—connect with people, not logos. The founder’s story <span className="font-semibold text-blue-300">is</span> the moat.”
          </p>
        </GlassCard>
      </section>

      {/* CASE STUDY SPOTLIGHT */}
      <section className="max-w-4xl mx-auto mb-20 md:mb-28 px-4 flex flex-col gap-7">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-200 mb-2 text-center">Case Study: Inbound Flywheel via Founder Brand</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Case Summary */}
          <GlassCard className="flex-1 bg-gradient-to-b from-black/70 via-blue-950/40 to-black/80 p-7 border-blue-400/10 shadow-2xl">
            <h3 className="text-xl font-bold text-cyan-100 mb-2">Profile: SaaS Founder, $10M ARR</h3>
            <ul className="list-disc pl-5 text-neutral-100 space-y-2 text-base mb-3">
              <li>
                <span className="font-semibold text-cyan-300">From Zero to Inbound Engine:</span> Previously relied on cold outreach, conferences, and agency referrals. No LinkedIn audience; little founder presence.
              </li>
              <li>
                <span className="font-semibold text-blue-300">Strategy Launch:</span> Started publishing weekly founder notes and tactical learnings, showcasing failures as well as pivots.
              </li>
              <li>
                <span className="font-semibold text-fuchsia-300">Result (12 Months):</span> Inbound premium leads grew 640%. Three “impossible” partnership deals. Talent pipeline flipped from chase to choice. Investor diligence calls universally referenced CEO’s content.
              </li>
            </ul>
            <p className="text-sm text-blue-200/90 italic mt-2">
              “Even in a competitive market, being visible and vulnerable unlocked deals and hires that wanted <b>us</b>—not just features.”
            </p>
          </GlassCard>
          {/* Right: Visual Data */}
          <GlassCard className="flex-1 p-7 bg-gradient-to-t from-blue-800/60 via-neutral-900/70 to-black/80 border-cyan-400/10 flex flex-col justify-center">
            <h4 className="text-lg font-semibold text-blue-100 mb-2">The Inbound Transformation, by Numbers</h4>
            <ul className="list-disc pl-5 text-neutral-100 space-y-2 text-base">
              <li><span className="font-semibold text-emerald-300">+640%</span> annualized increase in qualified inbound demo requests</li>
              <li><span className="font-semibold text-cyan-200">3</span> Fortune 500 partnerships sourced via CEO’s LinkedIn DMs</li>
              <li><span className="font-semibold text-blue-300">48%</span> higher priority candidate acceptance rate</li>
              <li><span className="font-semibold text-pink-200">2x</span> pipeline velocity for mid-market sales</li>
            </ul>
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-xs text-neutral-400/90">
                <span className="font-semibold text-cyan-300">Insight:</span> <span className="italic">Deal flow mapped back to founder’s voice, not just product demos.</span>
              </span>
            </div>
          </GlassCard>
        </div>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mt-8 text-base">
          This pattern repeats in every sector: founder-driven content earns compound trust, while faceless competitors grind for attention. <span className="text-cyan-200 font-semibold">Personal brand is now “pipeline insurance.”</span>
        </p>
      </section>

      {/* INBOUND FUNNEL BREAKDOWN */}
      <section className="max-w-3xl mx-auto mb-20 px-4">
        <GlassCard className="p-10 md:p-14 bg-gradient-to-br from-cyan-900/60 via-blue-950/70 to-black/80 border border-cyan-700/15 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-200 mb-5">
            How Founders Drive Inbound—On Autopilot
          </h2>
          <div className="mb-5">
            <ol className="list-decimal pl-6 text-neutral-100 text-[17px] space-y-2">
              <li>
                <span className="font-semibold text-cyan-200">Authority Top-of-Funnel:</span> Publish founder POVs, frameworks, and tough lesson stories weekly. Leads and talent will self-qualify, seeking values-aligned companies.
              </li>
              <li>
                <span className="font-semibold text-purple-200">Signal - Noise:</span> Quality outperforms quantity. Respond to current events, but prioritize original analysis over rehashed news. Be first or be deep.
              </li>
              <li>
                <span className="font-semibold text-blue-200">Community Effects:</span> Consistent engagement with industry peers/partners multiplies reach—most “lucky” inbound deals trace back to mutuals and public discourse.
              </li>
              <li>
                <span className="font-semibold text-emerald-200">Content Flywheel:</span> Archive and repurpose your best posts. Build a vault (writers, marketers, or AI) to syndicate tailored insights across formats (text, video, podcasts).
              </li>
            </ol>
          </div>
          <p className="text-cyan-100 italic text-sm mb-2">
            “The most scalable marketing engine is the founder’s own lived expertise—visible and repeated.”
          </p>
        </GlassCard>
      </section>

      {/* BUSINESS RISK & REPUTATION MITIGATION */}
      <section className="max-w-3xl mx-auto mb-20 px-4">
        <GlassCard className="p-10 md:p-14 bg-gradient-to-t from-blue-900/60 via-black/70 to-neutral-900/80 border border-fuchsia-400/15 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-fuchsia-200 mb-3">
            Mitigate Downside: The Founder as Reputation “Shock Absorber”
          </h2>
          <p className="text-neutral-100 text-lg mb-5">
            In the digital age, business risk is amplified by silence. When crises hit—whether product bugs, layoffs, or market shifts—<span className="font-bold text-fuchsia-300">founders with established authority recover trust 3-5x faster</span> than hidden counterparts.
          </p>
          <ul className="list-disc pl-5 text-neutral-100 text-base mb-4 space-y-2">
            <li>
              <span className="font-semibold text-fuchsia-300">Crisis Communication:</span> Get ahead of the narrative. A visible founder provides a human, credible response in hours—not days.
            </li>
            <li>
              <span className="font-semibold text-blue-300">Loyalty Moat:</span> Teams and customers “stick” during hard news when a founder’s voice is already part of their journey.
            </li>
            <li>
              <span className="font-semibold text-emerald-200">Strategic Transparency:</span> Share not just wins, but setbacks and learning loops. Trust flourishes in full spectrum.
            </li>
          </ul>
          <div className="text-cyan-100/80 text-xs italic mt-1">
            “AI crisis management data shows: founder-led responses outperform corporate comms by 4x in restoring reputation post-incident.”
          </div>
        </GlassCard>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto mb-20 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Personal Branding for Business Owners: FAQ</h2>
        <FAQAccordion items={faqItems} />
      </section>

      {/* CTA SECTION */}
      <section className="flex flex-col items-center my-20 px-4">
        <GlassCard className="py-10 px-8 md:px-16 max-w-xl w-full flex flex-col items-center bg-gradient-to-r from-cyan-900/70 to-black/80 border border-cyan-400/25 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-cyan-200 mb-3">
            Want Executive-Grade Brand Strategy for Your Business?
          </h2>
          <p className="text-center max-w-xl mx-auto mb-5 text-neutral-300 text-lg">
            Book a confidential 1:1 consult with our founder agency. Transform reputation into revenue with high-authority positioning, pipeline systems, and public narrative advisory.{" "}
            <span className="text-cyan-200 font-semibold">No obligation. No pitch deck needed.</span>
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 mt-2 rounded-2xl font-semibold bg-gradient-to-r from-cyan-800 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-400 transition-colors"
          >
            Book My Executive Session →
          </Link>
          <p className="mt-3 text-xs text-neutral-400 italic">
            By application only. Discreet, founder-to-founder conversations.
          </p>
        </GlassCard>
      </section>

      {/* FOOTER */}
      <footer className="w-full mt-16 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500">
          © 2026 Executive Studio. Crafted for business owners who build with vision.
        </span>
      </footer>
    </main>
  );
}