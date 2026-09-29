import { beforeEach, describe, expect, it } from "vitest";
import { applyTheme, getEffectiveTheme, themeInitScript, THEME_STORAGE_KEY } from "./theme";

describe("theme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("sem escolha salva, o padrão é escuro", () => {
    expect(getEffectiveTheme()).toBe("dark");
  });

  it("a escolha do usuário fica aplicada e salva", () => {
    applyTheme("light");
    expect(getEffectiveTheme()).toBe("light");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });

  it("script inicial aplica o tema salvo e ignora valores inválidos", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    new Function(themeInitScript)();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem(THEME_STORAGE_KEY, "qualquer-coisa");
    new Function(themeInitScript)();
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });
});
