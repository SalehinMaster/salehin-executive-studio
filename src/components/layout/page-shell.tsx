type PageShellProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-container-x py-section md:px-container-x-md md:py-section-lg">
      <p className="text-eyebrow text-primary">
        AI-Powered Personal Branding OS
      </p>
      <h1 className="mt-5 text-display-section font-display font-medium tracking-tight text-foreground">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-2xl text-body-fluid text-muted">
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-12 md:mt-16">{children}</div> : null}
    </main>
  );
}
