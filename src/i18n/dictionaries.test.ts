import { describe, expect, it } from "vitest";
import en from "./en.json";
import pt from "./pt.json";

/** Lista todas as chaves aninhadas: { a: { b: 1 } } → ["a.b"]. Arrays contam o tamanho. */
function keys(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) return [`${prefix}[${value.length}]`];
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

describe("dicionários", () => {
  it("EN tem exatamente as mesmas chaves que PT (nem falta, nem sobra)", () => {
    expect(keys(en).sort()).toEqual(keys(pt).sort());
  });

  it("nenhum texto vazio", () => {
    const strings = (v: unknown): string[] =>
      typeof v === "string"
        ? [v]
        : v && typeof v === "object"
          ? Object.values(v).flatMap(strings)
          : [];
    expect(strings(pt).filter((s) => s.trim() === "")).toEqual([]);
    expect(strings(en).filter((s) => s.trim() === "")).toEqual([]);
  });
});
