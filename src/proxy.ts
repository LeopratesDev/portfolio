import { NextResponse, type NextRequest } from "next/server";
import { pickLocale } from "@/i18n/config";

/**
 * Proxy (o antigo "middleware" do Next): roda só em "/" e redireciona para
 * /pt ou /en conforme o idioma do navegador. As páginas /pt e /en continuam
 * estáticas; só este redirecionamento acontece no servidor.
 */
export function proxy(request: NextRequest) {
  const locale = pickLocale(request.headers.get("accept-language"));
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = { matcher: "/" };
