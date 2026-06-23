import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Shield } from 'lucide-react';
import {
  getSession,
  fetchAdminAccounts,
  createAdminAccount,
  deleteAdminAccount,
} from '../../api/workplaceApi';

const inputClass =
  'w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#2D334A] outline-none focus:border-[#3B82F6]';

export default function AdminAdminsPage() {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setError('');
    try {
      const s = await getSession();
      if (!s?.role || s.role !== 'admin') {
        navigate('/workplace/login', { replace: true });
        return;
      }
      if (!s.canManageAdmins) {
        setAllowed(false);
        setLoading(false);
        return;
      }
      setAllowed(true);
      const data = await fetchAdminAccounts();
      setRows(data);
    } catch (e) {
      setError(e.message || 'Could not load');
      if (e.message === 'UNAUTHORIZED' || e.code === 401) {
        navigate('/workplace/login', { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    load();
  }, [load]);

  async function onSubmit(e) {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim().toLowerCase();
    if (!n || !em) return;
    setSaving(true);
    setError('');
    try {
      const body = { name: n, email: em };
      if (password.trim()) body.password = password.trim();
      await createAdminAccount(body);
      setName('');
      setEmail('');
      setPassword('');
      await load();
    } catch (err) {
      setError(err.message || 'Could not add admin');
    } finally {
      setSaving(false);
    }
  }

  async function remove(id) {
    if (!window.confirm('Remove this admin account? They will no longer be able to sign in.')) return;
    setBusyId(id);
    setError('');
    try {
      await deleteAdminAccount(id);
      await load();
    } catch (err) {
      setError(err.message || 'Could not remove');
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return (
      <div className="py-8 px-4 md:pl-8 md:pr-8">
        <p className="text-[#9CA3AF]">Loading…</p>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="py-8 px-4 md:pl-8 md:pr-8">
        <h1 className="font-serif text-2xl font-bold text-[#2D334A]">Admin accounts</h1>
        <p className="mt-4 text-sm text-[#9CA3AF]">
          Only the primary React admin account (react@kct.ac.in) can add or remove other admin logins.
          Secondary admins cannot open this page.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 md:pl-8 md:pr-8 max-w-2xl">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-[#2D334A]" aria-hidden />
          <h1 className="font-serif text-3xl font-bold text-[#2D334A]">Admin accounts</h1>
        </div>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          Add admins who can access this workplace admin area. If you leave password blank, it defaults to the
          part of the email before <span className="font-mono">@</span> (minimum 6 characters — use a longer
          local part or set a password manually).
        </p>
      </div>

      {error ? (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="mb-10 space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="admName" className="mb-1 block text-xs font-medium text-[#9CA3AF]">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="admName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className={inputClass}
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="admEmail" className="mb-1 block text-xs font-medium text-[#9CA3AF]">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="admEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@kct.ac.in"
            className={inputClass}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="admPw" className="mb-1 block text-xs font-medium text-[#9CA3AF]">
            Password (optional)
          </label>
          <input
            id="admPw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to use text before @ in email"
            className={inputClass}
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          disabled={saving || !name.trim() || !email.trim()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#2D334A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#232838] disabled:opacity-50 sm:w-auto"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Add admin
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50/80 px-4 py-3">
          <h2 className="text-sm font-semibold text-[#2D334A]">Secondary admins</h2>
          <p className="text-xs text-[#9CA3AF]">
            The primary admin (react@kct.ac.in) is not listed here — it uses server credentials.
          </p>
        </div>
        <ul className="max-h-[min(50vh,24rem)] divide-y divide-gray-100 overflow-y-auto">
          {rows.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-[#9CA3AF]">No additional admins yet.</li>
          ) : (
            rows.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm text-[#2D334A]"
              >
                <div>
                  <span className="font-medium">{r.name}</span>
                  <span className="ml-2 text-[#9CA3AF]">{r.email}</span>
                </div>
                <button
                  type="button"
                  disabled={busyId === r.id}
                  onClick={() => remove(r.id)}
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
