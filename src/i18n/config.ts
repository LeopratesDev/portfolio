export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

/** Valor do atributo `lang` do <html> para cada idioma. */
export const htmlLang: Record<Locale, string> = { pt: "pt-BR", en: "en" };

/** Texto com uma versão por idioma (usado nos arquivos de dados). */
export type Localized = Record<Locale, string>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Escolhe o idioma a partir do cabeçalho Accept-Language
 * (ex.: "en-US,en;q=0.9,pt;q=0.8"). Sem biblioteca: ordena por `q`
 * e pega o primeiro idioma suportado, comparando só o código principal.
 */
export function pickLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { base: tag.toLowerCase().split("-")[0] ?? "", q: q ? Number(q.split("=")[1]) : 1 };
    })
    .filter((entry) => !Number.isNaN(entry.q) && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  return ranked.map((entry) => entry.base).find(isLocale) ?? defaultLocale;
}
