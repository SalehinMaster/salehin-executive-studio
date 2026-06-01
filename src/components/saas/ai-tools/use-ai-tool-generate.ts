"use client";

import { useCallback, useState } from "react";
import type { OpenRouterModelKey } from "@/lib/ai/models";
import type {
  AiToolId,
  AiToolOutputMap,
  AiToolsGenerateError,
  AiToolsGenerateRequest,
  AiToolsGenerateResponse,
} from "@/types/ai-tools";

export function useAiToolGenerate<T extends AiToolId>(tool: T) {
  const [output, setOutput] = useState<AiToolOutputMap[T] | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [lastModel, setLastModel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = useCallback(
    async (payload: Record<string, unknown> & { model: OpenRouterModelKey }) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/ai/tools", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tool, ...payload } as AiToolsGenerateRequest),
        });

        const data = (await response.json()) as AiToolsGenerateResponse<T> | AiToolsGenerateError;

        if (!response.ok) {
          setError("error" in data ? data.error : "Generation failed.");
          return null;
        }

        const success = data as AiToolsGenerateResponse<T>;
        setOutput(success.output);
        setGenerationId(success.generationId);
        setLastModel(success.model);
        return success.output;
      } catch {
        setError("Network error. Please try again.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [tool],
  );

  const reset = useCallback(() => {
    setOutput(null);
    setGenerationId(null);
    setLastModel(null);
    setError(null);
  }, []);

  return { output, generationId, lastModel, error, loading, generate, reset, setError };
}
