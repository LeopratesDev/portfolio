import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vitest/config";

/**
 * No Next, `import img from "./x.png"` devolve { src, width, height, blurDataURL }.
 * No Vite devolve só a URL. Este plugin imita o Next nos testes, lendo largura e
 * altura do cabeçalho do PNG (bytes 16–23).
 */
function nextStaticImage(): Plugin {
  return {
    name: "next-static-image",
    enforce: "pre",
    load(id) {
      if (!id.endsWith(".png")) return null;
      const header = readFileSync(id).subarray(16, 24);
      const width = header.readUInt32BE(0);
      const height = header.readUInt32BE(4);
      const src = "/" + id.split("/src/").pop();
      return `export default ${JSON.stringify({ src, width, height, blurDataURL: "data:image/png;base64,AA" })};`;
    },
  };
}

export default defineConfig({
  plugins: [nextStaticImage(), react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    passWithNoTests: true,
  },
});
