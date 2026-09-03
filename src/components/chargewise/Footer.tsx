import { Link } from "@tanstack/react-router";

import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-primary">
              <Logo className="h-8 w-8" />
            </span>
            <span className="font-display text-base font-semibold text-foreground">ChargeWise</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">AI-powered EV charging optimization</p>
          <p className="mt-4 text-sm font-semibold tracking-[0.12em] text-foreground">CGPIANS</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Build With Bharat 2.0 • National Level Hackathon
          </p>
        </div>

        <nav className="flex flex-col gap-3 text-sm sm:items-end">
          <a href="#how-it-works" className="text-muted-foreground transition-colors hover:text-foreground">
            How It Works
          </a>
          <a href="#technology" className="text-muted-foreground transition-colors hover:text-foreground">
            Technology
          </a>
          <Link to="/planner" className="text-primary transition-colors hover:brightness-110">
            Get Started
          </Link>
        </nav>
      </div>
    </footer>
  );
}
