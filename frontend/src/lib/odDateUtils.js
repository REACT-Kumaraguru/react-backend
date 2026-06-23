/** List YYYY-MM-DD strings from from to to (inclusive), optionally skip Sundays */
export function listWorkingDates(fromIso, toIso, excludeSunday) {
  const out = [];
  let cur = new Date(fromIso + 'T12:00:00');
  const end = new Date(toIso + 'T12:00:00');
  if (Number.isNaN(cur.getTime()) || Number.isNaN(end.getTime()) || cur > end) return out;
  while (cur <= end) {
    if (!excludeSunday || cur.getDay() !== 0) {
      out.push(cur.toISOString().slice(0, 10));
    }
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

export function dayName(iso) {
  const d = new Date(iso + 'T12:00:00');
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
}
