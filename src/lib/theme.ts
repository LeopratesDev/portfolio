export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/**
 * Roda no <head>, antes da primeira pintura. Só aplica `data-theme` se o
 * usuário já escolheu um tema; sem escolha, o CSS segue `prefers-color-scheme`.
 * O try/catch cobre navegadores com localStorage bloqueado.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

/** Tema efetivo: o escolhido pelo usuário ou, se não houver, o do sistema. */
export function getEffectiveTheme(): Theme {
  const chosen = document.documentElement.getAttribute("data-theme");
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Sem localStorage o tema ainda muda; só não fica salvo.
  }
}
