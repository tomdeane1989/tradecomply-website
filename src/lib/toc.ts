export interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Mirrors the id generation in rehype-slug so on-page anchors line up.
export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    items.push({ id, text, level });
  }

  return items;
}
