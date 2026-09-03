import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { HeroVisual } from "./HeroVisual";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-texture opacity-40 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.79 0.155 168 / 0.18), transparent)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              AI-Powered EV Charging Optimization
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Charge smarter.
              <span className="mt-2 block text-3xl font-semibold text-muted-foreground sm:text-4xl lg:text-[2.75rem]">
                Wait less. Drive further.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              ChargeWise helps EV drivers choose where and when to charge by combining station
              availability, predicted waiting time, distance, cost and vehicle compatibility.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/planner"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all duration-200 hover:brightness-110 active:scale-[0.98] sm:w-auto"
              >
                Find My Best Charger
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center rounded-full border border-border bg-surface px-7 py-4 text-base font-medium text-foreground transition-colors hover:bg-surface-elevated sm:w-auto"
              >
                See How It Works
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              One clear recommendation. Not a list of chargers.
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
