import { notFound } from "next/navigation";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { personJsonLd, serializeJsonLd } from "@/lib/jsonLd";
import { siteUrl } from "@/lib/site";

// Server Component: /pt e /en viram HTML estático no build.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd(lang, siteUrl())) }}
      />
      <Hero t={t.hero} />
      <About t={t.about} />
      <Projects t={t.projects} locale={lang} newTabLabel={t.a11y.newTab} />
      <Skills t={t.skills} />
      <Experience t={t.experience} locale={lang} />
      <Contact t={t.contact} newTabLabel={t.a11y.newTab} />
    </>
  );
}
