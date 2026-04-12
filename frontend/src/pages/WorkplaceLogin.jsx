import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { login } from '../api/workplaceApi';

function safeReturnUrl(raw) {
  if (!raw || typeof raw !== 'string') return '';
  const t = decodeURIComponent(raw).trim();
  if (!t.startsWith('/') || t.startsWith('//')) return '';
  return t;
}

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[#2D334A] placeholder:text-gray-400 outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20';

export default function WorkplaceLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = safeReturnUrl(searchParams.get('returnUrl') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data.role === 'admin') {
        navigate(returnUrl || '/workplace/admin/users/pending', { replace: true });
        return;
      }
      if (data.role === 'user') {
        navigate(returnUrl || '/workplace/dashboard', { replace: true });
        return;
      }
      setError('Login failed');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F3F4F6] font-sans pt-12 pb-16 px-4 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2D334A] tracking-tight">
            Welcome to React Workplace - Login
          </h1>
          <p className="mt-2 text-sm text-[#9CA3AF]">Please enter your details</p>
        </div>

        <div className="rounded-2xl bg-white p-8 md:p-10 shadow-[0_10px_40px_-10px_rgba(45,51,74,0.12)] border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#9CA3AF]">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@kct.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#9CA3AF]">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2D334A] py-3.5 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#232838] disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#9CA3AF]">
            Need access?{' '}
            <Link to="/workplace/register" className="font-semibold text-[#3B82F6] hover:underline">
              Apply for registration
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
