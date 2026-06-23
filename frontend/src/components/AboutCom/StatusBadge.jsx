export const StatusBadge = () => (
  <span className="about-status-badge inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
    <span className="about-pulse-wrap relative flex h-2.5 w-2.5">
      <span className="about-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
      <span className="about-pulse-dot relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
    </span>
    Now Accepting Fellows
  </span>
);
