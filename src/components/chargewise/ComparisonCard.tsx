import { Clock, IndianRupee, Route as RouteIcon } from "lucide-react";

import { StatusBadge } from "./StatusBadge";
import type { Station } from "@/lib/chargewise-data";

export function ComparisonCard({
  label,
  note,
  station,
}: {
  label: string;
  note: string;
  station: Station;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-soft transition-colors hover:border-primary/30">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          {label}
        </span>
        <StatusBadge status={station.availability} />
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{station.name}</h3>
      <p className="text-sm text-muted-foreground">{station.location}</p>

      <dl className="mt-4 grid grid-cols-3 gap-3">
        <Item icon={RouteIcon} label="Distance" value={`${station.distanceKm} km`} />
        <Item icon={Clock} label="Wait" value={`${station.waitMinutes} min`} />
        <Item icon={IndianRupee} label="Cost" value={`₹${station.estimatedCost}`} />
      </dl>

      <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

function Item({
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
      <dt className="flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
        <Icon aria-hidden="true" className="h-3 w-3 text-primary" />
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}
