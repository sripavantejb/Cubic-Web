import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";
import { Hero } from "@/components/sections/Hero";
import { FacilitySolutions } from "@/components/sections/FacilitySolutions";
import { ProblemAgitation } from "@/components/sections/ProblemAgitation";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { HazelAI } from "@/components/sections/HazelAI";
import { SiteWalkthrough } from "@/components/sections/SiteWalkthrough";
import { PricingModels } from "@/components/sections/PricingModels";
import { FaqSection } from "@/components/sections/FaqSection";
import { LeadForm } from "@/components/sections/LeadForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <a
        href="#solutions"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[80] focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <main>
        <Hero />
        <FacilitySolutions />
        <ProblemAgitation />
        <TrustStrip />
        <HazelAI />
        <SiteWalkthrough />
        <PricingModels />
        <FaqSection />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
