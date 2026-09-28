import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.removeAttribute("data-theme");
    localStorage.clear();
  });

  it("tem nome acessível e alterna entre claro e escuro", async () => {
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    render(<ThemeToggle label="Alternar tema" />);
    const button = screen.getByRole("button", { name: "Alternar tema" });

    await userEvent.click(button);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    await userEvent.click(button);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
