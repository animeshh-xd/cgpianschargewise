import { Reveal } from "./Reveal";

const stack = ["React / Flutter", "FastAPI / Node.js", "Firebase / Supabase", "Python", "ML Prediction"];

export function Technology() {
  return (
    <section id="technology" className="py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Designed for a practical MVP.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
            ChargeWise can begin with simulated station data, a map-based interface, rule-based
            ranking, lightweight ML prediction and reservation state.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/35 hover:text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
