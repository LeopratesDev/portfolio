import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("página inicial", () => {
  test("/ redireciona pelo idioma do navegador e a página carrega", async ({ browser }) => {
    for (const [locale, path, h2] of [
      ["pt-BR", "/pt", "Sobre"],
      ["en-US", "/en", "About"],
    ] as const) {
      const context = await browser.newContext({ locale });
      const page = await context.newPage();
      await page.goto("/");

      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        locale === "pt-BR" ? "pt-BR" : "en",
      );
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Leonardo Alves Prates");
      await expect(page.getByRole("heading", { level: 2, name: h2 })).toBeVisible();
      await context.close();
    }
  });

  test("âncoras do menu levam a cada seção", async ({ page }) => {
    await page.goto("/pt");
    const nav = page.getByRole("navigation", { name: "Navegação principal" });

    for (const [link, id, heading] of [
      ["Sobre", "sobre", "Sobre"],
      ["Projetos", "projetos", "Projetos"],
      ["Habilidades", "habilidades", "Habilidades"],
      ["Experiência", "experiencia", "Experiência e formação"],
      ["Contato", "contato", "Contato"],
    ] as const) {
      await nav.getByRole("link", { name: link }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      // O título precisa aparecer inteiro ABAIXO do header fixo. `toBeInViewport()`
      // sozinho não bastava: aceitava o título escondido atrás do header.
      const title = page.getByRole("heading", { level: 2, name: heading });
      await expect(title).toBeInViewport();
      await expect
        .poll(async () => {
          const header = await page.locator("header").boundingBox();
          const box = await title.boundingBox();
          return header && box ? box.y - (header.y + header.height) : -1;
        })
        .toBeGreaterThanOrEqual(0);
    }
  });

  test("botão 'Ver projetos' e link 'Pular para o conteúdo'", async ({ page }) => {
    await page.goto("/pt");
    await page.getByRole("link", { name: "Ver projetos" }).click();
    await expect(page.getByRole("heading", { level: 2, name: "Projetos" })).toBeInViewport();

    await page.goto("/pt");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Pular para o conteúdo" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
  });

  // Os dois temas: um verde que passa no escuro pode falhar no claro (já aconteceu).
  for (const path of ["/pt", "/en"])
    for (const theme of ["dark", "light"]) {
      test(`sem violações de acessibilidade (axe, WCAG 2.2 AA) em ${path}, tema ${theme}`, async ({
        page,
      }) => {
        await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
        await page.goto(path);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(results.violations).toEqual([]);
      });
    }
});
