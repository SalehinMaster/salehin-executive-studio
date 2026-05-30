import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-section md:py-section-lg", className)}
    >
      <div className="mx-auto max-w-6xl px-container-x md:px-container-x-md">
        {children}
      </div>
    </section>
  );
}
