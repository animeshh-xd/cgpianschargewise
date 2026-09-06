import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, MapPin, Plug } from "lucide-react";

import { FlowShell, PageIntro } from "@/components/chargewise/FlowShell";
import { MetricCard } from "@/components/chargewise/MetricCard";
import { Reveal } from "@/components/chargewise/Reveal";
import { dateOptions, estimates, getStation, recommendedStation, timeSlots } from "@/lib/chargewise-data";
import { useSession } from "@/lib/chargewise-session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Reserve Your Charger — ChargeWise" },
      {
        name: "description",
        content:
          "Pick a date and time slot to hold your recommended charging station, and review your journey summary before confirming.",
      },
      { property: "og:title", content: "Reserve Your Charger — ChargeWise" },
      {
        property: "og:description",
        content:
          "Pick a date and time slot to hold your recommended charging station before you arrive.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReservationPage,
});

function ReservationPage() {
  const [session, update] = useSession();
  const station = getStation(session.selectedStationId) ?? recommendedStation;

  const [date, setDate] = useState<string>(session.reservationDate);
  const [time, setTime] = useState<string>(session.reservationTime);
  const [confirmed, setConfirmed] = useState(false);

  const confirm = () => {
    update({ reservationDate: date, reservationTime: time, reservationConfirmed: true });
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <FlowShell step="03" stepLabel="Reservation">
        <Reveal>
          <div className="mx-auto max-w-xl rounded-3xl border border-primary/35 bg-surface-elevated p-8 text-center shadow-soft ring-1 ring-primary/15 sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
              Charger reserved
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {station.name} · {station.location} is held for you on {date} at {time}.
            </p>
            <div className="mt-7 grid gap-3 text-left sm:grid-cols-2">
              <MetricCard icon={CalendarDays} label="Date" value={date} />
              <MetricCard icon={Clock} label="Time slot" value={time} />
              <MetricCard icon={Plug} label="Connector" value={station.connector} />
              <MetricCard icon={Clock} label="Estimated arrival" value={estimates.arrival} />
            </div>
            <Link
              to="/stations"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Stations
            </Link>
          </div>
        </Reveal>
      </FlowShell>
    );
  }

  return (
    <FlowShell step="03" stepLabel="Reservation">
      <PageIntro
        title="Reserve your charger"
        subtitle="Hold this charging point so it's ready the moment you arrive."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Reveal>
          <section className="rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-8">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
              <CalendarDays className="h-5 w-5 text-primary" />
              Choose a date
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {dateOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setDate(option)}
                  className={cn(
                    "h-11 rounded-full border px-5 text-sm font-semibold transition-all",
                    date === option
                      ? "border-primary/50 bg-primary/15 text-primary"
                      : "border-border bg-background/50 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            <h2 className="mt-8 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
              <Clock className="h-5 w-5 text-primary" />
              Choose a time slot
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={cn(
                    "h-12 rounded-2xl border text-sm font-semibold transition-all",
                    time === slot
                      ? "border-primary/50 bg-primary/15 text-primary"
                      : "border-border bg-background/50 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>

            <p className="mt-6 rounded-2xl border border-border bg-background/50 p-4 text-xs text-muted-foreground">
              Reservations are simulated for this prototype — no live charger is booked.
            </p>
          </section>
        </Reveal>

        <Reveal delay={100}>
          <section className="rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground">Reservation summary</h2>
            <p className="mt-4 font-display text-lg font-semibold text-foreground">{station.name}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {station.location}
            </p>

            <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
              <Row label="Date" value={date} />
              <Row label="Time" value={time} />
              <Row label="Vehicle" value={session.vehicle} />
              <Row label="Connector" value={station.connector} />
              <Row label="Charging target" value={`${session.target}%`} />
              <Row label="Estimated cost" value={`₹${station.estimatedCost}`} />
            </dl>

            <button
              type="button"
              onClick={confirm}
              className="mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Confirm Reservation
            </button>
            <Link
              to="/recommendation"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Recommendation
            </Link>
          </section>
        </Reveal>
      </div>
    </FlowShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  );
}
