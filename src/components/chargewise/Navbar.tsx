import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "./Logo";

const links = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why ChargeWise", href: "#why-chargewise" },
  { label: "Technology", href: "#technology" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-border bg-background/85 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-background/40 backdrop-blur-md"
        }`}
      >
        <a href="#top" className="flex items-center gap-3">
          <span className="text-primary">
            <Logo className="h-9 w-9" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold tracking-tight text-foreground">
              ChargeWise
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              AI EV Charging
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/planner"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:brightness-110 active:scale-[0.97] md:inline-flex"
          >
            Get Started
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border bg-background/95 p-4 shadow-soft backdrop-blur-xl md:hidden">
          <div className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/planner"
              onClick={() => setOpen(false)}
              className="mt-3 w-full rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
