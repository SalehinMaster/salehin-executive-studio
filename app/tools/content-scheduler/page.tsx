"use client";

import React, { useState } from "react";
import { GlassCard } from '../../../src/components/ui/glass-card';
import dayjs from 'dayjs';

type ScheduledPost = {
  id: number;
  content: string;
  scheduledAt: string; // ISO string
  bestTime: string;
  readability: string;
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initialGrid = () => {
  // Matrix of days vs. 7am-9pm (15 slots per day)
  const hours = Array.from({ length: 15 }, (_, i) => 7 + i);
  const grid: Record<string, Record<number, ScheduledPost | null>> = {};
  DAYS.forEach((d, di) => {
    grid[d] = {};
    hours.forEach(h => {
      grid[d][h] = null;
    });
  });
  return grid;
};

function getReadabilityScore(text: string) {
  // Simple algorithm: higher for shorter sentences, avg word length etc
  if (!text) return "N/A";
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const avgWords = words.length / (sentences.length || 1);
  if (words.length < 12) return "Too Short";
  if (avgWords < 10) return "Easy";
  if (avgWords < 18) return "Medium";
  return "Complex";
}

function getBestTime(dateStr: string) {
  // Simulated "algorithm"
  const date = dayjs(dateStr);
  const hour = date.hour();
  if ([9, 10, 14, 19].includes(hour)) return "🔝 Prime Time";
  if (hour < 9) return "🌙 Early Bird";
  if (hour >= 20) return "🌚 Late Night";
  return "✨ Good Interval";
}

export default function ContentScheduler() {
  const [content, setContent] = useState("");
  const [scheduledAt, setScheduledAt] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [scheduled, setScheduled] = useState<ScheduledPost[]>([]);
  const [grid, setGrid] = useState(initialGrid);

  function handleSchedule(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || !scheduledAt) return;
    setAnalyzing(true);

    setTimeout(() => {
      // Simulate AI analysis
      const bestTime = getBestTime(scheduledAt);
      const readability = getReadabilityScore(content);
      const id = Date.now();
      const newPost: ScheduledPost = {
        id,
        content,
        scheduledAt,
        bestTime,
        readability,
      };

      // Place in grid
      const date = dayjs(scheduledAt);
      const day = DAYS[date.day() === 0 ? 6 : date.day() - 1]; // JS: Sun=0
      const hour = date.hour();

      setScheduled(prev => [...prev, newPost]);
      setGrid(prev => {
        const next = { ...prev };
        if (next[day]) {
          next[day] = { ...next[day], [hour]: newPost };
        }
        return next;
      });
      setContent("");
      setScheduledAt("");
      setAnalyzing(false);
    }, 1300);
  }

  // 15 time slots (7-21)
  const timeSlots = Array.from({ length: 15 }, (_, i) => 7 + i);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-900 via-black to-neutral-950 items-center px-2 pb-28 pt-2 relative">
      <div className="w-full max-w-4xl mx-auto mt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-200 tracking-tight mb-2 drop-shadow-glow">
          Smart Content Distribution Scheduler
        </h1>
        <p className="text-lg text-amber-100/70 mb-7 max-w-2xl">
          Instantly schedule your LinkedIn posts based on AI-analyzed “best time to post” windows and readability metrics. Elevate your impact—every post, perfectly timed.
        </p>
      </div>
      {/* --- INPUT CARD --- */}
      <GlassCard className="max-w-2xl w-full mb-12 p-7 bg-gradient-to-br from-neutral-900/80 to-zinc-900/40 border-amber-400/30 shadow-gold-glow">
        <form onSubmit={handleSchedule} className="flex flex-col gap-5">
          <textarea
            className="w-full min-h-[90px] p-3 rounded-xl bg-neutral-900/70 border border-amber-400/20 focus:border-amber-300 outline-none text-base text-amber-100 font-medium transition-all shadow-gold-glow resize-none"
            placeholder="Paste or write your LinkedIn post draft..."
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={analyzing}
            maxLength={1200}
            required
          />
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-amber-200 text-sm font-semibold mb-1" htmlFor="datetime">
                Target Date &amp; Time (2026)
              </label>
              <input
                id="datetime"
                type="datetime-local"
                className="bg-neutral-900/60 border border-amber-300/15 rounded-xl px-3 py-2 text-amber-100 font-semibold w-full focus:border-amber-200 outline-none transition-all"
                value={scheduledAt}
                onChange={e => setScheduledAt(e.target.value)}
                min={dayjs().format("YYYY-MM-DDTHH:mm")}
                max="2026-12-31T23:59"
                step={900}
                required
                disabled={analyzing}
              />
            </div>
            <button
              type="submit"
              className={`mt-2 md:mt-0 px-8 py-3 rounded-xl bg-gradient-to-br from-amber-200/90 to-yellow-400/80 text-black font-bold shadow-gold-glow text-lg hover:scale-105 focus:outline-none transition duration-200 ring-1 ring-amber-300/20 cta-neon ${
                analyzing ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={analyzing || !content.trim() || !scheduledAt}
            >
              {analyzing ? (
                <span className="flex items-center gap-2">
                  <span className="loader mr-1" />
                  Analyzing...
                </span>
              ) : (
                "Analyze & Schedule"
              )}
            </button>
          </div>
        </form>
      </GlassCard>

      {/* --- CALENDAR CARD --- */}
      <GlassCard className="w-full max-w-6xl px-0 md:px-5 py-7 mb-6 bg-gradient-to-br from-neutral-950/80 via-zinc-900/75 to-black/85 border-amber-200/10 shadow-gold-glow">
        <h2 className="text-lg md:text-2xl font-bold text-amber-200 mb-6 px-7">
          Content Calendar <span className="text-amber-100/60 text-base font-medium">(Weekly view & Prime windows)</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-[800px] border-separate border-spacing-y-2 select-none">
            <thead>
              <tr>
                <th className="text-amber-200/70 text-base font-semibold pb-1 text-left pl-6 pr-2">Time</th>
                {DAYS.map((d, i) => (
                  <th key={d} className="text-amber-100/60 text-base font-semibold pb-1 px-2 text-center">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(hour => (
                <tr key={hour}>
                  <td className="text-amber-300/70 font-mono font-semibold text-sm pr-3 pl-6 align-top whitespace-nowrap">
                    {hour.toString().padStart(2, "0")}:00
                  </td>
                  {DAYS.map(day => {
                    const scheduledPost = grid[day][hour];
                    return (
                      <td key={day + hour} className="align-top px-2 min-w-[130px]">
                        {scheduledPost ? (
                          <div className="scheduled-card bg-gradient-to-br from-amber-900/70 via-yellow-900/80 to-neutral-900/60 border border-amber-400/20 rounded-xl p-3 shadow-gold-glow animate-fade-in">
                            <div className="text-xs text-amber-200/80 font-semibold flex items-center gap-2 mb-1">
                              <span className="inline-block w-2 h-2 rounded-full bg-amber-400/70" />
                              {dayjs(scheduledPost.scheduledAt).format("ddd, MMM D")}
                              <span className="ml-auto text-amber-300 font-bold">{dayjs(scheduledPost.scheduledAt).format("HH:mm")}</span>
                            </div>
                            <div className="text-amber-100 font-medium text-sm mb-2 line-clamp-2 break-words">
                              “{scheduledPost.content.length > 54
                                ? scheduledPost.content.slice(0, 54) + "…"
                                : scheduledPost.content}”
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                                <svg className="w-4 h-4 text-amber-300 inline" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6v4l2.5 2.5" />
                                  <circle cx="10" cy="10" r="8" className="stroke-amber-300/70" />
                                </svg>
                                {scheduledPost.bestTime}
                              </span>
                              <span className="text-xs text-yellow-300/90 font-semibold">Readability: {scheduledPost.readability}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="h-[52px]"></div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* --- Minimal Footer --- */}
      <footer className="w-full max-w-2xl mt-auto mb-3 flex justify-center items-center opacity-90">
        <span className="text-xs text-neutral-500 text-center mx-auto py-6">
          © 2026 Executive Studio. Precision content, timed to perfection.
        </span>
      </footer>

      {/* --- Premium Glassmorphism, Animations, Loader, Calendar Styling --- */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-18px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fade-in {
          animation: fade-in 0.42s cubic-bezier(.38,1.26,.41,1) both;
        }
        .glass-card {
          background: inherit;
          border-radius: 1.25rem;
          box-shadow: 0 6px 44px 0 #ffe08822, 0 2px 8px 0 #000b;
          backdrop-filter: blur(16px) saturate(1.14);
        }
        .cta-neon {
          box-shadow: 0 0 20px 2px #ffd96699, 0 0 8px 1.5px #ffe08855;
        }
        .shadow-gold-glow {
          box-shadow: 0 0 32px 1.6px #ffd96633, 0 0 9px 1.2px #ffe08855;
        }
        .drop-shadow-glow {
          text-shadow: 0 1.5px 14px #ffe08877, 0 1px 6px #ffe08866;
        }
        .loader {
          border: 4px solid #ffe08855;
          border-top: 4px solid #ffe088ee;
          border-radius: 9999px;
          width: 1.4em;
          height: 1.4em;
          animation: spin 1.1s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg);} }
        .scheduled-card {
          transition: filter 0.13s, transform 0.13s;
        }
        .scheduled-card:hover {
          filter: brightness(1.12);
          transform: scale(1.03);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}