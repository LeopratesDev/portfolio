import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Imagem de compartilhamento (LinkedIn, WhatsApp, X…) gerada no build, uma por idioma.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} | ${profile.stack.join(" · ")}`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "pt");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#0b0f19",
        color: "#e4e4e7",
      }}
    >
      <div style={{ fontSize: 36, color: "#a1a1aa", fontFamily: "monospace" }}>
        {t.hero.greeting}
      </div>
      <div style={{ fontSize: 88, fontWeight: 700, marginTop: 12 }}>{profile.name}</div>
      <div style={{ fontSize: 48, color: "#93c5fd", marginTop: 16 }}>{t.hero.role}</div>
      <div style={{ fontSize: 34, color: "#a1a1aa", marginTop: 40, fontFamily: "monospace" }}>
        {profile.stack.join("  ·  ")}
      </div>
    </div>,
    size,
  );
}
