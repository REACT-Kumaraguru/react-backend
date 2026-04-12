import { useState } from 'react';
import { submitProgrammeForm } from '../../api/programmesApi';
import { normalizeFormFieldType } from './programmeFormFieldTypes';

const fieldClass =
  'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20';
const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-slate-500';

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
          return (
            <div key={`${f.id}-${idx}`}>
              <label className={labelClass} htmlFor={inputId}>
                {f.name}
                {f.required ? <span className="text-red-500"> *</span> : null}
              </label>
              {kind === 'para' ? (
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
