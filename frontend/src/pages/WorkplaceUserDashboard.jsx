import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { getSession, logoutAdmin, changePassword, profileImageSrc, fetchTodayBirthdays, updateProfile, updateProfilePic, fetchWorkplaceRoles } from '../api/workplaceApi';

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

export default function WorkplaceUserDashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pwOpen, setPwOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwOk, setPwOk] = useState(false);
  const [birthdayPeople, setBirthdayPeople] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState('');
  const [allRoles, setAllRoles] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const s = await getSession();
      if (cancelled) return;
      if (!s?.role) {
        navigate('/workplace/login', { replace: true });
        return;
      }
      if (s.role === 'admin') {
        navigate('/workplace/admin/users/pending', { replace: true });
        return;
      }
      if (s.role !== 'user') {
        navigate('/workplace/login', { replace: true });
        return;
      }
      setSession(s);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await fetchTodayBirthdays();
      if (cancelled) return;
      setBirthdayPeople(Array.isArray(data?.birthdays) ? data.birthdays : []);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    fetchWorkplaceRoles().then(setAllRoles).catch(console.error);
  }, []);

  const academicLine = useMemo(() => {
    if (!session) return '';
    const deg = session.degree || 'UG';
    const br = session.branch || '—';
    const gy = session.grad_year;
    const yr = gy ? `${gy}–${Number(gy) + 1}` : '2025–2026';

    let yearOfStudy = '';
    if (gy) {
      const currentYear = new Date().getFullYear(); // 2026
      const diff = gy - currentYear;
      if (diff === 0) yearOfStudy = '4th Year';
      else if (diff === 1) yearOfStudy = '3rd Year';
      else if (diff === 2) yearOfStudy = '2nd Year';
      else if (diff === 3) yearOfStudy = '1st Year';
    }

    return `${deg} · ${br} | ${yr}`;
  }, [session]);

  const tickerSegments = useMemo(() => {
    if (!session) return [];
    const inst = session.institution || 'Kumaraguru College of Technology';
    const core = `Welcome to React Workplace · ${inst} · Stay updated with campus notices`;
    return [core, core, core];
  }, [session]);

  const yearOfStudy = useMemo(() => {
    const gy = session?.grad_year;
    if (!gy) return '—';
    const currentYear = new Date().getFullYear(); // 2026
    const diff = Number(gy) - currentYear;
    if (diff === 0) return '4th Year';
    if (diff === 1) return '3rd Year';
    if (diff === 2) return '2nd Year';
    if (diff === 3) return '1st Year';
    return '—';
  }, [session]);

  async function logout() {
    try {
      await logoutAdmin();
    } catch {
      /* */
    }
    navigate('/workplace/login', { replace: true });
  }

  async function handleProfilePicChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('profilePic', file);
      await updateProfilePic(fd);
      const updatedSession = await getSession();
      setSession(updatedSession);
    } catch (err) {
      alert(err.message || 'Failed to update profile picture');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    setEditError('');
    setEditSaving(true);
    try {
      const res = await updateProfile(editForm);
      if (res.message) {
        alert(res.message);
      }
      setIsEditing(false);
    } catch (err) {
      setEditError(err.message || 'Failed to update profile');
    } finally {
      setEditSaving(false);
    }
  }

  function openEdit() {
    setEditForm({
      name: session.name,
      phone: session.phone,
      degree: session.degree,
      gradYear: session.grad_year,
      branch: session.branch,
      dob: session.dob ? new Date(session.dob).toISOString().split('T')[0] : '',
      gender: session.gender || 'Male',
      registerNumber: session.register_number || '',
      workplaceRoleId: session.workplace_role_id || '',
    });
    setEditError('');
    setIsEditing(true);
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPwError('');
    setPwOk(false);
    setPwSaving(true);
    try {
      await changePassword(currentPassword, newPassword, confirmPassword);
      setPwOk(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setPwOpen(false);
        setPwOk(false);
      }, 1500);
    } catch (err) {
      setPwError(err.message || 'Failed');
    } finally {
      setPwSaving(false);
    }
  }

  if (loading || !session) {
    return (
      <div className="py-16 text-center text-[#9CA3AF] text-sm">Loading…</div>
    );
  }

  const pic = profileImageSrc(session.profile_pic_path);
  const dobStr = session.dob
    ? new Date(session.dob).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—';

  const notifCount = birthdayPeople.length;

  return (
    <div className="pb-12 font-sans text-[#0d47a1]">
      {/* Ticker (no birthdays) + bell (birthdays only here) */}
      <div className="flex w-full items-stretch border-b border-sky-200 bg-gradient-to-r from-sky-100 via-sky-50 to-sky-100">
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="profile-marquee-inner">
            <div className="flex w-1/2 min-w-0 items-center justify-center gap-6 px-4 py-2.5 text-sm font-medium text-sky-950">
              {tickerSegments[0]}
            </div>
            <div className="flex w-1/2 min-w-0 items-center justify-center gap-6 px-4 py-2.5 text-sm font-medium text-sky-950">
              {tickerSegments[1]}
            </div>
          </div>
        </div>
        <div className="relative flex shrink-0 items-center border-l border-sky-200/80 bg-sky-50/90 px-2 sm:px-3">
          <button
            type="button"
            onClick={() => setNotifOpen((o) => !o)}
            className="relative rounded-lg p-2 text-sky-900 transition hover:bg-sky-100"
            aria-label="Notifications"
            aria-expanded={notifOpen}
          >
            <Bell className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
            {notifCount > 0 ? (
              <span className="absolute right-1 top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#1976d2] px-1 text-[10px] font-bold text-white">
                {notifCount > 9 ? '9+' : notifCount}
              </span>
            ) : null}
          </button>
          {notifOpen ? (
            <>
              <button
                type="button"
                className="fixed inset-0 z-[90] cursor-default bg-transparent"
                aria-label="Close notifications"
                onClick={() => setNotifOpen(false)}
              />
              <div className="absolute right-2 top-full z-[95] mt-2 w-[min(100vw-2rem,20rem)] rounded-xl border border-sky-200 bg-white py-2 shadow-lg">
                <p className="border-b border-gray-100 px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Notifications
                </p>
                {notifCount === 0 ? (
                  <p className="px-4 py-3 text-sm text-gray-600">No notifications yet.</p>
                ) : (
                  <ul className="max-h-64 overflow-y-auto py-1">
                    {birthdayPeople.map((p) => (
                      <li key={p.id ?? p.name} className="px-4 py-2.5 text-sm text-[#0d47a1]">
                        Today {p.name} had a birthday 🎈
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="w-full max-w-full px-4 pt-5 sm:px-6 lg:px-8">
        {/* Top header strip */}
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white bg-sky-100 shadow-md ring-2 ring-sky-200 sm:h-14 sm:w-14">
              {pic ? (
                <img src={pic} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-sky-600">
                  {(session.name || '?').slice(0, 1)}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold uppercase tracking-tight text-[#0d47a1] sm:text-lg">
                {session.name || 'Student'}
              </p>
              <p className="truncate text-sm text-[#1565c0]">{session.institution}</p>
              <p className="text-xs text-sky-700">{academicLine}</p>
            </div>
          </div>
        </div>

        {/* Main profile card — full width */}
        <div className="w-full rounded-xl bg-[#E3F2FD] p-4 shadow-inner ring-1 ring-sky-200/80 sm:rounded-2xl sm:p-6 md:p-8">
          <div className="grid w-full gap-6 sm:gap-8 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-10">
            <div className="flex justify-center lg:justify-start">
              <div className="bg-white p-2.5 shadow-[0_8px_24px_rgba(13,71,161,0.12)] sm:p-3">
                <div className="aspect-[3/4] w-40 overflow-hidden bg-sky-50 sm:w-48 md:w-52">
                  {pic ? (
                    <img src={pic} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-light text-sky-300">
                      {(session.name || '?').slice(0, 1)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0d47a1] sm:text-xl md:text-2xl">
                {session.name || '—'}
              </h2>

              <dl className="mt-4 grid gap-y-2.5 text-sm sm:mt-6 sm:gap-y-3">
                <ProfileRow label="Role" value={session.workplace_role_name || '—'} />
                <ProfileRow label="Email" value={session.email} />
                <ProfileRow label="Register number" value={session.register_number || '—'} />
                <ProfileRow label="Phone" value={session.phone || '—'} />
                <ProfileRow label="Date of birth" value={dobStr} />
                <ProfileRow label="Gender" value={session.gender || '—'} />
                <ProfileRow label="Degree" value={session.degree || '—'} />
                <ProfileRow label="Department / Branch" value={session.branch || '—'} />
                <ProfileRow label="Year of study" value={yearOfStudy} />
                <ProfileRow label="Graduation year" value={session.grad_year ?? '—'} />
                <ProfileRow label="College" value={session.institution} />
              </dl>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-4 border-t border-sky-200/80 pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <h3 className="text-base font-bold text-black sm:text-lg">Profile</h3>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openEdit}
              className="w-full rounded-lg bg-[#1976d2] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565c0] sm:w-auto"
            >
              Edit Profile
            </button>
            <button
              type="button"
              onClick={() => {
                setPwOpen(true);
                setPwError('');
                setPwOk(false);
              }}
              className="w-full rounded-lg border-2 border-[#1976d2] bg-white px-5 py-2.5 text-sm font-semibold text-[#1976d2] transition hover:bg-sky-50 sm:w-auto"
            >
              Change password
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 md:hidden"
            >
              Log out
            </button>
          </div>
        </div>
      </div>

      {pwOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pw-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h4 id="pw-title" className="text-lg font-bold text-[#0d47a1]">
              Change password
            </h4>
            <p className="mt-1 text-sm text-gray-500">Enter your current password, then your new password twice.</p>
            <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
              <div>
                <label htmlFor="cur-pw" className="mb-1 block text-xs font-medium text-gray-500">
                  Current password
                </label>
                <input
                  id="cur-pw"
                  type="password"
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="new-pw" className="mb-1 block text-xs font-medium text-gray-500">
                  New password
                </label>
                <input
                  id="new-pw"
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label htmlFor="re-pw" className="mb-1 block text-xs font-medium text-gray-500">
                  Retype new password
                </label>
                <input
                  id="re-pw"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                  required
                  minLength={6}
                />
              </div>
              {pwError ? (
                <p className="text-sm text-red-600" role="alert">
                  {pwError}
                </p>
              ) : null}
              {pwOk ? (
                <p className="text-sm text-emerald-600" role="status">
                  Password updated successfully.
                </p>
              ) : null}
              <div className="flex flex-wrap justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPwOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pwSaving}
                  className="rounded-lg bg-[#1976d2] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1565c0] disabled:opacity-50"
                >
                  {pwSaving ? 'Saving…' : 'Update password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isEditing ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h4 className="text-lg font-bold text-[#0d47a1]">Edit Profile</h4>

            <div className="mt-4 flex flex-col items-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-sky-100 bg-sky-50 group">
                {pic ? (
                  <img src={pic} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-sky-600">
                    {(session.name || '?').slice(0, 1)}
                  </div>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-xs font-bold text-white uppercase tracking-tighter">Change</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleProfilePicChange} />
                </label>
              </div>
              <p className="mt-2 text-xs text-gray-500">Change Profile Photo</p>
            </div>
            <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Name</label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Register Number</label>
                  <input
                    type="text"
                    value={editForm.registerNumber || ''}
                    onChange={(e) => setEditForm({ ...editForm, registerNumber: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Phone</label>
                  <input
                    type="tel"
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Date of Birth</label>
                <input
                  type="date"
                  value={editForm.dob || ''}
                  onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Gender</label>
                  <select
                    value={editForm.gender || 'Male'}
                    onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Degree</label>
                  <select
                    value={editForm.degree || 'UG'}
                    onChange={(e) => setEditForm({ ...editForm, degree: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <option value="UG">UG</option>
                    <option value="PG">PG</option>
                    <option value="Ph.D">Ph.D</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Department / Branch</label>
                <select
                  value={editForm.branch || ''}
                  onChange={(e) => setEditForm({ ...editForm, branch: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                >
                  {BRANCH_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Graduation Year</label>
                <select
                  value={editForm.gradYear || ''}
                  onChange={(e) => setEditForm({ ...editForm, gradYear: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                >
                  {GRAD_YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Workplace Role</label>
                <select
                  value={editForm.workplaceRoleId || ''}
                  onChange={(e) => setEditForm({ ...editForm, workplaceRoleId: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="">Select Role</option>
                  {allRoles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {editError ? (
                <p className="text-sm text-red-600" role="alert">
                  {editError}
                </p>
              ) : null}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSaving}
                  className="rounded-lg bg-[#1976d2] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1565c0] disabled:opacity-50"
                >
                  {editSaving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div className="border-b border-sky-200/50 pb-2 last:border-b-0 sm:grid sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-4">
      <dt className="font-medium text-sky-900">{label}</dt>
      <dd className="mt-0.5 break-words text-sky-950 sm:mt-0">{value}</dd>
    </div>
  );
}
