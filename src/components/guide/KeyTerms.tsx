/*
  "Key terms" box for pillar pages — defines the schemes/acronyms a cold reader
  meets across the hub, in one place. Reinforces the inline first-use expansions
  and doubles as a glossary. Pass the subset relevant to the hub.
*/

export interface Term {
  term: string;
  definition: string;
}

/** The canonical plain-English definitions, reused across pillars. */
export const TERMS: Record<string, Term> = {
  ssip: {
    term: "SSIP",
    definition:
      "Safety Schemes in Procurement — the umbrella body whose ~50 member schemes assess health & safety against the same core criteria, so one certificate is recognised across them.",
  },
  chas: {
    term: "CHAS",
    definition:
      "The Contractors Health and Safety Assessment Scheme (now Veriforce CHAS) — a long-established SSIP-approved assessment scheme.",
  },
  safecontractor: {
    term: "SafeContractor",
    definition: "An SSIP-approved health & safety assessment scheme run by Alcumus.",
  },
  constructionline: {
    term: "Constructionline",
    definition:
      "A procurement database that buyers (often public sector and tier-1 contractors) search to find pre-vetted suppliers; membership is tiered Bronze → Platinum.",
  },
  smas: {
    term: "SMAS Worksafe",
    definition:
      "Safety Management Advisory Services — an SSIP member scheme and a recognised Common Assessment Standard (desktop) assessment body.",
  },
  dts: {
    term: "Deem to Satisfy (DtS)",
    definition:
      "The agreement that lets a valid SSIP certificate from one member scheme be accepted by the others without re-assessment.",
  },
  cas: {
    term: "Common Assessment Standard",
    definition:
      "A single industry-agreed pre-qualification standard (administered by Build UK) that is broader than SSIP — it adds finance, environmental, CSR, information-security and building-safety questions.",
  },
  rams: {
    term: "RAMS",
    definition: "Risk assessments and method statements — how you do higher-risk work safely.",
  },
};

export function KeyTerms({ termKeys, heading = "Key terms" }: { termKeys: string[]; heading?: string }) {
  const terms = termKeys.map((k) => TERMS[k]).filter(Boolean);
  if (terms.length === 0) return null;

  return (
    <aside
      className="my-7 rounded-xl border p-5 not-prose"
      style={{ backgroundColor: "var(--color-plain-bg)", borderColor: "var(--color-plain-bd)" }}
    >
      <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wide text-[var(--color-primary-l)]">
        {heading}
      </h2>
      <dl className="space-y-2">
        {terms.map((t) => (
          <div key={t.term} className="text-sm leading-relaxed">
            <dt className="inline font-head font-semibold text-[var(--color-ink)]">{t.term}</dt>
            <dd className="inline text-[var(--color-ink-soft)]"> — {t.definition}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
