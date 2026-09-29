import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Project } from "@/data/projects";
import { ProjectCard, type ProjectCardLabels } from "./ProjectCard";

const labels: ProjectCardLabels = {
  code: "Código",
  demo: "Demo",
  inProgress: "Em desenvolvimento",
  imagePlaceholder: "Imagem indisponível",
  techList: "Tecnologias",
  newTab: "(abre em nova aba)",
};

const complete: Project = {
  slug: "exemplo",
  title: "Projeto Exemplo",
  description: { pt: "Descrição curta.", en: "Short description." },
  status: "done",
  image: {
    src: { src: "/exemplo.png", width: 1280, height: 760, blurDataURL: "data:image/png;base64,AA" },
    alt: { pt: "Tela principal do Projeto Exemplo", en: "Main screen of Projeto Exemplo" },
  },
  tech: ["C#", "React"],
  stats: [{ value: "21", label: { pt: "endpoints REST", en: "REST endpoints" } }],
  links: { github: "https://github.com/x/exemplo", demo: "https://exemplo.dev" },
};

describe("ProjectCard", () => {
  it("mostra título, imagem com alt, números e tecnologias", () => {
    render(<ProjectCard project={complete} locale="pt" labels={labels} />);

    expect(screen.getByRole("heading", { level: 3, name: "Projeto Exemplo" })).toBeInTheDocument();
    const img = screen.getByRole("img", { name: "Tela principal do Projeto Exemplo" });
    // Largura e altura explícitas no HTML: o navegador reserva o espaço (sem CLS).
    expect(img).toHaveAttribute("width", "1280");
    expect(img).toHaveAttribute("height", "760");
    expect(screen.getByText("21")).toBeInTheDocument();
    expect(screen.getByText("endpoints REST")).toBeInTheDocument();

    const tech = screen.getByRole("list", { name: "Tecnologias" });
    expect(tech).toHaveTextContent("C#");
    expect(tech).toHaveTextContent("React");
  });

  it("links têm nome que inclui o projeto e avisam nova aba", () => {
    render(<ProjectCard project={complete} locale="pt" labels={labels} />);

    const code = screen.getByRole("link", { name: "Código Projeto Exemplo (abre em nova aba)" });
    expect(code).toHaveAttribute("href", "https://github.com/x/exemplo");
    expect(code).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: /^Demo Projeto Exemplo/ })).toHaveAttribute(
      "href",
      "https://exemplo.dev",
    );
  });

  it("projeto em andamento: selo, placeholder de imagem e nenhum link vazio", () => {
    const draft: Project = {
      slug: "rascunho",
      title: "Rascunho",
      description: { pt: "Em breve.", en: "Soon." },
      status: "in-progress",
      tech: [],
      stats: [],
      links: {},
    };
    render(<ProjectCard project={draft} locale="pt" labels={labels} />);

    expect(screen.getByText("Em desenvolvimento")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Imagem indisponível" })).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("list", { name: "Tecnologias" })).not.toBeInTheDocument();
  });
});
