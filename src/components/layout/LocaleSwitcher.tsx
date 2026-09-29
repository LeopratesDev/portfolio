import { htmlLang, locales, type Locale } from "@/i18n/config";

type Props = { current: Locale; label: string };

const names: Record<Locale, string> = { pt: "Português", en: "English" };

/**
 * Server Component: trocar de idioma é só navegar para /pt ou /en.
 * Links comuns não precisam de JS, funcionam com Ctrl+clique e são rastreáveis.
 */
export function LocaleSwitcher({ current, label }: Props) {
  return (
    <nav aria-label={label}>
      <ul className="flex gap-1">
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={`/${locale}`}
              hrefLang={htmlLang[locale]}
              lang={htmlLang[locale]}
              aria-current={locale === current ? "page" : undefined}
              className="block rounded-md px-2.5 py-1.5 font-mono uppercase hover:bg-surface hover:text-fg aria-[current=page]:font-bold aria-[current=page]:text-fg"
            >
              {/* Visível: "PT" / "EN". Leitor de tela: nome completo, no próprio idioma. */}
              <span aria-hidden="true">{locale}</span>
              <span className="sr-only">{names[locale]}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
