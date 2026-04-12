import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApplications, profileImageSrc, setUserAccountActive } from '../../api/workplaceApi';

export default function AdminActiveUsersPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('active');
  const [q, setQ] = useState('');
  const [branchF, setBranchF] = useState('');
  const [roleF, setRoleF] = useState('');
  const [modal, setModal] = useState(null);
  const [adminPw, setAdminPw] = useState('');
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setError('');
    try {
      const data = await fetchApplications();
      setRows(data.filter((r) => r.status === 'APPROVED'));
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

  const branchOptions = useMemo(() => {
    const s = new Set();
    rows.forEach((r) => {
      if (r.branch?.trim()) s.add(r.branch.trim());
    });
    return [...s].sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const roleOptions = useMemo(() => {
    const s = new Set();
    rows.forEach((r) => {
      if (r.workplace_role_name?.trim()) s.add(r.workplace_role_name.trim());
    });
    return [...s].sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const filtered = useMemo(() => {
    const active = tab === 'active';
    let list = rows.filter((r) => (active ? r.is_active !== false : r.is_active === false));
    const qv = q.trim().toLowerCase();
    if (qv) {
      list = list.filter((r) => {
        const hay = [r.name, r.email, r.phone, r.branch, r.workplace_role_name]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return hay.includes(qv);
      });
    }
    if (branchF) list = list.filter((r) => (r.branch || '').trim() === branchF);
    if (roleF) list = list.filter((r) => (r.workplace_role_name || '').trim() === roleF);
    return list;
  }, [rows, tab, q, branchF, roleF]);

  function formatDob(v) {
    if (!v) return '—';
    return typeof v === 'string' ? v.slice(0, 10) : v;
  }

  async function confirmAccountChange() {
    if (!modal) return;
    setBusyId(modal.id);
    setError('');
    try {
      await setUserAccountActive(modal.id, modal.active, adminPw);
      setModal(null);
      setAdminPw('');
      await load();
    } catch (e) {
      setError(e.message || 'Update failed');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="py-8 px-4 md:pl-8 md:pr-8">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-[#2D334A]">Active users</h1>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          Approved accounts. Deactivating requires the React admin password; deactivated users cannot sign in.
        </p>
      </div>

      {error ? (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        <button
          type="button"
          onClick={() => setTab('active')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${
            tab === 'active' ? 'bg-[#2D334A] text-white' : 'bg-gray-100 text-[#2D334A] hover:bg-gray-200'
          }`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setTab('inactive')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${
            tab === 'inactive' ? 'bg-[#2D334A] text-white' : 'bg-gray-100 text-[#2D334A] hover:bg-gray-200'
          }`}
        >
          Deactivated
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="min-w-0 flex-1 sm:max-w-xs">
          <label htmlFor="auSearch" className="mb-1 block text-xs font-medium text-[#9CA3AF]">
            Search
          </label>
          <input
            id="auSearch"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name, email, phone…"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#2D334A] outline-none focus:border-[#3B82F6]"
          />
        </div>
        <div>
          <label htmlFor="auBranch" className="mb-1 block text-xs font-medium text-[#9CA3AF]">
            Branch
          </label>
          <select
            id="auBranch"
            value={branchF}
            onChange={(e) => setBranchF(e.target.value)}
            className="w-full min-w-[140px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#2D334A] sm:w-[180px]"
          >
            <option value="">All branches</option>
            {branchOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="auRole" className="mb-1 block text-xs font-medium text-[#9CA3AF]">
            Role
          </label>
          <select
            id="auRole"
            value={roleF}
            onChange={(e) => setRoleF(e.target.value)}
            className="w-full min-w-[140px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#2D334A] sm:w-[200px]"
          >
            <option value="">All roles</option>
            {roleOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_10px_40px_-10px_rgba(45,51,74,0.12)]">
        {loading ? (
          <p className="p-8 text-center text-[#9CA3AF]">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="p-8 text-center text-[#9CA3AF]">No users in this list.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Profile</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Name</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Email</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Phone</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Role</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">DOB</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Branch</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3">
                      <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                        {row.profile_pic_path ? (
                          <img
                            src={profileImageSrc(row.profile_pic_path)}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] text-gray-400">
                            —
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-[#2D334A]">{row.name}</td>
                    <td className="px-4 py-3 text-[#2D334A]/90">{row.email}</td>
                    <td className="px-4 py-3 text-[#2D334A]/90">{row.phone || '—'}</td>
                    <td className="px-4 py-3 text-[#2D334A]/90 max-w-[160px] truncate" title={row.workplace_role_name}>
                      {row.workplace_role_name || '—'}
                    </td>
                    <td className="px-4 py-3 text-[#2D334A]/90">{formatDob(row.dob)}</td>
                    <td className="px-4 py-3 text-[#2D334A]/90 max-w-[200px] truncate" title={row.branch}>
                      {row.branch || '—'}
                    </td>
                    <td className="px-4 py-3">
                      {tab === 'active' ? (
                        <button
                          type="button"
                          disabled={busyId === row.id}
                          onClick={() => {
                            setModal({ id: row.id, active: false, name: row.name });
                            setAdminPw('');
                          }}
                          className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={busyId === row.id}
                          onClick={() => {
                            setModal({ id: row.id, active: true, name: row.name });
                            setAdminPw('');
                          }}
                          className="rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 disabled:opacity-50"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pw-modal-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 id="pw-modal-title" className="text-lg font-bold text-[#2D334A]">
              {modal.active ? 'Activate user' : 'Deactivate user'}
            </h2>
            <p className="mt-2 text-sm text-[#9CA3AF]">
              {modal.active ? 'Re-enable login for' : 'Disable login for'}{' '}
              <strong className="text-[#2D334A]">{modal.name}</strong>. Enter the React admin password to confirm.
            </p>
            <input
              type="password"
              autoComplete="current-password"
              value={adminPw}
              onChange={(e) => setAdminPw(e.target.value)}
              className="mt-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#2D334A] outline-none focus:border-[#3B82F6]"
              placeholder="Admin password"
            />
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setModal(null);
                  setAdminPw('');
                }}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!adminPw.trim() || busyId != null}
                onClick={confirmAccountChange}
                className="rounded-lg bg-[#2D334A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#232838] disabled:opacity-50"
              >
                {busyId ? 'Working…' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
