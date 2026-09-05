import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/recommendation")({
  head: () => ({
    meta: [
      { title: "Your Recommendation — ChargeWise" },
      {
        name: "description",
        content:
          "See why ChargeWise picked this charging station: availability, predicted wait, distance and cost in one clear recommendation.",
      },
      { property: "og:title", content: "Your Recommendation — ChargeWise" },
      {
        property: "og:description",
        content:
          "See why ChargeWise picked this charging station: availability, predicted wait, distance and cost in one clear recommendation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecommendationPlaceholder,
});

function RecommendationPlaceholder() {
  return (
    <main className="grid-texture flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface text-primary">
          <Sparkles className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-foreground sm:text-4xl">
          Your detailed recommendation is coming next.
        </h1>
        <p className="mt-4 text-muted-foreground">
          ChargeWise will explain the pick — score breakdown, time and cost estimates, and how it
          compares to the nearest station.
        </p>
        <Link
          to="/stations"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-elevated"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Stations
        </Link>
      </div>
    </main>
  );
}
