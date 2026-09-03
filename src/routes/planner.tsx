import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Battery,
  BatteryCharging,
  BatteryWarning,
  Car,
  ChevronDown,
  Crosshair,
  MapPin,
  Navigation,
  Plug,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Logo } from "@/components/chargewise/Logo";
import { Reveal } from "@/components/chargewise/Reveal";

const vehicles = [
  "Tata Nexon EV",
  "MG ZS EV",
  "Hyundai IONIQ 5",
  "Mahindra XUV400 EV",
];

const connectors = ["CCS2", "Type 2", "CHAdeMO"];
const chargingTargets = [50, 60, 70, 80, 90, 100];

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Charging Planner — Find Your Best Charger | ChargeWise" },
      {
        name: "description",
        content:
          "Tell ChargeWise about your EV journey and we'll find the charging option that makes the most sense.",
      },
      { property: "og:title", content: "Charging Planner — Find Your Best Charger | ChargeWise" },
      {
        property: "og:description",
        content:
          "Tell ChargeWise about your EV journey and we'll find the charging option that makes the most sense.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChargingPlanner,
});

function ChargingPlanner() {
  const navigate = useNavigate({ from: "/planner" });

  const [currentLocation, setCurrentLocation] = useState("");
  const [battery, setBattery] = useState(23);
  const [vehicle, setVehicle] = useState(vehicles[0]);
  const [connector, setConnector] = useState(connectors[0]);
  const [destination, setDestination] = useState("");
  const [target, setTarget] = useState(80);
  const [isLoading, setIsLoading] = useState(false);

  const handleUseLocation = () => {
    setCurrentLocation("New Delhi, India");
  };

  const handleFindCharger = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate({ to: "/stations" });
    }, 600);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 grid-texture opacity-30 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-40 left-1/2 h-[28rem] w-[50rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.79 0.155 168 / 0.15), transparent)" }}
      />

      <header className="relative z-10 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-primary">
              <Logo className="h-8 w-8" />
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-foreground">
              ChargeWise
            </span>
          </Link>

          <div className="flex items-center gap-3 text-right">
            <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:inline-block">
              Your journey
            </span>
            <div className="flex h-9 items-center rounded-full border border-border bg-surface px-3 text-sm font-semibold text-foreground">
              <span className="text-primary">01</span>
              <span className="mx-1.5 text-muted-foreground">/</span>
              <span className="text-muted-foreground">03</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="mb-10 text-center sm:mb-14">
          <Reveal>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Find your best charger
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Tell ChargeWise about your journey and we'll find the charging option that makes the
              most sense.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-8">
          <Reveal delay={120}>
            <div className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-8">
              <div className="space-y-10">
                <FormGroup icon={Navigation} label="Journey">
                  <div className="space-y-5">
                    <FormField label="Current location" htmlFor="current-location">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="current-location"
                          value={currentLocation}
                          onChange={(e) => setCurrentLocation(e.target.value)}
                          placeholder="Enter your current location"
                          className="h-12 rounded-xl border-border bg-background/60 pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleUseLocation}
                        className="mt-2 h-9 rounded-full border-border bg-background/60 px-4 text-xs font-medium text-foreground hover:bg-surface-elevated hover:text-primary"
                      >
                        <Crosshair className="h-3.5 w-3.5" />
                        Use my current location
                      </Button>
                    </FormField>

                    <FormField label="Destination" htmlFor="destination">
                      <div className="relative">
                        <Navigation className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="destination"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          placeholder="Where are you going?"
                          className="h-12 rounded-xl border-border bg-background/60 pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
                        />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">Example: Connaught Place, New Delhi</p>
                    </FormField>
                  </div>
                </FormGroup>

                <FormGroup icon={Car} label="Vehicle">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Vehicle" htmlFor="vehicle">
                      <Select value={vehicle} onValueChange={setVehicle}>
                        <SelectTrigger
                          id="vehicle"
                          className="h-12 rounded-xl border-border bg-background/60 text-foreground focus:ring-primary/50 [&>svg]:text-muted-foreground"
                        >
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border bg-surface text-foreground">
                          {vehicles.map((v) => (
                            <SelectItem
                              key={v}
                              value={v}
                              className="rounded-lg text-foreground focus:bg-surface-elevated focus:text-foreground"
                            >
                              {v}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField label="Connector" htmlFor="connector">
                      <Select value={connector} onValueChange={setConnector}>
                        <SelectTrigger
                          id="connector"
                          className="h-12 rounded-xl border-border bg-background/60 text-foreground focus:ring-primary/50 [&>svg]:text-muted-foreground"
                        >
                          <SelectValue placeholder="Select connector" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border bg-surface text-foreground">
                          {connectors.map((c) => (
                            <SelectItem
                              key={c}
                              value={c}
                              className="rounded-lg text-foreground focus:bg-surface-elevated focus:text-foreground"
                            >
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="mt-2 text-xs text-muted-foreground">
                        ChargeWise will prioritize compatible charging stations.
                      </p>
                    </FormField>
                  </div>
                </FormGroup>

                <FormGroup icon={BatteryCharging} label="Charging">
                  <div className="space-y-8">
                    <FormField label="Battery level" htmlFor="battery">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {battery <= 20 ? (
                            <BatteryWarning className="h-5 w-5 text-destructive" />
                          ) : (
                            <Battery className="h-5 w-5 text-primary" />
                          )}
                          <span className="font-display text-3xl font-bold text-foreground">
                            {battery}%
                          </span>
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">5% — 100%</span>
                      </div>
                      <Slider
                        id="battery"
                        value={[battery]}
                        onValueChange={(value) => setBattery(value[0])}
                        min={5}
                        max={100}
                        step={1}
                        className="mt-4 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-primary [&_[role=slider]]:bg-background [&_[role=slider]]:shadow [&_[role=slider]]:focus-visible:ring-primary/50 [&_.bg-primary]:bg-primary [&_[data-orientation=horizontal]]:h-2"
                      />
                      <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                        <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        Low battery increases the importance of choosing a reliable charger.
                      </p>
                    </FormField>

                    <FormField label="Charging target" htmlFor="charging-target">
                      <div className="flex flex-wrap gap-2">
                        {chargingTargets.map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setTarget(value)}
                            className={`flex h-11 min-w-[3.5rem] flex-1 items-center justify-center rounded-xl border text-sm font-semibold transition-all duration-200 sm:flex-none ${
                              target === value
                                ? "border-primary bg-primary/10 text-primary shadow-[inset_0_0_0_1px_oklch(0.79_0.155_168/0.35)]"
                                : "border-border bg-background/60 text-foreground hover:border-primary/40 hover:bg-surface-elevated"
                            }`}
                          >
                            {value}%
                          </button>
                        ))}
                      </div>
                    </FormField>
                  </div>
                </FormGroup>
              </div>

              <div className="mt-10">
                <Button
                  onClick={handleFindCharger}
                  disabled={isLoading}
                  className="group h-14 w-full rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-glow transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                      Finding best charger…
                    </span>
                  ) : (
                    <>
                      Find Best Charger
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
                <Link
                  to="/"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to ChargeWise
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="sticky top-24 rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Your charging plan
                  </h2>
                  <p className="text-xs text-muted-foreground">Updates as you edit</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <SummaryRow label="Current location" value={currentLocation || "—"} icon={MapPin} />
                <SummaryRow label="Battery" value={`${battery}%`} icon={Battery} />
                <SummaryRow label="Vehicle" value={vehicle} icon={Car} />
                <SummaryRow label="Connector" value={connector} icon={Plug} />
                <SummaryRow label="Destination" value={destination || "—"} icon={Navigation} />
                <SummaryRow label="Target" value={`${target}%`} icon={BatteryCharging} />
              </div>

              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm leading-relaxed text-foreground">
                  ChargeWise will recommend the best time-cost-distance trade-off based on your
                  inputs.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
    </div>
  );
}

function FormGroup({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function SummaryRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
        {label}
      </div>
      <span className="max-w-[55%] text-right text-sm font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}
