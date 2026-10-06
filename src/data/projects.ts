import type { StaticImageData } from "next/image";
import helpdeskApiTriage from "@/assets/projects/helpdesk-api-triage.png";
import rhManagerDashboard from "@/assets/projects/rh-manager-dashboard.png";
import serviceOrdersDashboard from "@/assets/projects/service-orders-dashboard.png";
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
  // Fonte dos números: README do repositório service-orders-saas (02/10/2026):
  // 29 testes unitários + 6 de integração (xUnit + Testcontainers) = 35.
  // 10 endpoints REST listados no README (auth, serviceorders CRUD, stats, export, webhook, health).
  {
    slug: "service-orders-saas",
    title: "Service Orders SaaS",
    description: {
      pt: "Plataforma multi-tenant de gestão de ordens de serviço com pagamentos Pix (Mercado Pago). API em C# / ASP.NET Core (Clean Architecture) e painel em Next.js.",
      en: "Multi-tenant service-order management platform with Pix payments (Mercado Pago). API in C# / ASP.NET Core (Clean Architecture) and a Next.js dashboard.",
    },
    status: "done",
    image: {
      src: serviceOrdersDashboard,
      alt: {
        pt: "Dashboard do Service Orders SaaS com tiles de resumo (total, recebido, pendente, rascunho), gráfico de ordens por status e lista de ordens com valores e ações.",
        en: "Service Orders SaaS dashboard showing summary tiles (total, received, pending, draft), chart of orders by status and order list with amounts and actions.",
      },
    },
    tech: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "PostgreSQL",
      "Clean Architecture",
      "MediatR",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
    ],
    stats: [
      { value: "35", label: { pt: "testes automatizados", en: "automated tests" } },
      { value: "10", label: { pt: "endpoints REST", en: "REST endpoints" } },
      { value: "Pix", label: { pt: "pagamentos integrados", en: "integrated payments" } },
    ],
    links: {
      github: "https://github.com/LeopratesDev/service-orders-saas",
      demo: "https://service-orders-saas.vercel.app",
    },
  },
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
