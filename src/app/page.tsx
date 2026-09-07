import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { ScrollCinema } from "@/components/sections/ScrollCinema";
import { AboutTabs } from "@/components/sections/AboutTabs";
import { ServicesExplorer } from "@/components/sections/ServicesExplorer";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { Roadmap } from "@/components/sections/Roadmap";
import { MachineryExplorer } from "@/components/sections/MachineryExplorer";
import { HazelAI } from "@/components/sections/HazelAI";
import { GreenPromise } from "@/components/sections/GreenPromise";
import { GreenPledge } from "@/components/sections/GreenPledge";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CompanyStory } from "@/components/sections/CompanyStory";
import { Pillars } from "@/components/sections/Pillars";
import { SectorExplorer } from "@/components/sections/SectorExplorer";
import { LeadForm } from "@/components/sections/LeadForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[80] focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <main>
        <Hero />
        <Marquee />
        <AboutTabs />
        <ScrollCinema />
        <ServicesExplorer />
        <ImpactStats />
        <Roadmap />
        <MachineryExplorer />
        <HazelAI />
        <GreenPromise />
        <GreenPledge />
        <ProcessTimeline />
        <CompanyStory />
        <Pillars />
        <SectorExplorer />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
