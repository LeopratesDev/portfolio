import type { StaticImageData } from "next/image";
import rhManagerDashboard from "@/assets/projects/rh-manager-dashboard.png";
import type { Localized } from "@/i18n/config";

/**
 * Para adicionar um projeto, acrescente um objeto nesta lista.
 * Nenhum componente precisa mudar.
 */
export type Project = {
  slug: string;
  title: string;
  /** Até 2 linhas: o que é e o que faz. */
  description: Localized;
  status: "done" | "in-progress";
  /** Import estático: o Next lê largura/altura no build (sem CLS). */
  image?: { src: StaticImageData; alt: Localized };
  tech: string[];
  /** Números verificáveis (fonte anotada ao lado de cada projeto). */
  stats: { value: string; label: Localized }[];
  links: { github?: string; demo?: string };
};

export const projects: Project[] = [
  // Fonte dos números: CI do repositório rh-manager (commit abf6601, 28/09/2026):
  // 32 testes unitários + 68 de integração (xUnit) + 46 no front (Vitest) = 146.
  {
    slug: "rh-manager",
    title: "RH Manager",
    description: {
      pt: "Gestão de funcionários, departamentos e aprovação de férias. API REST em C# / ASP.NET Core e painel em React + TypeScript.",
      en: "HR management for employees, departments and vacation approvals. REST API in C# / ASP.NET Core and a React + TypeScript dashboard.",
    },
    status: "done",
    image: {
      src: rhManagerDashboard,
      alt: {
        pt: "Dashboard do RH Manager com funcionários ativos por departamento, férias pendentes e próximas férias aprovadas.",
        en: "RH Manager dashboard showing active employees per department, pending vacation requests and upcoming approved vacations.",
      },
    },
    tech: ["C#", ".NET 10", "ASP.NET Core", "SQL Server", "React", "TypeScript", "Docker"],
    stats: [
      { value: "21", label: { pt: "endpoints REST", en: "REST endpoints" } },
      { value: "146", label: { pt: "testes automatizados", en: "automated tests" } },
      { value: "CI", label: { pt: "GitHub Actions + Docker", en: "GitHub Actions + Docker" } },
    ],
    links: {
      github: "https://github.com/LeopratesDev/rh-manager",
      demo: "https://leopratesdev.github.io/rh-manager/",
    },
  },
  // TODO(Leonardo): preencher quando o projeto existir (descrição, tecnologias, números, links, imagem).
  {
    slug: "helpdesk-api",
    title: "HelpDesk API",
    description: { pt: "Próximo projeto de back-end.", en: "Next back-end project." },
    status: "in-progress",
    tech: [],
    stats: [],
    links: {},
  },
];
