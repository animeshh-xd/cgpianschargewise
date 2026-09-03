import { ArrowDown, Sparkles } from "lucide-react";

import { Reveal } from "./Reveal";

const traditional = ["Find nearby chargers", "View a list", "Choose manually"];
const chargewise = ["Find", "Predict", "Compare", "Recommend"];

export function Difference() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            From finding chargers to making the right decision.
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            ChargeWise combines driver needs, station conditions and prediction to recommend one
            clear charging decision.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-surface/50 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Traditional approach
              </p>
              <ul className="mt-6 space-y-2">
                {traditional.map((step, i) => (
                  <li key={step}>
                    <div className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-muted-foreground">
                      {step}
                    </div>
                    {i < traditional.length - 1 && (
                      <ArrowDown className="mx-auto my-1 h-4 w-4 text-muted-foreground/50" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div
              className="relative h-full overflow-hidden rounded-3xl border border-primary/30 bg-card p-7 shadow-glow"
              style={{
                backgroundImage:
                  "radial-gradient(100% 70% at 100% 0%, oklch(0.79 0.155 168 / 0.12), transparent 60%)",
              }}
            >
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <Sparkles className="h-3.5 w-3.5" /> ChargeWise
              </p>
              <ul className="mt-6 space-y-2">
                {chargewise.map((step, i) => (
                  <li key={step}>
                    <div className="flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/8 px-4 py-3.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-[11px] font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-base font-semibold text-foreground">{step}</span>
                    </div>
                    {i < chargewise.length - 1 && (
                      <ArrowDown className="mx-auto my-1 h-4 w-4 text-primary/60" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <p className="mt-10 rounded-2xl border border-border bg-surface/60 px-6 py-5 text-center font-display text-lg font-semibold text-foreground sm:text-xl">
            Best station <span className="text-primary">+</span> estimated wait{" "}
            <span className="text-primary">+</span> estimated cost
          </p>
        </Reveal>
      </div>
    </section>
  );
}
