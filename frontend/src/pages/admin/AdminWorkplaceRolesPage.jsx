import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import {
  getSession,
  fetchWorkplaceRoles,
  createWorkplaceRole,
  deleteWorkplaceRole,
} from '../../api/workplaceApi';

export default function AdminWorkplaceRolesPage() {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newName, setNewName] = useState('');
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
      if (!s.canManageWorkplaceRoles && !s.canManageAdmins) {
        setAllowed(false);
        setLoading(false);
        return;
      }
      setAllowed(true);
      const data = await fetchWorkplaceRoles();
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

  async function addRole(e) {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setSaving(true);
    setError('');
    try {
      await createWorkplaceRole(name);
      setNewName('');
      await load();
    } catch (err) {
      setError(err.message || 'Could not add');
    } finally {
      setSaving(false);
    }
  }

  async function removeRole(id) {
    if (!window.confirm('Remove this role? It must not be assigned to any applicant.')) return;
    setBusyId(id);
    setError('');
    try {
      await deleteWorkplaceRole(id);
      await load();
    } catch (err) {
      setError(err.message || 'Could not delete');
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
        <h1 className="font-serif text-2xl font-bold text-[#2D334A]">Registration roles</h1>
        <p className="mt-4 text-sm text-[#9CA3AF]">
          Only the primary React admin account can manage registration roles.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 md:pl-8 md:pr-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-[#2D334A]">Registration roles</h1>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          These options appear in the workplace registration form. Add or remove roles for future applicants.
        </p>
      </div>

      {error ? (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <form onSubmit={addRole} className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="newRole" className="mb-1 block text-xs font-medium text-[#9CA3AF]">
            New role name
          </label>
          <input
            id="newRole"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. DESIGN TEAM"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#2D334A] outline-none focus:border-[#3B82F6]"
            maxLength={255}
          />
        </div>
        <button
          type="submit"
          disabled={saving || !newName.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2D334A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#232838] disabled:opacity-50"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Add role
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50/80 px-4 py-3">
          <h2 className="text-sm font-semibold text-[#2D334A]">Current roles</h2>
          <p className="text-xs text-[#9CA3AF]">Scroll the list on small screens if there are many entries.</p>
        </div>
        <ul className="max-h-[min(60vh,28rem)] divide-y divide-gray-100 overflow-y-auto">
          {rows.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-[#9CA3AF]">No roles yet.</li>
          ) : (
            rows.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-[#2D334A]"
              >
                <span className="font-medium">{r.name}</span>
                <button
                  type="button"
                  disabled={busyId === r.id}
                  onClick={() => removeRole(r.id)}
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
