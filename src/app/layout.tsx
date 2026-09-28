import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header, type NavItem } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
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
  title: "Leonardo Alves Prates | Desenvolvedor Full Stack Júnior",
  description: "Portfólio de Leonardo Alves Prates: C#, .NET, React, TypeScript e SQL.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
};

// Textos provisórios em PT; viram dicionário na etapa de i18n.
const nav: NavItem[] = [
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#contato", label: "Contato" },
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
        <SkipLink label="Pular para o conteúdo" />
        <Header nav={nav} navLabel="Navegação principal" themeLabel="Alternar tema claro/escuro" />
        <main id="conteudo" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer name="Leonardo Alves Prates" />
      </body>
    </html>
  );
}
