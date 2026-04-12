import { Plus, Trash2 } from 'lucide-react';
import { normalizeAccentHex } from './programmeAccentColor';
import { emptyFormField, emptyProgrammeForm } from './programmeFormDefaults';
import { normalizeFormFieldType } from './programmeFormFieldTypes';

function slugifyTitle(title) {
  return String(title || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

const input =
  'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20';
const label = 'block text-xs font-semibold uppercase tracking-wide text-slate-500';

export default function ProgrammeForm({ value, onChange, idPrefix = 'pf' }) {
  const form = value || emptyProgrammeForm();

  function setField(k, v) {
    onChange({ ...form, [k]: v });
  }

  function setInfo(i, field, v) {
    const next = [...(form.info || [])];
    next[i] = { ...next[i], [field]: v };
    onChange({ ...form, info: next });
  }

  function addInfo() {
    onChange({ ...form, info: [...(form.info || []), { label: '', value: '' }] });
  }

  function removeInfo(i) {
    const next = (form.info || []).filter((_, j) => j !== i);
    onChange({ ...form, info: next.length ? next : [{ label: '', value: '' }] });
  }

  function setFeature(i, v) {
    const next = [...(form.features || [])];
    next[i] = v;
    onChange({ ...form, features: next });
  }

  function addFeature() {
    onChange({ ...form, features: [...(form.features || []), ''] });
  }

  function removeFeature(i) {
    const next = (form.features || []).filter((_, j) => j !== i);
    onChange({ ...form, features: next.length ? next : [''] });
  }

  function setFormField(i, key, v) {
    const next = [...(form.formFields || [])];
    next[i] = { ...next[i], [key]: v };
    onChange({ ...form, formFields: next });
  }

  function addFormField() {
    onChange({ ...form, formFields: [...(form.formFields || []), emptyFormField()] });
  }

  function removeFormField(i) {
    const next = (form.formFields || []).filter((_, j) => j !== i);
    onChange({ ...form, formFields: next });
  }

  return (
    <div className="max-h-[min(78vh,720px)] space-y-5 overflow-y-auto pr-1">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor={`${idPrefix}-category`}>
            Category (optional)
          </label>
          <input
            id={`${idPrefix}-category`}
            className={input}
            value={form.category}
            onChange={(e) => setField('category', e.target.value)}
            placeholder="e.g. Fellowship"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Card accent color</label>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <input
              id={`${idPrefix}-accent`}
              type="color"
              className="h-10 w-14 cursor-pointer rounded border border-slate-200 bg-white p-0.5"
              value={normalizeAccentHex(form.accentColor) || '#f97316'}
              onChange={(e) => setField('accentColor', e.target.value)}
              title="Pick colour for top border and bullets"
            />
            <input
              type="text"
              className={`${input} max-w-[140px]`}
              value={normalizeAccentHex(form.accentColor) || '#f97316'}
              onChange={(e) => setField('accentColor', e.target.value)}
              placeholder="#f97316"
              spellCheck={false}
            />
            <div className="flex flex-wrap gap-2">
              {['#f97316', '#ea580c', '#a855f7', '#7c3aed', '#0ea5e9', '#059669'].map((hex) => (
                <button
                  key={hex}
                  type="button"
                  title={hex}
                  className="h-8 w-8 rounded border border-slate-200 shadow-sm ring-offset-1 hover:ring-2 hover:ring-slate-300"
                  style={{ backgroundColor: hex }}
                  onClick={() => setField('accentColor', hex)}
                />
              ))}
            </div>
          </div>
          <p className="mt-1 text-xs text-slate-500">Used for the top border and feature bullets on the public card.</p>
        </div>
        <div>
          <label className={label} htmlFor={`${idPrefix}-sort`}>
            Sort order
          </label>
          <input
            id={`${idPrefix}-sort`}
            type="number"
            className={input}
            value={form.sort_order}
            onChange={(e) => setField('sort_order', parseInt(e.target.value, 10) || 0)}
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor={`${idPrefix}-title`}>
          Title *
        </label>
        <input
          id={`${idPrefix}-title`}
          className={input}
          value={form.title}
          onChange={(e) => setField('title', e.target.value)}
          required
        />
      </div>

      <div>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <label className={`${label} flex-1`} htmlFor={`${idPrefix}-slug`}>
            URL slug * <span className="font-normal normal-case text-slate-400">/programmes/…</span>
          </label>
          <button
            type="button"
            className="mb-1 text-xs font-semibold text-orange-600 hover:underline"
            onClick={() => setField('slug', slugifyTitle(form.title))}
          >
            Generate from title
          </button>
        </div>
        <input
          id={`${idPrefix}-slug`}
          className={input}
          value={form.slug}
          onChange={(e) => setField('slug', e.target.value)}
          placeholder="e.g. venture-fellowship"
          required
        />
        <p className="mt-1 text-xs text-slate-500">Public page: /programmes/{form.slug?.trim() || 'your-slug'}</p>
      </div>

      <div>
        <label className={label}>Tagline (small uppercase)</label>
        <input className={input} value={form.tagline} onChange={(e) => setField('tagline', e.target.value)} />
      </div>

      <div>
        <label className={label}>Short description</label>
        <textarea
          rows={3}
          className={input}
          value={form.shortDescription}
          onChange={(e) => setField('shortDescription', e.target.value)}
        />
      </div>

      <div>
        <label className={label}>Long description</label>
        <textarea
          rows={5}
          className={input}
          value={form.longDescription}
          onChange={(e) => setField('longDescription', e.target.value)}
        />
      </div>

      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-800">Info row (label + value) *</span>
          <button
            type="button"
            onClick={addInfo}
            className="inline-flex items-center gap-1 rounded-lg border border-orange-200 bg-white px-3 py-1.5 text-xs font-semibold text-orange-700 hover:bg-orange-50"
          >
            <Plus className="h-3.5 w-3.5" /> Add field
          </button>
        </div>
        <div className="space-y-3">
          {(form.info || []).map((row, i) => (
            <div key={i} className="flex flex-wrap items-end gap-2">
              <div className="min-w-[120px] flex-1">
                <label className={label}>Label</label>
                <input className={input} value={row.label} onChange={(e) => setInfo(i, 'label', e.target.value)} placeholder="Duration" />
              </div>
              <div className="min-w-[120px] flex-1">
                <label className={label}>Value</label>
                <input className={input} value={row.value} onChange={(e) => setInfo(i, 'value', e.target.value)} placeholder="2 Years" />
              </div>
              <button
                type="button"
                onClick={() => removeInfo(i)}
                className="mb-1 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Remove row"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-800">Features (bullets)</span>
          <button
            type="button"
            onClick={addFeature}
            className="inline-flex items-center gap-1 rounded-lg border border-orange-200 bg-white px-3 py-1.5 text-xs font-semibold text-orange-700 hover:bg-orange-50"
          >
            <Plus className="h-3.5 w-3.5" /> Add feature
          </button>
        </div>
        <div className="space-y-2">
          {(form.features || []).map((line, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={input}
                value={line}
                onChange={(e) => setFeature(i, e.target.value)}
                placeholder="Feature text"
              />
              <button
                type="button"
                onClick={() => removeFeature(i)}
                className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-sm font-semibold text-slate-800">Application form (optional)</span>
            <p className="mt-0.5 text-xs text-slate-600">
              Shown on the programme page after details. Add inputs like Forms: name, type (text, paragraph, number, email).
            </p>
          </div>
          <button
            type="button"
            onClick={addFormField}
            className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-800 hover:bg-indigo-50"
          >
            <Plus className="h-3.5 w-3.5" /> Add input
          </button>
        </div>
        <div className="space-y-4">
          {(form.formFields || []).length === 0 ? (
            <p className="text-sm text-slate-500">No fields — add inputs for applicants to fill on /programmes/your-slug</p>
          ) : null}
          {(form.formFields || []).map((row, i) => (
            <div key={row.id || i} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex flex-wrap items-end gap-2">
                <div className="min-w-[140px] flex-1">
                  <label className={label}>Field name</label>
                  <input
                    className={input}
                    value={row.name}
                    onChange={(e) => setFormField(i, 'name', e.target.value)}
                    placeholder="e.g. Full name"
                  />
                </div>
                <div className="w-full min-w-[160px] sm:w-44">
                  <label className={label} htmlFor={`${idPrefix}-ftype-${i}`}>
                    Type
                  </label>
                  <select
                    id={`${idPrefix}-ftype-${i}`}
                    className={input}
                    value={normalizeFormFieldType(row.type)}
                    onChange={(e) => {
                      e.stopPropagation();
                      const t = e.target.value;
                      setFormField(i, 'type', t);
                      if (t !== 'number') setFormField(i, 'numberAllowDecimals', false);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <option value="text">Text (single line)</option>
                    <option value="para">Paragraph</option>
                    <option value="number">Number</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                <label className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={!!row.required}
                    onChange={(e) => setFormField(i, 'required', e.target.checked)}
                    className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                  />
                  Required
                </label>
                {row.type === 'number' ? (
                  <label className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={!!row.numberAllowDecimals}
                      onChange={(e) => setFormField(i, 'numberAllowDecimals', e.target.checked)}
                      className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                    />
                    Allow decimals
                  </label>
                ) : null}
                <button
                  type="button"
                  onClick={() => removeFormField(i)}
                  className="mb-1 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  aria-label="Remove field"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className={label}>Eligibility (footer)</label>
        <input className={input} value={form.eligibility} onChange={(e) => setField('eligibility', e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Footer button text</label>
          <input
            className={input}
            value={form.buttonText}
            onChange={(e) => setField('buttonText', e.target.value)}
            placeholder="e.g. Learn more"
          />
          <p className="mt-1 text-xs text-slate-500">
            Shown on the card footer. By default this button opens your programme page where the application form lives.
          </p>
        </div>
        <div>
          <label className={label}>Button link override (optional)</label>
          <input
            className={input}
            value={form.buttonLink}
            onChange={(e) => setField('buttonLink', e.target.value)}
            placeholder="Leave empty = link to form page (/programmes/slug)"
          />
          <p className="mt-1 text-xs text-slate-500">
            Leave empty so visitors use the button to go to the form. Set a URL only to send them elsewhere instead.
          </p>
        </div>
      </div>
    </div>
  );
}
