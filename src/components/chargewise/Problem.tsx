import { BatteryLow, CircleDollarSign, Hourglass, PlugZap } from "lucide-react";

import { Reveal } from "./Reveal";

const cards = [
  {
    icon: PlugZap,
    title: "Availability",
    text: "A listed charger may already be occupied or unavailable.",
  },
  {
    icon: Hourglass,
    title: "Waiting",
    text: "The nearest station can still mean a long queue.",
  },
  {
    icon: CircleDollarSign,
    title: "Cost",
    text: "Prices and expected charging cost can vary by station.",
  },
  {
    icon: BatteryLow,
    title: "Range",
    text: "Low battery makes a poor charging choice riskier.",
  },
];

export function Problem() {
  return (
    <section id="why-chargewise" className="border-y border-border bg-surface/40 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Finding a charger isn't the same as choosing the right one.
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            EV drivers need more than a list of charging stations. The nearest charger may not be
            the fastest, cheapest or even available.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 70}>
              <article className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-soft">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-primary transition-colors group-hover:border-primary/40">
                  <card.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
