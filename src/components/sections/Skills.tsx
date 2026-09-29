import { skillGroups } from "@/data/skills";
import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "./Section";

type Props = { t: Dictionary["skills"] };

export function Skills({ t }: Props) {
  return (
    <Section id="habilidades" title={t.title}>
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.id} className="rounded-lg border border-border p-5">
            <h3 className="font-semibold">{t.groups[group.id]}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-md bg-surface px-2.5 py-1 font-mono text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
