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
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        {/* Traço verde curto antes do título: marca de seção, sem texto extra. */}
        <span aria-hidden="true" className="block h-1 w-12 rounded-full bg-accent" />
        <h2
          id={headingId}
          className="mt-4 font-display text-4xl font-bold tracking-tight uppercase sm:text-5xl"
        >
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
