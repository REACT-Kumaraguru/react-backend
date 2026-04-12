import { legacyThemeFromAccent, normalizeAccentHex } from './programmeAccentColor';
import { normalizeFormFieldType } from './programmeFormFieldTypes';

function newFieldId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return `fld_${crypto.randomUUID().slice(0, 12)}`;
  return `fld_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function emptyFormField() {
  return {
    id: newFieldId(),
    name: '',
    type: 'text',
    required: false,
    numberAllowDecimals: false,
    fileAccept: '',
    options: [''],
  };
}

export function emptyProgrammeForm() {
  return {
    category: '',
    accentColor: '#f97316',
    sort_order: 0,
    slug: '',
    title: '',
    tagline: '',
    shortDescription: '',
    longDescription: '',
    info: [
      { label: 'Duration', value: '2 Years' },
      { label: 'Credits', value: '40 Credits' },
      { label: 'Cohort', value: '24 Fellows' },
      { label: 'Next Intake', value: 'June 2026' },
    ],
    features: [''],
    eligibility: '',
    buttonText: 'Learn more',
    buttonLink: '',
    formFields: [],
  };
}

export function programmeToForm(p) {
  if (!p) return emptyProgrammeForm();
  const info = Array.isArray(p.info) && p.info.length ? p.info.map((x) => ({ label: x.label || '', value: x.value || '' })) : [{ label: '', value: '' }];
  const features = Array.isArray(p.features) && p.features.length ? [...p.features] : [''];
  const rawFields = Array.isArray(p.formFields) ? p.formFields : [];
  const formFields =
    rawFields.length > 0
      ? rawFields.map((x) => {
          const type = normalizeFormFieldType(x.type);
          const rawOpts = Array.isArray(x.options) ? x.options : [];
          const options =
            type === 'dropdown'
              ? rawOpts.length
                ? rawOpts.map((o) => String(o ?? '').trim())
                : ['']
              : [];
          return {
            id: x.id || newFieldId(),
            name: x.name || '',
            type,
            required: !!x.required,
            numberAllowDecimals: !!x.numberAllowDecimals,
            fileAccept: String(x.fileAccept || '').trim().slice(0, 200),
            options,
          };
        })
      : [];
  const accent =
    normalizeAccentHex(p.accentColor) ||
    (p.theme === 'purple' ? '#a855f7' : '#f97316');
  return {
    category: p.category || '',
    accentColor: accent,
    sort_order: p.sort_order ?? 0,
    slug: p.slug || '',
    title: p.title || '',
    tagline: p.tagline || '',
    shortDescription: p.shortDescription || '',
    longDescription: p.longDescription || '',
    info,
    features,
    eligibility: p.eligibility || '',
    buttonText: p.buttonText || 'Learn more',
    buttonLink: p.buttonLink || '',
    formFields,
  };
}

/** Same shape as API programme rows — for save requests and admin live preview. */
export function programmeFormToPayload(form) {
  const info = (form.info || [])
    .map((x) => ({ label: String(x.label || '').trim(), value: String(x.value || '').trim() }))
    .filter((x) => x.label && x.value);
  const features = (form.features || []).map((s) => String(s).trim()).filter(Boolean);
  const formFields = (form.formFields || [])
    .map((x) => {
      const type = normalizeFormFieldType(x.type);
      const opts = (Array.isArray(x.options) ? x.options : [])
        .map((o) => String(o ?? '').trim())
        .filter((o, j, arr) => o && arr.findIndex((t) => t.toLowerCase() === o.toLowerCase()) === j)
        .slice(0, 50);
      return {
        id: String(x.id || '').trim(),
        name: String(x.name || '').trim(),
        type,
        required: !!x.required,
        numberAllowDecimals: type === 'number' ? !!x.numberAllowDecimals : false,
        fileAccept: type === 'file' ? String(x.fileAccept || '').trim().slice(0, 200) : '',
        options: type === 'dropdown' ? opts : [],
      };
    })
    .filter((x) => x.name);
  const accent = normalizeAccentHex(form.accentColor) || '#f97316';
  return {
    category: String(form.category || '').trim(),
    accentColor: accent,
    theme: legacyThemeFromAccent(accent),
    sort_order: Number.isFinite(Number(form.sort_order)) ? parseInt(form.sort_order, 10) : 0,
    slug: String(form.slug || '').trim(),
    title: String(form.title || '').trim(),
    tagline: String(form.tagline || '').trim(),
    shortDescription: String(form.shortDescription || '').trim(),
    longDescription: String(form.longDescription || '').trim(),
    info,
    features,
    eligibility: String(form.eligibility || '').trim(),
    buttonText: String(form.buttonText || '').trim() || 'Learn more',
    buttonLink: String(form.buttonLink || '').trim(),
    formFields,
  };
}
