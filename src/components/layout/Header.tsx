import { profile } from "@/data/profile";
import { SocialIcon } from "./SocialIcon";
import { ThemeToggle } from "./ThemeToggle";

export type NavItem = { href: `#${string}`; label: string };

type Props = {
  nav: NavItem[];
  navLabel: string;
  themeLabel: string;
  contactLabel: string;
  socialLabel: string;
  newTabLabel: string;
};

/** Server Component: só HTML. A única ilha interativa é o ThemeToggle. */
export function Header({
  nav,
  navLabel,
  themeLabel,
  contactLabel,
  socialLabel,
  newTabLabel,
}: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      {/* Faixa de contato: só no desktop; no celular os mesmos links estão na seção Contato. */}
      <div className="hidden border-b border-border md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 py-2 text-muted hover:text-fg"
          >
            <SocialIcon name="email" />
            {profile.email}
          </a>
          <div className="flex items-stretch">
            <ul aria-label={socialLabel} className="flex items-center gap-1 pr-4">
              {(["linkedin", "github"] as const).map((network) => (
                <li key={network}>
                  <a
                    href={profile[network]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-fg"
                  >
                    <SocialIcon name={network} />
                    <span className="sr-only">{`${network === "linkedin" ? "LinkedIn" : "GitHub"} ${newTabLabel}`}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contato"
              className="flex items-center bg-accent px-5 font-display text-sm font-medium tracking-wider text-accent-fg uppercase hover:brightness-110"
            >
              {contactLabel}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 px-4 sm:flex-nowrap sm:px-6">
        <a href="#inicio" className="py-4 font-display text-2xl font-bold tracking-wide text-fg">
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
                  className="block border-b-2 border-transparent px-3 py-2 font-display text-sm font-medium tracking-[0.12em] whitespace-nowrap text-muted uppercase hover:border-accent hover:text-fg"
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
