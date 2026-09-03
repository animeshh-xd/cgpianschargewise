import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";

export const Route = createFileRoute("/stations")({
  head: () => ({
    meta: [
      { title: "Recommended Stations — ChargeWise" },
      {
        name: "description",
        content:
          "ChargeWise station recommendations are coming next: one clear charging option based on availability, wait time, distance and cost.",
      },
      { property: "og:title", content: "Recommended Stations — ChargeWise" },
      {
        property: "og:description",
        content:
          "ChargeWise station recommendations are coming next: one clear charging option based on availability, wait time, distance and cost.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StationsPlaceholder,
});

function StationsPlaceholder() {
  return (
    <main className="grid-texture flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface text-primary">
          <MapPin className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-foreground sm:text-4xl">
          Station recommendations are coming next.
        </h1>
        <p className="mt-4 text-muted-foreground">
          ChargeWise will turn your journey inputs into one clear charging recommendation — ranked
          by availability, wait time, distance and cost.
        </p>
        <Link
          to="/planner"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-elevated"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Planner
        </Link>
      </div>
    </main>
  );
}
