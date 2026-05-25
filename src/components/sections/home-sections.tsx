import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Portfolio } from "@/components/sections/portfolio";
import { Problem } from "@/components/sections/problem";
import { Services } from "@/components/sections/services";
import { Solution } from "@/components/sections/solution";
import { Testimonials } from "@/components/sections/testimonials";

export function HomeSections() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
