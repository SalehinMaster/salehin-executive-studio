"use client";

import { Bug, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { cn } from "@/lib/utils";

type BugReport = {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  created_at: string;
};

const SEVERITIES = ["low", "medium", "high", "critical"] as const;

type BugReportPanelProps = {
  embedded?: boolean;
};

export function BugReportPanel({ embedded = false }: BugReportPanelProps) {
  const { toast } = useToast();
  const [tab, setTab] = useState<"report" | "history">("report");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<(typeof SEVERITIES)[number]>("medium");
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<BugReport[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const loadHistory = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const response = await fetch("/api/beta/bugs");
      const data = (await response.json()) as { reports?: BugReport[] };
      if (response.ok) setReports(data.reports ?? []);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    if (tab === "history") void loadHistory();
  }, [tab, loadHistory]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/beta/bugs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, severity }),
      });
      const data = (await response.json()) as { report?: BugReport; error?: string };
      if (!response.ok) {
        toast({ title: "Report failed", description: data.error, variant: "error" });
        return;
      }
      toast({ title: "Bug report submitted", variant: "success" });
      setTitle("");
      setDescription("");
      setTab("history");
      if (data.report) setReports((prev) => [data.report!, ...prev]);
    } catch {
      toast({ title: "Network error", variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <>
      <div className="flex items-center gap-2">
        <Bug className="size-4 text-primary" aria-hidden />
        <p className="font-medium text-foreground">Bug reports</p>
      </div>

      <div className="mt-4 flex gap-2 border-b border-border">
        {(["report", "history"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "focus-ring -mb-px border-b-2 px-3 py-2 text-xs capitalize transition-colors",
              tab === id
                ? "border-primary text-foreground"
                : "border-transparent text-muted hover:text-foreground",
            )}
          >
            {id === "report" ? "Report" : "My reports"}
          </button>
        ))}
      </div>

      {tab === "report" ? (
        <form onSubmit={(e) => void submit(e)} className="mt-4 space-y-3">
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Short title"
            className="focus-ring w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm"
          />
          <textarea
            required
            minLength={10}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Steps to reproduce, expected vs actual…"
            className="focus-ring w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm"
          />
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as (typeof SEVERITIES)[number])}
            className="focus-ring w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm"
            aria-label="Severity"
          >
            {SEVERITIES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Button type="submit" loading={loading} className="w-full gap-2">
            Submit report
          </Button>
        </form>
      ) : loadingHistory ? (
        <div className="mt-6 flex justify-center py-8">
          <Loader2 className="size-6 animate-spin text-muted" aria-hidden />
        </div>
      ) : reports.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {reports.map((report) => (
            <li
              key={report.id}
              className="rounded-lg border border-border bg-surface/40 px-3 py-2 text-sm"
            >
              <p className="font-medium text-foreground">{report.title}</p>
              <p className="mt-1 text-xs text-muted capitalize">
                {report.severity} · {report.status} ·{" "}
                {new Date(report.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted">No reports yet.</p>
      )}
    </>
  );

  if (embedded) {
    return <div className="space-y-4">{content}</div>;
  }

  return <GlassCard className="p-6">{content}</GlassCard>;
}
