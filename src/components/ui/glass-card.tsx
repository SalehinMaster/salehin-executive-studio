import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "strong";
  glow?: "none" | "primary" | "secondary" | "soft";
  hover?: boolean;
  as?: "div" | "article";
  style?: React.CSSProperties;
};

export function GlassCard({
  children,
  className,
  variant = "default",
  glow = "none",
  hover = false,
  as: Component = "div",
  style,
}: GlassCardProps) {
  return (
    <Component
      style={style}
      className={cn(
        variant === "strong" ? "glass-card-strong" : "glass-card",
        glow === "primary" && "glow-primary",
        glow === "secondary" && "glow-secondary",
        glow === "soft" && "glow-soft",
        hover && "hover-lift",
        className,
      )}
    >
      {children}
    </Component>
  );
}
