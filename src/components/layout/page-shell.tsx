type PageShellProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-24 md:px-10 md:py-32">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
        AI-powered authority systems
      </p>
      <h1 className="mt-5 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-16">{children}</div> : null}
    </main>
  );
}
