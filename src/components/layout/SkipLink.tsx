type Props = { label: string };

/** Primeiro elemento focável da página: leva o teclado direto ao <main>. */
export function SkipLink({ label }: Props) {
  return (
    <a
      href="#conteudo"
      className="sr-only rounded-md bg-accent px-4 py-2 font-medium text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      {label}
    </a>
  );
}
