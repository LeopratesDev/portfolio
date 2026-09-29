import type { Localized } from "@/i18n/config";

// Fonte: currículo (Experiência profissional e Formação). Ordem: mais recente primeiro.
export type TimelineEntry = {
  kind: "work" | "education";
  title: Localized;
  org: string;
  period: string;
  description: Localized;
};

export const timeline: TimelineEntry[] = [
  {
    kind: "education",
    title: {
      pt: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      en: "Associate degree in Systems Analysis and Development",
    },
    org: "Universidade Paulista (UNIP)",
    period: "2022 – 2023",
    description: {
      pt: "Graduação tecnológica em desenvolvimento de sistemas.",
      en: "Technology degree focused on software development.",
    },
  },
  {
    kind: "work",
    title: {
      pt: "Agente de Atendimento Receptivo (SAC)",
      en: "Customer Service Agent (inbound)",
    },
    org: "Concentrix",
    period: "2022 – 2023",
    description: {
      pt: "Identificação inicial de ocorrências, resolução de demandas de primeiro nível, registro dos atendimentos e encaminhamento de casos às áreas responsáveis.",
      en: "Initial triage of customer issues, first-level resolution, logging every interaction and routing cases to the responsible teams.",
    },
  },
  {
    kind: "work",
    title: { pt: "Suporte Técnico", en: "Technical Support" },
    org: "Comércio e Importação Sertic",
    period: "2017",
    description: {
      pt: "Instalação e configuração de softwares, atendimento aos usuários, diagnóstico de problemas técnicos e manutenção preventiva.",
      en: "Software installation and configuration, user support, troubleshooting technical problems and preventive maintenance.",
    },
  },
];
