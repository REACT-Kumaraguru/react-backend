import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { submitApplication, fetchWorkplaceRoles } from '../api/workplaceApi';

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[#2D334A] placeholder:text-gray-400 outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20';
const labelClass = 'mb-1.5 block text-sm font-medium text-[#9CA3AF]';

const DEGREES = ['UG', 'PG', 'Ph.D', 'Diploma', 'Other'];
const GRAD_YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

export default function WorkplaceRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [degree, setDegree] = useState('UG');
  const [gradYear, setGradYear] = useState('2026');
  const [branch, setBranch] = useState('');
  const [dob, setDob] = useState('');
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [roles, setRoles] = useState([]);
  const [workplaceRoleId, setWorkplaceRoleId] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchWorkplaceRoles();
        if (cancelled) return;
        setRoles(list);
        if (list.length) {
          setWorkplaceRoleId((prev) => prev || String(list[0].id));
        }
      } catch {
        if (!cancelled) setRoles([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function onFileChange(e) {
    const f = e.target.files?.[0];
    setFile(f || null);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!file) {
      setError('Please choose a profile picture.');
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', name);
      fd.append('email', email);
      fd.append('phone', phone);
      fd.append('degree', degree);
      fd.append('gradYear', gradYear);
      fd.append('branch', branch);
      fd.append('dob', dob);
      fd.append('profilePic', file);
      fd.append('workplaceRoleId', workplaceRoleId);

      await submitApplication(fd);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#F3F4F6] font-sans pt-12 pb-16 px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-[0_10px_40px_-10px_rgba(45,51,74,0.12)] border border-gray-100">
          <h1 className="font-serif text-2xl font-bold text-[#2D334A]">Thank you</h1>
          <p className="mt-4 text-[#2D334A]/90 leading-relaxed">
            Your application is under review. Please wait for admin approval.
          </p>
          <Link
            to="/workplace/login"
            className="mt-8 inline-block rounded-xl bg-[#2D334A] px-8 py-3 text-sm font-semibold text-white hover:bg-[#232838]"
          >
            Back to login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3F4F6] font-sans pt-12 pb-16 px-4">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-serif text-3xl font-bold text-[#2D334A]">Register</h1>
          <p className="text-sm text-[#9CA3AF]">
            Already have an account?{' '}
            <Link to="/workplace/login" className="font-semibold text-[#3B82F6] hover:underline">
              Login
            </Link>
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 md:p-10 shadow-[0_10px_40px_-10px_rgba(45,51,74,0.12)] border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-10">
            <section>
              <h2 className="mb-6 text-lg font-semibold text-[#2D334A]">Your basic information</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <span className={labelClass}>
                    Profile picture <span className="text-red-500">*</span>
                  </span>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                      {preview ? (
                        <img src={preview} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-400 px-2 text-center">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={onFileChange}
                        required
                        className="block w-full text-sm text-[#2D334A] file:mr-4 file:rounded-lg file:border-0 file:bg-[#2D334A] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                      />
                      <p className="mt-1 text-xs text-[#9CA3AF]">JPEG, PNG, GIF or WebP · max 5MB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@kct.ac.in"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dob" className={labelClass}>
                    Date of birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="workplaceRole" className={labelClass}>
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="workplaceRole"
                    value={workplaceRoleId}
                    onChange={(e) => setWorkplaceRoleId(e.target.value)}
                    className={`${inputClass} max-h-48 overflow-y-auto`}
                    required
                    disabled={roles.length === 0}
                  >
                    {roles.length === 0 ? (
                      <option value="">Loading roles…</option>
                    ) : (
                      roles.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))
                    )}
                  </select>
                  <p className="mt-1 text-xs text-[#9CA3AF]">
                    REACT workplace team (options are set by the React admin).
                  </p>
                </div>
                <div>
                  <label htmlFor="degree" className={labelClass}>
                    Degree <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className={inputClass}
                    required
                  >
                    {DEGREES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="gradYear" className={labelClass}>
                    Graduation year <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gradYear"
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    className={inputClass}
                    required
                  >
                    {GRAD_YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="branch" className={labelClass}>
                    Branch <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g., Computer Science / Mechanical / Electronics"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </section>

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading || roles.length === 0 || !workplaceRoleId || !file}
              className="w-full rounded-xl bg-[#2D334A] py-3.5 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#232838] disabled:opacity-60"
            >
              {loading ? 'Submitting…' : 'Apply for registration'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
