import { describe, expect, it } from "vitest";
import { personJsonLd, serializeJsonLd } from "./jsonLd";

describe("personJsonLd", () => {
  it("descreve a pessoa com cargo no idioma da página e perfis", () => {
    const pt = personJsonLd("pt", "https://exemplo.dev");
    expect(pt).toMatchObject({
      "@type": "Person",
      name: "Leonardo Alves Prates",
      jobTitle: "Desenvolvedor Full Stack Júnior",
      url: "https://exemplo.dev/pt",
      sameAs: ["https://www.linkedin.com/in/leonardo-prates77/", "https://github.com/LeopratesDev"],
    });
    expect(personJsonLd("en", "https://exemplo.dev").jobTitle).toBe("Junior Full Stack Developer");
  });

  it("escapa < para ninguém conseguir fechar a tag <script>", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(JSON.parse(out).name).toBe("</script><script>alert(1)</script>");
  });
});
