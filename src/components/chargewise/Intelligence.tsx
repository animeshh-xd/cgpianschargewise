import { ArrowDown, BrainCircuit, CalendarClock, ListOrdered, Plus, TimerReset } from "lucide-react";

import { Reveal } from "./Reveal";

const features = [
  {
    icon: TimerReset,
    title: "Wait-Time Prediction",
    text: "Estimate queue time before the driver commits.",
  },
  {
    icon: ListOrdered,
    title: "Smart Ranking",
    text: "Balance distance, waiting time, price and compatibility.",
  },
  {
    icon: CalendarClock,
    title: "Charge Planning",
    text: "Suggest when to charge when timing matters.",
  },
];

const inputs = ["Driver needs", "Station conditions", "Prediction"];

export function Intelligence() {
  return (
    <section className="border-y border-border bg-surface/40 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Built to make charging decisions smarter.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 80}>
              <article className="h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-soft">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 rounded-3xl border border-border bg-background/60 p-7 sm:p-10">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              {inputs.map((input, i) => (
                <div key={input} className="flex items-center gap-3 sm:gap-4">
                  <span className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-muted-foreground">
                    {input}
                  </span>
                  {i < inputs.length - 1 && (
                    <Plus className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                  )}
                </div>
              ))}
            </div>
            <ArrowDown className="mx-auto my-5 h-5 w-5 text-primary/70" />
            <p className="mx-auto flex w-fit items-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-6 py-4 text-center font-display text-base font-semibold text-foreground sm:text-lg">
              <BrainCircuit className="h-5 w-5 text-primary" />
              ChargeWise Recommendation
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
