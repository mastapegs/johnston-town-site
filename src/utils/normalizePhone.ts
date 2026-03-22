/**
 * Strips non-digit characters from a phone string, preserving a leading '+'.
 * Returns a value suitable for use in a `tel:` href.
 */
export function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
}
