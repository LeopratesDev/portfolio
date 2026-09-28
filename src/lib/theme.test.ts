import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { applyTheme, getEffectiveTheme, themeInitScript, THEME_STORAGE_KEY } from "./theme";

function mockSystemDark(dark: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: dark, media: query }));
}

describe("theme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });
  afterEach(() => vi.unstubAllGlobals());

  it("segue o sistema quando não há escolha salva", () => {
    mockSystemDark(true);
    expect(getEffectiveTheme()).toBe("dark");
    mockSystemDark(false);
    expect(getEffectiveTheme()).toBe("light");
  });

  it("a escolha do usuário vence o sistema e fica salva", () => {
    mockSystemDark(true);
    applyTheme("light");
    expect(getEffectiveTheme()).toBe("light");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });

  it("script inicial aplica o tema salvo e ignora valores inválidos", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    new Function(themeInitScript)();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem(THEME_STORAGE_KEY, "qualquer-coisa");
    new Function(themeInitScript)();
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });
});
