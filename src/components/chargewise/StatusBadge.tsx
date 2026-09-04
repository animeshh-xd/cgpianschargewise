import type { Availability } from "@/lib/chargewise-data";
import { cn } from "@/lib/utils";

const tone: Record<Availability, { dot: string; text: string }> = {
  Available: { dot: "bg-primary", text: "text-primary" },
  Limited: { dot: "bg-amber-400", text: "text-amber-400" },
  Busy: { dot: "bg-destructive", text: "text-destructive" },
};

export function StatusBadge({
  status,
  className,
}: {
  status: Availability;
  className?: string;
}) {
  const t = tone[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs font-medium",
        t.text,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", t.dot)} />
      {status}
    </span>
  );
}
