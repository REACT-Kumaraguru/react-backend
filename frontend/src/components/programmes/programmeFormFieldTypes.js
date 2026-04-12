/**
 * Canonical form field types for programme application forms.
 * Normalizes legacy/variant strings so email & paragraph never fall back to text by mistake.
 */
export function normalizeFormFieldType(t) {
  const s = String(t ?? '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '');
  if (['para', 'paragraph', 'multiline', 'textarea', 'longtext'].includes(s)) return 'para';
  if (['email', 'e-mail', 'mail'].includes(s)) return 'email';
  if (['number', 'numeric', 'integer', 'float', 'decimal'].includes(s)) return 'number';
  return 'text';
}

export const FORM_FIELD_TYPES = ['text', 'para', 'number', 'email'];
