import type { StaticImageData } from "next/image";
import helpdeskApiTriage from "@/assets/projects/helpdesk-api-triage.png";
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
  // Fonte dos números: CI do repositório rh-manager (commit f4eed1c, 29/09/2026):
  // 35 testes unitários + 77 de integração (xUnit) + 60 no front (Vitest) = 172.
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
      { value: "172", label: { pt: "testes automatizados", en: "automated tests" } },
      { value: "CI", label: { pt: "GitHub Actions + Docker", en: "GitHub Actions + Docker" } },
    ],
    links: {
      github: "https://github.com/LeopratesDev/rh-manager",
      demo: "https://leopratesdev.github.io/rh-manager/",
    },
  },
  // Fonte dos números: repositório helpdesk-api (main, 29/09/2026): 26 rotas no OpenAPI,
  // 92 testes unitários + 65 de integração (Jest + Testcontainers) = 157,
  // 97,4% das linhas cobertas nas regras de negócio.
  {
    slug: "helpdesk-api",
    title: "HelpDesk API",
    description: {
      pt: "API de chamados com triagem por IA (Claude) em fila assíncrona, SLA automático e auditoria. Eu atendia chamados; agora construí o sistema que os organiza.",
      en: "Support ticket API with AI triage (Claude) on an async queue, automatic SLA and audit trail. I used to answer tickets; now I built the system that organizes them.",
    },
    status: "done",
    image: {
      src: helpdeskApiTriage,
      alt: {
        pt: "Swagger da HelpDesk API mostrando a sugestão de triagem de um chamado: categoria Financeiro, prioridade ALTA e resumo de uma linha.",
        en: "HelpDesk API Swagger showing a ticket triage suggestion: category Financeiro, priority ALTA and a one-line summary.",
      },
    },
    tech: [
      "Node.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "BullMQ",
      "Redis",
      "Claude API",
      "Docker",
    ],
    stats: [
      { value: "26", label: { pt: "endpoints REST", en: "REST endpoints" } },
      { value: "157", label: { pt: "testes automatizados", en: "automated tests" } },
      { value: "97%", label: { pt: "cobertura das regras", en: "business-rule coverage" } },
    ],
    links: {
      github: "https://github.com/LeopratesDev/helpdesk-api",
    },
  },
];
