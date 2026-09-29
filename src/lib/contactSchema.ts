import { z } from "zod";

/**
 * Mesmo schema no cliente (retorno rápido para o usuário) e no servidor
 * (a validação que vale: o cliente pode ser burlado com um curl).
 *
 * As mensagens são CÓDIGOS, não frases: o formulário traduz cada código
 * com o dicionário do idioma atual (PT/EN).
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "name.min").max(100, "name.max"),
  email: z.string().trim().max(200, "email.invalid").pipe(z.email("email.invalid")),
  message: z.string().trim().min(10, "message.min").max(2000, "message.max"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactErrorCode =
  "name.min" | "name.max" | "email.invalid" | "message.min" | "message.max";

/** Campo "armadilha": invisível para pessoas, bots preenchem. */
export const HONEYPOT_FIELD = "website";

/** Primeiro código de erro de cada campo, no formato que a UI e a API usam. */
export function fieldErrors(error: z.ZodError): Partial<Record<ContactField, ContactErrorCode>> {
  const result: Partial<Record<ContactField, ContactErrorCode>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as ContactField;
    if (!result[field]) result[field] = issue.message as ContactErrorCode;
  }
  return result;
}
