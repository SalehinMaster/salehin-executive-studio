"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastRecord = ToastInput & {
  id: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const variantStyles: Record<
  ToastVariant,
  { icon: typeof CheckCircle2; accent: string; glow: string }
> = {
  success: {
    icon: CheckCircle2,
    accent: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
    glow: "shadow-[0_0_32px_rgba(16,185,129,0.18)]",
  },
  error: {
    icon: AlertCircle,
    accent: "border-red-400/30 bg-red-500/10 text-red-300",
    glow: "shadow-[0_0_32px_rgba(248,113,113,0.16)]",
  },
  info: {
    icon: Info,
    accent: "border-primary/35 bg-primary/10 text-primary",
    glow: "shadow-glow-soft",
  },
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastRecord;
  onDismiss: (id: string) => void;
}) {
  const config = variantStyles[toast.variant];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-xl border backdrop-blur-xl",
        "glass-card-strong",
        config.accent,
        config.glow,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent"
        aria-hidden
      />
      <div className="relative flex gap-3 p-4 pr-10">
        <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium text-foreground">{toast.title}</p>
          {toast.description ? (
            <p className="text-xs leading-relaxed text-muted">{toast.description}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="focus-ring absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface/80 hover:text-foreground"
          aria-label="Dismiss notification"
        >
          <X className="size-3.5" aria-hidden />
        </button>
      </div>
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "info", duration = 4200 }: ToastInput) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;

      const record: ToastRecord = {
        id,
        title,
        description,
        variant,
        duration,
      };

      setToasts((current) => [...current, record]);

      window.setTimeout(() => {
        dismiss(id);
      }, duration);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-label="Notifications"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-3 p-4 sm:items-end sm:p-6"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((item) => (
            <ToastItem key={item.id} toast={item} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
