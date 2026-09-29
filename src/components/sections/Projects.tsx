import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import type pt from "@/i18n/pt.json";
import { Section } from "./Section";

type Props = { t: (typeof pt)["projects"]; newTabLabel: string };

export function Projects({ t, newTabLabel }: Props) {
  return (
    <Section id="projetos" title={t.title}>
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug} className="flex">
            <ProjectCard project={project} labels={{ ...t.card, newTab: newTabLabel }} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
