import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { listWorkingDates, dayName } from '../../lib/odDateUtils';
import {
  getSession,
  createOdSubmission,
  updateOdSubmission,
  submitOdForReview,
  fetchOdSubmission,
} from '../../api/workplaceApi';

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#2D334A] outline-none focus:border-[#3B82F6]';
const descClass = `${inputClass} whitespace-pre-wrap min-h-[140px] font-sans leading-relaxed`;
const labelClass = 'mb-1 block text-xs font-medium text-[#9CA3AF]';

export default function OdApplyPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const qp = searchParams.get('id');
  const parsedFromUrl = qp && !Number.isNaN(parseInt(qp, 10)) ? parseInt(qp, 10) : null;

  const [loading, setLoading] = useState(!!parsedFromUrl);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [id, setId] = useState(parsedFromUrl);

  const [subject, setSubject] = useState('Request for Special On-Duty Approval');
  const [salutation, setSalutation] = useState('Madam');
  const [studentName, setStudentName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [departmentYear, setDepartmentYear] = useState('');
  const [odCategory, setOdCategory] = useState('SPECIAL_ON_DUTY');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [scheduleType, setScheduleType] = useState('ONLY_CLASS');
  const [excludeSundays, setExcludeSundays] = useState(true);
  const [weekHours, setWeekHours] = useState({});
  const [description1, setDescription1] = useState('');
  const [description2, setDescription2] = useState('');

  const syncWeekHourKeys = useCallback(() => {
    if (scheduleType !== 'ONLY_CLASS' || !fromDate || !toDate) return;
    const dates = listWorkingDates(fromDate, toDate, excludeSundays);
    setWeekHours((prev) => {
      const next = {};
      for (const d of dates) {
        next[d] = prev[d] ? [...prev[d]] : [];
      }
      return next;
    });
  }, [fromDate, toDate, excludeSundays, scheduleType]);

  useEffect(() => {
    syncWeekHourKeys();
  }, [syncWeekHourKeys]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const s = await getSession();
      if (cancelled) return;
      if (!s || s.role !== 'user') {
        navigate('/workplace/login', { replace: true });
        return;
      }
      setStudentName((prev) => prev || s.name || '');
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setError('');
      try {
        const row = await fetchOdSubmission(id);
        if (cancelled) return;
        if (row.status !== 'DRAFT') {
          setError('This application was already sent. View it under On-duty (OD).');
          setLoading(false);
          return;
        }
        setSubject(row.subject || '');
        setSalutation(row.salutation === 'Sir' ? 'Sir' : 'Madam');
        setStudentName(row.student_name || '');
        setRegisterNumber(row.register_number || '');
        setDepartmentYear(row.department_year || '');
        setOdCategory(row.od_category || 'SPECIAL_ON_DUTY');
        setFromDate(String(row.from_date).slice(0, 10));
        setToDate(String(row.to_date).slice(0, 10));
        setScheduleType(row.schedule_type || 'ONLY_CLASS');
        setExcludeSundays(row.exclude_sundays !== false);
        setWeekHours(typeof row.week_hours === 'object' && row.week_hours ? row.week_hours : {});
        setDescription1(row.description_1 || '');
        setDescription2(row.description_2 || '');
      } catch (e) {
        if (!cancelled) setError(e.message || 'Could not load draft');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  function toggleHour(dateStr, h) {
    setWeekHours((prev) => {
      const cur = [...(prev[dateStr] || [])];
      const i = cur.indexOf(h);
      if (i >= 0) cur.splice(i, 1);
      else cur.push(h);
      cur.sort((a, b) => a - b);
      return { ...prev, [dateStr]: cur };
    });
  }

  function selectAllHoursAllDays() {
    if (!fromDate || !toDate) return;
    const dates = listWorkingDates(fromDate, toDate, excludeSundays);
    const next = {};
    for (const d of dates) next[d] = [1, 2, 3, 4, 5, 6, 7];
    setWeekHours(next);
  }

  function buildPayload() {
    return {
      subject,
      salutation,
      student_name: studentName,
      register_number: registerNumber,
      department_year: departmentYear,
      od_category: odCategory,
      from_date: fromDate,
      to_date: toDate,
      schedule_type: scheduleType,
      exclude_sundays: excludeSundays,
      week_hours: weekHours,
      description_1: description1,
      description_2: description2,
    };
  }

  async function saveDraft() {
    setError('');
    setSaving(true);
    try {
      const payload = buildPayload();
      if (id) {
        await updateOdSubmission(id, payload);
      } else {
        const row = await createOdSubmission(payload);
        setId(row.id);
        setSearchParams({ id: String(row.id) });
      }
    } catch (e) {
      setError(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function sendForReview() {
    setError('');
    if (!id) {
      setError('Save as draft first.');
      return;
    }
    setSaving(true);
    try {
      await updateOdSubmission(id, buildPayload());
      await submitOdForReview(id);
      navigate('/workplace/od', { replace: true });
    } catch (e) {
      setError(e.message || 'Could not submit');
    } finally {
      setSaving(false);
    }
  }

  const dates = fromDate && toDate ? listWorkingDates(fromDate, toDate, excludeSundays) : [];

  if (loading) {
    return (
      <div className="py-16 text-center text-[#9CA3AF] text-sm">Loading draft…</div>
    );
  }

  return (
    <div className="py-8 px-4 md:pl-8 md:pr-8 max-w-4xl pb-24">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2D334A]">OD application</h1>
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Fill the form, save as draft, then send for review. Time is recorded in IST when you send.
          </p>
        </div>
        <Link to="/workplace/od" className="text-sm font-semibold text-[#3B82F6] hover:underline">
          ← Back to OD hub
        </Link>
      </div>

      {error ? (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="space-y-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="subject" className={labelClass}>
              Subject
            </label>
            <input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass} />
          </div>
          <div>
            <span className={labelClass}>Salutation</span>
            <div className="flex gap-4 pt-2">
              <label className="flex items-center gap-2 text-sm text-[#2D334A]">
                <input
                  type="radio"
                  name="sal"
                  checked={salutation === 'Madam'}
                  onChange={() => setSalutation('Madam')}
                />
                Madam
              </label>
              <label className="flex items-center gap-2 text-sm text-[#2D334A]">
                <input
                  type="radio"
                  name="sal"
                  checked={salutation === 'Sir'}
                  onChange={() => setSalutation('Sir')}
                />
                Sir
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="odcat" className={labelClass}>
              Type
            </label>
            <select
              id="odcat"
              value={odCategory}
              onChange={(e) => setOdCategory(e.target.value)}
              className={inputClass}
            >
              <option value="SPECIAL_ON_DUTY">Special On-Duty</option>
              <option value="ON_DUTY">On-Duty</option>
            </select>
          </div>
          <div>
            <label htmlFor="sn" className={labelClass}>
              Student name
            </label>
            <input id="sn" value={studentName} onChange={(e) => setStudentName(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="reg" className={labelClass}>
              Register number
            </label>
            <input id="reg" value={registerNumber} onChange={(e) => setRegisterNumber(e.target.value)} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="dept" className={labelClass}>
              Year & department (e.g. II Year B.E. ECE)
            </label>
            <input id="dept" value={departmentYear} onChange={(e) => setDepartmentYear(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="fd" className={labelClass}>
              From date
            </label>
            <input
              id="fd"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="td" className={labelClass}>
              To date
            </label>
            <input
              id="td"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <span className={labelClass}>Schedule</span>
            <div className="flex flex-col gap-2 pt-2">
              <label className="flex items-center gap-2 text-sm text-[#2D334A]">
                <input
                  type="radio"
                  name="sch"
                  checked={scheduleType === 'FULL_DAY'}
                  onChange={() => setScheduleType('FULL_DAY')}
                />
                Full day (each working day in range)
              </label>
              <label className="flex items-center gap-2 text-sm text-[#2D334A]">
                <input
                  type="radio"
                  name="sch"
                  checked={scheduleType === 'ONLY_CLASS'}
                  onChange={() => setScheduleType('ONLY_CLASS')}
                />
                Only class hours (1–7)
              </label>
            </div>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm text-[#2D334A]">
              <input
                type="checkbox"
                checked={excludeSundays}
                onChange={(e) => setExcludeSundays(e.target.checked)}
              />
              Treat Sunday as holiday (skip in schedule)
            </label>
          </div>
        </div>

        {scheduleType === 'ONLY_CLASS' && dates.length > 0 ? (
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold text-[#2D334A]">Hours per date (7 hours max / day)</span>
              <button
                type="button"
                onClick={selectAllHoursAllDays}
                className="rounded-lg border border-[#2D334A] px-3 py-1.5 text-xs font-semibold text-[#2D334A] hover:bg-[#2D334A] hover:text-white"
              >
                Select all hours for all days
              </button>
            </div>
            <div className="space-y-4">
              {dates.map((d) => (
                <div key={d} className="rounded-lg border border-gray-100 p-3">
                  <p className="mb-2 text-xs font-medium text-[#2D334A]">
                    {d} ({dayName(d)})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((h) => (
                      <label
                        key={h}
                        className={`inline-flex cursor-pointer items-center gap-1 rounded border px-2 py-1 text-xs text-[#2D334A] ${
                          (weekHours[d] || []).includes(h)
                            ? 'border-[#2D334A] bg-[#2D334A]/10'
                            : 'border-gray-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={(weekHours[d] || []).includes(h)}
                          onChange={() => toggleHour(d, h)}
                        />
                        {h}hr
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <label htmlFor="d1" className={labelClass}>
            Description 1 (body / reason)
          </label>
          <textarea
            id="d1"
            rows={8}
            value={description1}
            onChange={(e) => setDescription1(e.target.value)}
            className={descClass}
            placeholder="Line breaks and spacing are kept in the PDF letter."
          />
        </div>
        <div>
          <label htmlFor="d2" className={labelClass}>
            Description 2 (competitions / events / justification)
          </label>
          <textarea
            id="d2"
            rows={8}
            value={description2}
            onChange={(e) => setDescription2(e.target.value)}
            className={descClass}
            placeholder="List events, competitions, closing justification… (formatting preserved in PDF)"
          />
        </div>

        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-6">
          <button
            type="button"
            disabled={saving}
            onClick={saveDraft}
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#2D334A] ring-1 ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save draft'}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={sendForReview}
            className="rounded-xl bg-[#2D334A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#232838] disabled:opacity-50"
          >
            Save & send for review
          </button>
        </div>
      </div>
    </div>
  );
}
