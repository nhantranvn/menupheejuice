export function normalizeOcrText(input: string) {
  return input
    .replace(/\r/g, "")
    .replace(/[\t ]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

type ParsedMenuItem = {
  name: string;
  price: number;
  description: string | null;
};

function parsePrice(rawPrice: string) {
  const digits = rawPrice.replace(/[^0-9]/g, "");
  const parsed = Number(digits);

  if (!Number.isFinite(parsed) || parsed < 5000 || parsed > 1000000) {
    return null;
  }

  return parsed;
}

export function extractMenuItemsFromText(input: string): ParsedMenuItem[] {
  const lines = normalizeOcrText(input)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const items: ParsedMenuItem[] = [];
  const seen = new Set<string>();

  for (const line of lines) {
    const match = line.match(/^(.+?)\s[-:.|]*\s((?:\d{1,3}(?:[.,\s]\d{3})+|\d{4,6}))\s*(?:d|đ|vnd)?$/i);

    if (!match) {
      continue;
    }

    const name = match[1]
      .replace(/^[\-:|.\s]+|[\-:|.\s]+$/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
    const price = parsePrice(match[2]);

    if (!name || !price) {
      continue;
    }

    const key = `${name.toLowerCase()}-${price}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    items.push({
      name,
      price,
      description: null,
    });
  }

  return items;
}
