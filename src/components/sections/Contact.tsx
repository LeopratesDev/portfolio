import { profile } from "@/data/profile";
import type pt from "@/i18n/pt.json";
import { Section } from "./Section";

type Props = { t: (typeof pt)["contact"]; newTabLabel: string };

export function Contact({ t, newTabLabel }: Props) {
  const links = [
    { label: t.email, href: `mailto:${profile.email}`, text: profile.email, external: false },
    {
      label: t.linkedin,
      href: profile.linkedin,
      text: "in/leonardo-prates77",
      external: true,
    },
    { label: t.github, href: profile.github, text: "LeopratesDev", external: true },
  ];

  return (
    <Section id="contato" title={t.title}>
      <p className="max-w-2xl text-lg text-muted">{t.intro}</p>
      {/* O formulário entra aqui na etapa 5. */}
      <ul className="mt-8 grid gap-3 sm:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
              className="block rounded-lg border border-border p-4 hover:bg-surface"
            >
              {/* Espaços explícitos entre os spans: sem eles o nome acessível sai colado. */}
              <span className="block font-semibold">{link.label}</span>{" "}
              <span className="block truncate font-mono text-sm text-muted">{link.text}</span>
              {link.external && (
                <>
                  {" "}
                  <span className="sr-only">{newTabLabel}</span>
                </>
              )}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
