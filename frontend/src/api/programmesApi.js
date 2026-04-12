import { apiUrl, fetchDefaults, jsonHeaders } from './workplaceApi';

async function parseJson(res) {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

/** Public catalogue — no auth required. */
export async function fetchProgrammes() {
  const res = await fetch(apiUrl('/api/programmes'));
  const data = await parseJson(res);
  if (!res.ok) throw new Error(data.error || 'Could not load programmes');
  return Array.isArray(data) ? data : [];
}

export async function fetchProgramme(id) {
  const res = await fetch(apiUrl(`/api/programmes/${id}`));
  const data = await parseJson(res);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(data.error || 'Could not load programme');
  return data;
}

/** Public — load one programme by URL slug (public page: /fellowship/:slug; form: /fellowship/:slug/forms) */
export async function fetchProgrammeBySlug(slug) {
  const enc = encodeURIComponent(String(slug || '').trim());
  const res = await fetch(apiUrl(`/api/programmes/slug/${enc}`));
  const data = await parseJson(res);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(data.error || 'Could not load programme');
  return data;
}

/** Public — submit dynamic application form */
export async function submitProgrammeForm(slug, answers) {
  const enc = encodeURIComponent(String(slug || '').trim());
  const res = await fetch(apiUrl(`/api/programmes/slug/${enc}/submit`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ answers }),
  });
  const data = await parseJson(res);
  if (!res.ok) throw new Error(data.error || 'Could not submit');
  return data;
}

export async function createProgramme(body) {
  const res = await fetch(apiUrl('/api/programmes'), {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
    ...fetchDefaults(),
  });
  const data = await parseJson(res);
  if (!res.ok) throw new Error(data.error || 'Could not create');
  return data;
}

export async function updateProgramme(id, body) {
  const res = await fetch(apiUrl(`/api/programmes/${id}`), {
    method: 'PUT',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
    ...fetchDefaults(),
  });
  const data = await parseJson(res);
  if (!res.ok) throw new Error(data.error || 'Could not update');
  return data;
}

export async function deleteProgramme(id) {
  const res = await fetch(apiUrl(`/api/programmes/${id}`), {
    method: 'DELETE',
    ...fetchDefaults(),
  });
  if (res.status === 401 || res.status === 403) {
    throw new Error('Unauthorized');
  }
  if (res.status === 404) throw new Error('Not found');
  if (!res.ok) {
    const data = await parseJson(res);
    throw new Error(data.error || 'Could not delete');
  }
}

/** Admin — responses to the programme application form */
export async function fetchProgrammeSubmissions(programmeId) {
  const res = await fetch(apiUrl(`/api/programmes/${programmeId}/submissions`), {
    ...fetchDefaults(),
  });
  const data = await parseJson(res);
  if (res.status === 401 || res.status === 403) throw new Error('Unauthorized');
  if (!res.ok) throw new Error(data.error || 'Could not load submissions');
  return Array.isArray(data) ? data : [];
}
