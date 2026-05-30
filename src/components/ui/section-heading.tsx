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
            "text-primary",
          )}
        >
          <span
            className={cn(
              "h-px w-10 bg-primary",
              align === "center" && "hidden sm:block",
            )}
            aria-hidden
          />
          <p className="text-eyebrow text-primary">
            {eyebrow}
          </p>
        </div>
      ) : null}
      <h2
        className={cn(
          "text-display-section font-display font-medium tracking-tight text-balance",
          invert ? "text-on-inverse" : "text-foreground",
          eyebrow && "mt-4 sm:mt-5",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-body-fluid sm:mt-5",
            "text-muted text-pretty",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
