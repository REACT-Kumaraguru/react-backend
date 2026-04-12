import { useEffect, useState } from 'react';
import { ClipboardList, Pencil, Plus, Trash2 } from 'lucide-react';
import {
  createProgramme,
  deleteProgramme,
  fetchProgrammes,
  fetchProgrammeSubmissions,
  updateProgramme,
} from '../../api/programmesApi';
import { useToast } from './Toast';
import ConfirmModal from './ConfirmModal';
import ProgrammeForm from './ProgrammeForm';
import ProgrammeSubmissionsModal from './ProgrammeSubmissionsModal';
import { normalizeAccentHex, legacyThemeFromAccent } from './programmeAccentColor';
import { emptyProgrammeForm, programmeToForm } from './programmeFormDefaults';
import { normalizeFormFieldType } from './programmeFormFieldTypes';

function formToPayload(form) {
  const info = (form.info || [])
    .map((x) => ({ label: String(x.label || '').trim(), value: String(x.value || '').trim() }))
    .filter((x) => x.label && x.value);
  const features = (form.features || []).map((s) => String(s).trim()).filter(Boolean);
  const formFields = (form.formFields || [])
    .map((x) => {
      const type = normalizeFormFieldType(x.type);
      const opts = (Array.isArray(x.options) ? x.options : [])
        .map((o) => String(o ?? '').trim())
        .filter((o, j, arr) => o && arr.findIndex((t) => t.toLowerCase() === o.toLowerCase()) === j)
        .slice(0, 50);
      return {
        id: String(x.id || '').trim(),
        name: String(x.name || '').trim(),
        type,
        required: !!x.required,
        numberAllowDecimals: type === 'number' ? !!x.numberAllowDecimals : false,
        fileAccept: type === 'file' ? String(x.fileAccept || '').trim().slice(0, 200) : '',
        options: type === 'dropdown' ? opts : [],
      };
    })
    .filter((x) => x.name);
  const accent = normalizeAccentHex(form.accentColor) || '#f97316';
  return {
    category: String(form.category || '').trim(),
    accentColor: accent,
    theme: legacyThemeFromAccent(accent),
    sort_order: Number.isFinite(Number(form.sort_order)) ? parseInt(form.sort_order, 10) : 0,
    slug: String(form.slug || '').trim(),
    title: String(form.title || '').trim(),
    tagline: String(form.tagline || '').trim(),
    shortDescription: String(form.shortDescription || '').trim(),
    longDescription: String(form.longDescription || '').trim(),
    info,
    features,
    eligibility: String(form.eligibility || '').trim(),
    buttonText: String(form.buttonText || '').trim() || 'Learn more',
    buttonLink: String(form.buttonLink || '').trim(),
    formFields,
  };
}

export default function ProgrammeAdmin() {
  const { toast } = useToast();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProgrammeForm());
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [submissionsOpen, setSubmissionsOpen] = useState(false);
  const [submissionsFor, setSubmissionsFor] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchProgrammes();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      toast(e.message || 'Failed to load', 'error');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(emptyProgrammeForm());
    setModalOpen(true);
  }

  function openEdit(row) {
    setEditingId(row.id);
    setForm(programmeToForm(row));
    setModalOpen(true);
  }

  async function handleSave(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const payload = formToPayload(form);
    if (!payload.title) {
      toast('Title is required', 'error');
      return;
    }
    if (!payload.slug) {
      toast('URL slug is required (e.g. social-innovation-fellowship)', 'error');
      return;
    }
    const unnamedFields = (form.formFields || []).filter((x) => !String(x.name || '').trim());
    if (unnamedFields.length) {
      toast('Each application form row needs a field name, or remove empty rows.', 'error');
      return;
    }
    const badDropdown = (form.formFields || []).find((x) => {
      if (normalizeFormFieldType(x.type) !== 'dropdown') return false;
      const opts = (Array.isArray(x.options) ? x.options : []).map((o) => String(o ?? '').trim()).filter(Boolean);
      return opts.length < 1;
    });
    if (badDropdown) {
      toast('Dropdown fields need at least one choice. Add options or change the type.', 'error');
      return;
    }
    if (!payload.info.length) {
      toast('Add at least one info field with label and value', 'error');
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateProgramme(editingId, payload);
        toast('Programme updated');
      } else {
        await createProgramme(payload);
        toast('Programme created');
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      toast(err.message || 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function openSubmissions(row) {
    setSubmissionsFor(row);
    setSubmissionsOpen(true);
    setSubmissionsLoading(true);
    setSubmissions([]);
    try {
      const data = await fetchProgrammeSubmissions(row.id);
      setSubmissions(Array.isArray(data) ? data : []);
    } catch (e) {
      toast(e.message || 'Could not load responses', 'error');
      setSubmissionsOpen(false);
      setSubmissionsFor(null);
    } finally {
      setSubmissionsLoading(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteProgramme(deleteTarget.id);
      toast('Programme deleted');
      setDeleteTarget(null);
      await load();
    } catch (err) {
      toast(err.message || 'Delete failed', 'error');
    }
  }

  return (
    <div className="py-8 px-4 md:pl-8 md:pr-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-serif text-3xl font-bold text-[#2D334A]">Manage Programmes</h1>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-600"
          >
            <Plus className="h-4 w-4" />
            Add programme
          </button>
        </div>

        <main>
          {loading ? (
            <p className="text-slate-500">Loading…</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-700">Title</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">URL slug</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Category</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Accent</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                          No programmes yet. Click &quot;Add programme&quot;.
                        </td>
                      </tr>
                    ) : (
                      rows.map((r) => (
                        <tr key={r.id} className="border-b border-slate-100 last:border-0">
                          <td className="px-4 py-3 font-medium text-slate-900">{r.title}</td>
                          <td className="px-4 py-3 font-mono text-xs text-slate-600">
                            {r.slug ? (
                              <span title={`/fellowship/${r.slug}`}>/fellowship/{r.slug}</span>
                            ) : (
                              '—'
                            )}
                          </td>
                          <td className="px-4 py-3 text-slate-600">{r.category || '—'}</td>
                          <td className="px-4 py-3">
                            <span
                              className="inline-block h-6 w-6 rounded-full border border-slate-200 shadow-sm align-middle"
                              style={{ backgroundColor: r.accentColor || (r.theme === 'purple' ? '#a855f7' : '#f97316') }}
                              title={r.accentColor || r.theme}
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => openEdit(r)}
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                <Pencil className="h-3.5 w-3.5" /> Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => openSubmissions(r)}
                                className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50/80 px-3 py-1.5 text-xs font-semibold text-indigo-800 hover:bg-indigo-100"
                              >
                                <ClipboardList className="h-3.5 w-3.5" /> Responses
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteTarget(r)}
                                className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px]"
            aria-label="Close"
            onClick={() => !saving && setModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="border-b border-slate-100 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">{editingId ? 'Edit programme' : 'Create programme'}</h2>
            </div>
            <div className="px-6 py-4">
              <ProgrammeForm value={form} onChange={setForm} idPrefix="adm" />
              <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSave}
                  className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
                >
                  {saving ? 'Saving…' : editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete programme?"
        message={deleteTarget ? `“${deleteTarget.title}” will be removed permanently.` : ''}
        confirmLabel="Delete"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <ProgrammeSubmissionsModal
        open={submissionsOpen}
        programme={submissionsFor}
        submissions={submissions}
        loading={submissionsLoading}
        onClose={() => {
          setSubmissionsOpen(false);
          setSubmissionsFor(null);
          setSubmissions([]);
        }}
      />
    </div>
  );
}
