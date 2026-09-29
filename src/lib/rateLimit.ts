/**
 * Rate limit em memória, janela fixa por chave (IP).
 *
 * Trade-off: na Vercel cada instância serverless tem a própria memória, então
 * o limite vale por instância e zera num cold start. Para o tráfego de um
 * portfólio é suficiente; a evolução seria um store compartilhado (ex.: Redis).
 */
export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

export function createRateLimiter({
  limit,
  windowMs,
  now = () => Date.now(),
}: {
  limit: number;
  windowMs: number;
  now?: () => number;
}) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return {
    check(key: string): RateLimitResult {
      const t = now();
      const entry = hits.get(key);

      if (!entry || entry.resetAt <= t) {
        hits.set(key, { count: 1, resetAt: t + windowMs });
        // Limpeza simples para o Map não crescer sem limite.
        if (hits.size > 5000) {
          for (const [k, v] of hits) if (v.resetAt <= t) hits.delete(k);
        }
        return { allowed: true };
      }

      if (entry.count >= limit) {
        return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - t) / 1000) };
      }

      entry.count += 1;
      return { allowed: true };
    },
    reset() {
      hits.clear();
    },
  };
}

/** Limite do formulário de contato: 5 envios a cada 10 minutos por IP. */
export const contactRateLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
