import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSession } from '../../api/workplaceApi';
import { fetchRiskmSubmissions, approveRiskmSubmission, rejectRiskmSubmission } from '../../api/riskmApi';
import { useRiskmBase } from '../useRiskmBase';
import { exportSubmissionsCsv } from '../utils/exportRiskPdf';

export default function RiskMAdmin() {
  const navigate = useNavigate();
  const base = useRiskmBase();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(null);

  const load = useCallback(async () => {
    setError('');
    try {
      const data = await fetchRiskmSubmissions();
      setRows(data);
    } catch (e) {
      if (e.code === 401) {
        navigate('/workplace/login?returnUrl=/workplace/admin/riskm/admin', { replace: true });
        return;
      }
      setError(e.message || 'Could not load');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    getSession().then((s) => {
      if (!s) {
        setLoading(false);
        navigate('/workplace/login?returnUrl=/workplace/admin/riskm/admin', { replace: true });
        return;
      }
      if (s.role !== 'admin') {
        setLoading(false);
        navigate('/workplace/riskm/submissions', { replace: true });
        return;
      }
      load();
    });
  }, [navigate, load]);

  async function approve(id) {
    setBusy(id);
    setError('');
    try {
      await approveRiskmSubmission(id);
      await load();
    } catch (e) {
      setError(e.message || 'Failed');
    } finally {
      setBusy(null);
    }
  }

  async function reject(id) {
    if (!window.confirm('Reject this submission?')) return;
    setBusy(id);
    setError('');
    try {
      await rejectRiskmSubmission(id);
      await load();
    } catch (e) {
      setError(e.message || 'Failed');
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin — Risk submissions</h1>
          <p className="mt-1 text-sm text-slate-500">Review and approve assessments.</p>
        </div>
        <button
          type="button"
          onClick={() => exportSubmissionsCsv(rows)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Export CSV
        </button>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p className="p-8 text-center text-slate-500">Loading…</p>
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-4 py-3 font-semibold text-slate-800">Team</th>
                <th className="px-4 py-3 font-semibold text-slate-800">Project</th>
                <th className="px-4 py-3 font-semibold text-slate-800">Applicant</th>
                <th className="px-4 py-3 font-semibold text-slate-800">Date</th>
                <th className="px-4 py-3 font-semibold text-slate-800">Status</th>
                <th className="px-4 py-3 font-semibold text-slate-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No submissions.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-b border-slate-50 last:border-0">
                    <td className="px-4 py-3 font-medium text-slate-900">{r.team_name}</td>
                    <td className="px-4 py-3 text-slate-700">{r.project_title}</td>
                    <td className="px-4 py-3 text-slate-600">{r.applicant_email || '—'}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          r.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-900'
                            : r.status === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-red-100 text-red-900'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`${base}/view/${r.id}`}
                          className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          View
                        </Link>
                        {r.status === 'PENDING' ? (
                          <>
                            <button
                              type="button"
                              disabled={busy === r.id}
                              onClick={() => approve(r.id)}
                              className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              disabled={busy === r.id}
                              onClick={() => reject(r.id)}
                              className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
