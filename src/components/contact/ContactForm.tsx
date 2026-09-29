"use client";

import { useRef, useState } from "react";
import {
  contactSchema,
  fieldErrors,
  HONEYPOT_FIELD,
  type ContactErrorCode,
  type ContactField,
} from "@/lib/contactSchema";

export type ContactFormLabels = {
  name: string;
  email: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  fixErrors: string;
  errors: Record<ContactErrorCode, string>;
  server: Record<"rate_limited" | "not_configured" | "generic", string>;
};

type Status =
  { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };

const FIELDS: ContactField[] = ["name", "email", "message"];

/**
 * Client Component: precisa de estado (erros, "enviando") e de eventos.
 * É a maior ilha de JS da página; o resto continua Server Component.
 */
export function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const [errors, setErrors] = useState<Partial<Record<ContactField, ContactErrorCode>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  function focusFirstInvalid(invalid: Partial<Record<ContactField, unknown>>) {
    const first = FIELDS.find((f) => invalid[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // 1ª validação no cliente: retorno imediato, sem ida ao servidor.
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const invalid = fieldErrors(parsed.error);
      setErrors(invalid);
      setStatus({ kind: "error", message: labels.fixErrors });
      focusFirstInvalid(invalid);
      return;
    }

    setErrors({});
    setStatus({ kind: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, [HONEYPOT_FIELD]: data[HONEYPOT_FIELD] ?? "" }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
        fields?: Partial<Record<ContactField, ContactErrorCode>>;
      };

      if (response.ok) {
        form.reset();
        setStatus({ kind: "success" });
        return;
      }
      if (result.error === "validation" && result.fields) {
        setErrors(result.fields);
        setStatus({ kind: "error", message: labels.fixErrors });
        focusFirstInvalid(result.fields);
        return;
      }
      const key =
        result.error === "rate_limited" || result.error === "not_configured"
          ? result.error
          : "generic";
      setStatus({ kind: "error", message: labels.server[key] });
    } catch {
      setStatus({ kind: "error", message: labels.server.generic });
    }
  }

  const inputClass =
    "mt-1 block w-full rounded-md border border-border bg-bg px-3 py-2 text-fg aria-[invalid=true]:border-error";

  function fieldProps(field: ContactField) {
    const error = errors[field];
    return {
      id: `contact-${field}`,
      name: field,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `contact-${field}-error` : undefined,
      className: inputClass,
    } as const;
  }

  function fieldError(field: ContactField) {
    const error = errors[field];
    if (!error) return null;
    return (
      <p id={`contact-${field}-error`} className="mt-1 text-sm text-error">
        {labels.errors[error]}
      </p>
    );
  }

  return (
    // noValidate: usamos nossas mensagens (traduzidas e consistentes) em vez das do navegador.
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="max-w-xl space-y-5">
      <div>
        <label htmlFor="contact-name" className="font-medium">
          {labels.name}
        </label>
        <input type="text" autoComplete="name" {...fieldProps("name")} />
        {fieldError("name")}
      </div>

      <div>
        <label htmlFor="contact-email" className="font-medium">
          {labels.email}
        </label>
        <input type="email" autoComplete="email" inputMode="email" {...fieldProps("email")} />
        {fieldError("email")}
      </div>

      <div>
        <label htmlFor="contact-message" className="font-medium">
          {labels.message}
        </label>
        <textarea rows={5} {...fieldProps("message")} />
        {fieldError("message")}
      </div>

      {/* Honeypot: fora da tela, fora do Tab e escondido de leitores de tela. Bots preenchem. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`contact-${HONEYPOT_FIELD}`}>Website</label>
        <input
          id={`contact-${HONEYPOT_FIELD}`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2.5 font-medium text-accent-fg hover:opacity-90 disabled:opacity-60"
      >
        {status.kind === "sending" ? labels.sending : labels.submit}
      </button>

      {/* Região sempre presente: leitores de tela anunciam quando o texto muda. */}
      <p
        role="status"
        aria-live="polite"
        className={status.kind === "error" ? "text-error" : "text-success"}
      >
        {status.kind === "success" && labels.success}
        {status.kind === "error" && status.message}
      </p>
    </form>
  );
}
