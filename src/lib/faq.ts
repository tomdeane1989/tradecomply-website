export interface FaqPair {
  question: string;
  answer: string;
}

// Matches the FAQ section wrapper, e.g. "## Frequently Asked Questions",
// "## FAQs", "## Common questions about CHAS".
const FAQ_HEADING =
  /^(#{1,2})\s+.*\b(frequently asked questions|common questions|faqs?)\b/i;

/**
 * Extracts question/answer pairs from a guide's raw markdown body, scoped to
 * the FAQ section so that rhetorical headings elsewhere are never mistaken for
 * FAQ entries. Returns [] when no FAQ section is present. Drives FAQPage JSON-LD.
 */
export function extractFaq(markdown: string): FaqPair[] {
  const lines = markdown.split("\n");

  const start = lines.findIndex((l) => FAQ_HEADING.test(l.trim()));
  if (start === -1) return [];

  const sectionLevel = lines[start].trim().match(/^#+/)?.[0].length ?? 2;

  const pairs: FaqPair[] = [];
  let question: string | null = null;
  let answerBuf: string[] = [];

  const flush = () => {
    if (question) {
      const answer = clean(answerBuf.join(" "));
      const q = clean(question);
      if (q && answer) pairs.push({ question: q, answer });
    }
    question = null;
    answerBuf = [];
  };

  for (let i = start + 1; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (trimmed === "---" || trimmed === "***") {
      flush();
      break;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      if (level <= sectionLevel) {
        flush();
        break; // left the FAQ section
      }
      if (level === sectionLevel + 1) {
        flush();
        question = heading[2].trim();
        continue;
      }
    }

    if (question) answerBuf.push(trimmed);
  }
  flush();

  return pairs.filter((p) => p.question.length > 0 && p.answer.length > 0);
}

function clean(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // markdown links -> link text
    .replace(/<[^>]+>/g, "") // strip inline MDX/HTML tags
    .replace(/[*_`]/g, "") // emphasis / inline code markers
    .replace(/\s+/g, " ")
    .trim();
}
