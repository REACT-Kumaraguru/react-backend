import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronLeft, ChevronRight, Trash2, Plus } from 'lucide-react';
import { getSession } from '../../api/workplaceApi';
import { createRiskmSubmission } from '../../api/riskmApi';
import {
  emptyPayload,
  normalizePayload,
  DRAFT_KEY,
  PRIORITY_LEVELS,
  PPE_OPTIONS,
  FIRST_AID_OPTIONS,
  FIRE_SAFETY_OPTIONS,
  formatPriorityLabel,
  formatPpeSummary,
} from '../lib/formDefaults';
import { computeRiskLevel } from '../lib/riskMatrix';
import { useRiskmBase } from '../useRiskmBase';

const LEGACY_DRAFT_KEY = 'riskm-draft';
const TOTAL_STEPS = 11;

const HAZARD_TYPES = ['Electrical', 'Mechanical', 'Chemical', 'Thermal', 'Fire', 'Others'];
const LS = ['Low', 'Medium', 'High'];

const input =
  'mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-orange-500/0 transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20';
const inputOrange =
  'mt-1 w-full rounded-xl border-2 border-orange-500 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-orange-500/0 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20';
const label = 'block text-xs font-semibold uppercase tracking-wide text-slate-500';
const sectionTitle = 'text-lg font-semibold text-slate-900';

function StepHeader({ n, title, required }) {
  return (
    <div className="mb-4 border-b border-orange-200 pb-3">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white"
          aria-hidden
        >
          {n}
        </span>
        <h2 className={`${sectionTitle} flex items-center gap-1`}>
          {title}
          {required ? <span className="text-red-500">*</span> : null}
        </h2>
      </div>
    </div>
  );
}

