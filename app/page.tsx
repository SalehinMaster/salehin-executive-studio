import { HomeSections } from "@/components/sections/home-sections";
import { homeMetadata } from "@/lib/seo/metadata";

export const metadata = homeMetadata;

export default function HomePage() {
  return <HomeSections />;
}
