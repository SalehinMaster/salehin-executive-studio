import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";

const ProblemSolution = dynamic(
  () =>
    import("@/components/sections/problem-solution").then(
      (mod) => mod.ProblemSolution,
    ),
  { loading: () => <SectionPlaceholder /> },
);

const Services = dynamic(
  () =>
    import("@/components/sections/services").then((mod) => mod.Services),
  { loading: () => <SectionPlaceholder /> },
);

const AiDemo = dynamic(
  () => import("@/components/sections/ai-demo").then((mod) => mod.AiDemo),
  { loading: () => <SectionPlaceholder tall /> },
);

const FeaturesGrid = dynamic(
  () =>
    import("@/components/sections/features-grid").then(
      (mod) => mod.FeaturesGrid,
    ),
  { loading: () => <SectionPlaceholder /> },
);

const Portfolio = dynamic(
  () =>
    import("@/components/sections/portfolio").then((mod) => mod.Portfolio),
  { loading: () => <SectionPlaceholder /> },
);

const Testimonials = dynamic(
  () =>
    import("@/components/sections/testimonials").then(
      (mod) => mod.Testimonials,
    ),
  { loading: () => <SectionPlaceholder /> },
);

const FAQ = dynamic(
  () => import("@/components/sections/faq").then((mod) => mod.FAQ),
  { loading: () => <SectionPlaceholder /> },
);

const CTA = dynamic(
  () => import("@/components/sections/cta").then((mod) => mod.CTA),
  { loading: () => <SectionPlaceholder /> },
);

function SectionPlaceholder({ tall = false }: { tall?: boolean }) {
  return (
    <div
      aria-hidden
      className={tall ? "min-h-[32rem] py-section" : "min-h-[20rem] py-section"}
    />
  );
}

export function HomeSections() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Services />
      <AiDemo />
      <FeaturesGrid />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
