import { describe, expect, it } from "vitest";
import { contactSchema, fieldErrors } from "./contactSchema";

const valid = { name: "Ana", email: "ana@exemplo.com", message: "Olá, vi seu portfólio." };

describe("contactSchema", () => {
  it("aceita dados válidos e remove espaços nas pontas", () => {
    const result = contactSchema.parse({ ...valid, name: "  Ana  " });
    expect(result.name).toBe("Ana");
  });

  it.each([
    [{ name: "A" }, "name", "name.min"],
    [{ name: "x".repeat(101) }, "name", "name.max"],
    [{ email: "ana@" }, "email", "email.invalid"],
    [{ message: "curta" }, "message", "message.min"],
    [{ message: "x".repeat(2001) }, "message", "message.max"],
    [{ message: "          " }, "message", "message.min"],
  ])("rejeita %j com o código certo", (override, field, code) => {
    const result = contactSchema.safeParse({ ...valid, ...override });
    expect(result.success).toBe(false);
    if (!result.success) expect(fieldErrors(result.error)).toEqual({ [field]: code });
  });

  it("descarta campos desconhecidos", () => {
    const result = contactSchema.parse({ ...valid, admin: true });
    expect(result).not.toHaveProperty("admin");
  });
});
