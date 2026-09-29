import type { NextRequest } from "next/server";
import { contactSchema, fieldErrors, HONEYPOT_FIELD } from "@/lib/contactSchema";
import { MailerNotConfiguredError, sendContactEmail } from "@/lib/mailer";
import { contactRateLimiter } from "@/lib/rateLimit";

const MAX_BODY_BYTES = 10_000;

/** Na Vercel o IP real do cliente é o primeiro item de x-forwarded-for. */
function clientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/**
 * Respostas: 200 ok · 400 dados inválidos · 413 corpo grande · 429 excesso
 * de envios · 502 falha no provedor · 503 envio não configurado.
 */
export async function POST(request: NextRequest) {
  const limit = contactRateLimiter.check(clientIp(request));
  if (!limit.allowed) {
    return Response.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return Response.json({ error: "too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot preenchido = bot. Respondemos "ok" para ele não aprender a desviar.
  if (
    typeof body === "object" &&
    body !== null &&
    (body as Record<string, unknown>)[HONEYPOT_FIELD]
  ) {
    return Response.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "validation", fields: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail(parsed.data);
  } catch (error) {
    if (error instanceof MailerNotConfiguredError) {
      return Response.json({ error: "not_configured" }, { status: 503 });
    }
    console.error("contact: falha ao enviar e-mail", error);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
