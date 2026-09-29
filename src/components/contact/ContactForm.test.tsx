import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import pt from "@/i18n/pt.json";
import { ContactForm } from "./ContactForm";

const labels = pt.contact.form;

async function fill(
  user: ReturnType<typeof userEvent.setup>,
  name: string,
  email: string,
  message: string,
) {
  if (name) await user.type(screen.getByLabelText("Nome"), name);
  if (email) await user.type(screen.getByLabelText("E-mail"), email);
  if (message) await user.type(screen.getByLabelText("Mensagem"), message);
}

describe("ContactForm", () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("mostra erros por campo, liga-os aos inputs e foca o primeiro inválido", async () => {
    const user = userEvent.setup();
    render(<ContactForm labels={labels} />);

    await fill(user, "", "ana@", "curta");
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    const name = screen.getByLabelText("Nome");
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription(labels.errors["name.min"]);
    expect(screen.getByLabelText("E-mail")).toHaveAccessibleDescription(
      labels.errors["email.invalid"],
    );
    expect(screen.getByLabelText("Mensagem")).toHaveAccessibleDescription(
      labels.errors["message.min"],
    );
    expect(name).toHaveFocus();

    // Resumo anunciado pela região aria-live.
    expect(screen.getByRole("status")).toHaveTextContent(labels.fixErrors);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("envia dados válidos (com honeypot vazio) e anuncia sucesso", async () => {
    fetchMock.mockResolvedValue(Response.json({ ok: true }));
    const user = userEvent.setup();
    render(<ContactForm labels={labels} />);

    await fill(user, "Ana", "ana@exemplo.com", "Olá, vi seu portfólio.");
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(labels.success));
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/contact");
    expect(JSON.parse(init.body as string)).toEqual({
      name: "Ana",
      email: "ana@exemplo.com",
      message: "Olá, vi seu portfólio.",
      website: "",
    });
    expect(screen.getByLabelText("Nome")).toHaveValue("");
  });

  it("mostra a mensagem certa quando o servidor limita os envios", async () => {
    fetchMock.mockResolvedValue(Response.json({ error: "rate_limited" }, { status: 429 }));
    const user = userEvent.setup();
    render(<ContactForm labels={labels} />);

    await fill(user, "Ana", "ana@exemplo.com", "Olá, vi seu portfólio.");
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(labels.server.rate_limited),
    );
  });

  it("honeypot não aparece para leitores de tela nem no Tab", () => {
    render(<ContactForm labels={labels} />);
    // Consultas por papel respeitam aria-hidden, como um leitor de tela.
    expect(screen.queryByRole("textbox", { name: "Website" })).toBeNull();
    expect(screen.getAllByRole("textbox")).toHaveLength(3);
    const honeypot = document.querySelector('input[name="website"]');
    expect(honeypot).toHaveAttribute("tabindex", "-1");
  });
});
