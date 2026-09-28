import { ThemeToggle } from "./ThemeToggle";

export type NavItem = { href: `#${string}`; label: string };

type Props = {
  nav: NavItem[];
  navLabel: string;
  themeLabel: string;
};

/** Server Component: só HTML. A única ilha interativa é o ThemeToggle. */
export function Header({ nav, navLabel, themeLabel }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 px-4 sm:flex-nowrap sm:px-6">
        <a href="#inicio" className="py-3 font-mono text-lg font-bold text-fg">
          LP<span className="text-accent">.</span>
        </a>
        <div className="ml-auto sm:order-last sm:ml-0">
          <ThemeToggle label={themeLabel} />
        </div>
        {/* No mobile a navegação desce para uma segunda linha rolável: sem menu hambúrguer, sem JS. */}
        <nav
          aria-label={navLabel}
          className="-mx-4 w-full overflow-x-auto sm:mx-0 sm:ml-auto sm:w-auto"
        >
          <ul className="flex gap-1 px-2 pb-2 sm:p-0">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm whitespace-nowrap text-muted hover:bg-surface hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
