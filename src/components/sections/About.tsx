import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "./Section";

type Props = { t: Dictionary["about"] };

export function About({ t }: Props) {
  return (
    <Section id="sobre" title={t.title}>
      <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
        {t.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
