// Fonte: currículo (seção "Habilidades técnicas"). Sem barras de "nível %" de propósito:
// porcentagem de habilidade não é mensurável e o recrutador não sabe o que 80% significa.
export type SkillGroupId = "frontend" | "backend" | "database" | "testing";

export const skillGroups: { id: SkillGroupId; items: string[] }[] = [
  {
    id: "frontend",
    items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Next.js"],
  },
  {
    id: "backend",
    items: ["C#", "ASP.NET Core", "Entity Framework Core", "APIs REST", "JWT", "Python"],
  },
  { id: "database", items: ["SQL", "SQL Server", "MySQL"] },
  {
    id: "testing",
    items: ["xUnit", "Vitest", "Testing Library", "Playwright", "Docker", "GitHub Actions", "Git"],
  },
];
