import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "./Section";

type Props = { t: Dictionary["projects"]; locale: Locale; newTabLabel: string };

export function Projects({ t, locale, newTabLabel }: Props) {
  return (
    <Section id="projetos" title={t.title}>
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug} className="flex">
            <ProjectCard
              project={project}
              locale={locale}
              labels={{ ...t.card, newTab: newTabLabel }}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
