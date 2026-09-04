import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function MetricCard({
  icon: Icon,
  label,
  value,
  hint,
  className,
}: {
  icon?: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-background/50 p-4 transition-colors hover:border-primary/30",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {Icon ? <Icon aria-hidden="true" className="h-3.5 w-3.5 text-primary" /> : null}
        {label}
      </div>
      <div className="mt-2 font-display text-xl font-semibold text-foreground">{value}</div>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
