import { AiDemo } from "@/components/sections/ai-demo";
import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { Hero } from "@/components/sections/hero";
import { Portfolio } from "@/components/sections/portfolio";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";

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
