import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchApplications,
  profileImageSrc,
  setUserAccountActive,
  fetchWorkplaceRoles,
  adminUpdateUser,
  adminUpdateProfilePic,
} from '../../api/workplaceApi';
import { Edit2, X } from 'lucide-react';

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
  const [editingUser, setEditingUser] = useState(null);
  const [allRoles, setAllRoles] = useState([]);

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

  useEffect(() => {
    fetchWorkplaceRoles().then(setAllRoles).catch(console.error);
  }, []);

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

  function getYearOfStudy(gradYear) {
    if (!gradYear) return '—';
    const currentYear = new Date().getFullYear(); // 2026
    const diff = Number(gradYear) - currentYear;
    if (diff === 0) return 'IV Year';
    if (diff === 1) return 'III Year';
    if (diff === 2) return 'II Year';
    if (diff === 3) return 'I Year';
    return '—';
  }

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
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Year of Study</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Branch</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Register No.</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Phone</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Email</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Role</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">DOB</th>
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
                    <td className="px-4 py-3 text-[#2D334A]/90">{getYearOfStudy(row.grad_year)}</td>
                    <td className="px-4 py-3 text-[#2D334A]/90 max-w-[200px] truncate" title={row.branch}>
                      {row.branch || '—'}
                    </td>
                    <td className="px-4 py-3 text-[#2D334A]/90">{row.register_number || '—'}</td>
                    <td className="px-4 py-3 text-[#2D334A]/90">{row.phone || '—'}</td>
                    <td className="px-4 py-3 text-[#2D334A]/90">{row.email}</td>
                    <td className="px-4 py-3 text-[#2D334A]/90 max-w-[160px] truncate" title={row.workplace_role_name}>
                      {row.workplace_role_name || '—'}
                    </td>
                    <td className="px-4 py-3 text-[#2D334A]/90">{formatDob(row.dob)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={busyId === row.id}
                          onClick={() => setEditingUser(row)}
                          className="rounded-lg bg-sky-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 disabled:opacity-50 inline-flex items-center gap-1"
                          title="Edit"
                        >
                          <Edit2 className="h-3 w-3" />
                          Edit
                        </button>
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
                      </div>
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

      {editingUser && (
        <EditUserModal
          user={editingUser}
          roles={allRoles}
          onClose={() => setEditingUser(null)}
          onUpdate={load}
        />
      )}
    </div>
  );
}

const BRANCH_OPTIONS = [
  'B.E (Aeronautical Engineering)',
  'B.E (Automobile Engineering)',
  'B.E (Civil Engineering)',
  'B.E (Electrical and Electronics Engineering)',
  'B.E (Electronics and Instrumentation Engineering)',
  'B.Tech (Information Technology)',
  'B.E (Mechatronics Engineering)',
  'B.Tech (Artificial Intelligence & Data Science)',
  'B.Tech (Biotechnology)',
  'B.E (Computer Science and Engineering)',
  'B.E (Electronics and Communication Engineering)',
  'B.Tech (Fashion Technology)',
  'B.E (Mechanical Engineering)',
  'B.Tech (Textile Technology)',
];
const GRAD_YEARS = [2026, 2027, 2028, 2029];

function EditUserModal({ user, roles, onClose, onUpdate }) {
  const [form, setForm] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    degree: user.degree || 'UG',
    gradYear: user.grad_year || 2026,
    branch: user.branch || '',
    dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
    gender: user.gender || 'Male',
    registerNumber: user.register_number || '',
    workplaceRoleId: user.workplace_role_id || '',
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await adminUpdateUser(user.id, form);
      onUpdate();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handlePicChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('profilePic', file);
      await adminUpdateProfilePic(user.id, fd);
      onUpdate();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto text-left">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-[#2D334A]">Edit User Information</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-sky-100 bg-gray-50 group">
             {user.profile_pic_path ? (
               <img src={profileImageSrc(user.profile_pic_path)} className="h-full w-full object-cover" alt="" />
             ) : (
               <div className="flex h-full items-center justify-center text-2xl text-gray-300 uppercase">
                 {user.name?.slice(0,1)}
               </div>
             )}
             <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
               <span className="text-xs font-bold text-white uppercase tracking-tighter">Change</span>
               <input type="file" className="hidden" accept="image/*" onChange={handlePicChange} />
             </label>
          </div>
          <p className="mt-2 text-xs text-gray-500">ID: {user.id}</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-gray-500">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Email (Read only)</label>
            <input
              type="email"
              value={form.email}
              readOnly
              className="w-full rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-500 outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Register Number</label>
            <input
              type="text"
              value={form.registerNumber}
              onChange={(e) => setForm({ ...form, registerNumber: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">DOB</label>
            <input
              type="date"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Degree</label>
            <select
              value={form.degree}
              onChange={(e) => setForm({ ...form, degree: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="UG">UG</option>
              <option value="PG">PG</option>
              <option value="Ph.D">Ph.D</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Branch</label>
            <select
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="">Select Branch</option>
              {BRANCH_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Graduation Year</label>
            <select
              value={form.gradYear}
              onChange={(e) => setForm({ ...form, gradYear: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            >
              {GRAD_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Workplace Role</label>
            <select
              value={form.workplaceRoleId}
              onChange={(e) => setForm({ ...form, workplaceRoleId: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="">Select Role</option>
              {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>

          {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}

          <div className="flex justify-end gap-3 mt-6 sm:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="px-6 py-2 text-sm font-semibold text-white bg-[#2D334A] hover:bg-[#232838] rounded-lg disabled:opacity-50"
            >
              {busy ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
