import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  Clock,
  IndianRupee,
  MapPin,
  Plug,
  Route as RouteIcon,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react";

import { FlowShell, PageIntro } from "@/components/chargewise/FlowShell";
import { MetricCard } from "@/components/chargewise/MetricCard";
import { ProgressBar } from "@/components/chargewise/ProgressBar";
import { Reveal } from "@/components/chargewise/Reveal";
import { StatusBadge } from "@/components/chargewise/StatusBadge";
import {
  estimates,
  getStation,
  nearestStation,
  recommendedStation,
  scoreBreakdown,
} from "@/lib/chargewise-data";
import { useSession } from "@/lib/chargewise-session";

export const Route = createFileRoute("/recommendation")({
  head: () => ({
    meta: [
      { title: "Your Best Charging Option — ChargeWise" },
      {
        name: "description",
        content:
          "See why ChargeWise picked this charging station: score breakdown, time and cost estimates, and how it compares to the nearest station.",
      },
      { property: "og:title", content: "Your Best Charging Option — ChargeWise" },
      {
        property: "og:description",
        content:
          "See why ChargeWise picked this charging station: score breakdown, time and cost estimates, and how it compares to the nearest station.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecommendationPage,
});

function RecommendationPage() {
  const [session] = useSession();
  const station = getStation(session.selectedStationId);

  if (!station) {
    return (
      <FlowShell step="02" stepLabel="Recommendation">
        <EmptyRecommendation />
      </FlowShell>
    );
  }

  const nearest = nearestStation;
  const distanceDelta = (station.distanceKm - nearest.distanceKm).toFixed(1);
  const waitDelta = nearest.waitMinutes - station.waitMinutes;

  return (
    <FlowShell step="02" stepLabel="Recommendation">
      <PageIntro
        title="Your best charging option"
        subtitle="ChargeWise compared available options based on your journey."
      />

      <Reveal>
        <section className="rounded-3xl border border-primary/35 bg-surface-elevated p-6 shadow-soft ring-1 ring-primary/15 sm:p-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            <Zap className="h-3 w-3" />
            ChargeWise Pick
          </div>

          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {station.name}
              </h2>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {station.location}
              </p>
            </div>
            <StatusBadge status={station.availability} />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard icon={RouteIcon} label="Distance" value={`${station.distanceKm} km`} />
            <MetricCard
              icon={Clock}
              label="Predicted wait"
              value={`${station.waitMinutes} min`}
            />
            <MetricCard
              icon={IndianRupee}
              label="Charging price"
              value={`₹${station.pricePerKwh} / kWh`}
            />
            <MetricCard
              icon={Plug}
              label="Compatibility"
              value={`✓ ${station.connector}`}
              hint={`Matches your ${session.connector} connector`}
            />
          </div>
        </section>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Reveal delay={80}>
          <section className="rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-8">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
              <Sparkles className="h-5 w-5 text-primary" />
              Why this station?
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Although another charger is closer, this station has a significantly lower predicted
              waiting time and is compatible with your {session.vehicle}. ChargeWise estimates that
              this option provides the better overall time–cost–distance trade-off.
            </p>
            <p className="mt-4 rounded-2xl border border-border bg-background/50 p-4 text-xs text-muted-foreground">
              All values shown are simulated prototype data, not live charger availability.
            </p>

            <div className="mt-8 border-t border-border pt-6">
              <div className="flex items-end justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  ChargeWise Score
                </h4>
                <p className="font-display text-3xl font-bold text-foreground">
                  {station.score}
                  <span className="text-base font-medium text-muted-foreground"> / 100</span>
                </p>
              </div>
              <ProgressBar value={station.score} className="mt-3" label="ChargeWise score" />

              <div className="mt-6 space-y-4">
                {scoreBreakdown.map((factor) => (
                  <div key={factor.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{factor.label}</span>
                      <span className="text-muted-foreground">{factor.rating}</span>
                    </div>
                    <ProgressBar value={factor.value} className="mt-2" label={factor.label} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={120}>
            <section className="rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-8">
              <h3 className="font-display text-xl font-semibold text-foreground">Estimates</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MetricCard icon={Timer} label="Estimated arrival" value={estimates.arrival} />
                <MetricCard icon={Clock} label="Predicted wait" value={estimates.predictedWait} />
                <MetricCard
                  icon={BatteryCharging}
                  label="Charging time"
                  value={estimates.chargingTime}
                />
                <MetricCard icon={Timer} label="Total time" value={estimates.totalTime} />
                <MetricCard
                  icon={IndianRupee}
                  label="Charging cost"
                  value={estimates.chargingCost}
                  className="sm:col-span-2"
                />
              </div>
            </section>
          </Reveal>

          <Reveal delay={160}>
            <section className="rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-8">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Nearest vs ChargeWise Pick
              </h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <CompareColumn
                  title="Nearest station"
                  name={`${nearest.name} · ${nearest.location}`}
                  rows={[
                    `${nearest.distanceKm} km`,
                    `${nearest.waitMinutes} min wait`,
                    `₹${nearest.estimatedCost}`,
                  ]}
                />
                <CompareColumn
                  highlighted
                  title="ChargeWise pick"
                  name={`${station.name} · ${station.location}`}
                  rows={[
                    `${station.distanceKm} km`,
                    `${station.waitMinutes} min wait`,
                    `₹${station.estimatedCost}`,
                  ]}
                />
              </div>
              <div className="mt-5 rounded-2xl border border-primary/25 bg-primary/5 p-4">
                <p className="font-display text-lg font-semibold text-foreground">
                  {distanceDelta} km farther. {waitDelta} minutes less waiting.
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  ChargeWise prioritizes the overall journey rather than distance alone.
                </p>
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Link
          to="/reservation"
          className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.98] sm:w-auto"
        >
          Reserve This Charger
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to="/stations"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Stations
        </Link>
      </div>
    </FlowShell>
  );
}

function CompareColumn({
  title,
  name,
  rows,
  highlighted = false,
}: {
  title: string;
  name: string;
  rows: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlighted ? "border-primary/40 bg-primary/5" : "border-border bg-background/50"
      }`}
    >
      <div
        className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${
          highlighted ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {highlighted ? <CheckCircle2 className="h-3 w-3" /> : null}
        {title}
      </div>
      <p className="mt-2 text-sm font-semibold text-foreground">{name}</p>
      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
        {rows.map((row) => (
          <li key={row}>{row}</li>
        ))}
      </ul>
    </div>
  );
}

function EmptyRecommendation() {
  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-border bg-surface p-10 text-center shadow-soft">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background/60 text-primary">
        <Sparkles className="h-6 w-6" />
      </div>
      <h1 className="mt-6 font-display text-2xl font-semibold text-foreground">
        No charging recommendation is available yet.
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Share your journey details and ChargeWise will compare the options for you.
      </p>
      <Link
        to="/planner"
        className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
      >
        Start Charging Plan
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

void recommendedStation;
