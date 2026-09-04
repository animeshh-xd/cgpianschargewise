import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, IndianRupee, MapPin, Plug, Route as RouteIcon, Zap } from "lucide-react";

import { StatusBadge } from "./StatusBadge";
import type { Station } from "@/lib/chargewise-data";
import { cn } from "@/lib/utils";

export function StationCard({
  station,
  featured = false,
  active = false,
  onSelect,
}: {
  station: Station;
  featured?: boolean;
  active?: boolean;
  onSelect?: (station: Station) => void;
}) {
  return (
    <article
      onClick={onSelect ? () => onSelect(station) : undefined}
      className={cn(
        "rounded-3xl border bg-surface p-5 shadow-soft transition-all duration-300",
        onSelect && "cursor-pointer",
        featured
          ? "border-primary/40 bg-surface-elevated ring-1 ring-primary/20"
          : active
            ? "border-primary/30"
            : "border-border hover:border-primary/25",
      )}
    >
      {featured ? (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          <Zap className="h-3 w-3" />
          ChargeWise Pick
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className={cn(
              "font-display font-semibold text-foreground",
              featured ? "text-2xl" : "text-lg",
            )}
          >
            {station.name}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {station.location}
          </p>
        </div>
        <StatusBadge status={station.availability} />
      </div>

      <dl
        className={cn(
          "mt-5 grid gap-3",
          featured ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-4",
        )}
      >
        <Stat icon={RouteIcon} label="Distance" value={`${station.distanceKm} km`} />
        <Stat icon={Clock} label="Predicted wait" value={`${station.waitMinutes} min`} />
        <Stat icon={IndianRupee} label="Price" value={`₹${station.pricePerKwh}/kWh`} />
        <Stat icon={Plug} label="Connector" value={station.connector} />
      </dl>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div>
          <span className="block text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Estimated cost
          </span>
          <span className="font-display text-xl font-semibold text-foreground">
            ₹{station.estimatedCost}
          </span>
        </div>

        {featured ? (
          <Link
            to="/recommendation"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View Recommendation
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="text-xs text-muted-foreground">
            ChargeWise score {station.score}/100
          </span>
        )}
      </div>
    </article>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
        <Icon aria-hidden="true" className="h-3 w-3 text-primary" />
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}
