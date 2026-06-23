import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getSession } from '../../api/workplaceApi';

export default function AdminProgrammeGuard({ children, loginReturnPath = '/workplace/admin/programmes' }) {
  const [state, setState] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await getSession();
        if (cancelled) return;
        setState(s?.role === 'admin' ? 'ok' : 'deny');
      } catch {
        if (!cancelled) setState('deny');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Loading…
      </div>
    );
  }
  if (state === 'deny') {
    const q = encodeURIComponent(loginReturnPath);
    return <Navigate to={`/workplace/login?returnUrl=${q}`} replace />;
  }
  return children;
}
