// Fonte: currículo (Experiência profissional e Formação). Ordem: mais recente primeiro.
export type TimelineEntry = {
  kind: "work" | "education";
  title: string;
  org: string;
  period: string;
  description: string;
};

export const timeline: TimelineEntry[] = [
  {
    kind: "education",
    title: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    org: "Universidade Paulista (UNIP)",
    period: "2022 – 2023",
    description: "Graduação tecnológica em desenvolvimento de sistemas.",
  },
  {
    kind: "work",
    title: "Agente de Atendimento Receptivo (SAC)",
    org: "Concentrix",
    period: "2022 – 2023",
    description:
      "Identificação inicial de ocorrências, resolução de demandas de primeiro nível, registro dos atendimentos e encaminhamento de casos às áreas responsáveis.",
  },
  {
    kind: "work",
    title: "Suporte Técnico",
    org: "Comércio e Importação Sertic",
    period: "2017",
    description:
      "Instalação e configuração de softwares, atendimento aos usuários, diagnóstico de problemas técnicos e manutenção preventiva.",
  },
];
