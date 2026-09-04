import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Logo } from "./Logo";

export function FlowShell({
  step,
  stepLabel,
  children,
}: {
  step?: string;
  stepLabel?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 grid-texture opacity-30 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-40 left-1/2 h-[28rem] w-[50rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(closest-side, oklch(0.79 0.155 168 / 0.15), transparent)",
        }}
      />

      <header className="relative z-10 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-primary">
              <Logo className="h-8 w-8" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-semibold tracking-tight text-foreground">
                ChargeWise
              </span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                AI EV Charging
              </span>
            </span>
          </Link>

          {step ? (
            <div className="flex items-center gap-3 text-right">
              {stepLabel ? (
                <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:inline-block">
                  {stepLabel}
                </span>
              ) : null}
              <div className="flex h-9 items-center rounded-full border border-border bg-surface px-3 text-sm font-semibold text-foreground">
                <span className="text-primary">{step}</span>
                <span className="mx-1.5 text-muted-foreground">/</span>
                <span className="text-muted-foreground">03</span>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">{children}</main>
    </div>
  );
}

export function PageIntro({
  title,
  subtitle,
  align = "center",
}: {
  title: ReactNode;
  subtitle: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mb-10 text-center sm:mb-14" : "mb-8 sm:mb-12"}>
      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <p
        className={`mt-4 max-w-xl text-base text-muted-foreground sm:text-lg ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}
