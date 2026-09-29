import type { NextConfig } from "next";

/**
 * Headers de segurança aplicados a todas as respostas.
 *
 * CSP propositalmente enxuta: uma CSP com `script-src` estrito exigiria nonce
 * por requisição, o que tiraria as páginas do modo estático (SSG). Aqui a CSP
 * cobre o que não depende disso: ninguém pode embutir o site num iframe
 * (clickjacking), plugins ficam bloqueados e formulários só enviam para o
 * próprio domínio.
 */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Não anuncia "X-Powered-By: Next.js" (menos informação para quem ataca).
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
