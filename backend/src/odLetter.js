/** Format hour numbers 1-7 to ordinal label */
function hourLabel(n) {
  const o = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];
  return o[n] || `${n}th`;
}

/** Collapse sorted unique hours into readable ranges */
export function formatHoursForLetter(hours) {
  if (!hours?.length) return '—';
  const h = [...new Set(hours)].filter((x) => x >= 1 && x <= 7).sort((a, b) => a - b);
  if (!h.length) return '—';
  const segments = [];
  let runStart = h[0];
  let prev = h[0];
  for (let i = 1; i < h.length; i++) {
    const cur = h[i];
    if (cur !== prev + 1) {
      segments.push(
        runStart === prev
          ? `${hourLabel(runStart)} Hour`
          : `${hourLabel(runStart)} – ${hourLabel(prev)} Hour`,
      );
      runStart = cur;
    }
    prev = cur;
  }
  segments.push(
    runStart === prev
      ? `${hourLabel(runStart)} Hour`
      : `${hourLabel(runStart)} – ${hourLabel(prev)} Hour`,
  );
  return segments.join('; ');
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** PG `DATE` may be a string, Date, or other; always yield YYYY-MM-DD or ''. */
function toIsoDate(val) {
  if (val == null || val === '') return '';
  if (typeof val === 'string') {
    const m = val.match(/^(\d{4}-\d{2}-\d{2})/);
    if (m) return m[1];
  }
  const d = val instanceof Date ? val : new Date(val);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${mo}-${day}`;
}

function ordinalDay(n) {
  if (!Number.isFinite(n) || n < 1 || n > 31) return '—';
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return `${n}st`;
  if (j === 2 && k !== 12) return `${n}nd`;
  if (j === 3 && k !== 13) return `${n}rd`;
  return `${n}th`;
}

/** e.g. 30th March 2026 */
function formatDateWords(iso) {
  if (!iso || typeof iso !== 'string') return '—';
  const d = new Date(iso + 'T12:00:00');
  if (Number.isNaN(d.getTime())) return '—';
  const day = d.getDate();
  const month = d.toLocaleString('en-IN', { month: 'long' });
  const year = d.getFullYear();
  if (!Number.isFinite(year)) return '—';
  return `${ordinalDay(day)} ${month} ${year}`;
}

/** e.g. 30th March to 17th April 2026 (shared year when same year) */
function formatDateRangeWords(fromIso, toIso) {
  if (!fromIso || !toIso) return '—';
  const a = new Date(fromIso + 'T12:00:00');
  const b = new Date(toIso + 'T12:00:00');
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return '—';
  const y1 = a.getFullYear();
  const y2 = b.getFullYear();
  const m1 = a.toLocaleString('en-IN', { month: 'long' });
  const m2 = b.toLocaleString('en-IN', { month: 'long' });
  const d1 = ordinalDay(a.getDate());
  const d2 = ordinalDay(b.getDate());
  if (y1 === y2) {
    return `${d1} ${m1} to ${d2} ${m2} ${y1}`;
  }
  return `${d1} ${m1} ${y1} to ${d2} ${m2} ${y2}`;
}

export function buildOdLetterHtml(row, opts = {}) {
  const fromLines =
    opts.fromLines ||
    `Brathikan V M
Head – REACT
Kumaraguru College of Technology
Coimbatore – 641049.`;
  const toLines =
    opts.toLines ||
    `The Principal
Kumaraguru College of Technology
Coimbatore – 641049.`;

  const salutation = row.salutation === 'Sir' ? 'Respected Sir,' : 'Respected Madam,';
  const honorific = row.salutation === 'Sir' ? 'Mr.' : 'Ms.';
  const odTitle = row.od_category === 'ON_DUTY' ? 'On-Duty' : 'Special On-Duty';
  const subject = row.subject || `Request for ${odTitle} Approval`;

  const fromD = toIsoDate(row.from_date);
  const toD = toIsoDate(row.to_date);
  const periodPhrase = fromD && toD ? formatDateRangeWords(fromD, toD) : '—';

  let tableRows = '';
  const wh = row.week_hours && typeof row.week_hours === 'object' ? row.week_hours : {};
  const scheduleType = row.schedule_type || 'ONLY_CLASS';

  if (scheduleType === 'FULL_DAY') {
    const dates = listWorkingDates(fromD, toD, row.exclude_sundays !== false);
    for (const d of dates) {
      tableRows += `<tr><td>${formatDateWords(d)}</td><td>Full day</td></tr>`;
    }
  } else {
    const dates = Object.keys(wh).sort();
    for (const d of dates) {
      const iso = toIsoDate(d);
      const hrs = Array.isArray(wh[d]) ? wh[d] : [];
      const txt = formatHoursForLetter(hrs);
      const dayPart = iso ? ` (${dayName(iso)})` : '';
      tableRows += `<tr><td>${formatDateWords(iso)}${dayPart}</td><td>${txt}</td></tr>`;
    }
  }

  const desc1Block = descToHtmlBlock(row.description_1 || '');
  const desc2Block = descToHtmlBlock(row.description_2 || '');

  const fromHtml = linesToHtml(fromLines);
  const toHtml = linesToHtml(toLines);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${escapeHtml(subject)}</title>
<style>
  body {
    font-family: 'Liberation Serif', 'Times New Roman', Times, serif;
    font-size: 11pt;
    line-height: 1.55;
    max-width: 680px;
    margin: 20px auto;
    padding: 20px 24px;
    color: #111;
    -webkit-font-smoothing: antialiased;
  }
  .label { font-weight: 700; margin-top: 16px; margin-bottom: 4px; }
  .label:first-of-type { margin-top: 0; }
  .addr { margin-bottom: 12px; line-height: 1.45; }
  .subject {
    font-family: 'Liberation Sans', Arial, Helvetica, sans-serif;
    font-size: 11pt;
    font-weight: 700;
    margin: 18px 0 12px;
    color: #0d1b2a;
  }
  p { margin: 0 0 10px; text-align: justify; }
  .prewrap {
    white-space: pre-wrap;
    word-wrap: break-word;
    text-align: justify;
    margin: 0 0 12px;
    line-height: 1.55;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 14px;
    font-size: 10pt;
    font-family: 'Liberation Sans', Arial, Helvetica, sans-serif;
  }
  th, td { border: 1px solid #222; padding: 8px 10px; vertical-align: top; }
  th { background: #f0f0f0; font-weight: 600; text-align: left; }
  .regards { margin-top: 28px; margin-bottom: 8px; }
  .mentor-block { margin-top: 36px; text-align: right; line-height: 1.5; font-size: 10.5pt; }
  .sign-row {
    display: flex;
    justify-content: space-between;
    margin-top: 48px;
    font-size: 10pt;
    width: 100%;
  }
  .sign-row span { color: #333; }
  @media print { body { margin: 0; } }
</style>
</head>
<body>
  <div class="label">From,</div>
  <div class="addr">${fromHtml}</div>

  <div class="label">To,</div>
  <div class="addr">${toHtml}</div>

  <div class="subject">Subject: ${escapeHtml(subject)}</div>

  <p>${salutation}</p>

  <p>
    This is to request the approval for granting <strong>${escapeHtml(odTitle)}</strong> (OD) to <strong>${escapeHtml(honorific)} ${escapeHtml(row.student_name || '')}</strong>
    (Register No. <strong>${escapeHtml(row.register_number || '—')}</strong>),
    <strong>${escapeHtml(row.department_year || '—')}</strong>, for the period from <strong>${escapeHtml(periodPhrase)}</strong>.
  </p>

  ${desc1Block}

  <p><strong>In this regard, ${escapeHtml(odTitle)} is requested during the following hours each week:</strong></p>

  <table>
    <thead><tr><th>Day / Date</th><th>Hours</th></tr></thead>
    <tbody>${tableRows || '<tr><td colspan="2">—</td></tr>'}</tbody>
  </table>

  ${desc2Block}

  <p>Kindly consider and approve the above request.</p>

  <p class="regards">Regards,</p>

  <div class="mentor-block">
    <strong>Brathikan V M</strong><br/>
    Head – REACT<br/>
    Kumaraguru College of Technology
  </div>

  <div class="sign-row">
    <span>(Advisor)</span>
    <span>(Head of the Department)</span>
  </div>
</body>
</html>`;
}

function linesToHtml(text) {
  return String(text)
    .split(/\r?\n/)
    .map((line) => escapeHtml(line))
    .join('<br/>');
}

/** Preserve user line breaks and spaces in PDF/HTML */
function descToHtmlBlock(text) {
  const t = String(text).trim();
  if (!t) return '';
  return `<div class="prewrap">${escapeHtml(text)}</div>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function dayName(isoDate) {
  if (!isoDate || typeof isoDate !== 'string') return '';
  const d = new Date(isoDate + 'T12:00:00');
  if (Number.isNaN(d.getTime())) return '';
  return DAYS[d.getDay()] || '';
}

export function listWorkingDates(fromIso, toIso, excludeSunday) {
  const out = [];
  if (!fromIso || !toIso) return out;
  let cur = new Date(fromIso + 'T12:00:00');
  const end = new Date(toIso + 'T12:00:00');
  if (Number.isNaN(cur.getTime()) || Number.isNaN(end.getTime())) return out;
  while (cur <= end) {
    const dow = cur.getDay();
    if (!excludeSunday || dow !== 0) {
      out.push(cur.toISOString().slice(0, 10));
    }
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}
