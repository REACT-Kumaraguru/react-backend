import { useState } from 'react';
import { submitProgrammeForm } from '../../api/programmesApi';
import { normalizeFormFieldType } from './programmeFormFieldTypes';

const fieldClass =
  'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20';
const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-slate-500';

const MAX_FILE_BYTES = 4 * 1024 * 1024;

function readFilePayload(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      const comma = dataUrl.indexOf(',');
      const dataBase64 = comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
      resolve({
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream',
        dataBase64,
      });
    };
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Renders admin-defined fields and submits to public API.
 */
export default function ProgrammeDynamicForm({ slug, fields, onSuccess }) {
  const [values, setValues] = useState(() => ({}));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  if (!Array.isArray(fields) || fields.length === 0) return null;

  function setVal(id, v) {
    setValues((prev) => ({ ...prev, [id]: v }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await submitProgrammeForm(slug, values);
      setDone(true);
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-6 py-8 text-center">
        <p className="text-lg font-semibold text-emerald-900">Thank you — your response was submitted.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
      <h2 className="font-serif text-xl font-bold text-slate-900">Apply / next steps</h2>
      <p className="mt-1 text-sm text-slate-600">Complete the fields below.</p>

      <div className="mt-6 space-y-5">
        {fields.map((f, idx) => {
          const kind = normalizeFormFieldType(f.type);
          const inputId = `pf-${f.id}-${idx}`;
          const accept = String(f.fileAccept || '').trim() || undefined;
          const dropdownOpts = (Array.isArray(f.options) ? f.options : [])
            .map((o) => String(o ?? '').trim())
            .filter(Boolean);

          return (
            <div key={`${f.id}-${idx}`}>
              <label className={labelClass} htmlFor={inputId}>
                {f.name}
                {f.required ? <span className="text-red-500"> *</span> : null}
              </label>
              {kind === 'dropdown' ? (
                dropdownOpts.length > 0 ? (
                  <select
                    id={inputId}
                    required={!!f.required}
                    className={fieldClass}
                    value={values[f.id] ?? ''}
                    onChange={(e) => setVal(f.id, e.target.value)}
                  >
                    {!f.required ? <option value="">— Choose —</option> : null}
                    {dropdownOpts.map((opt, oidx) => (
                      <option key={`${f.id}-${oidx}-${opt}`} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="mt-1 text-sm text-amber-800">This question has no choices yet. Contact the team.</p>
                )
              ) : kind === 'para' ? (
                <textarea
                  id={inputId}
                  rows={4}
                  required={!!f.required}
                  className={fieldClass}
                  value={values[f.id] ?? ''}
                  onChange={(e) => setVal(f.id, e.target.value)}
                />
              ) : kind === 'number' ? (
                <input
                  id={inputId}
                  type="text"
                  inputMode={f.numberAllowDecimals ? 'decimal' : 'numeric'}
                  required={!!f.required}
                  autoComplete="off"
                  className={fieldClass}
                  value={values[f.id] ?? ''}
                  onChange={(e) => setVal(f.id, e.target.value)}
                />
              ) : kind === 'file' ? (
                <div>
                  <input
                    id={inputId}
                    type="file"
                    required={!!f.required && !values[f.id]?.dataBase64}
                    accept={accept}
                    className={`${fieldClass} cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-800 hover:file:bg-slate-200`}
                    onChange={async (e) => {
                      setError('');
                      const file = e.target.files?.[0];
                      if (!file) {
                        setVal(f.id, undefined);
                        return;
                      }
                      if (file.size > MAX_FILE_BYTES) {
                        setError('Each file must be 4 MB or smaller.');
                        e.target.value = '';
                        setVal(f.id, undefined);
                        return;
                      }
                      try {
                        const payload = await readFilePayload(file);
                        setVal(f.id, payload);
                      } catch {
                        setError('Could not read the selected file. Try again.');
                        e.target.value = '';
                        setVal(f.id, undefined);
                      }
                    }}
                  />
                  {values[f.id]?.fileName ? (
                    <p className="mt-1 text-xs text-slate-600">Selected: {values[f.id].fileName}</p>
                  ) : null}
                </div>
              ) : (
                <input
                  id={inputId}
                  type={kind === 'email' ? 'email' : 'text'}
                  required={!!f.required}
                  autoComplete={kind === 'email' ? 'email' : 'on'}
                  className={fieldClass}
                  value={values[f.id] ?? ''}
                  onChange={(e) => setVal(f.id, e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>

      {error ? (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-slate-800 disabled:opacity-50"
        >
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
