import * as XLSX from 'xlsx';

function safeFilenamePart(s) {
  return String(s || 'programme-responses')
    .replace(/[/\\?*[\]:]/g, '-')
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

/** Build ordered field columns from programme definition or stored submissions */
function resolveFieldColumns(programme, submissions) {
  if (Array.isArray(programme?.formFields) && programme.formFields.length) {
    return programme.formFields.map((f) => ({ id: f.id, name: f.name || f.id }));
  }
  const order = [];
  const seen = new Set();
  for (const sub of submissions) {
    for (const m of sub.fieldMeta || []) {
      if (m?.id && !seen.has(m.id)) {
        seen.add(m.id);
        order.push({ id: m.id, name: m.name || m.id });
      }
    }
  }
  return order;
}

function cellValue(v) {
  if (v === undefined || v === null) return '';
  if (typeof v === 'number') return v;
  if (typeof v === 'object' && v !== null && typeof v.dataBase64 === 'string' && v.fileName) {
    const kb = typeof v.size === 'number' ? Math.max(1, Math.round(v.size / 1024)) : '';
    return kb !== '' ? `[file] ${v.fileName} (${kb} KB)` : `[file] ${v.fileName}`;
  }
  return String(v);
}

/**
 * Download an .xlsx with sheet "Details" (programme + export meta) and "Responses" (all rows).
 */
export function exportProgrammeResponsesToExcel(programme, submissions) {
  if (!Array.isArray(submissions) || submissions.length === 0) return false;

  const wb = XLSX.utils.book_new();

  const detailsRows = [
    ['Programme title', programme?.title || ''],
    ['URL slug', programme?.slug || ''],
    ['Category', programme?.category || ''],
    ['Accent color', programme?.accentColor || programme?.theme || ''],
    ['Theme (legacy)', programme?.theme || ''],
    ['Total responses', String(submissions.length)],
    ['Exported at (UTC)', new Date().toISOString()],
  ];
  const wsDetails = XLSX.utils.aoa_to_sheet(detailsRows);
  XLSX.utils.book_append_sheet(wb, wsDetails, 'Details');

  const fields = resolveFieldColumns(programme, submissions);
  const header = ['Response ID', 'Submitted at (ISO)', ...fields.map((f) => f.name)];
  const dataRows = submissions.map((sub) => {
    const id = sub.id != null ? String(sub.id) : '';
    const ts = sub.created_at ? new Date(sub.created_at).toISOString() : '';
    const cells = fields.map((f) => cellValue(sub.answers?.[f.id]));
    return [id, ts, ...cells];
  });

  const responsesAoa = [header, ...dataRows];
  const wsResponses = XLSX.utils.aoa_to_sheet(responsesAoa);
  XLSX.utils.book_append_sheet(wb, wsResponses, 'Responses');

  const name = safeFilenamePart(programme?.slug || programme?.title);
  XLSX.writeFile(wb, `${name}-responses.xlsx`);
  return true;
}
