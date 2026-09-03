import { BadgeCheck, Clock, IndianRupee, MapPin, Navigation, Zap } from "lucide-react";

const stations = [
  { top: "24%", left: "16%" },
  { top: "58%", left: "27%" },
  { top: "13%", left: "42%" },
  { top: "8%", left: "84%" },
];

export function HeroVisual() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
        {/* abstract map grid */}
        <div className="grid-texture absolute inset-0 opacity-70" aria-hidden="true" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(120% 90% at 75% 15%, oklch(0.79 0.155 168 / 0.14), transparent 60%)",
          }}
        />

        <div className="relative aspect-4/3 w-full sm:aspect-16/12">
          {/* route line */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 400 300"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M64 218 C 104 198, 118 132, 156 96 S 172 68, 184 60"
              stroke="var(--energy)"
              strokeOpacity="0.22"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M64 218 C 104 198, 118 132, 156 96 S 172 68, 184 60"
              stroke="var(--energy)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="10 12"
              className="animate-cw-dash"
            />
          </svg>

          {/* other stations */}
          {stations.map((s, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: s.top, left: s.left }}
            >
              <span className="absolute inset-0 rounded-full bg-foreground/20 animate-cw-pulse" />
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface-elevated text-muted-foreground">
                <Zap className="h-3.5 w-3.5" />
              </span>
            </div>
          ))}

          {/* EV indicator */}
          <div className="absolute left-[16%] top-[73%] -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 rounded-full bg-signal/40 animate-cw-pulse" />
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-signal/50 bg-background text-signal">
              <Navigation className="h-4 w-4" />
            </span>
            <span className="mt-2 block whitespace-nowrap rounded-md border border-border bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              You
            </span>
          </div>

          {/* recommended station */}
          <div className="absolute left-[46%] top-[20%] -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 rounded-full bg-primary/50 animate-cw-pulse" />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
              <Zap className="h-5 w-5" />
            </span>
          </div>

          {/* recommendation card */}
          <div className="animate-cw-float absolute bottom-4 left-4 right-4 rounded-2xl border border-border bg-background/90 p-4 shadow-soft backdrop-blur-xl sm:left-auto sm:right-5 sm:w-[54%]">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                <Zap className="h-3 w-3" /> ChargeWise Pick
              </span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
              Tata Power
            </h3>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> Rajouri Garden
            </p>

            <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-border bg-surface px-2 py-2">
                <dt className="sr-only">Distance</dt>
                <dd className="text-sm font-semibold text-foreground">2.4 km</dd>
                <p className="text-[10px] text-muted-foreground">away</p>
              </div>
              <div className="rounded-xl border border-border bg-surface px-2 py-2">
                <dt className="sr-only">Predicted wait</dt>
                <dd className="flex items-center justify-center gap-1 text-sm font-semibold text-foreground">
                  <Clock className="h-3 w-3" /> 8 min
                </dd>
                <p className="text-[10px] text-muted-foreground">predicted wait</p>
              </div>
              <div className="rounded-xl border border-border bg-surface px-2 py-2">
                <dt className="sr-only">Price</dt>
                <dd className="text-sm font-semibold text-foreground">₹13</dd>
                <p className="text-[10px] text-muted-foreground">per kWh</p>
              </div>
            </dl>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-medium">
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-1 text-primary">
                <BadgeCheck className="h-3 w-3" /> Compatible
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-1 text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Available
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">Estimated cost</span>
              <span className="flex items-center font-display text-lg font-semibold text-foreground">
                <IndianRupee className="h-4 w-4" />
                286
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Illustrative mockup — sample data shown.
      </p>
    </div>
  );
}
