const nid = () => `id-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

/** Stored values: HIGH | MEDIUM | LOW */
export const PRIORITY_LEVELS = [
  {
    value: 'HIGH',
    label: 'HIGH — Conduct within 24 HOURS',
    dot: 'bg-red-500',
    badge: 'border-red-200 bg-red-50 text-red-900',
  },
  {
    value: 'MEDIUM',
    label: 'MEDIUM — Conduct within 3–5 DAYS',
    dot: 'bg-yellow-400',
    badge: 'border-yellow-200 bg-yellow-50 text-yellow-900',
  },
  {
    value: 'LOW',
    label: 'LOW — Conduct within 1–2 WEEKS',
    dot: 'bg-green-500',
    badge: 'border-green-200 bg-green-50 text-green-900',
  },
];

export const PPE_OPTIONS = [
  { id: 'SAFETY_GOGGLES', label: 'Safety Goggles' },
  { id: 'GLOVES', label: 'Gloves' },
  { id: 'LAB_COAT', label: 'Lab Coat' },
  { id: 'SAFETY_SHOES', label: 'Safety Shoes' },
  { id: 'FACE_SHIELD', label: 'Face Shield' },
  { id: 'EAR_PROTECTION', label: 'Ear Protection' },
  { id: 'OTHERS', label: 'Others' },
];

export const FIRST_AID_OPTIONS = ['Available', 'Not Available'];

export const FIRE_SAFETY_OPTIONS = ['Fire Extinguisher', 'Fire Hose', 'Both', 'Not Available'];

export function formatPriorityLabel(value) {
  const x = PRIORITY_LEVELS.find((p) => p.value === value);
  return x ? x.label : value || '—';
}

/** Labels for selected PPE (array of ids) + optional other text. */
export function formatPpeSummary(step7) {
  const sel = step7?.selected;
  if (!Array.isArray(sel) || sel.length === 0) return '—';
  const parts = PPE_OPTIONS.filter((o) => sel.includes(o.id)).map((o) => o.label);
  if (sel.includes('OTHERS') && step7.otherPpe?.trim()) {
    parts.push(`Others: ${step7.otherPpe.trim()}`);
  } else if (sel.includes('OTHERS')) {
    parts.push('Others');
  }
  return parts.length ? parts.join(', ') : '—';
}

export function emptyPayload() {
  return {
    step1: {
      projectTitle: '',
      teamName: '',
      department: 'REACT, KCT',
      location: '',
      startDateTime: '',
      endDateTime: '',
      facultyName: '',
      facultyEmail: '',
      studentName: '',
      studentEmail: '',
      contact: '',
    },
    step2: { priority: '' },
    step3: { objective: '', methodology: '', equipment: '' },
    step4: {
      hazards: [{ id: nid(), activity: '', hazardType: 'Electrical', description: '' }],
    },
    step5: {
      evaluations: [{ id: nid(), hazard: '', likelihood: 'Medium', severity: 'Medium', riskLevel: 'Medium' }],
    },
    step6: {
      controls: [{ id: nid(), hazard: '', preventive: '', actions: '' }],
    },
    step7: {
      selected: [],
      otherPpe: '',
    },
    step8: {
      emergencyShutdown: '',
      firstAid: '',
      fireSafety: '',
      emergencyContacts: '',
    },
    step9: { wasteType: '', disposalMethod: '', environmentalImpact: '' },
    step10: { teamLeadName: '', date: '', confirmed: false },
  };
}

/** Merge partial saved draft / legacy shapes into current schema. */
export function normalizePayload(raw) {
  if (!raw || typeof raw !== 'object') return emptyPayload();
  const e = emptyPayload();
  const merged = {
    ...e,
    ...raw,
    step1: { ...e.step1, ...raw.step1 },
    step2: { ...e.step2, ...raw.step2 },
    step3: { ...e.step3, ...raw.step3 },
    step4: { ...e.step4, ...raw.step4, hazards: raw.step4?.hazards?.length ? raw.step4.hazards : e.step4.hazards },
    step5: { ...e.step5, ...raw.step5 },
    step6: { ...e.step6, ...raw.step6 },
    step7: { ...e.step7, ...raw.step7 },
    step8: { ...e.step8, ...raw.step8 },
    step9: { ...e.step9, ...raw.step9 },
    step10: { ...e.step10, ...raw.step10 },
  };

  // Legacy step7: checkbox object `ppe` → `selected` array
  if (merged.step7?.ppe && !Array.isArray(merged.step7.selected)) {
    const ppe = merged.step7.ppe;
    merged.step7 = {
      selected: PPE_OPTIONS.filter((o) => ppe[o.id]).map((o) => o.id),
      otherPpe: merged.step7.otherPpe || '',
    };
  }
  if (!Array.isArray(merged.step7?.selected)) {
    merged.step7 = { ...e.step7, ...merged.step7, selected: [] };
  }

  // Legacy: old step7 = waste only, step8 = declaration only (no emergency fields)
  const legacyWaste = raw.step7 && 'wasteType' in raw.step7 && !('ppe' in raw.step7) && !Array.isArray(raw.step7?.selected);
  if (legacyWaste) {
    merged.step9 = {
      wasteType: raw.step7.wasteType || '',
      disposalMethod: raw.step7.disposalMethod || '',
      environmentalImpact: raw.step7.environmentalImpact || '',
    };
    merged.step7 = e.step7;
  }

  const legacyDecl =
    raw.step8 && 'teamLeadName' in raw.step8 && !('emergencyShutdown' in raw.step8);
  if (legacyDecl) {
    merged.step10 = {
      teamLeadName: raw.step8.teamLeadName || '',
      date: raw.step8.date || '',
      confirmed: !!raw.step8.confirmed,
    };
    merged.step8 = e.step8;
  }

  // Priority: new HIGH/MEDIUM/LOW + migrate older keys
  const pr = merged.step2.priority;
  const mapOld = {
    HIGH_24H: 'HIGH',
    MEDIUM_3_5D: 'MEDIUM',
    LOW_1_2W: 'LOW',
    High: 'HIGH',
    Medium: 'MEDIUM',
    Low: 'LOW',
  };
  if (mapOld[pr]) merged.step2.priority = mapOld[pr];
  else if (!['HIGH', 'MEDIUM', 'LOW'].includes(pr)) merged.step2.priority = '';

  return merged;
}

export const DRAFT_KEY = 'riskm-draft-v2';
