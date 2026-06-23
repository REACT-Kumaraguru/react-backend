/** Tiny classname joiner (no extra deps). Falsy values are dropped. */
export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}
