const getBase = () => (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const fetchDefaults = () => ({
  credentials: 'include',
});

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${getBase()}${p}`;
}

export function jsonHeaders() {
  return { 'Content-Type': 'application/json' };
}

export async function getSession() {
  try {
    const res = await fetch(apiUrl('/api/auth/me'), {
      ...fetchDefaults(),
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) return null;
    if (!res.ok) return null;
    return data;
  } catch {
    return null;
  }
}
 
export async function updateProfile(body) {
  const res = await fetch(apiUrl('/api/auth/me'), {
    method: 'PATCH',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Could not update profile');
  }
  return data;
}

export async function updateProfilePic(formData) {
  const res = await fetch(apiUrl('/api/auth/me/profile-pic'), {
    method: 'POST',
    body: formData,
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Could not update profile picture');
  }
  return data;
}

/** Admin or approved user login (same endpoint). */
export async function login(email, password) {
  const res = await fetch(apiUrl('/api/auth/login'), {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ email, password }),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }
  return data;
}

export async function fetchTodayBirthdays() {
  const res = await fetch(apiUrl('/api/birthdays-today'), {
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) return { birthdays: [] };
  if (!res.ok) return { birthdays: [] };
  return data;
}

export async function changePassword(currentPassword, newPassword, confirmPassword) {
  const res = await fetch(apiUrl('/api/auth/change-password'), {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Could not change password');
  }
  return data;
}

export async function logoutAdmin() {
  const res = await fetch(apiUrl('/api/auth/logout'), {
    method: 'POST',
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Logout failed');
  }
  return data;
}

export async function fetchWorkplaceRoles() {
  const res = await fetch(apiUrl('/api/workplace-roles'));
  const data = await res.json().catch(() => []);
  if (!res.ok) throw new Error(data.error || 'Could not load roles');
  return Array.isArray(data) ? data : [];
}

export async function createWorkplaceRole(name) {
  const res = await fetch(apiUrl('/api/admin/workplace-roles'), {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ name }),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 || res.status === 403) {
    const err = new Error(data.error || 'Forbidden');
    err.code = res.status;
    throw err;
  }
  if (!res.ok) throw new Error(data.error || 'Could not add role');
  return data;
}

export async function deleteWorkplaceRole(id) {
  const res = await fetch(apiUrl(`/api/admin/workplace-roles/${id}`), {
    method: 'DELETE',
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 || res.status === 403) {
    const err = new Error(data.error || 'Forbidden');
    err.code = res.status;
    throw err;
  }
  if (!res.ok) throw new Error(data.error || 'Could not delete role');
  return data;
}

export async function fetchAdminAccounts() {
  const res = await fetch(apiUrl('/api/admin/accounts'), {
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 || res.status === 403) {
    const err = new Error(data.error || 'Forbidden');
    err.code = res.status;
    throw err;
  }
  if (!res.ok) throw new Error(data.error || 'Could not load admins');
  return Array.isArray(data) ? data : [];
}

export async function createAdminAccount(body) {
  const res = await fetch(apiUrl('/api/admin/accounts'), {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 || res.status === 403) {
    const err = new Error(data.error || 'Forbidden');
    err.code = res.status;
    throw err;
  }
  if (!res.ok) throw new Error(data.error || 'Could not create admin');
  return data;
}

export async function deleteAdminAccount(id) {
  const res = await fetch(apiUrl(`/api/admin/accounts/${id}`), {
    method: 'DELETE',
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 || res.status === 403) {
    const err = new Error(data.error || 'Forbidden');
    err.code = res.status;
    throw err;
  }
  if (!res.ok) throw new Error(data.error || 'Could not delete admin');
  return data;
}

export async function submitApplication(formData) {
  const res = await fetch(apiUrl('/api/applications'), {
    method: 'POST',
    body: formData,
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Could not submit application');
  }
  return data;
}

export async function fetchApplications() {
  const res = await fetch(apiUrl('/api/admin/applications'), {
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    const err = new Error('UNAUTHORIZED');
    err.code = 401;
    throw err;
  }
  if (!res.ok) {
    throw new Error(data.error || 'Could not load applications');
  }
  return data;
}

export async function updateApplicationStatus(id, status) {
  const res = await fetch(apiUrl(`/api/admin/applications/${id}/status`), {
    method: 'PATCH',
    headers: jsonHeaders(),
    body: JSON.stringify({ status }),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    const err = new Error('UNAUTHORIZED');
    err.code = 401;
    throw err;
  }
  if (!res.ok) {
    throw new Error(data.error || 'Could not update status');
  }
  return data;
}

export async function adminUpdateUser(id, body) {
  const res = await fetch(apiUrl(`/api/admin/applications/${id}`), {
    method: 'PATCH',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 || res.status === 403) {
    const err = new Error(data.error || 'Forbidden');
    err.code = res.status;
    throw err;
  }
  if (!res.ok) throw new Error(data.error || 'Could not update user');
  return data;
}

export async function adminUpdateProfilePic(id, formData) {
  const res = await fetch(apiUrl(`/api/admin/applications/${id}/profile-pic`), {
    method: 'POST',
    body: formData,
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Could not update profile picture');
  }
  return data;
}

export async function deleteApplication(id) {
  const res = await fetch(apiUrl(`/api/admin/applications/${id}`), {
    method: 'DELETE',
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    const err = new Error('UNAUTHORIZED');
    err.code = 401;
    throw err;
  }
  if (!res.ok) throw new Error(data.error || 'Could not delete');
  return data;
}

/** Resolve profile image URL for <img src> */
export function profileImageSrc(profilePicPath) {
  if (!profilePicPath) return null;
  if (profilePicPath.startsWith('http')) return profilePicPath;
  return apiUrl(profilePicPath);
}

export async function fetchActiveUsersCount() {
  const res = await fetch(apiUrl('/api/admin/od/active-users-count'), {
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
  return data.count;
}

export async function fetchUserOdSubmissions() {
  const res = await fetch(apiUrl('/api/od/submissions'), {
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
  return data;
}

/** @param {{ status?: string, dateFrom?: string, dateTo?: string, q?: string }} [opts] */
export async function fetchAdminOdSubmissions(opts = {}) {
  const qs = new URLSearchParams();
  if (opts.status) qs.set('status', opts.status);
  if (opts.dateFrom) qs.set('dateFrom', opts.dateFrom);
  if (opts.dateTo) qs.set('dateTo', opts.dateTo);
  if (opts.q && opts.q.trim()) qs.set('q', opts.q.trim());
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  const res = await fetch(apiUrl(`/api/admin/od/submissions${suffix}`), {
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
  return data;
}

export async function setUserAccountActive(id, active, adminPassword) {
  const res = await fetch(apiUrl(`/api/admin/applications/${id}/account-status`), {
    method: 'PATCH',
    headers: jsonHeaders(),
    body: JSON.stringify({ active, adminPassword }),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not update account');
  return data;
}

export async function fetchOdSubmission(id) {
  const res = await fetch(apiUrl(`/api/od/submissions/${id}`), {
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not load');
  return data;
}

export async function createOdSubmission(body) {
  const res = await fetch(apiUrl('/api/od/submissions'), {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not save');
  return data;
}

export async function updateOdSubmission(id, body) {
  const res = await fetch(apiUrl(`/api/od/submissions/${id}`), {
    method: 'PATCH',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not update');
  return data;
}

export async function submitOdForReview(id) {
  const res = await fetch(apiUrl(`/api/od/submissions/${id}/submit`), {
    method: 'POST',
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not submit');
  return data;
}

export async function adminDecideOd(id, status, adminNotes) {
  const res = await fetch(apiUrl(`/api/admin/od/submissions/${id}`), {
    method: 'PATCH',
    headers: jsonHeaders(),
    body: JSON.stringify({ status, admin_notes: adminNotes }),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not update');
  return data;
}

export async function adminDeleteOdSubmission(id) {
  const res = await fetch(apiUrl(`/api/admin/od/submissions/${id}`), {
    method: 'DELETE',
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    const err = new Error('UNAUTHORIZED');
    err.code = 401;
    throw err;
  }
  if (!res.ok) {
    const err = new Error(data.error || 'Could not delete');
    throw err;
  }
  return data;
}

/** @param {{ format?: 'html' }} [opts] — default is PDF download; use format html for browser preview */
export function odLetterUrl(id, isAdmin, opts = {}) {
  const path = isAdmin ? `/api/admin/od/submissions/${id}/letter` : `/api/od/submissions/${id}/letter`;
  const q = opts.format === 'html' ? '?format=html' : '';
  return apiUrl(path + q);
}

export async function fetchProfileUpdateRequests() {
  const res = await fetch(apiUrl('/api/admin/profile-updates'), {
    headers: jsonHeaders(),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => []);
  if (!res.ok) throw new Error(data.error || 'Could not load requests');
  return data;
}

export async function decideProfileUpdateRequest(id, action) {
  const res = await fetch(apiUrl(`/api/admin/profile-updates/${id}/decide`), {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ action }),
    ...fetchDefaults(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not update request');
  return data;
}
