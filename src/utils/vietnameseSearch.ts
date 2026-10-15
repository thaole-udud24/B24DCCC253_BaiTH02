/**
 * Normalizes a Vietnamese string for accent-insensitive search.
 * Handles: diacritics, uppercase/lowercase, special char 'đ' -> 'd'.
 */
export function normalizeVietnamese(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove combining diacritical marks
    .replace(/đ/g, 'd')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchesSearch(text: string, query: string): boolean {
  if (!query.trim()) return true;
  const normalizedText = normalizeVietnamese(text);
  const normalizedQuery = normalizeVietnamese(query);
  return normalizedText.includes(normalizedQuery);
}
