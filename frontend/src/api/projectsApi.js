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

/** Public list — no auth. */
export async function fetchProjects() {
  const res = await fetch(apiUrl('/api/projects'));
  const data = await parseJson(res);
  if (!res.ok) throw new Error(data.error || 'Could not load projects');
  return Array.isArray(data) ? data : [];
}

export async function createProject(body) {
  const res = await fetch(apiUrl('/api/projects'), {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
    ...fetchDefaults(),
  });
  const data = await parseJson(res);
  if (!res.ok) throw new Error(data.error || 'Could not create');
  return data;
}

export async function updateProject(id, body) {
  const res = await fetch(apiUrl(`/api/projects/${id}`), {
    method: 'PUT',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
    ...fetchDefaults(),
  });
  const data = await parseJson(res);
  if (!res.ok) throw new Error(data.error || 'Could not update');
  return data;
}

export async function deleteProject(id) {
  const res = await fetch(apiUrl(`/api/projects/${id}`), {
    method: 'DELETE',
    ...fetchDefaults(),
  });
  if (res.status === 401 || res.status === 403) throw new Error('Unauthorized');
  if (res.status === 404) throw new Error('Not found');
  if (!res.ok) {
    const data = await parseJson(res);
    throw new Error(data.error || 'Could not delete');
  }
}
