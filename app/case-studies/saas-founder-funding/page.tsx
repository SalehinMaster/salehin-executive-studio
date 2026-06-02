import Link from "next/link";
import { GlassCard } from '@/src/components/ui/glass-card';
import FloatingCTA from "@/components/FloatingCTA";

export default function SaaSFounderFundingCaseStudy() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#0c1017] via-black to-[#05131b] flex flex-col items-center justify-start px-2 pb-10">
      {/* --- HEADER --- */}
      <header className="w-full max-w-5xl pt-16 pb-7 mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white via-emerald-200 to-cyan-400 inline-block text-transparent bg-clip-text drop-shadow-lg mb-2 tracking-tight">
          How a SaaS Founder Secured <span className="whitespace-nowrap">$1.2M Seed Funding</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-cyan-100/80 font-medium">
          A masterclass in modern investor outreach: See how deliberate LinkedIn authority moves amplified valuation, opened elite funding doors, and built market trust—before a single pitch deck was sent.
        </p>
      </header>

      {/* --- Analytics and Outcomes --- */}
      <section className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10 items-stretch justify-center mt-6 md:mt-12 px-2">
        {/* Reach & Connection Growth */}
        <GlassCard className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-950/70 to-black/50 border-cyan-600/20 animate-fade-in text-center shadow-xl">
          <span className="uppercase tracking-widest text-xs text-cyan-300/80 font-bold mb-2">Investor Outreach</span>
          <div className="text-4xl font-black text-cyan-100 mb-2">27</div>
          <div className="text-cyan-200/90 text-base font-semibold mb-1">
            Qualified Investor Intros <span className="text-cyan-400/80 font-bold">*</span>
          </div>
          <span className="text-cyan-100/70 text-sm">
            From initial 9 at campaign launch
          </span>
        </GlassCard>
        {/* Engagement Analytics */}
        <GlassCard className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-950/50 to-cyan-800/10 border-cyan-500/15 animate-fade-in text-center shadow-xl">
          <span className="uppercase tracking-widest text-xs text-cyan-300/70 font-bold mb-2">Content Authority</span>
          <div className="text-4xl font-black text-cyan-100 mb-2">218%</div>
          <div className="text-cyan-200/90 text-base font-semibold mb-1">
            Average Engagement Uplift
          </div>
          <span className="text-cyan-100/70 text-sm">
            (VC likes/comments, direct founder shares)
          </span>
        </GlassCard>
        {/* Funding Conversion */}
        <GlassCard className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-green-900/50 to-black/40 border-green-700/25 animate-fade-in text-center shadow-xl">
          <span className="uppercase tracking-widest text-xs text-green-300/80 font-bold mb-2">Conversion</span>
          <div className="text-4xl font-black text-green-200 mb-2">$1.2M</div>
          <div className="text-green-200/80 text-base font-semibold mb-1">
            Seed Funding Closed
          </div>
          <span className="text-green-100/70 text-sm">
            4 term sheets, doubled valuation
          </span>
        </GlassCard>
      </section>

      {/* --- DEEP DIVE CASE STUDY --- */}
      <section className="w-full max-w-3xl mx-auto my-14">
        <GlassCard className="bg-gradient-to-bl from-black/80 to-cyan-950/70 border-cyan-700/25 p-7 md:p-10 animate-fade-in space-y-10">
          {/* Section 1: The Outreach Mindset */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-cyan-200 mb-2 flex items-center gap-2">
              <svg className="w-6 h-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><circle cx="12" cy="12" r="10" className="stroke-cyan-200/40" /><path d="M9 13l2.5 2.5L16 11" className="stroke-cyan-300" /></svg>
              Authority First, Pitch Second
            </h2>
            <p className="text-cyan-100/90 text-base font-medium">
              Instead of hunting cold VC DMs, the founder positioned himself as “the market’s brain” through content and mutual introductions. High-touch engagement and reputation ripple resulted in pre-warm intros.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-cyan-100/80 text-sm">
              <li>Mapped 78 target investors via <span className="font-semibold text-cyan-200">2<sup>nd</sup>/3<sup>rd</sup>-degree</span> LinkedIn paths</li>
              <li>Co-created content with fund GPs for shared exposure</li>
              <li>Joined three invite-only SaaS/founder discussion groups</li>
            </ul>
          </div>
          {/* Section 2: Content Authority Framework */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-cyan-200 mb-2 flex items-center gap-2">
              <svg className="w-6 h-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><circle cx="12" cy="12" r="10" className="stroke-cyan-200/40" /><path d="M8 11.5h8M8 16h5" className="stroke-cyan-300" /></svg>
              The Authority Content Formula
            </h2>
            <ul className="list-decimal pl-5 space-y-2 text-cyan-100/90 text-base font-medium mt-2">
              <li><span className="text-cyan-200 font-semibold">Category POV Series:</span> Weekly “Vision for SaaS in 2026” posts attracting both founder and VC engagement.</li>
              <li><span className="text-cyan-200 font-semibold">Case-Led Proof:</span> Authentic customer and revenue milestones broken down for peers and non-technical investors.</li>
              <li><span className="text-cyan-200 font-semibold">Collaboration Loops:</span> Quoted VCs, peer founders, and analysts in posts—triggered direct shares and high-trust comment threads.</li>
            </ul>
          </div>
          {/* Section 3: Engagement Analytics Breakdown */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-cyan-200 mb-2 flex items-center gap-2">
              <svg className="w-6 h-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><circle cx="12" cy="12" r="10" className="stroke-cyan-200/40" /><path d="M15.2 9.8L12 13l-2-2" className="stroke-cyan-300" /></svg>
              Engagement & Trust Metrics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-3">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-cyan-200">5,200+</div>
                <div className="text-xs text-cyan-300/80 uppercase tracking-wider mt-0.5">Targeted Post Views (avg)</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-cyan-200">61%</div>
                <div className="text-xs text-cyan-300/80 uppercase tracking-wider mt-0.5">Topical VC Engagement Rate</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-cyan-200">7/10</div>
                <div className="text-xs text-cyan-300/80 uppercase tracking-wider mt-0.5">Posts Shared by Investors</div>
              </div>
            </div>
          </div>
          {/* Section 4: Conversion Milestones */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-cyan-200 mb-2 flex items-center gap-2">
              <svg className="w-6 h-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><circle cx="12" cy="12" r="10" className="stroke-cyan-200/40" /><path d="M7.5 10.8l3.1 3.1 6.1-6.2" className="stroke-cyan-300" /></svg>
              Conversion Milestones
            </h2>
            <ul className="list-disc pl-6 space-y-1 mt-2 text-cyan-100/80 text-base">
              <li>Secured 4 term sheets from intros, not cold outreach</li>
              <li>Increased valuation by 2X via demand signaling (one lead VC increased offer after seeing peer interest)</li>
              <li>Received inbound offers for follow-on advisory/co-investment</li>
            </ul>
          </div>
        </GlassCard>
      </section>

      {/* --- Elite Takeaways --- */}
      <section className="w-full max-w-3xl mx-auto my-10">
        <GlassCard className="bg-gradient-to-br from-black/90 to-cyan-950/50 border-cyan-700/30 p-7 md:p-8">
          <h2 className="text-lg md:text-xl font-bold text-cyan-200 mb-2 flex items-center gap-2">
            <svg className="w-6 h-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.1}><circle cx="12" cy="12" r="10" className="stroke-cyan-200/40" /><path d="M7 13.5l3 3 6-6" className="stroke-cyan-300" /></svg>
            5 Elite Takeaways for Venture-Bound Founders
          </h2>
          <ul className="list-decimal pl-6 text-cyan-100/90 text-base font-medium space-y-2">
            <li>
              <span className="text-cyan-200 font-semibold">Narrative authority</span> builds valuation leverage—your POV is worth as much as your product.
            </li>
            <li>
              <span className="text-cyan-200 font-semibold">Warm investor intros</span> convert at 5-10x the rate of cold LinkedIn pitches.
            </li>
            <li>
              <span className="text-cyan-200 font-semibold">Content that teaches</span> and quantifies wins pulls in both founder and investor attention.
            </li>
            <li>
              <span className="text-cyan-200 font-semibold">Show traction publicly,</span> but tell the story privately—most terms won in DMs.
            </li>
            <li>
              <span className="text-cyan-200 font-semibold">Peer trust = deal speed.</span> Make your network talk about you, not just to you.
            </li>
          </ul>
        </GlassCard>
      </section>

      {/* --- Floating CTA for Venture Founders --- */}
      <FloatingCTA
        headline="Venture-backed? Book a Confidential Branding Consult"
        subheadline="Reserved for ambitious founders raising institutional capital or already funded. Build your market-defining reputation with private advisement from Executive Studio."
        ctaLabel="Request Advisory Session"
        href="/consultation"
      />

      {/* --- FOOTER --- */}
      <footer className="w-full mt-24 pb-8 flex justify-center items-center">
        <span className="text-xs text-neutral-500 text-center">
          © 2026 Executive Studio. Crafted for category-shaping founders and high-caliber SaaS leaders.
        </span>
      </footer>

      {/* --- Minimal CSS for animation, glass, floating --- */}
      <style>{`
        @keyframes fade-in { from { opacity:0; transform: translateY(-18px);} to { opacity:1; transform:none;} }
        .animate-fade-in { animation: fade-in 0.44s cubic-bezier(.38,1.26,.41,1) both;}
        .cta-neon {
          box-shadow: 0 0 22px 2px #25ecf880, 0 0 10px 2px #84e3d155;
        }
      `}</style>
    </main>
  );
}