"use client";

import React, { useState } from "react";

// --- Utility GlassCard container ---
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "glass-card bg-gradient-to-br from-[#161623cc] via-[#19191e88] to-[#161834c4] border border-neutral-700/40 rounded-2xl backdrop-blur-xl p-7 md:p-10 shadow-[0_6px_40px_0_#ffe08812,0_2px_0px_0_#000a]" +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}

// --- Authority Score Gauge ---
function AuthorityGauge({ score }: { score: number }) {
  const r = 48;
  const circ = 2 * Math.PI * r;
  const pct = score / 100;
  const stroke = Math.round(circ * (1 - pct));
  const color = score >= 90
    ? "#ffd44c"
    : score >= 75
    ? "#ffe088"
    : "#ffa755";
  return (
    <div className="flex flex-col items-center gap-1 py-2 px-1">
      <svg width={120} height={120} className="drop-shadow-glow">
        <circle
          cx={60}
          cy={60}
          r={48}
          stroke="#242722"
          strokeWidth={10}
          fill="none"
        />
        <circle
          cx={60}
          cy={60}
          r={48}
          stroke={color}
          strokeWidth={10}
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={stroke}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1.3s cubic-bezier(.7,0,.4,1), stroke 0.4s",
            filter: "drop-shadow(0 0 14px " + color + "99)",
          }}
        />
        <text
          x="60"
          y="68"
          textAnchor="middle"
          fontSize="2.3rem"
          fontWeight={800}
          fill={color}
          style={{
            textShadow: "0 2px 24px #ffe08855, 0 1px 8px #ffe08866"
          }}
        >
          {score}
        </text>
        <text
          x="60"
          y="90"
          textAnchor="middle"
          fontSize="1rem"
          fill="#ffe088dd"
          fontWeight={500}
          opacity={.84}
        >
          /100
        </text>
      </svg>
      <span className="text-xs text-amber-100/90 opacity-85 font-semibold tracking-wider pt-1">
        Authority Score
      </span>
    </div>
  );
}

