import type { MetadataRoute } from "next";
import { htmlLang, locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

/** /sitemap.xml gerado no build: uma entrada por idioma, cada uma apontando para as outras. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const languages = Object.fromEntries(
    locales.map((locale) => [htmlLang[locale], `${base}/${locale}`]),
  );

  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "pt" ? 1 : 0.8,
    alternates: { languages },
  }));
}
