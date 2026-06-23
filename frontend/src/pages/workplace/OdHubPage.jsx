import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileDown, Pencil } from 'lucide-react';
import { fetchUserOdSubmissions, odLetterUrl } from '../../api/workplaceApi';

function StatusBadge({ status }) {
  const map = {
    DRAFT: 'bg-gray-100 text-gray-800',
    PENDING: 'bg-amber-100 text-amber-900',
    APPROVED: 'bg-emerald-100 text-emerald-900',
    REJECTED: 'bg-red-100 text-red-900',
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[status] || 'bg-gray-100'}`}
    >
      {status}
    </span>
  );
}

function istFmt(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function OdHubPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setError('');
    try {
      const data = await fetchUserOdSubmissions();
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

  return (
    <div className="py-8 px-4 md:pl-8 md:pr-8 max-w-5xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2D334A]">On-duty (OD)</h1>
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Apply for on-duty, track status, and download your letter when approved. History is listed
            below.
          </p>
        </div>
        <Link
          to="/workplace/od/apply"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2D334A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#232838]"
        >
          <Plus className="h-4 w-4" aria-hidden />
          New OD application
        </Link>
      </div>

      {error ? (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {loading ? (
          <p className="p-8 text-center text-[#9CA3AF]">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="p-8 text-center text-[#9CA3AF]">No OD applications yet. Create one to get started.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Subject</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Status</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Sent (IST)</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Decision</th>
                  <th className="px-4 py-3 font-semibold text-[#2D334A]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3 font-medium text-[#2D334A] max-w-[240px] truncate" title={r.subject}>
                      {r.subject || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-4 py-3 text-[#2D334A]/90">{istFmt(r.sent_at)}</td>
                    <td className="px-4 py-3 text-xs text-[#2D334A]/80 max-w-[200px]">
                      {r.status === 'REJECTED' && r.admin_notes ? (
                        <span title={r.admin_notes}>Notes: {r.admin_notes}</span>
                      ) : r.decided_at ? (
                        istFmt(r.decided_at)
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {r.status === 'DRAFT' ? (
                          <Link
                            to={`/workplace/od/apply?id=${r.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B82F6] hover:underline"
                          >
                            <Pencil className="h-3.5 w-3.5" aria-hidden />
                            Edit
                          </Link>
                        ) : null}
                        {r.status === 'APPROVED' ? (
                          <a
                            href={odLetterUrl(r.id, false)}
                            download={`on-duty-letter-${r.id}.pdf`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B82F6] hover:underline"
                          >
                            <FileDown className="h-3.5 w-3.5" aria-hidden />
                            Download PDF
                          </a>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
