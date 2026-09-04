import { Navigation, Zap } from "lucide-react";

import { stations, type Station } from "@/lib/chargewise-data";
import { cn } from "@/lib/utils";

export function MapMockup({
  activeStationId,
  onSelectStation,
  className,
}: {
  activeStationId?: string;
  onSelectStation?: (station: Station) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-surface shadow-soft",
        className,
      )}
    >
      {/* Map base texture */}
      <div aria-hidden="true" className="absolute inset-0 grid-texture opacity-40" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 35% 30%, oklch(0.79 0.155 168 / 0.12), transparent 70%)",
        }}
      />

      {/* Abstract roads + route */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <g stroke="oklch(1 0 0 / 0.09)" strokeWidth="10" strokeLinecap="round" fill="none">
          <path d="M-20 210 L 150 190 L 300 235 L 420 215" />
          <path d="M-20 90 L 120 105 L 250 70 L 420 96" />
          <path d="M70 -20 L 92 130 L 60 320" />
          <path d="M250 -20 L 268 120 L 300 320" />
          <path d="M170 -20 L 176 320" />
        </g>
        <g stroke="oklch(1 0 0 / 0.05)" strokeWidth="4" fill="none">
          <path d="M-20 150 L 420 158" />
          <path d="M330 -20 L 348 320" />
        </g>
        {/* Route from user to recommended station */}
        <path
          d="M232 216 C 200 200, 170 150, 152 120 S 146 104, 144 96"
          fill="none"
          stroke="oklch(0.79 0.155 168 / 0.85)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="10 10"
          className="animate-cw-dash"
        />
      </svg>

      {/* Current location */}
      <div className="absolute left-[58%] top-[72%] -translate-x-1/2 -translate-y-1/2">
        <span
          aria-hidden="true"
          className="absolute inset-0 -m-2 rounded-full bg-signal/40 animate-cw-pulse"
        />
        <span className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-signal text-background shadow-soft">
          <Navigation className="h-3 w-3" />
        </span>
        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-background/85 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur">
          You
        </span>
      </div>

      {/* Station markers */}
      {stations.map((station) => {
        const active = station.id === activeStationId;
        const Marker = onSelectStation ? "button" : "div";
        return (
          <Marker
            key={station.id}
            {...(onSelectStation
              ? { type: "button" as const, onClick: () => onSelectStation(station), "aria-label": `${station.name}, ${station.location}` }
              : {})}
            className="absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
            style={{ left: `${station.x}%`, top: `${station.y}%` }}
          >
            {active ? (
              <span
                aria-hidden="true"
                className="absolute inset-0 -m-2.5 rounded-full bg-primary/35 animate-cw-pulse"
              />
            ) : null}
            <span
              className={cn(
                "relative flex items-center justify-center rounded-full border-2 border-background shadow-soft transition-transform",
                active
                  ? "h-8 w-8 bg-primary text-primary-foreground scale-100"
                  : "h-6 w-6 bg-surface-elevated text-muted-foreground hover:scale-110",
              )}
            >
              <Zap className={active ? "h-4 w-4" : "h-3 w-3"} />
            </span>
            {active ? (
              <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary/40 bg-background/90 px-2.5 py-1 text-[10px] font-semibold text-primary backdrop-blur">
                {station.name}
              </span>
            ) : null}
          </Marker>
        );
      })}

      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-border bg-background/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground backdrop-blur">
        Simulated map · prototype data
      </div>
    </div>
  );
}
