import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = { t: Dictionary["hero"] };

const buttonBase =
  "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 font-medium transition-colors";

export function Hero({ t }: Props) {
  return (
    <section id="inicio" aria-labelledby="inicio-titulo">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="font-mono text-sm text-muted">{t.greeting}</p>
        {/* Único <h1> da página. */}
        <h1
          id="inicio-titulo"
          className="mt-2 text-4xl font-bold tracking-tight text-balance sm:text-6xl"
        >
          {profile.name}
        </h1>
        <p className="mt-3 text-xl font-medium text-accent sm:text-2xl">{t.role}</p>
        <ul className="mt-4 flex flex-wrap gap-x-2 font-mono text-sm text-muted" aria-label="Stack">
          {profile.stack.map((tech, i) => (
            <li key={tech}>
              {i > 0 && (
                <span aria-hidden="true" className="mr-2">
                  ·
                </span>
              )}
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#projetos" className={`${buttonBase} bg-accent text-accent-fg hover:opacity-90`}>
            {t.ctaProjects}
          </a>
          <a
            href={profile.resumePath}
            download
            className={`${buttonBase} border border-border hover:bg-surface`}
          >
            {t.ctaResume}
          </a>
          <a href="#contato" className={`${buttonBase} border border-border hover:bg-surface`}>
            {t.ctaContact}
          </a>
        </div>
      </div>
    </section>
  );
}
