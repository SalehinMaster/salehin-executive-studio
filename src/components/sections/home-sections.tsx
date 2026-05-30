import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
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
      <Portfolio />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
