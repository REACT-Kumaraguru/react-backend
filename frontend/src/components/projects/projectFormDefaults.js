export function emptyProjectForm() {
  return {
    sort_order: 0,
    title: '',
    tagline: '',
    who: '',
    duration: '',
    format: '',
    description: '',
    brief: '',
    briefIdea: '',
    ctaLabel: 'Read the idea',
    postedDate: 'LATEST OUTCOME',
    imageUrl: '',
  };
}

export function projectToForm(p) {
  if (!p) return emptyProjectForm();
  return {
    sort_order: p.sort_order ?? 0,
    title: p.title || '',
    tagline: p.tagline || '',
    who: p.who || '',
    duration: p.duration || '',
    format: p.format || '',
    description: p.description || '',
    brief: p.brief || '',
    briefIdea: p.briefIdea || '',
    ctaLabel: p.ctaLabel || 'Read the idea',
    postedDate: p.postedDate || 'LATEST OUTCOME',
    imageUrl: p.imageUrl || '',
  };
}

/** Body for POST/PUT — matches backend `buildProjectCardData` + sort_order. */
export function projectFormToPayload(form) {
  return {
    sort_order: Number.isFinite(Number(form.sort_order)) ? parseInt(String(form.sort_order), 10) : 0,
    title: String(form.title || '').trim(),
    tagline: String(form.tagline || '').trim(),
    who: String(form.who || '').trim(),
    duration: String(form.duration || '').trim(),
    format: String(form.format || '').trim(),
    description: String(form.description || '').trim(),
    brief: String(form.brief || '').trim(),
    briefIdea: String(form.briefIdea || '').trim(),
    ctaLabel: String(form.ctaLabel || '').trim() || 'Read the idea',
    postedDate: String(form.postedDate || '').trim() || 'LATEST OUTCOME',
    imageUrl: String(form.imageUrl || '').trim(),
  };
}
