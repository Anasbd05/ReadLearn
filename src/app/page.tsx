import { FAQ } from "@/components/landingpage/Faqs";
import { Features } from "@/components/landingpage/Features";
import { Hero } from "@/components/landingpage/Hero";
import HowItWorks from "@/components/landingpage/HowItWorks";
import Navbar from "@/components/landingpage/Navbar";
import Pricing from "@/components/landingpage/Pricing";

export default function Home() {
  return (
    <section>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
    </section>
  );
}
