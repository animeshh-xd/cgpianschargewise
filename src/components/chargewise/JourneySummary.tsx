import { Battery, BatteryCharging, Car, MapPin, Navigation, Plug } from "lucide-react";

import type { ChargeWiseSession } from "@/lib/chargewise-session";

export function JourneySummary({ session }: { session: ChargeWiseSession }) {
  const items = [
    { icon: MapPin, label: "From", value: session.currentLocation },
    { icon: Navigation, label: "To", value: session.destination },
    { icon: Battery, label: "Battery", value: `${session.battery}%` },
    { icon: Car, label: "Vehicle", value: session.vehicle },
    { icon: Plug, label: "Connector", value: session.connector },
    { icon: BatteryCharging, label: "Target", value: `${session.target}%` },
  ];

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-6">
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label}>
            <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              <Icon aria-hidden="true" className="h-3 w-3 text-primary" />
              {label}
            </div>
            <div className="mt-1 truncate text-sm font-semibold text-foreground" title={value}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
