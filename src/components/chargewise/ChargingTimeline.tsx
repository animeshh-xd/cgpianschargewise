import { Check, Circle, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

export type TimelineState = "done" | "active" | "todo";

export function ChargingTimeline({
  steps,
}: {
  steps: { label: string; state: TimelineState }[];
}) {
  return (
    <ol className="space-y-4">
      {steps.map((step, i) => (
        <li key={step.label} className="relative flex items-start gap-3">
          {i < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-[11px] top-6 h-[calc(100%+0.25rem)] w-px",
                step.state === "todo" ? "bg-border" : "bg-primary/40",
              )}
            />
          ) : null}
          <span
            className={cn(
              "relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
              step.state === "done" && "border-primary/40 bg-primary/15 text-primary",
              step.state === "active" && "border-primary bg-primary text-primary-foreground",
              step.state === "todo" && "border-border bg-background text-muted-foreground",
            )}
          >
            {step.state === "done" ? (
              <Check className="h-3.5 w-3.5" />
            ) : step.state === "active" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Circle className="h-2.5 w-2.5" />
            )}
          </span>
          <span
            className={cn(
              "pt-0.5 text-sm",
              step.state === "todo" ? "text-muted-foreground" : "font-medium text-foreground",
            )}
          >
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  );
}
