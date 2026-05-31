import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
};

export function Button({
  children,
  variant = "primary",
  className,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        "focus-ring touch-target inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 text-label transition-all disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-primary text-foreground shadow-glow-primary hover:bg-primary-hover hover:shadow-[var(--shadow-glow-primary),0_0_60px_rgba(124,58,237,0.4)]",
        variant === "secondary" &&
          "glass-card border-border-strong text-foreground hover:border-primary/40 hover:shadow-glow-soft",
        variant === "ghost" &&
          "border border-border-strong bg-transparent text-foreground hover:border-primary/50 hover:bg-primary/10",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
