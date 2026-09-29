/**
 * Trecho real do RH Manager (api/src/RhManager.Api/Controllers/VacationsController.cs),
 * copiado literalmente; a única linha removida é sinalizada no próprio código.
 * Destaque de sintaxe feito à mão, com spans: zero JavaScript e zero biblioteca.
 */
type Kind = "attr" | "keyword" | "type" | "string" | "plain" | "comment";
type Token = [Kind, string];

const lines = (omitted: string): Token[][] => [
  [
    ["plain", "["],
    ["attr", "HttpPost"],
    ["plain", "("],
    ["string", '"{id:int}/approve"'],
    ["plain", ")]"],
  ],
  [
    ["plain", "["],
    ["attr", "Authorize"],
    ["plain", "(Roles = "],
    ["keyword", "nameof"],
    ["plain", "("],
    ["type", "UserRole"],
    ["plain", ".Admin))]"],
  ],
  [
    ["plain", "["],
    ["attr", "ProducesResponseType"],
    ["plain", "("],
    ["type", "StatusCodes"],
    ["plain", ".Status204NoContent)]"],
  ],
  [["comment", omitted]],
  [
    ["plain", "["],
    ["attr", "ProducesResponseType"],
    ["plain", "<"],
    ["type", "ProblemDetails"],
    ["plain", ">("],
    ["type", "StatusCodes"],
    ["plain", ".Status409Conflict)]"],
  ],
  [
    ["keyword", "public async "],
    ["type", "Task"],
    ["plain", "<"],
    ["type", "IActionResult"],
    ["plain", "> Approve("],
    ["keyword", "int "],
    ["plain", "id, "],
    ["type", "CancellationToken "],
    ["plain", "cancellationToken)"],
  ],
  [["plain", "{"]],
  [
    ["plain", "    "],
    ["keyword", "await "],
    ["plain", "vacationService.ApproveAsync(id, cancellationToken);"],
  ],
  [
    ["plain", "    "],
    ["keyword", "return "],
    ["plain", "NoContent();"],
  ],
  [["plain", "}"]],
];

const color: Record<Kind, string> = {
  attr: "var(--code-attr)",
  keyword: "var(--code-keyword)",
  type: "var(--code-type)",
  string: "var(--code-string)",
  plain: "var(--code-fg)",
  comment: "var(--code-muted)",
};

type Props = {
  caption: string;
  repoLabel: string;
  omitted: string;
  repoUrl: string;
  newTabLabel: string;
};

export function CodeCard({ caption, repoLabel, omitted, repoUrl, newTabLabel }: Props) {
  return (
    <figure className="relative">
      {/* Um único brilho verde atrás do cartão: o "ponto de luz" do hero. */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(52,210,122,0.22),transparent)]"
      />
      <div className="overflow-hidden rounded-xl border border-border bg-[var(--code-bg)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-[#febc2e]" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-[var(--code-muted)]">
            VacationsController.cs
          </span>
        </div>
        <pre className="px-5 py-4 font-mono text-[12.5px] leading-6 [overflow-wrap:anywhere] whitespace-pre-wrap sm:text-[13px]">
          <code>
            {lines(omitted).map((tokens, i) => (
              <span key={i} className="block">
                {tokens.map(([kind, text], j) => (
                  <span key={j} style={{ color: color[kind] }}>
                    {text}
                  </span>
                ))}
              </span>
            ))}
          </code>
        </pre>
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between border-t border-white/10 px-5 py-3 font-mono text-xs text-[var(--code-muted)] hover:text-[var(--code-fg)]"
        >
          <span>{repoLabel}</span>
          <span aria-hidden="true">↗</span>
          <span className="sr-only">{newTabLabel}</span>
        </a>
      </div>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
