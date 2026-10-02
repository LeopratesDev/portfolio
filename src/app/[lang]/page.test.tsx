import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

/** A página é um Server Component assíncrono: resolvemos o JSX antes de renderizar. */
async function renderHome(lang: "pt" | "en") {
  render(await Home({ params: Promise.resolve({ lang }), searchParams: Promise.resolve({}) }));
}

describe("Home (pt)", () => {
  it("tem um único h1 com o nome", async () => {
    await renderHome("pt");
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Leonardo Alves Prates");
  });

  it("cada seção é uma região nomeada pelo seu título", async () => {
    await renderHome("pt");
    for (const name of ["Sobre", "Projetos", "Habilidades", "Experiência e formação", "Contato"]) {
      expect(screen.getByRole("region", { name })).toBeInTheDocument();
    }
  });

  it("botões do hero apontam para projetos, currículo e contato", async () => {
    await renderHome("pt");
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

  it("links externos avisam que abrem em nova aba", async () => {
    await renderHome("pt");
    const linkedin = screen.getByRole("link", { name: /LinkedIn/ });
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedin).toHaveAccessibleName("LinkedIn in/leonardo-prates77 (abre em nova aba)");
  });
});

describe("Home (en)", () => {
  it("traduz seções, dados dos projetos e linha do tempo", async () => {
    await renderHome("en");
    for (const name of ["About", "Projects", "Skills", "Experience & education", "Contact"]) {
      expect(screen.getByRole("region", { name })).toBeInTheDocument();
    }
    // Os três projetos (Service Orders SaaS, RH Manager e HelpDesk API) mostram "endpoints REST" traduzido
    expect(screen.getAllByText("REST endpoints")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "Technical Support" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /RH Manager dashboard/ })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /HelpDesk API Swagger/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send message" })).toBeInTheDocument();
    // Nenhum texto em português escapou para a versão em inglês.
    expect(screen.queryByText(/Ver projetos|Habilidades|Enviar mensagem/)).toBeNull();
  });
});
