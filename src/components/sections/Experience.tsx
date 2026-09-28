import { timeline } from "@/data/timeline";
import type pt from "@/i18n/pt.json";
import { Section } from "./Section";

type Props = { t: (typeof pt)["experience"] };

/** Linha do tempo como <ol>: a ordem cronológica tem significado, então é lista ordenada. */
export function Experience({ t }: Props) {
  return (
    <Section id="experiencia" title={t.title}>
      <ol className="relative space-y-10 border-l border-border pl-6">
        {timeline.map((entry) => (
          <li key={`${entry.org}-${entry.title}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[1.9rem] size-3 rounded-full bg-accent"
            />
            <p className="font-mono text-sm text-muted">
              {entry.period} · {t.kinds[entry.kind]}
            </p>
            <h3 className="mt-1 text-lg font-semibold">{entry.title}</h3>
            <p className="text-accent">{entry.org}</p>
            <p className="mt-2 max-w-2xl text-muted">{entry.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
