import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getSession } from '../../api/workplaceApi';
import { fetchRiskmSubmissions } from '../../api/riskmApi';
import { exportSubmissionPdf } from '../utils/exportRiskPdf';
import { useRiskmBase } from '../useRiskmBase';

function StatusBadge({ status }) {
  const map = {
    PENDING: 'bg-amber-100 text-amber-900 border-amber-200',
    APPROVED: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    REJECTED: 'bg-red-100 text-red-900 border-red-200',
  };
  const icon = { PENDING: '🟡', APPROVED: '🟢', REJECTED: '🔴' };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[status] || ''}`}>
      <span aria-hidden>{icon[status]}</span>
      {status}
    </span>
  );
}

export default function RiskMMySubmissions() {
  const navigate = useNavigate();
  const base = useRiskmBase();
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setError('');
    try {
      const data = await fetchRiskmSubmissions();
      setRows(data);
    } catch (e) {
      if (e.code === 401) {
        navigate('/workplace/login?returnUrl=/workplace/riskm/submissions', { replace: true });
        return;
      }
      setError(e.message || 'Could not load');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    let cancelled = false;
    getSession().then((s) => {
      if (cancelled) return;
      if (s?.role === 'admin') {
        navigate('/workplace/admin/riskm/admin', { replace: true });
        return;
      }
      load();
    });
    return () => {
      cancelled = true;
    };
  }, [navigate, load]);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold text-slate-900">My Submissions</h1>
      <p className="mt-1 text-sm text-slate-500">Track your risk assessment requests.</p>

      {location.state?.riskmSuccess ? (
        <p
          className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900"
          role="status"
        >
          Submitted. Awaiting Admin Approval
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p className="p-8 text-center text-slate-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="p-8 text-center text-slate-500">
            No submissions yet.{' '}
            <Link to={`${base}/new`} className="font-semibold text-orange-600 hover:underline">
              Create one
            </Link>
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {rows.map((r) => (
              <li key={r.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{r.project_title || 'Untitled'}</p>
                  <p className="text-sm text-slate-500">{r.team_name}</p>
                  <p className="text-xs text-slate-400">{new Date(r.updated_at || r.created_at).toLocaleString()}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={r.status} />
                  <Link
                    to={`${base}/view/${r.id}`}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    View
                  </Link>
                  {r.status === 'APPROVED' ? (
                    <button
                      type="button"
                      onClick={() => exportSubmissionPdf(r)}
                      className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-orange-600"
                    >
                      Export as PDF
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
