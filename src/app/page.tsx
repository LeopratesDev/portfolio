import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import t from "@/i18n/pt.json";

// Server Component: todas as seções viram HTML estático no build.
// A seção de projetos entra na etapa 4.
export default function Home() {
  return (
    <>
      <Hero t={t.hero} />
      <About t={t.about} />
      <Skills t={t.skills} />
      <Experience t={t.experience} />
      <Contact t={t.contact} newTabLabel={t.a11y.newTab} />
    </>
  );
}
