import type { ContactInput } from "./contactSchema";

export class MailerNotConfiguredError extends Error {}
export class MailerSendError extends Error {}

/**
 * Envia a mensagem pela API HTTP do Resend (https://resend.com/docs/api-reference/emails/send-email).
 * `fetch` direto em vez do SDK: é uma única chamada, sem dependência extra e fácil de simular em teste.
 * A chave só existe no servidor (sem prefixo NEXT_PUBLIC_, nunca vai para o navegador).
 */
export async function sendContactEmail(input: ContactInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfólio <onboarding@resend.dev>";

  if (!apiKey || !to)
    throw new MailerNotConfiguredError("RESEND_API_KEY/CONTACT_TO_EMAIL ausentes");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      // Responder o e-mail vai direto para quem escreveu.
      reply_to: input.email,
      subject: `Contato pelo portfólio: ${input.name}`,
      // Só texto puro: nada do usuário é interpretado como HTML.
      text: `Nome: ${input.name}\nE-mail: ${input.email}\n\n${input.message}`,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new MailerSendError(`Resend respondeu ${response.status}`);
}