// --- Multi-step Progress Bar ---
function ProgressBar({ step }: { step: number }) {
  const stages = [
    { label: "Analyzing Keywords...", color: "bg-amber-400/90" },
    { label: "Structuring Value Proposition...", color: "bg-yellow-500/90" },
    { label: "Crafting Variations...", color: "bg-lime-400/80" },
  ];
  return (
    <div className="w-full flex flex-col gap-3 items-center pt-2 pb-1">
      <div className="flex w-full max-w-lg gap-3 px-1">
        {stages.map((s, idx) => (
          <div key={s.label} className="flex-1 flex flex-col items-center text-center">
            <div
              className={
                "w-full h-2 rounded-lg transition-all duration-500 " +
                (step > idx
                  ? s.color + " shadow-gold-glow"
                  : "bg-neutral-700/70")
              }
              style={{
                boxShadow:
                  step > idx
                    ? "0 0 12px 3px #ffd44c44"
                    : "none"
              }}
            />
            <span
              className={
                "text-[.87rem] mt-2 font-medium opacity-90 transition-colors " +
                (step === idx + 1
                  ? "text-amber-100"
                  : step > idx
                  ? "text-yellow-300"
                  : "text-neutral-500/70")
              }
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- AI Headline Generator Logic (Mocked) ---
async function generateHeadlines(
  headline: string,
  audience: string,
  offer: string
): Promise<{ variations: string[]; score: number }> {
  // Placeholder - would call an API/LLM in production
  await new Promise(r => setTimeout(r, 700));
  const v1 = `${headline.split(" | ")[0] || headline} • ${offer} for ${audience}`;
  const v2 = `Helping ${audience} Achieve ${offer} | ${headline}`;
  const v3 = `${offer} Expert → Empowering ${audience} | ${headline}`;
  // Score: simple mock based on length/keywords
  let score = 90 + Math.floor(Math.random() * 7);
  if (!headline || !audience || !offer) score = 65;
  return {
    variations: [
      v1.length > 68
        ? v1.slice(0, 65) + "..."
        : v1,
      v2.length > 68
        ? v2.slice(0, 65) + "..."
        : v2,
      v3.length > 68
        ? v3.slice(0, 65) + "..."
        : v3,
    ],
    score,
  };
}

// --- Main Component ---
export default function Page() {
  const [headline, setHeadline] = useState("");
  const [audience, setAudience] = useState("");
  const [offer, setOffer] = useState("");
  const [step, setStep] = useState(0); // 0=inputs, 1,2,3=progress, 4=done
  const [result, setResult] = useState<{ variations: string[]; score: number } | null>(null);

  // Multi-step animation
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep(1); // Start first stage
    setResult(null);
    await new Promise(r => setTimeout(r, 650));
    setStep(2); // Step two
    await new Promise(r => setTimeout(r, 800));
    setStep(3); // Step three
    await new Promise(r => setTimeout(r, 650));
    // Generate results
    const res = await generateHeadlines(headline.trim(), audience.trim(), offer.trim());
    setResult(res);
    setStep(4);
  }

  // Reset button (optional)
  function resetAll() {
    setHeadline("");
    setAudience("");
    setOffer("");
    setStep(0);
    setResult(null);
  }

  return (
    <main className="min-h-screen min-w-full bg-gradient-to-br from-[#131419] via-[#0a0b11] to-[#191824] px-2 py-5 md:py-12 flex flex-col items-center font-sans text-[#f7e8c7] relative pb-32">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-7 pt-1">
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-300/90 via-yellow-300/80 to-yellow-50 bg-clip-text text-transparent drop-shadow-glow tracking-tight px-2 pb-2 text-center select-none">
          LinkedIn Profile Headline Optimizer
        </h1>
        <p className="text-base md:text-lg text-neutral-200/80 text-center max-w-lg mx-auto opacity-85 mb-0 pb-1">
          Instantly refine your headline to boost search, attract dream clients, and show elite authority. Powered by proprietary CEO-tested frameworks.
        </p>
      </div>

      {/* --- Input Form GlassCard --- */}
      <section className="w-full max-w-xl mx-auto mt-10 flex flex-col gap-8">
        <GlassCard className="space-y-8">
          {step === 0 && (
            <form className="flex flex-col gap-7" onSubmit={handleSubmit} autoComplete="off">
              <div>
                <label className="block text-sm font-semibold mb-2 text-neutral-400 tracking-wider">
                  Current LinkedIn Headline
                </label>
                <input
                  className="w-full bg-[#161824ee] border border-neutral-700/60 rounded-xl px-5 py-3 text-lg shadow-gold-glow focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all"
                  type="text"
                  value={headline}
                  maxLength={75}
                  onChange={e => setHeadline(e.target.value)}
                  required
                  placeholder="e.g. SaaS Founder | Scaling Revenue for B2B Brands"
                />
              </div>
              <div className="flex gap-5 flex-col md:flex-row">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-2 text-neutral-400 tracking-wider">
                    Target Audience
                  </label>
                  <input
                    className="w-full bg-[#161824ee] border border-neutral-700/60 rounded-xl px-4 py-3 text-base shadow-gold-glow focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all"
                    type="text"
                    value={audience}
                    maxLength={50}
                    onChange={e => setAudience(e.target.value)}
                    required
                    placeholder="e.g. B2B SaaS CEOs"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-2 text-neutral-400 tracking-wider">
                    Core Offer / Value
                  </label>
                  <input
                    className="w-full bg-[#161824ee] border border-neutral-700/60 rounded-xl px-4 py-3 text-base shadow-gold-glow focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all"
                    type="text"
                    value={offer}
                    maxLength={64}
                    onChange={e => setOffer(e.target.value)}
                    required
                    placeholder="e.g. ARR Growth Acceleration"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-400/90 via-yellow-400/70 to-yellow-300/70 font-black text-lg text-black shadow-[0_0_22px_2px_#ffe08888] ring-1 ring-amber-300/30 transition-all hover:scale-105 hover:brightness-110 cta-neon"
              >
                Optimize My Headline
              </button>
            </form>
          )}

          {/* Progress Steps (1-3) */}
          {step > 0 && step < 4 && (
            <div className="flex flex-col items-center justify-center min-h-[180px]">
              <ProgressBar step={step} />
              <div className="pt-7 flex flex-col gap-7 items-center w-full">
                <div className="loader mb-5" />
                <span className="text-lg text-amber-100/90 font-semibold tracking-wide animate-fade-in" key={step}>
                  {step === 1 && "Analyzing top keywords and differentiators..."}
                  {step === 2 && "Structuring an elite value proposition..."}
                  {step === 3 && "Crafting high-authority headline options..."}
                </span>
              </div>
            </div>
          )}

          {/* Final Output */}
          {step === 4 && result && (
            <div className="flex flex-col items-center gap-6 w-full animate-fade-in">
              <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full gap-6 md:gap-10">
                <div className="flex-1 flex flex-col gap-3">
                  <span className="uppercase text-xs text-amber-500/90 font-bold tracking-widest mb-2">
                    3 Optimized Headline Variations
                  </span>
                  {result.variations.map((v, i) => (
                    <GlassCard
                      key={i}
                      className="bg-gradient-to-r from-[#18141b]/90 via-[#222018]/85 to-[#131415]/75 border-amber-400/25"
                    >
                      <span className="font-semibold text-base md:text-lg text-amber-50">
                        {v}
                      </span>
                      <button
                        className="mt-3 ml-auto text-xs px-3 py-1 rounded-md bg-amber-400/80 font-bold text-black shadow-gold-glow transition hover:scale-105 hover:bg-amber-300"
                        onClick={() => {
                          navigator.clipboard?.writeText(v);
                        }}
                        type="button"
                        aria-label="Copy Headline"
                        tabIndex={0}
                      >
                        Copy
                      </button>
                    </GlassCard>
                  ))}
                </div>
                <div className="flex-shrink-0 flex flex-col items-center gap-2 min-w-[130px]">
                  <AuthorityGauge score={result.score} />
                </div>
              </div>
              <button
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-neutral-900/60 via-zinc-800/90 to-neutral-900/80 border border-amber-300/15 font-bold text-[1rem] text-amber-100 shadow-gold-glow opacity-90 hover:opacity-100 transition hover:scale-105"
                onClick={resetAll}
                type="button"
              >
                Start Over
              </button>
            </div>
          )}
        </GlassCard>
      </section>

      {/* --- Minimal Footer --- */}
      <footer className="w-full max-w-2xl mt-auto mb-3 flex justify-center items-center opacity-90 absolute left-1/2 -translate-x-1/2 bottom-0">
        <span className="text-xs text-neutral-500 text-center mx-auto py-6">
          © 2026 Executive Studio. Elevating LinkedIn leaders with AI-powered authority.
        </span>
      </footer>

      {/* --- Minimal CSS Animations and Glass --- */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(-20px);} to { opacity: 1; transform: none;} }
        .animate-fade-in { animation: fade-in 0.46s cubic-bezier(.38,1.26,.41,1) both;}
        .glass-card {
          background: inherit;
          border-radius: 1.3rem;
          box-shadow: 0 6px 44px 0 #ffe08811, 0 1.5px 0px 0 #000a;
          backdrop-filter: blur(18px) saturate(1.1);
          border: 1px solid #ffe08822;
        }
        .cta-neon {
          box-shadow: 0 0 22px 2px #ffe08899, 0 0 10px 2px #ffe08855;
        }
        .gold-glow, .shadow-gold-glow {
          box-shadow: 0 0 22px 1.2px #ffe08855, 0 0 8px 1px #ffe08855;
        }
        .drop-shadow-glow {
          text-shadow: 0 2.5px 22px #ffe08877, 0 1px 8px #ffe08855;
        }
        .loader {
          border: 4px solid #ffe08866;
          border-top: 4px solid #ffe088ee;
          border-radius: 9999px;
          width: 2.2em;
          height: 2.2em;
          animation: spin 1.3s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg);} }
      `}</style>
    </main>
  );
}