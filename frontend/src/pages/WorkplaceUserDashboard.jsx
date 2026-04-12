import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { getSession, logoutAdmin, changePassword, profileImageSrc, fetchTodayBirthdays } from '../api/workplaceApi';

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

  const academicLine = useMemo(() => {
    if (!session) return '';
    const deg = session.degree || 'UG';
    const br = session.branch || '—';
    const gy = session.grad_year;
    const yr = gy ? `${gy}–${Number(gy) + 1}` : '2025–2026';
    return `${deg} · ${br} | ${yr}`;
  }, [session]);

  const tickerSegments = useMemo(() => {
    if (!session) return [];
    const inst = session.institution || 'Kumaraguru College of Technology';
    const core = `Welcome to React Workplace · ${inst} · Stay updated with campus notices`;
    return [core, core, core];
  }, [session]);

  async function logout() {
    try {
      await logoutAdmin();
    } catch {
      /* */
    }
    navigate('/workplace/login', { replace: true });
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
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white bg-sky-100 shadow-md ring-2 ring-sky-200 sm:h-14 sm:w-14">
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
                <ProfileRow label="Phone" value={session.phone || '—'} />
                <ProfileRow label="Date of birth" value={dobStr} />
                <ProfileRow label="Degree" value={session.degree || '—'} />
                <ProfileRow label="Department / Branch" value={session.branch || '—'} />
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
