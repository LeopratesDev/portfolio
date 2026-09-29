type Props = { name: string; children?: React.ReactNode };

export function Footer({ name, children }: Props) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {name}
        </p>
        {children}
      </div>
    </footer>
  );
}
