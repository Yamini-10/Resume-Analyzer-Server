import { removeStopwords } from 'stopword';

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/node\.js/g, 'nodejs')
    .replace(/nest\.js/g, 'nestjs')
    .replace(/[^a-z0-9+#]/g, ' ');
}

export function extractTokens(text: string): Set<string> {
  return new Set(
    normalize(text)
      .split(/\s+/)
      .filter((t) => t.length > 2 && !/^\d+$/.test(t)),
  );
}

export function tokenize(text: string): string[] {
  return removeStopwords(normalize(text).split(/\s+/)).filter(
    (t) => t.length > 2,
  );
}

export function ngrams(tokens: string[], max = 3): string[] {
  const result = new Set<string>();

  for (let i = 0; i < tokens.length; i++) {
    for (let n = 1; n <= max; n++) {
      if (i + n <= tokens.length) {
        result.add(tokens.slice(i, i + n).join(' '));
      }
    }
  }

  return Array.from(result);
}
