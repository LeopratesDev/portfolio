import { describe, expect, it } from "vitest";
import { pickLocale } from "./config";

describe("pickLocale", () => {
  it.each([
    [null, "pt"],
    ["", "pt"],
    ["pt-BR,pt;q=0.9,en;q=0.8", "pt"],
    ["en-US,en;q=0.9", "en"],
    ["en-GB", "en"],
    ["fr-FR,fr;q=0.9,en;q=0.5", "en"],
    ["fr-FR,de;q=0.9", "pt"],
    ["en;q=0.5,pt;q=0.8", "pt"],
    ["en;q=0,pt;q=0.1", "pt"],
  ])("%j → %s", (header, expected) => {
    expect(pickLocale(header)).toBe(expected);
  });
});
