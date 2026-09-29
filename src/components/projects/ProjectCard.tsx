import Image from "next/image";
import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";

export type ProjectCardLabels = {
  code: string;
  demo: string;
  inProgress: string;
  imagePlaceholder: string;
  techList: string;
  newTab: string;
};

type Props = {
  project: Project;
  locale: Locale;
  labels: ProjectCardLabels;
};

/** Server Component: nenhum JS vai para o navegador por causa deste card. */
export function ProjectCard({ project, locale, labels }: Props) {
  const { title, description, image, tech, stats, links, status } = project;

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-accent/60">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt[locale]}
          // Mesma largura máxima que o card ocupa: evita baixar imagem maior que o necessário.
          sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
          // Fica abaixo da primeira tela: carregamento lazy (padrão) + blur enquanto carrega.
          placeholder="blur"
          className="aspect-[1280/760] h-auto w-full border-b border-border object-cover object-top"
        />
      ) : (
        <div
          role="img"
          aria-label={labels.imagePlaceholder}
          className="flex aspect-[1280/760] items-center justify-center border-b border-border bg-surface-2 font-mono text-muted"
        >
          {"{ }"}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-2xl font-bold tracking-wide uppercase">{title}</h3>
          {status === "in-progress" && (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
              {labels.inProgress}
            </span>
          )}
        </div>
        <p className="mt-2 text-muted">{description[locale]}</p>

        {stats.length > 0 && (
          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {stats.map((stat) => (
              <div key={stat.label.pt} className="flex flex-col-reverse">
                <dt className="text-xs text-muted">{stat.label[locale]}</dt>
                <dd className="font-mono text-lg font-bold text-accent">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {tech.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={labels.techList}>
            {tech.map((item) => (
              <li key={item} className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-xs">
                {item}
              </li>
            ))}
          </ul>
        )}

        {(links.github || links.demo) && (
          <div className="mt-auto flex gap-4 pt-5">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                {labels.code} <span className="sr-only">{`${title} ${labels.newTab}`}</span>
              </a>
            )}
            {links.demo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                {labels.demo} <span className="sr-only">{`${title} ${labels.newTab}`}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
