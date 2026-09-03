import { BatteryCharging, CalendarCheck, Radar, Scale, TrendingUp } from "lucide-react";

import { Reveal } from "./Reveal";

const steps = [
  { icon: Radar, title: "Find", text: "Locate compatible charging stations." },
  { icon: TrendingUp, title: "Predict", text: "Estimate queue and waiting time." },
  { icon: Scale, title: "Compare", text: "Balance time, cost, distance and compatibility." },
  { icon: CalendarCheck, title: "Reserve", text: "Optionally reserve a charging slot." },
  { icon: BatteryCharging, title: "Charge", text: "Navigate, charge and get back on the road." },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative border-y border-border bg-surface/40 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Find. Predict. Compare. Reserve. Charge.
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            A single decision flow, from where you are to the charge that makes sense.
          </p>
        </Reveal>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-4 bottom-4 w-px bg-linear-to-b from-primary/40 via-border to-transparent md:left-0 md:right-0 md:top-[30px] md:bottom-auto md:h-px md:w-auto md:bg-linear-to-r"
          />
          <ol className="relative grid gap-8 md:grid-cols-5 md:gap-5">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 80}>
                <div className="flex gap-5 md:block">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-primary shadow-soft">
                    <step.icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <div className="md:mt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={100}>
          <p className="mt-12 text-xs text-muted-foreground">
            Reservation and live station data are planned capabilities and are not implemented in
            this phase.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
