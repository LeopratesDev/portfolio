import { timeline } from "@/data/timeline";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "./Section";

type Props = { t: Dictionary["experience"]; locale: Locale };

/** Linha do tempo como <ol>: a ordem cronológica tem significado, então é lista ordenada. */
export function Experience({ t, locale }: Props) {
  return (
    <Section id="experiencia" title={t.title}>
      <ol className="relative space-y-10 border-l border-border pl-6">
        {timeline.map((entry) => (
          <li key={`${entry.org}-${entry.period}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[1.9rem] size-3 rounded-full bg-accent"
            />
            <p className="font-mono text-sm text-muted">
              {entry.period} · {t.kinds[entry.kind]}
            </p>
            <h3 className="mt-1 font-display text-xl font-medium tracking-wide uppercase">
              {entry.title[locale]}
            </h3>
            <p className="text-accent">{entry.org}</p>
            <p className="mt-2 max-w-2xl text-muted">{entry.description[locale]}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
