import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  afterEach(() => {
    document.documentElement.removeAttribute("data-theme");
    localStorage.clear();
  });

  it("tem nome acessível e alterna do escuro (padrão) para o claro e de volta", async () => {
    render(<ThemeToggle label="Alternar tema" />);
    const button = screen.getByRole("button", { name: "Alternar tema" });

    await userEvent.click(button);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    await userEvent.click(button);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
