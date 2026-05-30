import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  lazy?: boolean;
  children: React.ReactNode;
};

export function Section({ id, className, lazy = false, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-section md:py-section-lg",
        lazy && "content-auto",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-container-x md:px-container-x-md">
        {children}
      </div>
    </section>
  );
}
