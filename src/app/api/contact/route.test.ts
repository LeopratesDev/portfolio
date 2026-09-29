// @vitest-environment node
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { contactRateLimiter } from "@/lib/rateLimit";
import { POST } from "./route";

const valid = { name: "Ana", email: "ana@exemplo.com", message: "Olá, vi seu portfólio." };

function post(body: unknown, ip = "1.1.1.1") {
  return POST(
    new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": `${ip}, 10.0.0.1` },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

describe("POST /api/contact", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    contactRateLimiter.reset();
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "dono@exemplo.com");
    fetchMock.mockReset().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("envia o e-mail e responde 200", async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer re_test");
    const payload = JSON.parse(init.body as string);
    expect(payload).toMatchObject({ to: ["dono@exemplo.com"], reply_to: "ana@exemplo.com" });
    expect(payload).not.toHaveProperty("html");
  });

  it("valida no servidor mesmo que o cliente seja burlado: 400 com códigos por campo", async () => {
    const res = await post({ name: "A", email: "x", message: "" });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "validation",
      fields: { name: "name.min", email: "email.invalid", message: "message.min" },
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("JSON inválido: 400", async () => {
    const res = await post("{nao é json");
    expect(res.status).toBe(400);
  });

  it("corpo grande demais: 413", async () => {
    const res = await post({ ...valid, message: "x".repeat(20_000) });
    expect(res.status).toBe(413);
  });

  it("honeypot preenchido: finge sucesso e não envia nada", async () => {
    const res = await post({ ...valid, website: "http://spam" });
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rate limit: 6º envio do mesmo IP em 10 min recebe 429 com Retry-After", async () => {
    for (let i = 0; i < 5; i++) expect((await post(valid)).status).toBe(200);
    const blocked = await post(valid);
    expect(blocked.status).toBe(429);
    expect(Number(blocked.headers.get("Retry-After"))).toBeGreaterThan(0);

    // Outro IP não é afetado.
    expect((await post(valid, "2.2.2.2")).status).toBe(200);
  });

  it("sem chave configurada: 503", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect((await post(valid)).status).toBe(503);
  });

  it("provedor falhou: 502", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockResolvedValue(new Response("{}", { status: 500 }));
    expect((await post(valid)).status).toBe(502);
  });
});
