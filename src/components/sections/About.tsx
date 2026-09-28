import type pt from "@/i18n/pt.json";
import { Section } from "./Section";

type Props = { t: (typeof pt)["about"] };

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
