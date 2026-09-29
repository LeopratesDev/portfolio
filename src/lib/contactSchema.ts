import * as z from "zod/mini";
import type { $ZodError } from "zod/v4/core";

/**
 * Mesmo schema no cliente (retorno rápido para o usuário) e no servidor
 * (a validação que vale: o cliente pode ser burlado com um curl).
 *
 * `zod/mini`: mesma validação do Zod, mas com funções soltas que o bundler
 * consegue descartar. O Zod "clássico" colocava ~90 KB no JS do navegador
 * (medido no Lighthouse); o mini leva só o que o schema usa.
 *
 * As mensagens são CÓDIGOS, não frases: o formulário traduz cada código
 * com o dicionário do idioma atual (PT/EN).
 */
export const contactSchema = z.object({
  name: z.string().check(z.trim(), z.minLength(2, "name.min"), z.maxLength(100, "name.max")),
  email: z.pipe(
    z.string().check(z.trim(), z.maxLength(200, "email.invalid")),
    z.email("email.invalid"),
  ),
  message: z
    .string()
    .check(z.trim(), z.minLength(10, "message.min"), z.maxLength(2000, "message.max")),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactErrorCode =
  "name.min" | "name.max" | "email.invalid" | "message.min" | "message.max";

/** Campo "armadilha": invisível para pessoas, bots preenchem. */
export const HONEYPOT_FIELD = "website";

/** Primeiro código de erro de cada campo, no formato que a UI e a API usam. */
export function fieldErrors(error: $ZodError): Partial<Record<ContactField, ContactErrorCode>> {
  const result: Partial<Record<ContactField, ContactErrorCode>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as ContactField;
    if (!result[field]) result[field] = issue.message as ContactErrorCode;
  }
  return result;
}
