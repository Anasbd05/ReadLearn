import Banner from "@/components/landingpage/Banner";
import { FAQ } from "@/components/landingpage/Faqs";
import { Features } from "@/components/landingpage/Features";
import Footer from "@/components/landingpage/Footer";
import { Hero } from "@/components/landingpage/Hero";
import HowItWorks from "@/components/landingpage/HowItWorks";
import Navbar from "@/components/landingpage/Navbar";
import Pricing from "@/components/landingpage/Pricing";
import Reviews from "@/components/landingpage/Reviews";

export default function Home() {
  return (
    <section>
      <Navbar />
      <Hero />
      <Features />
      <Banner />
      <Reviews />
      <Pricing />
      <HowItWorks />
      <FAQ />
      <Footer />
    </section>
  );
}
