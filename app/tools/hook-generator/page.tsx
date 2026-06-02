"use client";

import React, { useState } from "react";

const TONES = [
  { label: "Authoritative", value: "authoritative" },
  { label: "Viral", value: "viral" },
  { label: "Storytelling", value: "storytelling" },
  { label: "Aspirational", value: "aspirational" },
  { label: "Contrarian", value: "contrarian" },
];

// GlassCard: Reusable Glassmorphism Container
function GlassCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`glass-card rounded-2xl border-[1.5px] border-neutral-800/90 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-black/60 shadow-2xl backdrop-blur-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}

// Tool: Live LinkedIn Hook Generator
export default function HookGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState(TONES[0].value);
  const [loading, setLoading] = useState(false);
  const [hooks, setHooks] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  // Simulate Hook Generation (replace with API in production)
  function generateHooks() {
    setLoading(true);
    setHooks([]);
    setTimeout(() => {
      // Slightly specialized, 2026-optimized LinkedIn hooks
      const baseHooks = [
        `What ${topic.trim() || "modern leaders"} get wrong about {subject} — and how you can capitalize in ${new Date().getFullYear()+2}.`,
        `If you want {result}, skip this ONE mistake nearly all ${topic.trim() || "experts"} still make.`,
        `Here’s how I turned ${topic ? topic.trim() + " buzz" : "a single idea"} into real influence (and how you can too).`,
        `This ${topic ? topic.trim() + " insight" : "framework"} is why top voices get inbound every day in ${new Date().getFullYear()+2}.`,
        `You’re missing out on {opportunity} because no one is telling the truth about ${topic.trim() || "this"}.`,
      ];

      // Tone variations (simple demo logic)
      function withTone(text: string) {
        switch (tone) {
          case "authoritative":
            return `Expert POV: ` + text.replace("{subject}", topic.toLowerCase() || "their industry").replace("{result}", "predictable results").replace("{opportunity}", "premium opportunities");
          case "viral":
            return `🔥 Hot Take → ` + text.replace("{subject}", topic.toLowerCase() || "their niche").replace("{result}", "instant traction").replace("{opportunity}", "going viral");
          case "storytelling":
            return `Let me tell you a story. ` + text.replace("{subject}", topic.toLowerCase() || "success").replace("{result}", "10X growth").replace("{opportunity}", "legacy moves");
          case "aspirational":
            return `Imagine this: ` + text.replace("{subject}", topic.toLowerCase() || "your field").replace("{result}", "elite success").replace("{opportunity}", "category leadership");
          case "contrarian":
            return `Everyone's got it backwards. ` + text.replace("{subject}", topic.toLowerCase() || "the status quo").replace("{result}", "actual results").replace("{opportunity}", "breaking the mold");
          default:
            return text.replace("{subject}", topic.toLowerCase() || "the status quo").replace("{result}", "actual results").replace("{opportunity}", "breaking the mold");
        }
      }

      setHooks(baseHooks.map(withTone));
      setLoading(false);
    }, 1400);
  }

  function handleCopy(idx: number, hook: string) {
    navigator.clipboard.writeText(hook);
    setCopiedIdx(idx);
    setTimeout(() => {
      setCopiedIdx((prev) => (prev === idx ? null : prev));
    }, 1600);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-neutral-900 flex flex-col py-12 px-4 md:px-0 items-center">
      {/* Title + Subtitle */}
      <GlassCard className="max-w-2xl mb-10 flex flex-col items-center text-center bg-gradient-to-br from-neutral-900/95 via-zinc-900/80 to-black/70 border-neutral-800/80">
        <h1 className="text-3xl md:text-4xl font-black text-[#ffe088] drop-shadow-glow uppercase tracking-tight mb-2">
          Live LinkedIn Hook Generator
        </h1>
        <p className="text-neutral-300/80 text-lg max-w-xl mx-auto font-medium">
          Instantly generate <span className="text-[#ffe088] font-bold">premium LinkedIn hooks</span> for your posts. Supercharge reach, impressions, and engagement using AI-tuned, 2026-ready templates. <br className="hidden md:inline" />
        </p>
      </GlassCard>

      {/* Input Form */}
      <form
        className="w-full max-w-xl flex flex-col gap-6 bg-transparent"
        onSubmit={e => {
          e.preventDefault();
          generateHooks();
        }}
      >
        <GlassCard className="gap-5 flex flex-col bg-gradient-to-br from-neutral-900/90 to-neutral-800/60 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Topic/Niche Input */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-sm text-neutral-400 font-semibold mb-1 ml-1">
                Topic or Niche
              </label>
              <input
                className="rounded-xl bg-neutral-900/60 border border-neutral-700 px-4 py-2.5 text-lg text-[#ffe088] font-semibold ring-amber-300/20 focus:outline-none focus:ring-2 focus:ring-amber-300/60 transition"
                type="text"
                placeholder="E.g. Personal Branding, B2B Sales, SaaS Growth"
                value={topic}
                maxLength={48}
                onChange={e => setTopic(e.target.value)}
                autoFocus
              />
            </div>
            {/* Tone Select */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-sm text-neutral-400 font-semibold mb-1 ml-1">
                Tone
              </label>
              <select
                className="rounded-xl bg-neutral-900/60 border border-neutral-700 px-4 py-2.5 text-lg text-[#ffe088] font-semibold ring-amber-300/20 focus:outline-none focus:ring-2 focus:ring-amber-300/60 transition cursor-pointer"
                value={tone}
                onChange={e => setTone(e.target.value)}
              >
                {TONES.map(t => (
                  <option className="bg-neutral-950 text-[#ffe088] font-semibold" key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full flex justify-center items-center py-3 rounded-xl bg-gradient-to-r from-[#ffe088] via-yellow-300 to-amber-300 text-black font-semibold text-lg shadow-md hover:scale-105 focus:ring-2 focus:ring-amber-300/40 transition active:brightness-95 gold-glow ring-1 ring-[#ffe08822]"
            disabled={loading}
          >
            {loading ? (
              <span className="flex gap-2 items-center">
                <span className="loader w-6 h-6 border-4 border-yellow-300 border-r-yellow-100 animate-spin"></span>
                Generating hooks...
              </span>
            ) : (
              <>Generate Hooks</>
            )}
          </button>
        </GlassCard>
      </form>

      {/* Results Display */}
      <section className="w-full max-w-2xl flex flex-col gap-5 mt-12 mb-14">
        {loading && (
          // Premium glass/skeleton loading cards
          <div className="flex flex-col gap-5 animate-fade-in">
            {[...Array(5)].map((_, idx) => (
              <GlassCard key={idx} className="relative overflow-hidden p-6 flex items-center min-h-[85px] bg-gradient-to-br from-yellow-900/5 to-neutral-900/30">
                <div className="w-10/12 h-6 bg-gradient-to-r from-[#ffe08833] via-[#ffe08855] to-[#ffe08811] rounded mb-2 animate-skeleton mb-3"></div>
                <div className="w-7/12 h-5 bg-gradient-to-r from-[#ffe08844] via-[#ffe08822] to-[#ffe08800] rounded animate-skeleton"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-neutral-100/0 to-[#ffe08808] pointer-events-none" />
              </GlassCard>
            ))}
          </div>
        )}
        {!loading && hooks.length > 0 && (
          <div className="flex flex-col gap-5 animate-fade-in">
            {hooks.map((hook, idx) => (
              <GlassCard
                key={idx}
                className="relative flex flex-col gap-3 p-7 pl-8 pr-11 bg-gradient-to-br from-neutral-900/90 to-amber-900/15 border-amber-200/15 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <span className="text-lg text-[#ffe088] font-semibold drop-shadow-glow leading-snug break-words">
                    {hook}
                  </span>
                  <button
                    onClick={() => handleCopy(idx, hook)}
                    className={`ml-4 p-2 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 active:bg-neutral-800 transition border border-amber-400/30 text-[#ffe088] shadow-gold-glow flex flex-row items-center justify-center relative outline-none focus:ring-2 focus:ring-amber-300/30`}
                    title="Copy to Clipboard"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="3" className="stroke-[#ffe088]/80" />
                      <rect x="3" y="3" width="13" height="13" rx="3" className="stroke-[#ffe088]/40" />
                    </svg>
                    {copiedIdx === idx && (
                      <span className="absolute left-[110%] top-1/2 -translate-y-1/2 min-w-[78px] text-xs px-3 py-1.5 bg-black/80 text-[#ffe088] border border-[#ffe08855] rounded-xl ml-2 shadow-gold-glow transition animate-fade-in">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="w-full max-w-2xl mt-auto mb-3 flex justify-center items-center opacity-90">
        <span className="text-xs text-neutral-500 text-center mx-auto py-6">
          © 2026 Executive Studio. Elevating LinkedIn creators with AI-powered advantage.
        </span>
      </footer>

      {/* --- Minimal CSS for animation, glass, skeletons, gold glow --- */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(-18px);} to { opacity: 1; transform: none;} }
        .animate-fade-in { animation: fade-in 0.45s cubic-bezier(.38,1.26,.41,1) both;}
        .glass-card {
          background: inherit;
          border-radius: 1.3rem;
          box-shadow: 0 6px 44px 0 #ffe08822, 0 1.5px 0px 0 #000a;
          backdrop-filter: blur(16px) saturate(1.14);
        }
        .drop-shadow-glow {
          text-shadow: 0 2px 22px #ffe08877, 0 1px 8px #ffe08855;
        }
        .gold-glow, .shadow-gold-glow {
          box-shadow: 0 0 24px 1.2px #ffe08844, 0 0 8px 1px #ffe08855;
        }
        .loader {
          border: 4px solid #ffe08866;
          border-top: 4px solid #ffe088;
          border-radius: 9999px;
          width: 1.7em;
          height: 1.7em;
          animation: spin 1.1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg);} }
        .animate-skeleton {
          position: relative;
          overflow: hidden;
          background: linear-gradient(90deg, #222 8%, #ffe0881a 38%, #222 64%);
          background-size: 600% 100%;
          animation: skeleton-move 1.17s linear infinite;
        }
        @keyframes skeleton-move {
          0% { background-position: -200% 0;}
          80%, 100% { background-position: 220% 0;}
        }
      `}</style>
    </main>
  );
}