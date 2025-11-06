import { Features } from "@/components/landingpage/Features";
import { Hero } from "@/components/landingpage/Hero";
import Navbar from "@/components/landingpage/Navbar";

export default function Home() {
  return (
    <section>
      <Navbar />
      <Hero />
      <Features />
    </section>
  );
}
