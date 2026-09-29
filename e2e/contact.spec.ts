import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("formulário de contato", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pt#contato");
  });

  test("envio vazio mostra os erros, marca os campos e foca o primeiro", async ({ page }) => {
    await page.getByRole("button", { name: "Enviar mensagem" }).click();

    const name = page.getByLabel("Nome");
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(name).toBeFocused();
    await expect(name).toHaveAccessibleDescription("Informe seu nome (mínimo de 2 caracteres).");
    await expect(page.getByLabel("E-mail")).toHaveAccessibleDescription(
      "Informe um e-mail válido, como nome@exemplo.com.",
    );
    await expect(page.getByLabel("Mensagem")).toHaveAccessibleDescription(
      "Escreva uma mensagem com pelo menos 10 caracteres.",
    );
    await expect(page.getByRole("status")).toHaveText(
      "Corrija os campos destacados e tente de novo.",
    );

    // O estado de erro também precisa passar no axe (contraste das mensagens etc.).
    const results = await new AxeBuilder({ page }).include("#contato").analyze();
    expect(results.violations).toEqual([]);
  });

  test("envio válido chama a API e anuncia sucesso", async ({ page }) => {
    // Intercepta a rota: a CI não pode mandar e-mail de verdade.
    let body: unknown;
    await page.route("**/api/contact", async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({ status: 200, json: { ok: true } });
    });

    await page.getByLabel("Nome").fill("Ana Recrutadora");
    await page.getByLabel("E-mail").fill("ana@exemplo.com");
    await page.getByLabel("Mensagem").fill("Olá! Gostei do seu portfólio.");
    await page.getByRole("button", { name: "Enviar mensagem" }).click();

    await expect(page.getByRole("status")).toHaveText("Mensagem enviada! Respondo em breve.");
    await expect(page.getByLabel("Nome")).toHaveValue("");
    expect(body).toEqual({
      name: "Ana Recrutadora",
      email: "ana@exemplo.com",
      message: "Olá! Gostei do seu portfólio.",
      website: "",
    });
  });

  test("servidor valida mesmo sem passar pelo formulário", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: { name: "A", email: "x", message: "" },
      headers: { "x-forwarded-for": "203.0.113.10" },
    });
    expect(response.status()).toBe(400);
    expect(await response.json()).toMatchObject({ error: "validation" });
  });
});