const nid = () => `id-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

function PrioritySelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClose(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClose);
    return () => document.removeEventListener('mousedown', handleClose);
  }, []);

  const selected = PRIORITY_LEVELS.find((x) => x.value === value);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border-2 border-orange-500 bg-white px-4 py-3 text-left shadow-sm transition hover:bg-orange-50/50 focus:outline-none focus:ring-2 focus:ring-orange-500/25"
      >
        <span className="flex min-h-[1.5rem] flex-1 flex-wrap items-center gap-2">
          {selected ? (
            <>
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${selected.dot}`} aria-hidden />
              <span
                className={`rounded-lg border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${selected.badge}`}
              >
                {selected.value}
              </span>
              <span className="text-sm font-medium text-slate-800">{selected.label}</span>
            </>
          ) : (
            <span className="text-sm text-slate-400">Select Priority Level</span>
          )}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          className="absolute z-40 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg ring-1 ring-black/5"
          role="listbox"
        >
          {PRIORITY_LEVELS.map((o) => (
            <li key={o.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === o.value}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-800 transition hover:bg-orange-50"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${o.dot}`} aria-hidden />
                <span className="font-medium">{o.label}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function RiskMNewSubmission() {
  const navigate = useNavigate();
  const base = useRiskmBase();
  const [step, setStep] = useState(1);
  const [payload, setPayload] = useState(() => normalizePayload(emptyPayload()));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSession().then((s) => {
      if (s?.role === 'admin') {
        navigate('/workplace/admin/riskm/admin', { replace: true });
        return;
      }
      setSession(s);
      if (s?.name || s?.email || s?.phone) {
        setPayload((prev) => ({
          ...prev,
          step1: {
            ...prev.step1,
            studentName: s.name || prev.step1.studentName,
            studentEmail: s.email || prev.step1.studentEmail,
            contact: s.phone || prev.step1.contact,
          },
        }));
      }
    });
  }, [navigate]);

  useEffect(() => {
    try {
      let raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) raw = localStorage.getItem(LEGACY_DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.payload && window.confirm('Resume saved draft?')) {
          setPayload(normalizePayload(d.payload));
          setStep(Math.min(Number(d.step) || 1, TOTAL_STEPS));
        }
      }
    } catch {
      /* */
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ step, payload }));
      } catch {
        /* */
      }
    }, 600);
    return () => clearTimeout(t);
  }, [step, payload]);

  const progress = useMemo(() => Math.round((step / TOTAL_STEPS) * 100), [step]);

  const setP = useCallback((fn) => {
    setPayload((prev) => (typeof fn === 'function' ? fn(prev) : { ...prev, ...fn }));
  }, []);

  function validate(s) {
    const p = payload;
    if (s === 1) {
      const a = p.step1;
      return (
        a.projectTitle?.trim() &&
        a.teamName?.trim() &&
        a.location?.trim() &&
        a.startDateTime &&
        a.endDateTime &&
        a.facultyName?.trim() &&
        a.facultyEmail?.trim() &&
        a.studentName?.trim() &&
        a.studentEmail?.trim() &&
        a.contact?.trim()
      );
    }
    if (s === 2) return ['HIGH', 'MEDIUM', 'LOW'].includes(p.step2.priority);
    if (s === 3) {
      return (
        p.step3.objective?.trim() && p.step3.methodology?.trim() && p.step3.equipment?.trim()
      );
    }
    if (s === 4) {
      return p.step4.hazards?.length && p.step4.hazards.every((h) => h.activity?.trim());
    }
    if (s === 5) {
      return p.step5.evaluations?.every((e) => e.hazard?.trim() && e.likelihood && e.severity);
    }
    if (s === 6) {
      return p.step6.controls?.every((c) => c.hazard?.trim() && c.preventive?.trim() && c.actions?.trim());
    }
    if (s === 7) {
      return true;
    }
    if (s === 8) {
      return !!p.step8.emergencyShutdown?.trim();
    }
    if (s === 9) {
      return (
        p.step9.wasteType?.trim() &&
        p.step9.disposalMethod?.trim() &&
        p.step9.environmentalImpact?.trim()
      );
    }
    if (s === 10) {
      return p.step10.teamLeadName?.trim() && p.step10.date && p.step10.confirmed === true;
    }
    if (s === 11) return true;
    return true;
  }

  function validateAll() {
    for (let s = 1; s <= 10; s += 1) {
      if (!validate(s)) return false;
    }
    return true;
  }

  function syncEvalRisk() {
    setPayload((prev) => ({
      ...prev,
      step5: {
        ...prev.step5,
        evaluations: (prev.step5.evaluations || []).map((e) => ({
          ...e,
          riskLevel: computeRiskLevel(e.likelihood, e.severity),
        })),
      },
    }));
  }

  async function submit() {
    if (!validateAll()) {
      setError('Please complete all required steps. Use Back to edit.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await createRiskmSubmission(payload);
      try {
        localStorage.removeItem(DRAFT_KEY);
        localStorage.removeItem(LEGACY_DRAFT_KEY);
      } catch {
        /* */
      }
      navigate(`${base}/submissions`, { replace: true, state: { riskmSuccess: true } });
    } catch (e) {
      setError(e.message || 'Submit failed');
    } finally {
      setSaving(false);
    }
  }

  const next = () => {
    if (!validate(step)) {
      setError('Please fill all required fields in this step.');
      return;
    }
    setError('');
    if (step === 5) syncEvalRisk();
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const back = () => {
    setError('');
    if (step > 1) setStep(step - 1);
  };

  const s1 = payload.step1;
  const s2 = payload.step2;
  const priorityPreview = PRIORITY_LEVELS.find((x) => x.value === s2.priority);

  function togglePpe(id) {
    setP((pr) => {
      const sel = [...(pr.step7.selected || [])];
      const ix = sel.indexOf(id);
      if (ix >= 0) sel.splice(ix, 1);
      else sel.push(id);
      let { otherPpe } = pr.step7;
      if (id === 'OTHERS' && ix >= 0) otherPpe = '';
      return { ...pr, step7: { ...pr.step7, selected: sel, otherPpe } };
    });
  }

  function PreviewBlock({ title, children }) {
    return (
      <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
        <div className="mt-2 text-sm text-slate-800">{children}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <h1 className="text-2xl font-bold text-slate-900">New risk submission</h1>
      <p className="mt-1 text-sm text-slate-500">
        Complete all steps, review on the final screen, then submit. Progress is auto-saved in this browser.
      </p>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
          <span>
            Step {step} of {TOTAL_STEPS}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-orange-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => (i + 1 < step ? setStep(i + 1) : null)}
              className={`h-2 w-6 rounded-full transition sm:w-7 ${
                i + 1 === step ? 'bg-orange-500' : i + 1 < step ? 'bg-orange-200' : 'bg-slate-200'
              }`}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className={sectionTitle}>Step 1 — Basic information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={label}>Project title *</label>
                <input className={input} value={s1.projectTitle} onChange={(e) => setP((pr) => ({ ...pr, step1: { ...pr.step1, projectTitle: e.target.value } }))} />
              </div>
              <div>
                <label className={label}>Team name *</label>
                <input className={input} value={s1.teamName} onChange={(e) => setP((pr) => ({ ...pr, step1: { ...pr.step1, teamName: e.target.value } }))} />
              </div>
              <div>
                <label className={label}>Department</label>
                <input className={input} value={s1.department} onChange={(e) => setP((pr) => ({ ...pr, step1: { ...pr.step1, department: e.target.value } }))} />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Location of experiment *</label>
                <input className={input} value={s1.location} onChange={(e) => setP((pr) => ({ ...pr, step1: { ...pr.step1, location: e.target.value } }))} />
              </div>
              <div>
                <label className={label}>Start *</label>
                <input type="datetime-local" className={input} value={s1.startDateTime} onChange={(e) => setP((pr) => ({ ...pr, step1: { ...pr.step1, startDateTime: e.target.value } }))} />
              </div>
              <div>
                <label className={label}>End *</label>
                <input type="datetime-local" className={input} value={s1.endDateTime} onChange={(e) => setP((pr) => ({ ...pr, step1: { ...pr.step1, endDateTime: e.target.value } }))} />
              </div>
              <div>
                <label className={label}>Faculty name *</label>
                <input className={input} value={s1.facultyName} onChange={(e) => setP((pr) => ({ ...pr, step1: { ...pr.step1, facultyName: e.target.value } }))} />
              </div>
              <div>
                <label className={label}>Faculty email *</label>
                <input type="email" className={input} value={s1.facultyEmail} onChange={(e) => setP((pr) => ({ ...pr, step1: { ...pr.step1, facultyEmail: e.target.value } }))} />
              </div>
              <div>
                <label className={label}>Student name *</label>
                <input className={input} value={s1.studentName} readOnly={!!session?.name} title="From your profile" onChange={(e) => setP((pr) => ({ ...pr, step1: { ...pr.step1, studentName: e.target.value } }))} />
              </div>
              <div>
                <label className={label}>Student email *</label>
                <input type="email" className={input} value={s1.studentEmail} readOnly={!!session?.email} onChange={(e) => setP((pr) => ({ ...pr, step1: { ...pr.step1, studentEmail: e.target.value } }))} />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Contact details *</label>
                <input className={input} value={s1.contact} onChange={(e) => setP((pr) => ({ ...pr, step1: { ...pr.step1, contact: e.target.value } }))} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className={sectionTitle}>Step 2 — Priority &amp; timeline</h2>
            <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50/60 to-white p-5 shadow-sm ring-1 ring-orange-100/80">
              <label className={label} id="priority-label">
                Priority level <span className="text-orange-500">*</span>
              </label>
              <p className="mt-1 text-xs text-slate-500">Choose how soon the risk assessment should be conducted.</p>
              <div className="mt-3">
                <PrioritySelector
                  value={s2.priority}
                  onChange={(v) => setP((pr) => ({ ...pr, step2: { priority: v } }))}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className={sectionTitle}>Step 3 — Description of experiment</h2>
            <div>
              <label className={label}>Objective of the experiment *</label>
              <textarea
                rows={4}
                className={input}
                value={payload.step3.objective}
                onChange={(e) =>
                  setP((pr) => ({ ...pr, step3: { ...pr.step3, objective: e.target.value } }))
                }
              />
            </div>
            <div>
              <label className={label}>Methodology *</label>
              <textarea
                rows={4}
                className={input}
                value={payload.step3.methodology}
                onChange={(e) =>
                  setP((pr) => ({ ...pr, step3: { ...pr.step3, methodology: e.target.value } }))
                }
              />
            </div>
            <div>
              <label className={label}>Equipment *</label>
              <textarea
                rows={4}
                className={input}
                value={payload.step3.equipment}
                onChange={(e) =>
                  setP((pr) => ({ ...pr, step3: { ...pr.step3, equipment: e.target.value } }))
                }
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className={sectionTitle}>Step 4 — Hazard identification</h2>
            {payload.step4.hazards.map((h, idx) => (
              <div key={h.id} className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Hazard {idx + 1}</span>
                  {payload.step4.hazards.length > 1 ? (
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800"
                      onClick={() =>
                        setP((pr) => ({
                          ...pr,
                          step4: {
                            ...pr.step4,
                            hazards: pr.step4.hazards.filter((x) => x.id !== h.id),
                          },
                        }))
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={label}>Activity / step *</label>
                    <input
                      className={input}
                      value={h.activity}
                      onChange={(e) => {
                        const hazards = [...payload.step4.hazards];
                        hazards[idx] = { ...h, activity: e.target.value };
                        setP((pr) => ({ ...pr, step4: { ...pr.step4, hazards } }));
                      }}
                    />
                  </div>
                  <div>
                    <label className={label}>Type of hazard</label>
                    <select
                      className={input}
                      value={h.hazardType}
                      onChange={(e) => {
                        const hazards = [...payload.step4.hazards];
                        hazards[idx] = { ...h, hazardType: e.target.value };
                        setP((pr) => ({ ...pr, step4: { ...pr.step4, hazards } }));
                      }}
                    >
                      {HAZARD_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={label}>Description</label>
                    <input
                      className={input}
                      value={h.description}
                      onChange={(e) => {
                        const hazards = [...payload.step4.hazards];
                        hazards[idx] = { ...h, description: e.target.value };
                        setP((pr) => ({ ...pr, step4: { ...pr.step4, hazards } }));
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setP((pr) => ({
                  ...pr,
                  step4: {
                    ...pr.step4,
                    hazards: [...pr.step4.hazards, { id: nid(), activity: '', hazardType: 'Electrical', description: '' }],
                  },
                }))
              }
              className="inline-flex items-center gap-2 rounded-xl border border-dashed border-orange-300 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50"
            >
              <Plus className="h-4 w-4" /> Add hazard
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className={sectionTitle}>Step 5 — Risk evaluation</h2>
            <p className="text-sm text-slate-500">Risk level updates from likelihood × severity.</p>
            {payload.step5.evaluations.map((e, idx) => (
              <div key={e.id} className="rounded-xl border border-slate-100 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={label}>Hazard *</label>
                    <input
                      className={input}
                      value={e.hazard}
                      onChange={(ev) => {
                        const evaluations = [...payload.step5.evaluations];
                        evaluations[idx] = { ...e, hazard: ev.target.value };
                        setP((pr) => ({ ...pr, step5: { ...pr.step5, evaluations } }));
                      }}
                    />
                  </div>
                  <div>
                    <label className={label}>Likelihood</label>
                    <select
                      className={input}
                      value={e.likelihood}
                      onChange={(ev) => {
                        const evaluations = [...payload.step5.evaluations];
                        const likelihood = ev.target.value;
                        const sev = e.severity;
                        evaluations[idx] = {
                          ...e,
                          likelihood,
                          riskLevel: computeRiskLevel(likelihood, sev),
                        };
                        setP((pr) => ({ ...pr, step5: { ...pr.step5, evaluations } }));
                      }}
                    >
                      {LS.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={label}>Severity</label>
                    <select
                      className={input}
                      value={e.severity}
                      onChange={(ev) => {
                        const evaluations = [...payload.step5.evaluations];
                        const severity = ev.target.value;
                        const lik = e.likelihood;
                        evaluations[idx] = {
                          ...e,
                          severity,
                          riskLevel: computeRiskLevel(lik, severity),
                        };
                        setP((pr) => ({ ...pr, step5: { ...pr.step5, evaluations } }));
                      }}
                    >
                      {LS.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={label}>Risk level (auto)</label>
                    <input className={`${input} bg-slate-50 font-semibold text-orange-600`} readOnly value={computeRiskLevel(e.likelihood, e.severity)} />
                  </div>
                </div>
                {payload.step5.evaluations.length > 1 ? (
                  <button
                    type="button"
                    className="mt-2 text-sm text-red-600"
                    onClick={() =>
                      setP((pr) => ({
                        ...pr,
                        step5: {
                          ...pr.step5,
                          evaluations: pr.step5.evaluations.filter((x) => x.id !== e.id),
                        },
                      }))
                    }
                  >
                    Remove row
                  </button>
                ) : null}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setP((pr) => ({
                  ...pr,
                  step5: {
                    ...pr.step5,
                    evaluations: [
                      ...pr.step5.evaluations,
                      {
                        id: nid(),
                        hazard: '',
                        likelihood: 'Medium',
                        severity: 'Medium',
                        riskLevel: 'Medium',
                      },
                    ],
                  },
                }))
              }
              className="inline-flex items-center gap-2 rounded-xl border border-dashed border-orange-300 px-4 py-2 text-sm font-semibold text-orange-600"
            >
              <Plus className="h-4 w-4" /> Add row
            </button>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <h2 className={sectionTitle}>Step 6 — Control measures</h2>
            {payload.step6.controls.map((c, idx) => (
              <div key={c.id} className="rounded-xl border border-slate-100 p-4">
                <div className="space-y-3">
                  <div>
                    <label className={label}>Hazard *</label>
                    <input
                      className={input}
                      value={c.hazard}
                      onChange={(ev) => {
                        const controls = [...payload.step6.controls];
                        controls[idx] = { ...c, hazard: ev.target.value };
                        setP((pr) => ({ ...pr, step6: { ...pr.step6, controls } }));
                      }}
                    />
                  </div>
                  <div>
                    <label className={label}>Preventive measures *</label>
                    <textarea
                      rows={2}
                      className={input}
                      value={c.preventive}
                      onChange={(ev) => {
                        const controls = [...payload.step6.controls];
                        controls[idx] = { ...c, preventive: ev.target.value };
                        setP((pr) => ({ ...pr, step6: { ...pr.step6, controls } }));
                      }}
                    />
                  </div>
                  <div>
                    <label className={label}>Control actions *</label>
                    <textarea
                      rows={2}
                      className={input}
                      value={c.actions}
                      onChange={(ev) => {
                        const controls = [...payload.step6.controls];
                        controls[idx] = { ...c, actions: ev.target.value };
                        setP((pr) => ({ ...pr, step6: { ...pr.step6, controls } }));
                      }}
                    />
                  </div>
                </div>
                {payload.step6.controls.length > 1 ? (
                  <button
                    type="button"
                    className="mt-2 text-sm text-red-600"
                    onClick={() =>
                      setP((pr) => ({
                        ...pr,
                        step6: {
                          ...pr.step6,
                          controls: pr.step6.controls.filter((x) => x.id !== c.id),
                        },
                      }))
                    }
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setP((pr) => ({
                  ...pr,
                  step6: {
                    ...pr.step6,
                    controls: [...pr.step6.controls, { id: nid(), hazard: '', preventive: '', actions: '' }],
                  },
                }))
              }
              className="inline-flex items-center gap-2 rounded-xl border border-dashed border-orange-300 px-4 py-2 text-sm font-semibold text-orange-600"
            >
              <Plus className="h-4 w-4" /> Add row
            </button>
          </div>
        )}

        {step === 7 && (
          <div className="rounded-2xl border border-orange-100 bg-gradient-to-b from-orange-50/40 to-white p-1 shadow-md ring-1 ring-orange-100/70">
            <div className="rounded-xl bg-white/95 p-5 shadow-sm sm:p-6">
              <StepHeader n={7} title="Personal Protective Equipment (PPE)" />
              <p className="mb-4 text-xs text-slate-500">
                Select all that apply. Choosing at least one item is recommended for lab safety.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {PPE_OPTIONS.map((o) => {
                  const checked = (payload.step7.selected || []).includes(o.id);
                  return (
                    <label
                      key={o.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-sm transition hover:border-orange-300 hover:bg-orange-50/40 ${
                        checked ? 'border-orange-400 bg-orange-50/50 ring-1 ring-orange-200' : 'border-slate-200 bg-white text-slate-800'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => togglePpe(o.id)}
                        className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span>{o.label}</span>
                    </label>
                  );
                })}
              </div>
              {(payload.step7.selected || []).includes('OTHERS') ? (
                <div className="mt-4">
                  <label className={label}>Specify other PPE (if applicable)</label>
                  <input
                    className={input}
                    placeholder="Specify other PPE (if applicable)"
                    value={payload.step7.otherPpe}
                    onChange={(e) => setP((pr) => ({ ...pr, step7: { ...pr.step7, otherPpe: e.target.value } }))}
                  />
                </div>
              ) : null}
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="rounded-2xl border border-orange-100 bg-gradient-to-b from-orange-50/40 to-white p-1 shadow-md ring-1 ring-orange-100/70">
            <div className="rounded-xl bg-white/95 p-5 shadow-sm sm:p-6">
              <StepHeader n={8} title="Emergency Preparedness" required />
              <div className="space-y-5">
                <div>
                  <label className={label}>Emergency shutdown procedure *</label>
                  <textarea
                    rows={5}
                    className={input}
                    placeholder="Describe shutdown steps in case of emergency"
                    value={payload.step8.emergencyShutdown}
                    onChange={(e) =>
                      setP((pr) => ({ ...pr, step8: { ...pr.step8, emergencyShutdown: e.target.value } }))
                    }
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className={label}>First aid availability</label>
                    <select
                      className={input}
                      value={payload.step8.firstAid}
                      onChange={(e) =>
                        setP((pr) => ({ ...pr, step8: { ...pr.step8, firstAid: e.target.value } }))
                      }
                    >
                      <option value="">Select</option>
                      {FIRST_AID_OPTIONS.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={label}>Fire safety equipment available</label>
                    <select
                      className={inputOrange}
                      value={payload.step8.fireSafety}
                      onChange={(e) =>
                        setP((pr) => ({ ...pr, step8: { ...pr.step8, fireSafety: e.target.value } }))
                      }
                    >
                      <option value="">Select</option>
                      {FIRE_SAFETY_OPTIONS.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className={label}>Emergency contact numbers</label>
                    <input
                      className={input}
                      placeholder="Enter emergency contact numbers"
                      value={payload.step8.emergencyContacts}
                      onChange={(e) =>
                        setP((pr) => ({ ...pr, step8: { ...pr.step8, emergencyContacts: e.target.value } }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 9 && (
          <div className="space-y-4">
            <h2 className={sectionTitle}>Step 9 — Waste disposal</h2>
            {(['wasteType', 'disposalMethod', 'environmentalImpact']).map((k) => (
              <div key={k}>
                <label className={label}>
                  {k === 'wasteType' ? 'Type of waste' : k === 'disposalMethod' ? 'Disposal method' : 'Environmental impact'} *
                </label>
                <textarea
                  rows={3}
                  className={input}
                  value={payload.step9[k]}
                  onChange={(e) =>
                    setP((pr) => ({ ...pr, step9: { ...pr.step9, [k]: e.target.value } }))
                  }
                />
              </div>
            ))}
          </div>
        )}

        {step === 10 && (
          <div className="space-y-4">
            <h2 className={sectionTitle}>Step 10 — Declaration</h2>
            <div>
              <label className={label}>Team lead name *</label>
              <input
                className={input}
                value={payload.step10.teamLeadName}
                onChange={(e) =>
                  setP((pr) => ({ ...pr, step10: { ...pr.step10, teamLeadName: e.target.value } }))
                }
              />
            </div>
            <div>
              <label className={label}>Date *</label>
              <input
                type="date"
                className={input}
                value={payload.step10.date}
                onChange={(e) =>
                  setP((pr) => ({ ...pr, step10: { ...pr.step10, date: e.target.value } }))
                }
              />
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
              <input
                type="checkbox"
                checked={payload.step10.confirmed}
                onChange={(e) =>
                  setP((pr) => ({ ...pr, step10: { ...pr.step10, confirmed: e.target.checked } }))
                }
                className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-slate-700">
                We confirm all risks are assessed and the information provided is accurate. *
              </span>
            </label>
          </div>
        )}

        {step === 11 && (
          <div className="space-y-4">
            <h2 className={sectionTitle}>Step 11 — Review &amp; submit</h2>
            <p className="text-sm text-slate-500">
              Check everything below. Use <strong>Back</strong> to edit a previous step, then submit when ready.
            </p>
            <div className="space-y-3">
              <PreviewBlock title="Basic information">
                <dl className="grid gap-2 sm:grid-cols-2">
                  <div><dt className="text-slate-500">Project</dt><dd className="font-medium">{s1.projectTitle}</dd></div>
                  <div><dt className="text-slate-500">Team</dt><dd className="font-medium">{s1.teamName}</dd></div>
                  <div><dt className="text-slate-500">Location</dt><dd>{s1.location}</dd></div>
                  <div><dt className="text-slate-500">When</dt><dd>{s1.startDateTime} → {s1.endDateTime}</dd></div>
                  <div><dt className="text-slate-500">Faculty</dt><dd>{s1.facultyName} ({s1.facultyEmail})</dd></div>
                  <div><dt className="text-slate-500">Student</dt><dd>{s1.studentName} ({s1.studentEmail})</dd></div>
                  <div className="sm:col-span-2"><dt className="text-slate-500">Contact</dt><dd>{s1.contact}</dd></div>
                </dl>
              </PreviewBlock>
              <PreviewBlock title="Priority">
                {priorityPreview ? (
                  <span className="inline-flex flex-wrap items-center gap-2">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${priorityPreview.dot}`} aria-hidden />
                    <span
                      className={`rounded-lg border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${priorityPreview.badge}`}
                    >
                      {priorityPreview.value}
                    </span>
                    <span className="text-sm text-slate-800">{formatPriorityLabel(s2.priority)}</span>
                  </span>
                ) : (
                  <p>—</p>
                )}
              </PreviewBlock>
              <PreviewBlock title="Experiment description">
                <p className="font-medium text-slate-700">Objective</p>
                <p className="whitespace-pre-wrap">{payload.step3.objective}</p>
                <p className="mt-2 font-medium text-slate-700">Methodology</p>
                <p className="whitespace-pre-wrap">{payload.step3.methodology}</p>
                <p className="mt-2 font-medium text-slate-700">Equipment</p>
                <p className="whitespace-pre-wrap">{payload.step3.equipment}</p>
              </PreviewBlock>
              <PreviewBlock title="Hazards">
                <ul className="list-inside list-disc space-y-1">
                  {(payload.step4.hazards || []).map((h) => (
                    <li key={h.id}>
                      {h.activity} ({h.hazardType}) {h.description ? `— ${h.description}` : ''}
                    </li>
                  ))}
                </ul>
              </PreviewBlock>
              <PreviewBlock title="Risk evaluation">
                <ul className="space-y-1">
                  {(payload.step5.evaluations || []).map((e) => (
                    <li key={e.id}>
                      {e.hazard}: L {e.likelihood}, S {e.severity} → <strong className="text-orange-600">{e.riskLevel}</strong>
                    </li>
                  ))}
                </ul>
              </PreviewBlock>
              <PreviewBlock title="Control measures">
                <ul className="space-y-2">
                  {(payload.step6.controls || []).map((c) => (
                    <li key={c.id}>
                      <strong>{c.hazard}</strong> — {c.preventive} / {c.actions}
                    </li>
                  ))}
                </ul>
              </PreviewBlock>
              <PreviewBlock title="PPE">
                <p className="whitespace-pre-wrap">{formatPpeSummary(payload.step7)}</p>
              </PreviewBlock>
              <PreviewBlock title="Emergency preparedness">
                <p className="whitespace-pre-wrap font-medium">{payload.step8.emergencyShutdown}</p>
                <dl className="mt-2 grid gap-1 sm:grid-cols-3">
                  <div><dt className="text-slate-500">First aid</dt><dd>{payload.step8.firstAid}</dd></div>
                  <div><dt className="text-slate-500">Fire safety</dt><dd>{payload.step8.fireSafety}</dd></div>
                  <div><dt className="text-slate-500">Emergency contacts</dt><dd>{payload.step8.emergencyContacts}</dd></div>
                </dl>
              </PreviewBlock>
              <PreviewBlock title="Waste disposal">
                <dl className="grid gap-2">
                  <div><dt className="text-slate-500">Type</dt><dd className="whitespace-pre-wrap">{payload.step9.wasteType}</dd></div>
                  <div><dt className="text-slate-500">Method</dt><dd className="whitespace-pre-wrap">{payload.step9.disposalMethod}</dd></div>
                  <div><dt className="text-slate-500">Environmental impact</dt><dd className="whitespace-pre-wrap">{payload.step9.environmentalImpact}</dd></div>
                </dl>
              </PreviewBlock>
              <PreviewBlock title="Declaration">
                <p>
                  Team lead: <strong>{payload.step10.teamLeadName}</strong> · Date: <strong>{payload.step10.date}</strong> ·
                  Confirmed: <strong>{payload.step10.confirmed ? 'Yes' : 'No'}</strong>
                </p>
              </PreviewBlock>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        {step === 11 ? (
          <button
            type="button"
            onClick={submit}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-600 disabled:opacity-60"
          >
            {saving ? 'Submitting…' : 'Submit application'}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-600 disabled:opacity-60"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
