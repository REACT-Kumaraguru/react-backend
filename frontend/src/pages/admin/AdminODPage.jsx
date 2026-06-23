import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Download, ExternalLink, Trash2 } from 'lucide-react';
import { fetchAdminOdSubmissions, adminDecideOd, adminDeleteOdSubmission, odLetterUrl } from '../../api/workplaceApi';

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

export default function AdminODPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchQ, setSearchQ] = useState('');

  async function load() {
    setError('');
    try {
      const data = await fetchAdminOdSubmissions({
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
        q: searchQ || undefined,
      });
      setRows(data);
    } catch (e) {
      setError(e.message || 'Could not load');
      if (e.message === 'UNAUTHORIZED' || e.code === 401) {
        navigate('/workplace/login', { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- filter dates reload list; search uses Apply
  }, [dateFrom, dateTo]);

  useEffect(() => {
    if (selected) {
      setAdminNotes(selected.admin_notes || '');
    }
  }, [selected]);

  async function decide(id, status) {
    setBusyId(id);
    setError('');
    try {
      await adminDecideOd(id, status, adminNotes);
      setSelected(null);
      await load();
    } catch (e) {
      setError(e.message || 'Update failed');
    } finally {
      setBusyId(null);
    }
  }

  async function removeSubmission(id) {
    if (
      !window.confirm(
        'Delete this OD submission permanently? This cannot be undone.',
      )
    ) {
      return;
    }
    setBusyId(id);
    setError('');
    try {
      await adminDeleteOdSubmission(id);
      if (selected?.id === id) setSelected(null);
      await load();
    } catch (e) {
      setError(e.message || 'Delete failed');
      if (e.message === 'UNAUTHORIZED' || e.code === 401) {
        navigate('/workplace/login', { replace: true });
      }
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="py-8 px-4 md:pl-8 md:pr-8">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-[#2D334A]">OD submissions</h1>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          Review on-duty requests. Filter by submission date (IST) and search subject or names.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-end">
        <div>
          <label htmlFor="odFrom" className="mb-1 block text-xs font-medium text-[#9CA3AF]">
            From date
          </label>
          <input
            id="odFrom"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#2D334A]"
          />
        </div>
        <div>
          <label htmlFor="odTo" className="mb-1 block text-xs font-medium text-[#9CA3AF]">
            To date
          </label>
          <input
            id="odTo"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#2D334A]"
          />
        </div>
        <div className="min-w-0 flex-1 sm:min-w-[200px]">
          <label htmlFor="odSearch" className="mb-1 block text-xs font-medium text-[#9CA3AF]">
            Search
          </label>
          <input
            id="odSearch"
            type="search"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Subject, student, applicant, email…"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#2D334A]"
          />
        </div>
        <button
          type="button"
          onClick={() => load()}
          className="rounded-lg bg-[#2D334A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#232838]"
        >
          Apply filters
        </button>
      </div>

      {error ? (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {loading ? (
            <p className="p-8 text-center text-[#9CA3AF]">Loading…</p>
          ) : rows.length === 0 ? (
            <p className="p-8 text-center text-[#9CA3AF]">No OD submissions match.</p>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto divide-y divide-gray-100">
              {rows.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelected(r)}
                  className={`flex w-full flex-col items-start gap-1 px-4 py-3 text-left text-sm hover:bg-gray-50 ${
                    selected?.id === r.id ? 'bg-[#2D334A]/5' : ''
                  }`}
                >
                  <span className="font-semibold text-[#2D334A]">{r.subject || '(No subject)'}</span>
                  <span className="text-xs text-[#9CA3AF]">
                    {r.applicant_name} · {r.student_name}
                  </span>
                  <span className="text-[11px] text-[#9CA3AF]">
                    Sent: {istFmt(r.sent_at)} · Updated: {istFmt(r.updated_at)} IST
                  </span>
                  <StatusBadge status={r.status} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          {!selected ? (
            <p className="text-sm text-[#9CA3AF]">Select a submission to review.</p>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-serif text-lg font-bold text-[#2D334A]">Review</h2>
                <a
                  href={odLetterUrl(selected.id, true, { format: 'html' })}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#2D334A] hover:bg-gray-50"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  Preview letter
                </a>
              </div>
              <dl className="grid gap-2 text-sm">
                <div>
                  <dt className="text-[#9CA3AF]">Applicant</dt>
                  <dd className="text-[#2D334A]">
                    {selected.applicant_name} ({selected.applicant_email})
                  </dd>
                </div>
                <div>
                  <dt className="text-[#9CA3AF]">Student / Reg. no.</dt>
                  <dd className="text-[#2D334A]">
                    {selected.student_name} · {selected.register_number || '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#9CA3AF]">Dates</dt>
                  <dd className="text-[#2D334A]">
                    {String(selected.from_date).slice(0, 10)} → {String(selected.to_date).slice(0, 10)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#9CA3AF]">Sent (IST)</dt>
                  <dd className="text-[#2D334A]">{istFmt(selected.sent_at)}</dd>
                </div>
                <div>
                  <dt className="text-[#9CA3AF]">Last updated (IST)</dt>
                  <dd className="text-[#2D334A]">{istFmt(selected.updated_at)}</dd>
                </div>
                <div>
                  <dt className="text-[#9CA3AF]">Status</dt>
                  <dd>
                    <StatusBadge status={selected.status} />
                  </dd>
                </div>
              </dl>
              <div>
                <label htmlFor="adminNotes" className="mb-1 block text-xs font-medium text-[#9CA3AF]">
                  Admin notes (for student to see if rejected / record)
                </label>
                <textarea
                  id="adminNotes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                  disabled={selected.status !== 'PENDING'}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#2D334A] outline-none focus:border-[#3B82F6]"
                />
              </div>
              {selected.status === 'PENDING' ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={busyId === selected.id}
                    onClick={() => decide(selected.id, 'APPROVED')}
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                  >
                    <Check className="h-4 w-4" aria-hidden />
                    Approve
                  </button>
                  <button
                    type="button"
                    disabled={busyId === selected.id}
                    onClick={() => decide(selected.id, 'REJECTED')}
                    className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    <X className="h-4 w-4" aria-hidden />
                    Reject
                  </button>
                </div>
              ) : (
                <p className="text-xs text-[#9CA3AF]">
                  Decision at {istFmt(selected.decided_at)} IST
                  {selected.admin_notes ? ` · Notes: ${selected.admin_notes}` : ''}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={odLetterUrl(selected.id, true)}
                  download={`on-duty-letter-${selected.id}.pdf`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:underline"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download PDF
                </a>
                <button
                  type="button"
                  disabled={busyId === selected.id}
                  onClick={() => removeSubmission(selected.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  Delete submission
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
