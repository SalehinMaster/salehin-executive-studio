import { LeadMagnetForm } from "@/components/lead-magnets/lead-magnet-form";
import { GlassCard } from "@/components/ui/glass-card";
import { TextLink } from "@/components/ui/text-link";

type LeadMagnetLandingPageProps = {
  magnetSlug: string;
  title: string;
  subtitle: string;
  bullets: string[];
};

export function LeadMagnetLandingPage({
  magnetSlug,
  title,
  subtitle,
  bullets,
}: LeadMagnetLandingPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-container-x py-section md:px-container-x-md md:py-section-lg">
      <p className="text-eyebrow text-primary">Lead Magnet Library</p>
      <h1 className="mt-5 font-display text-display-section font-medium tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-5 max-w-3xl text-body-fluid text-muted">{subtitle}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <GlassCard variant="strong" className="p-6 md:p-8">
          <h2 className="font-display text-2xl font-medium text-foreground">What you will get</h2>
          <ul className="mt-5 space-y-3 text-muted">
            {bullets.map((bullet) => (
              <li key={bullet}>- {bullet}</li>
            ))}
          </ul>
          <div className="mt-8 rounded-xl border border-border/70 bg-surface/40 p-4">
            <p className="text-sm text-muted">
              Prefer guided implementation? <TextLink href="/contact#scheduling">Book a strategy call</TextLink>.
            </p>
          </div>
        </GlassCard>

        <LeadMagnetForm
          magnetSlug={magnetSlug}
          magnetTitle={title}
          downloadLabel={title}
        />
      </div>
    </main>
  );
}
