import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { createProject, deleteProject, fetchProjects, updateProject } from '../../api/projectsApi';
import ProjectCard from '../ProgrammesCom/ProjectCard';
import ConfirmModal from '../programmes/ConfirmModal';
import { useToast } from '../programmes/Toast';
import ProjectForm from './ProjectForm';
import { emptyProjectForm, projectFormToPayload, projectToForm } from './projectFormDefaults';

export default function ProjectsAdmin() {
  const { toast } = useToast();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProjectForm());
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchProjects();
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
    setForm(emptyProjectForm());
    setModalOpen(true);
  }

  function openEdit(row) {
    setEditingId(row.id);
    setForm(projectToForm(row));
    setModalOpen(true);
  }

  async function handleSave() {
    const payload = projectFormToPayload(form);
    if (!payload.title) {
      toast('Title is required', 'error');
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateProject(editingId, payload);
        toast('Project updated');
      } else {
        await createProject(payload);
        toast('Project created');
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      toast(err.message || 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteProject(deleteTarget.id);
      toast('Project deleted');
      setDeleteTarget(null);
      await load();
    } catch (err) {
      toast(err.message || 'Delete failed', 'error');
    }
  }

  const previewProps = (() => {
    const p = projectFormToPayload(form);
    return {
      title: p.title || ' ',
      tagline: p.tagline,
      who: p.who,
      duration: p.duration,
      format: p.format,
      description: p.description,
      brief: p.brief,
      briefIdea: p.briefIdea,
      ctaLabel: p.ctaLabel,
      postedDate: p.postedDate,
      imageUrl: p.imageUrl,
    };
  })();

  return (
    <div className="py-8 px-4 md:pl-8 md:pr-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#2D334A]">Field projects</h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              These cards appear on the public <span className="font-mono text-xs">/projects</span> page. Lower sort
              order shows first.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-600"
          >
            <Plus className="h-4 w-4" />
            Add project
          </button>
        </div>

        <main>
          {loading ? (
            <p className="text-slate-500">Loading…</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-700">Title</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Sort</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-10 text-center text-slate-500">
                          No projects yet. Click &quot;Add project&quot; — they will show on /projects.
                        </td>
                      </tr>
                    ) : (
                      rows.map((r) => (
                        <tr key={r.id} className="border-b border-slate-100 last:border-0">
                          <td className="px-4 py-3 font-medium text-slate-900">{r.title || '—'}</td>
                          <td className="px-4 py-3 text-slate-600">{r.sort_order ?? 0}</td>
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
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px]"
            aria-label="Close"
            onClick={() => !saving && setModalOpen(false)}
          />
          <div className="relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="shrink-0 border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-slate-900">{editingId ? 'Edit project' : 'Create project'}</h2>
              <p className="mt-1 text-xs text-slate-500">The preview matches the /projects card layout.</p>
            </div>
            <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6 lg:max-w-[52%]">
                <ProjectForm value={form} onChange={setForm} idPrefix="admproj" />
              </div>
              <aside className="flex shrink-0 flex-col border-t border-slate-100 bg-slate-50/90 lg:max-w-[48%] lg:border-l lg:border-t-0">
                <div className="border-b border-slate-100/80 px-4 py-3 sm:px-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Live preview</p>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
                  <ProjectCard {...previewProps} preview />
                </div>
              </aside>
            </div>
            <div className="flex shrink-0 flex-wrap justify-end gap-3 border-t border-slate-100 px-5 py-4 sm:px-6">
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
      ) : null}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete project?"
        message={deleteTarget ? `“${deleteTarget.title}” will be removed from /projects.` : ''}
        confirmLabel="Delete"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
