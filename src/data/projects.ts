import type { StaticImageData } from "next/image";
import rhManagerDashboard from "@/assets/projects/rh-manager-dashboard.png";

/**
 * Para adicionar um projeto, acrescente um objeto nesta lista.
 * Nenhum componente precisa mudar.
 */
export type Project = {
  slug: string;
  title: string;
  /** Até 2 linhas: o que é e o que faz. */
  description: string;
  status: "done" | "in-progress";
  /** Import estático: o Next lê largura/altura no build (sem CLS). */
  image?: { src: StaticImageData; alt: string };
  tech: string[];
  /** Números verificáveis (fonte anotada ao lado de cada projeto). */
  stats: { value: string; label: string }[];
  links: { github?: string; demo?: string };
};

export const projects: Project[] = [
  // Fonte dos números: CI do repositório rh-manager (commit abf6601, 28/09/2026):
  // 32 testes unitários + 68 de integração (xUnit) + 46 no front (Vitest) = 146.
  {
    slug: "rh-manager",
    title: "RH Manager",
    description:
      "Gestão de funcionários, departamentos e aprovação de férias. API REST em C# / ASP.NET Core e painel em React + TypeScript.",
    status: "done",
    image: {
      src: rhManagerDashboard,
      alt: "Dashboard do RH Manager com funcionários ativos por departamento, férias pendentes e próximas férias aprovadas.",
    },
    tech: ["C#", ".NET 10", "ASP.NET Core", "SQL Server", "React", "TypeScript", "Docker"],
    stats: [
      { value: "21", label: "endpoints REST" },
      { value: "146", label: "testes automatizados" },
      { value: "CI", label: "GitHub Actions + Docker" },
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
    description: "Próximo projeto de back-end.",
    status: "in-progress",
    tech: [],
    stats: [],
    links: {},
  },
];
