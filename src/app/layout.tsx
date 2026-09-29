import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header, type NavItem } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { profile } from "@/data/profile";
import t from "@/i18n/pt.json";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// next/font baixa a fonte no build e serve do próprio domínio (sem request ao Google em runtime).
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
};

// Por enquanto só PT; o idioma vira parâmetro de rota na etapa de i18n.
const nav: NavItem[] = [
  { href: "#sobre", label: t.nav.about },
  { href: "#projetos", label: t.nav.projects },
  { href: "#habilidades", label: t.nav.skills },
  { href: "#experiencia", label: t.nav.experience },
  { href: "#contato", label: t.nav.contact },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: o script abaixo pode adicionar data-theme antes da hidratação.
    <html
      lang="pt-BR"
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
        </Footer>
      </body>
    </html>
  );
}
