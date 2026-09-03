import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="px-6 pb-24 sm:pb-28">
      <Reveal>
        <div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl border border-primary/25 bg-surface px-6 py-20 text-center sm:px-12"
          style={{
            backgroundImage:
              "radial-gradient(90% 120% at 50% 0%, oklch(0.79 0.155 168 / 0.16), transparent 65%)",
          }}
        >
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight text-foreground sm:text-5xl">
              Your next charge should be a decision, not a guess.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Let ChargeWise find the charging option that makes the most sense for your journey.
            </p>
            <Link
              to="/planner"
              className="group mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all duration-200 hover:brightness-110 active:scale-[0.98] sm:w-auto"
            >
              Find My Best Charger
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <p className="mt-5 text-sm text-muted-foreground">
              Charge smarter. Wait less. Drive further.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
