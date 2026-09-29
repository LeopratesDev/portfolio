import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Dados estruturados schema.org/Person: ajudam o Google a entender que a
 * página é sobre uma pessoa (nome, cargo, perfis). Só dados do perfil.
 */
export function personJsonLd(locale: Locale, url: string) {
  const t = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: t.hero.role,
    url: `${url}/${locale}`,
    email: `mailto:${profile.email}`,
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: [...profile.stack],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade Paulista (UNIP)" },
  };
}

/** Serializa para <script>: escapar "<" impede fechar a tag com "</script>". */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
