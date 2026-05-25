import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  invert?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  invert = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "flex items-center gap-4",
            align === "center" && "justify-center",
            invert ? "text-accent" : "text-accent",
          )}
        >
          <span
            className={cn(
              "h-px w-10 bg-accent",
              align === "center" && "hidden sm:block",
            )}
            aria-hidden
          />
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
            {eyebrow}
          </p>
        </div>
      ) : null}
      <h2
        className={cn(
          "font-display text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl",
          invert ? "text-background" : "text-foreground",
          eyebrow && "mt-5",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            invert ? "text-background/70" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
