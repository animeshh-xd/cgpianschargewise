import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Radar } from "lucide-react";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Charging Planner — Coming Soon | ChargeWise" },
      {
        name: "description",
        content:
          "The ChargeWise charging planner is coming soon: find, predict, compare and reserve the best EV charging stop for your journey.",
      },
      { property: "og:title", content: "Charging Planner — Coming Soon | ChargeWise" },
      {
        property: "og:description",
        content:
          "The ChargeWise charging planner is coming soon: one clear charging recommendation instead of a list of chargers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlannerPlaceholder,
});

function PlannerPlaceholder() {
  return (
    <main className="grid-texture flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface text-primary">
          <Radar className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-foreground sm:text-4xl">
          The Charging Planner is coming next.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Find, predict, compare, reserve and charge — the ChargeWise planner will turn your
          journey inputs into one clear charging recommendation.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-elevated"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to ChargeWise
        </Link>
      </div>
    </main>
  );
}
