import { apiUrl, jsonHeaders, fetchDefaults } from './workplaceApi';

export async function createRiskmSubmission(payload) {
  const res = await fetch(apiUrl('/api/riskm/submissions'), {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ payload }),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not submit');
  return data;
}

export async function fetchRiskmSubmissions() {
  const res = await fetch(apiUrl('/api/riskm/submissions'), {
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    const err = new Error('UNAUTHORIZED');
    err.code = 401;
    throw err;
  }
  if (!res.ok) throw new Error(data.error || 'Could not load');
  return Array.isArray(data) ? data : [];
}

export async function fetchRiskmSubmission(id) {
  const res = await fetch(apiUrl(`/api/riskm/submissions/${id}`), {
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 || res.status === 403) {
    const err = new Error(data.error || 'Forbidden');
    err.code = res.status;
    throw err;
  }
  if (!res.ok) throw new Error(data.error || 'Could not load');
  return data;
}

export async function approveRiskmSubmission(id) {
  const res = await fetch(apiUrl(`/api/riskm/submissions/${id}/approve`), {
    method: 'PATCH',
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not approve');
  return data;
}

export async function rejectRiskmSubmission(id) {
  const res = await fetch(apiUrl(`/api/riskm/submissions/${id}/reject`), {
    method: 'PATCH',
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not reject');
  return data;
}
