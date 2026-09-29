import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("tem um único h1 com o nome", () => {
    render(<Home />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Leonardo Alves Prates");
  });

  it("cada seção é uma região nomeada pelo seu título", () => {
    render(<Home />);
    for (const name of ["Sobre", "Habilidades", "Experiência e formação", "Contato"]) {
      expect(screen.getByRole("region", { name })).toBeInTheDocument();
    }
  });

  it("botões do hero apontam para projetos, currículo e contato", () => {
    render(<Home />);
    const hero = screen.getByRole("region", { name: "Leonardo Alves Prates" });
    expect(within(hero).getByRole("link", { name: "Ver projetos" })).toHaveAttribute(
      "href",
      "#projetos",
    );
    expect(within(hero).getByRole("link", { name: "Baixar currículo (PDF)" })).toHaveAttribute(
      "href",
      "/cv/leonardo-prates-cv.pdf",
    );
    expect(within(hero).getByRole("link", { name: "Falar comigo" })).toHaveAttribute(
      "href",
      "#contato",
    );
  });

  it("links externos avisam que abrem em nova aba", () => {
    render(<Home />);
    const linkedin = screen.getByRole("link", { name: /LinkedIn/ });
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedin).toHaveAccessibleName(/abre em nova aba/);
  });
});
