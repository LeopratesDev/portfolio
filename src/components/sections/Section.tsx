type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
};

/**
 * Casca comum das seções: `aria-labelledby` liga a <section> ao seu <h2>,
 * então leitores de tela anunciam "região Sobre", "região Projetos" etc.
 */
export function Section({ id, title, children }: Props) {
  const headingId = `${id}-titulo`;
  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 id={headingId} className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
