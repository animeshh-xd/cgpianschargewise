import { createFileRoute } from "@tanstack/react-router";

import { Difference } from "@/components/chargewise/Difference";
import { Factors } from "@/components/chargewise/Factors";
import { FinalCTA } from "@/components/chargewise/FinalCTA";
import { Footer } from "@/components/chargewise/Footer";
import { Hero } from "@/components/chargewise/Hero";
import { HowItWorks } from "@/components/chargewise/HowItWorks";
import { Intelligence } from "@/components/chargewise/Intelligence";
import { Navbar } from "@/components/chargewise/Navbar";
import { Problem } from "@/components/chargewise/Problem";
import { Technology } from "@/components/chargewise/Technology";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChargeWise — AI EV Charging Optimization" },
      {
        name: "description",
        content:
          "ChargeWise recommends where and when to charge your EV using availability, predicted wait time, distance, cost and compatibility. Charge smarter. Wait less.",
      },
      { property: "og:title", content: "ChargeWise — AI EV Charging Optimization" },
      {
        property: "og:description",
        content:
          "One clear charging recommendation instead of a list of chargers. Charge smarter. Wait less. Drive further.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Difference />
        <HowItWorks />
        <Factors />
        <Intelligence />
        <Technology />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
