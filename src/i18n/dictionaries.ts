import type { Locale } from "./config";
import en from "./en.json";
import pt from "./pt.json";

/** O dicionário PT é a referência de formato; o EN precisa ter o mesmo formato. */
export type Dictionary = typeof pt;

// A anotação de tipo faz o TypeScript acusar chave faltando no EN.
const dictionaries: Record<Locale, Dictionary> = { pt, en };

/**
 * Só é chamado em Server Components: os dois JSON ficam no servidor e
 * apenas o HTML já traduzido vai para o navegador.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
