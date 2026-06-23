import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { emptyPayload, normalizePayload, formatPriorityLabel, formatPpeSummary } from '../lib/formDefaults';

function safe(v) {
  if (v == null || v === '') return '—';
  return String(v);
}

function rowPayload(raw) {
  const o = typeof raw === 'string' ? JSON.parse(raw) : raw || {};
  return normalizePayload({ ...emptyPayload(), ...o });
}

export function exportSubmissionPdf(row) {
  const p = rowPayload(row.payload);
  const s1 = p.step1 || {};
  const s2 = p.step2 || {};
  const s3 = p.step3 || {};
  const s4 = p.step4 || {};
  const s5 = p.step5 || {};
  const s6 = p.step6 || {};
  const s7 = p.step7 || {};
  const s8 = p.step8 || {};
  const s9 = p.step9 || {};
  const s10 = p.step10 || {};

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const margin = 14;
  let y = 16;

  doc.setFontSize(18);
  doc.setTextColor(249, 115, 22);
  doc.text('Risk Assessment Report', margin, y);
  y += 10;

  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.text(`Status: ${safe(row.status)}`, margin, y);
  y += 6;
  doc.text(`Team: ${safe(s1.teamName)}  |  Project: ${safe(s1.projectTitle)}`, margin, y);
  y += 8;

  doc.setFontSize(11);
  doc.text('Project details', margin, y);
  y += 5;
  autoTable(doc, {
    startY: y,
    head: [['Field', 'Value']],
    body: [
      ['Department', safe(s1.department)],
      ['Location of experiment', safe(s1.location)],
      ['Start', safe(s1.startDateTime)],
      ['End', safe(s1.endDateTime)],
      ['Faculty', safe(s1.facultyName)],
      ['Faculty email', safe(s1.facultyEmail)],
      ['Student', safe(s1.studentName)],
      ['Student email', safe(s1.studentEmail)],
      ['Contact', safe(s1.contact)],
      ['Priority', safe(formatPriorityLabel(s2.priority))],
    ],
    styles: { fontSize: 9 },
    headStyles: { fillColor: [249, 115, 22] },
    margin: { left: margin, right: margin },
  });
  y = (doc.lastAutoTable?.finalY ?? y) + 10;

  doc.setFontSize(11);
  doc.text('Description', margin, y);
  y += 5;
  autoTable(doc, {
    startY: y,
    body: [
      ['Objective', safe(s3.objective)],
      ['Methodology', safe(s3.methodology)],
      ['Equipment used', safe(s3.equipment)],
    ],
    styles: { fontSize: 9 },
    margin: { left: margin, right: margin },
  });
  y = (doc.lastAutoTable?.finalY ?? y) + 10;

  const hazRows = (s4.hazards || []).map((h, i) => [
    String(i + 1),
    safe(h.activity),
    safe(h.hazardType),
    safe(h.description),
  ]);
  doc.text('Hazard identification', margin, y);
  y += 5;
  autoTable(doc, {
    startY: y,
    head: [['S.No', 'Activity / Step', 'Type', 'Description']],
    body: hazRows.length ? hazRows : [['—', '—', '—', '—']],
    styles: { fontSize: 8 },
    headStyles: { fillColor: [249, 115, 22] },
    margin: { left: margin, right: margin },
  });
  y = (doc.lastAutoTable?.finalY ?? y) + 10;

  const evRows = (s5.evaluations || []).map((e) => [
    safe(e.hazard),
    safe(e.likelihood),
    safe(e.severity),
    safe(e.riskLevel),
  ]);
  doc.text('Risk evaluation', margin, y);
  y += 5;
  autoTable(doc, {
    startY: y,
    head: [['Hazard', 'Likelihood', 'Severity', 'Risk level']],
    body: evRows.length ? evRows : [['—', '—', '—', '—']],
    styles: { fontSize: 8 },
    headStyles: { fillColor: [249, 115, 22] },
    margin: { left: margin, right: margin },
  });
  y = (doc.lastAutoTable?.finalY ?? y) + 10;

  const cRows = (s6.controls || []).map((c) => [safe(c.hazard), safe(c.preventive), safe(c.actions)]);
  doc.text('Control measures', margin, y);
  y += 5;
  autoTable(doc, {
    startY: y,
    head: [['Hazard', 'Preventive measures', 'Control actions']],
    body: cRows.length ? cRows : [['—', '—', '—']],
    styles: { fontSize: 8 },
    headStyles: { fillColor: [249, 115, 22] },
    margin: { left: margin, right: margin },
  });
  y = doc.lastAutoTable.finalY + 10;

  doc.text('Personal protective equipment (PPE)', margin, y);
  y += 5;
  autoTable(doc, {
    startY: y,
    body: [[safe(formatPpeSummary(s7))]],
    styles: { fontSize: 9 },
    margin: { left: margin, right: margin },
  });
  y = (doc.lastAutoTable?.finalY ?? y) + 10;

  doc.text('Emergency preparedness', margin, y);
  y += 5;
  autoTable(doc, {
    startY: y,
    body: [
      ['Emergency shutdown procedure', safe(s8.emergencyShutdown)],
      ['First aid availability', safe(s8.firstAid)],
      ['Fire safety equipment', safe(s8.fireSafety)],
      ['Emergency contact numbers', safe(s8.emergencyContacts)],
    ],
    styles: { fontSize: 9 },
    margin: { left: margin, right: margin },
  });
  y = (doc.lastAutoTable?.finalY ?? y) + 10;

  doc.text('Waste disposal', margin, y);
  y += 5;
  autoTable(doc, {
    startY: y,
    body: [
      ['Type of waste', safe(s9.wasteType)],
      ['Disposal method', safe(s9.disposalMethod)],
      ['Environmental impact', safe(s9.environmentalImpact)],
    ],
    styles: { fontSize: 9 },
    margin: { left: margin, right: margin },
  });
  y = (doc.lastAutoTable?.finalY ?? y) + 10;

  doc.text(
    `Declaration — Team lead: ${safe(s10.teamLeadName)}  |  Date: ${safe(s10.date)}  |  Confirmed: ${s10.confirmed ? 'Yes' : 'No'}`,
    margin,
    y,
  );

  doc.save(`risk-assessment-${row.id || 'report'}.pdf`);
}

export function exportSubmissionsCsv(rows) {
  const headers = ['id', 'team_name', 'project_title', 'status', 'created_at', 'applicant_email'];
  const lines = [headers.join(',')];
  for (const r of rows) {
    const vals = headers.map((h) => {
      const v = r[h];
      const s = v == null ? '' : String(v);
      return `"${s.replace(/"/g, '""')}"`;
    });
    lines.push(vals.join(','));
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'riskm-submissions.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}
