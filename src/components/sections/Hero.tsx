import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { CodeCard } from "./CodeCard";

type Props = { t: Dictionary["hero"]; newTabLabel: string };

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-md px-5 font-display text-sm font-medium tracking-[0.08em] uppercase transition-colors";

export function Hero({ t, newTabLabel }: Props) {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section id="inicio" aria-labelledby="inicio-titulo" className="overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.25fr_1fr] lg:py-28 [&>*]:min-w-0">
        <div>
          <p className="text-muted">{t.greeting}</p>
          {/* Único <h1> da página. O texto no HTML continua "Leonardo Alves Prates";
              a caixa alta é só CSS, para leitores de tela não soletrarem. */}
          <h1
            id="inicio-titulo"
            className="mt-3 font-display text-[3.5rem] leading-[0.92] font-bold tracking-tight uppercase sm:text-7xl lg:text-[5.5rem]"
          >
            {first} <span className="block">{rest.join(" ")}</span>
          </h1>
          <p className="mt-6 border-l-2 border-accent pl-4 text-xl font-medium text-accent sm:text-2xl">
            {t.role}
          </p>
          <ul aria-label="Stack" className="mt-6 flex flex-wrap gap-2">
            {profile.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border bg-surface px-3 py-1 text-sm text-fg"
              >
                {tech}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#projetos"
              className={`${buttonBase} bg-accent text-accent-fg hover:brightness-110`}
            >
              {t.ctaProjects}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href={profile.resumePath}
              download
              className={`${buttonBase} border border-border text-fg hover:border-accent hover:text-accent`}
            >
              {t.ctaResume}
            </a>
            <a
              href="#contato"
              className={`${buttonBase} border border-border text-fg hover:border-accent hover:text-accent`}
            >
              {t.ctaContact}
            </a>
          </div>
        </div>

        <CodeCard
          caption={t.codeCaption}
          repoLabel={t.codeRepo}
          omitted={t.codeOmitted}
          repoUrl="https://github.com/LeopratesDev/rh-manager"
          newTabLabel={newTabLabel}
        />
      </div>
    </section>
  );
}
