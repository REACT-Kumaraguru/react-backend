/** Validate / normalize #rgb or #rrggbb for programme card accent */
export function normalizeAccentHex(hex) {
  const s = String(hex || '').trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(s)) return s.toLowerCase();
  if (/^#[0-9A-Fa-f]{3}$/.test(s)) {
    const r = s[1],
      g = s[2],
      b = s[3];
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return '';
}

/** Legacy DB `theme` column — derive from accent for API compatibility */
export function legacyThemeFromAccent(hex) {
  const c = normalizeAccentHex(hex) || '#f97316';
  const r = parseInt(c.slice(1, 3), 16);
  const g = parseInt(c.slice(3, 5), 16);
  const b = parseInt(c.slice(5, 7), 16);
  return b >= r && b > g ? 'purple' : 'orange';
}
