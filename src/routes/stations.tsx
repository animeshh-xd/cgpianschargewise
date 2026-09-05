import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Scale, Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { ComparisonCard } from "@/components/chargewise/ComparisonCard";
import { FlowShell, PageIntro } from "@/components/chargewise/FlowShell";
import { JourneySummary } from "@/components/chargewise/JourneySummary";
import { MapMockup } from "@/components/chargewise/MapMockup";
import { Reveal } from "@/components/chargewise/Reveal";
import { StationCard } from "@/components/chargewise/StationCard";
import { alternatives, getStation, recommendedStation, stations } from "@/lib/chargewise-data";
import { useSession } from "@/lib/chargewise-session";

export const Route = createFileRoute("/stations")({
  head: () => ({
    meta: [
      { title: "Charging Options Near Your Route — ChargeWise" },
      {
        name: "description",
        content:
          "Compare availability, predicted wait, distance, cost and compatibility across nearby charging stations and see the ChargeWise pick.",
      },
      { property: "og:title", content: "Charging Options Near Your Route — ChargeWise" },
      {
        property: "og:description",
        content:
          "Compare availability, predicted wait, distance, cost and compatibility across nearby charging stations and see the ChargeWise pick.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StationsPage,
});

function StationsPage() {
  const [session, updateSession] = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const pick = getStation(session.selectedStationId) ?? recommendedStation;
  const others = stations.filter((s) => s.id !== pick.id);

  return (
    <FlowShell step="02" stepLabel="Your options">
      <PageIntro
        title="Charging options near your route"
        subtitle="ChargeWise compares availability, predicted wait, distance, cost and compatibility to find the best option for your journey."
      />

      <div className="mb-8">
        <JourneySummary session={session} />
      </div>

      {loading ? (
        <ComparingState />
      ) : stations.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <div className="space-y-5">
              <Reveal>
                <StationCard station={pick} featured />
              </Reveal>
              <h2 className="pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                All nearby stations
              </h2>
              {others.map((station, i) => (
                <Reveal key={station.id} delay={60 * (i + 1)}>
                  <StationCard
                    station={station}
                    active={station.id === session.selectedStationId}
                    onSelect={(s) => updateSession({ selectedStationId: s.id })}
                  />
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className="lg:sticky lg:top-24">
                <MapMockup activeStationId={pick.id} className="aspect-4/3 w-full" />
                <p className="mt-3 text-xs text-muted-foreground">
                  Simulated route from your location to the ChargeWise pick. Prototype data only.
                </p>
              </div>
            </Reveal>
          </div>

          <section className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Compare your options
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              The closest charger is rarely the fastest or the cheapest once waiting is counted.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {alternatives.map((alt, i) => {
                const station = getStation(alt.stationId);
                if (!station) return null;
                return (
                  <Reveal key={alt.id} delay={60 * i}>
                    <ComparisonCard label={alt.label} note={alt.note} station={station} />
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section className="mt-16 overflow-hidden rounded-3xl border border-primary/25 bg-surface p-6 shadow-soft sm:p-10">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                <Scale className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  The nearest charger isn't always the best charger.
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                  ChargeWise balances time, cost, distance and compatibility instead of simply
                  choosing the closest station.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-10">
            <Link
              to="/planner"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Planner
            </Link>
          </div>
        </>
      )}
    </FlowShell>
  );
}

function ComparingState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-surface py-24 text-center shadow-soft">
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-primary/20 animate-cw-pulse"
        />
        <Zap className="relative h-6 w-6" />
      </span>
      <p className="mt-6 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        Comparing charging options...
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Checking availability, predicted wait, distance and cost.
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-border bg-surface p-10 text-center shadow-soft">
      <h2 className="font-display text-2xl font-semibold text-foreground">
        No compatible charging stations found.
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Try changing your connector or destination.
      </p>
      <Link
        to="/planner"
        className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Planner
      </Link>
    </div>
  );
}
