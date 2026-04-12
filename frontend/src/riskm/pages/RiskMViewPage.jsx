import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { fetchRiskmSubmission } from '../../api/riskmApi';
import { exportSubmissionPdf } from '../utils/exportRiskPdf';
import { useRiskmBase } from '../useRiskmBase';
import { emptyPayload, normalizePayload, formatPriorityLabel, formatPpeSummary } from '../lib/formDefaults';

const card = 'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm';

export default function RiskMViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const base = useRiskmBase();
  const listPath = base.includes('/admin/riskm') ? `${base}/admin` : `${base}/submissions`;
  const [row, setRow] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchRiskmSubmission(id);
        if (!cancelled) setRow(data);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Could not load');
          if (e.code === 401) navigate('/workplace/login', { replace: true });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  if (error && !row) {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-red-600">{error}</p>
        <Link to={listPath} className="mt-4 inline-block text-orange-600 hover:underline">
          Back
        </Link>
      </div>
    );
  }

  if (!row) {
    return <p className="text-slate-500">Loading…</p>;
  }

  const raw = typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload || {};
  const p = normalizePayload({ ...emptyPayload(), ...raw });
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

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">Risk Assessment Report</p>
          <h1 className="text-2xl font-bold text-slate-900">{s1.projectTitle || 'Submission'}</h1>
          <p className="text-slate-500">{s1.teamName}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to={listPath}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back
          </Link>
          {row.status === 'APPROVED' ? (
            <button
              type="button"
              onClick={() => exportSubmissionPdf(row)}
              className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Export as PDF
            </button>
          ) : null}
        </div>
      </div>

      <div className={card}>
        <h2 className="text-lg font-semibold text-slate-900">Basic information</h2>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          {[
            ['Department', s1.department],
            ['Location', s1.location],
            ['Start', s1.startDateTime],
            ['End', s1.endDateTime],
            ['Faculty', s1.facultyName],
            ['Faculty email', s1.facultyEmail],
            ['Student', s1.studentName],
            ['Student email', s1.studentEmail],
            ['Contact', s1.contact],
            ['Priority', formatPriorityLabel(s2.priority)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-slate-500">{k}</dt>
              <dd className="font-medium text-slate-900">{v || '—'}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={card}>
        <h2 className="text-lg font-semibold text-slate-900">Description</h2>
        <p className="mt-2 text-sm text-slate-700 whitespace-pre-wrap">{s3.objective || '—'}</p>
        <p className="mt-4 text-sm font-medium text-slate-800">Methodology</p>
        <p className="text-sm text-slate-700 whitespace-pre-wrap">{s3.methodology || '—'}</p>
        <p className="mt-4 text-sm font-medium text-slate-800">Equipment</p>
        <p className="text-sm text-slate-700 whitespace-pre-wrap">{s3.equipment || '—'}</p>
      </div>

      <div className={card}>
        <h2 className="text-lg font-semibold text-slate-900">Hazards</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="py-2 pr-2">#</th>
                <th className="py-2 pr-2">Activity</th>
                <th className="py-2 pr-2">Type</th>
                <th className="py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {(s4.hazards || []).map((h, i) => (
                <tr key={h.id || i} className="border-b border-slate-100">
                  <td className="py-2 pr-2">{i + 1}</td>
                  <td className="py-2 pr-2">{h.activity}</td>
                  <td className="py-2 pr-2">{h.hazardType}</td>
                  <td className="py-2">{h.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={card}>
        <h2 className="text-lg font-semibold text-slate-900">Risk evaluation</h2>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="py-2">Hazard</th>
              <th className="py-2">L</th>
              <th className="py-2">S</th>
              <th className="py-2">Risk</th>
            </tr>
          </thead>
          <tbody>
            {(s5.evaluations || []).map((e) => (
              <tr key={e.id} className="border-b border-slate-100">
                <td className="py-2">{e.hazard}</td>
                <td className="py-2">{e.likelihood}</td>
                <td className="py-2">{e.severity}</td>
                <td className="py-2 font-semibold text-orange-600">{e.riskLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={card}>
        <h2 className="text-lg font-semibold text-slate-900">Control measures</h2>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="py-2">Hazard</th>
              <th className="py-2">Preventive</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(s6.controls || []).map((c) => (
              <tr key={c.id} className="border-b border-slate-100">
                <td className="py-2 align-top">{c.hazard}</td>
                <td className="py-2 align-top">{c.preventive}</td>
                <td className="py-2 align-top">{c.actions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={card}>
        <h2 className="text-lg font-semibold text-slate-900">Personal protective equipment (PPE)</h2>
        <p className="mt-2 text-sm whitespace-pre-wrap text-slate-700">{formatPpeSummary(s7)}</p>
      </div>

      <div className={card}>
        <h2 className="text-lg font-semibold text-slate-900">Emergency preparedness</h2>
        <p className="mt-2 text-sm font-medium text-slate-800">Emergency shutdown procedure</p>
        <p className="text-sm whitespace-pre-wrap text-slate-700">{s8.emergencyShutdown || '—'}</p>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-slate-500">First aid availability</dt>
            <dd className="font-medium text-slate-900">{s8.firstAid || '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Fire safety equipment</dt>
            <dd className="font-medium text-slate-900">{s8.fireSafety || '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Emergency contacts</dt>
            <dd className="font-medium text-slate-900">{s8.emergencyContacts || '—'}</dd>
          </div>
        </dl>
      </div>

      <div className={card}>
        <h2 className="text-lg font-semibold text-slate-900">Waste disposal</h2>
        <dl className="mt-4 grid gap-2 text-sm">
          <div>
            <dt className="text-slate-500">Type</dt>
            <dd>{s9.wasteType}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Method</dt>
            <dd>{s9.disposalMethod}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Environmental impact</dt>
            <dd className="whitespace-pre-wrap">{s9.environmentalImpact}</dd>
          </div>
        </dl>
      </div>

      <div className={card}>
        <h2 className="text-lg font-semibold text-slate-900">Declaration</h2>
        <p className="mt-2 text-sm">
          Team lead: <strong>{s10.teamLeadName}</strong> · Date: <strong>{s10.date}</strong> · Confirmed:{' '}
          <strong>{s10.confirmed ? 'Yes' : 'No'}</strong>
        </p>
      </div>
    </div>
  );
}
