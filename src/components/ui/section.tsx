import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-24 md:py-36", className)}>
      <div className="mx-auto max-w-6xl px-6 md:px-10">{children}</div>
    </section>
  );
}
