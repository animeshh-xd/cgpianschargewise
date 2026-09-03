import {
  BadgeCheck,
  BatteryMedium,
  Car,
  Clock,
  Flag,
  IndianRupee,
  MapPin,
  Route,
  SignalHigh,
  Target,
} from "lucide-react";

import { Reveal } from "./Reveal";

const factors = [
  { icon: MapPin, title: "Current location", text: "Where the journey starts right now." },
  { icon: BatteryMedium, title: "Battery percentage", text: "How much range is left to work with." },
  { icon: Car, title: "Vehicle / connector", text: "The car and connector type in use." },
  { icon: Flag, title: "Destination", text: "Where the driver actually needs to be." },
  { icon: Target, title: "Charging target", text: "How much charge the trip requires." },
  { icon: SignalHigh, title: "Station availability", text: "Whether the charger can be used now." },
  { icon: Clock, title: "Predicted wait time", text: "Expected queue before plugging in." },
  { icon: Route, title: "Distance / route", text: "Detour cost along the way." },
  { icon: IndianRupee, title: "Charging price", text: "Tariff and expected charging cost." },
  { icon: BadgeCheck, title: "Compatibility", text: "Connector and power match for the vehicle." },
];

export function Factors() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            One recommendation. Multiple factors.
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            ChargeWise weighs driver inputs against station conditions before it suggests anything.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {factors.map((factor, i) => (
            <Reveal key={factor.title} delay={(i % 3) * 60}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/30">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <factor.icon className="h-4.5 w-4.5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{factor.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{factor.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <p className="mx-auto mt-12 max-w-2xl text-center font-display text-xl font-semibold text-foreground sm:text-2xl">
            ChargeWise turns these inputs into{" "}
            <span className="text-primary">one clear recommendation.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
