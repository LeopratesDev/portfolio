import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header, type NavItem } from "@/components/layout/Header";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { SkipLink } from "@/components/layout/SkipLink";
import { profile } from "@/data/profile";
import { htmlLang, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { themeInitScript } from "@/lib/theme";
import "../globals.css";

// next/font baixa a fonte no build e serve do próprio domínio (sem request ao Google em runtime).
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Gera /pt e /en no build (SSG). Qualquer outro idioma na URL vira 404. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    // hreflang: diz ao Google que /pt e /en são a mesma página em idiomas diferentes.
    alternates: {
      languages: { "pt-BR": "/pt", en: "/en", "x-default": "/pt" },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  // Os ids das âncoras são os mesmos nos dois idiomas (#projetos etc.).
  const nav: NavItem[] = [
    { href: "#sobre", label: t.nav.about },
    { href: "#projetos", label: t.nav.projects },
    { href: "#habilidades", label: t.nav.skills },
    { href: "#experiencia", label: t.nav.experience },
    { href: "#contato", label: t.nav.contact },
  ];

  return (
    // suppressHydrationWarning: o script abaixo pode adicionar data-theme antes da hidratação.
    <html
      lang={htmlLang[lang]}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <SkipLink label={t.a11y.skipLink} />
        <Header nav={nav} navLabel={t.a11y.mainNav} themeLabel={t.a11y.themeToggle} />
        <main id="conteudo" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer name={profile.name}>
          <p>{t.footer.rights}</p>
          <LocaleSwitcher current={lang} label={t.footer.language} />
        </Footer>
      </body>
    </html>
  );
}
