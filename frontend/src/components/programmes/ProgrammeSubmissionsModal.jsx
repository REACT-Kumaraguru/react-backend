import { Download, FileSpreadsheet, X } from 'lucide-react';
import { exportProgrammeResponsesToExcel } from './exportProgrammeResponsesXlsx';
import { useToast } from './Toast';

function isFileAnswer(val) {
  return !!(val && typeof val === 'object' && typeof val.dataBase64 === 'string' && val.fileName);
}

function safeDownloadFilename(name) {
  const s = String(name || 'download').replace(/[/\\?%*:|"<>]/g, '-').trim();
  return s.slice(0, 200) || 'download';
}

function base64ToBlob(base64, mimeType) {
  const raw = String(base64).replace(/\s/g, '');
  const binary = atob(raw);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mimeType || 'application/octet-stream' });
}

function formatAnswer(val) {
  if (val === undefined || val === null) return '—';
  if (typeof val === 'number') return String(val);
  if (isFileAnswer(val)) {
    const kb = typeof val.size === 'number' ? Math.max(1, Math.round(val.size / 1024)) : null;
    return kb != null ? `Uploaded: ${val.fileName} (${kb} KB)` : `Uploaded: ${val.fileName}`;
  }
  const s = String(val);
  return s.length > 2000 ? `${s.slice(0, 2000)}…` : s;
}

function FileAnswerRow({ val }) {
  const { toast } = useToast();
  if (!isFileAnswer(val)) return <span className="text-slate-500">—</span>;
  const kb = typeof val.size === 'number' ? Math.max(1, Math.round(val.size / 1024)) : null;

  function handleDownload() {
    try {
      const blob = base64ToBlob(val.dataBase64, val.mimeType);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = safeDownloadFilename(val.fileName);
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast('Could not download this file', 'error');
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-slate-700">
        {kb != null ? `${val.fileName} (${kb} KB)` : val.fileName}
      </span>
      <button
        type="button"
        onClick={handleDownload}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
      >
        <Download className="h-3.5 w-3.5" aria-hidden />
        Download
      </button>
    </div>
  );
}

/**
 * Admin modal: list submitted application forms for one programme.
 */
export default function ProgrammeSubmissionsModal({ open, programme, submissions, loading, onClose }) {
  const { toast } = useToast();

  if (!open || !programme) return null;

  function handleExportExcel() {
    if (loading) return;
    if (!submissions.length) {
      toast('No responses to export yet', 'error');
      return;
    }
    const ok = exportProgrammeResponsesToExcel(programme, submissions);
    if (ok) toast('Excel file downloaded');
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px]" aria-label="Close" onClick={onClose} />
      <div
        role="dialog"
        aria-labelledby="submissions-modal-title"
        className="relative z-10 flex max-h-[min(90vh,800px)] w-full max-w-3xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-4">
          <div>
            <h2 id="submissions-modal-title" className="text-lg font-semibold text-slate-900">
              Form responses
            </h2>
            <p className="mt-1 text-sm text-slate-600">{programme.title}</p>
            <p className="mt-0.5 font-mono text-xs text-slate-500">
              /fellowship/{programme.slug} · /fellowship/{programme.slug}/forms
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleExportExcel}
              disabled={loading || submissions.length === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export Excel
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <p className="text-sm text-slate-500">Loading…</p>
          ) : submissions.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
              No submissions yet. Responses appear here after visitors submit the form at /fellowship/your-slug/forms.
            </p>
          ) : (
            <ul className="space-y-6">
              {submissions.map((sub) => (
                <li key={sub.id} className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {sub.created_at
                      ? new Date(sub.created_at).toLocaleString(undefined, {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })
                      : '—'}
                  </p>
                  <dl className="mt-3 space-y-2">
                    {(sub.fieldMeta || []).length > 0
                      ? sub.fieldMeta.map((meta) => (
                          <div key={meta.id} className="grid gap-1 sm:grid-cols-[minmax(0,140px)_1fr] sm:gap-3">
                            <dt className="text-sm font-semibold text-slate-800">{meta.name}</dt>
                            <dd className="min-w-0 text-sm text-slate-700">
                              {isFileAnswer(sub.answers?.[meta.id]) ? (
                                <FileAnswerRow val={sub.answers[meta.id]} />
                              ) : (
                                <span className="whitespace-pre-wrap">{formatAnswer(sub.answers?.[meta.id])}</span>
                              )}
                            </dd>
                          </div>
                        ))
                      : Object.entries(sub.answers || {}).map(([key, val]) => (
                          <div key={key} className="grid gap-1 sm:grid-cols-[minmax(0,140px)_1fr] sm:gap-3">
                            <dt className="text-sm font-semibold text-slate-800">{key}</dt>
                            <dd className="min-w-0 text-sm text-slate-700">
                              {isFileAnswer(val) ? (
                                <FileAnswerRow val={val} />
                              ) : (
                                <span className="whitespace-pre-wrap">{formatAnswer(val)}</span>
                              )}
                            </dd>
                          </div>
                        ))}
                  </dl>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
