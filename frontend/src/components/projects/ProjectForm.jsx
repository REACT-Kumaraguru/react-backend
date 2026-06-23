const label = 'block text-xs font-semibold uppercase tracking-wide text-slate-500';
const input =
  'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20';

export default function ProjectForm({ value, onChange, idPrefix = 'proj' }) {
  const v = value || {};
  const set = (patch) => onChange({ ...v, ...patch });

  return (
    <div className="space-y-4">
      <div>
        <label className={label} htmlFor={`${idPrefix}-title`}>
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id={`${idPrefix}-title`}
          className={input}
          value={v.title || ''}
          onChange={(e) => set({ title: e.target.value })}
          placeholder="e.g. Agriculture Innovation"
        />
      </div>
      <div>
        <label className={label} htmlFor={`${idPrefix}-sort`}>
          Sort order
        </label>
        <input
          id={`${idPrefix}-sort`}
          type="number"
          className={input}
          value={v.sort_order === '' || v.sort_order === undefined ? '' : v.sort_order}
          onChange={(e) => set({ sort_order: e.target.value === '' ? '' : parseInt(e.target.value, 10) || 0 })}
        />
      </div>
      <div>
        <label className={label} htmlFor={`${idPrefix}-tagline`}>
          Tagline
        </label>
        <input
          id={`${idPrefix}-tagline`}
          className={input}
          value={v.tagline || ''}
          onChange={(e) => set({ tagline: e.target.value })}
          placeholder="Short subtitle under the status badge"
        />
      </div>
      <div>
        <label className={label} htmlFor={`${idPrefix}-posted`}>
          Status badge
        </label>
        <input
          id={`${idPrefix}-posted`}
          className={input}
          value={v.postedDate || ''}
          onChange={(e) => set({ postedDate: e.target.value })}
          placeholder="e.g. LATEST OUTCOME, IN REVIEW"
        />
      </div>
      <div>
        <label className={label} htmlFor={`${idPrefix}-who`}>
          Location / Who
        </label>
        <input
          id={`${idPrefix}-who`}
          className={input}
          value={v.who || ''}
          onChange={(e) => set({ who: e.target.value })}
        />
      </div>
      <div>
        <label className={label} htmlFor={`${idPrefix}-duration`}>
          Duration
        </label>
        <input
          id={`${idPrefix}-duration`}
          className={input}
          value={v.duration || ''}
          onChange={(e) => set({ duration: e.target.value })}
        />
      </div>
      <div>
        <label className={label} htmlFor={`${idPrefix}-format`}>
          Focus / Format
        </label>
        <input
          id={`${idPrefix}-format`}
          className={input}
          value={v.format || ''}
          onChange={(e) => set({ format: e.target.value })}
        />
      </div>
      <div>
        <label className={label} htmlFor={`${idPrefix}-image`}>
          Header image URL (optional)
        </label>
        <input
          id={`${idPrefix}-image`}
          type="url"
          className={input}
          value={v.imageUrl || ''}
          onChange={(e) => set({ imageUrl: e.target.value })}
          placeholder="https://…"
        />
      </div>
      <div>
        <label className={label} htmlFor={`${idPrefix}-desc`}>
          Card quote (short)
        </label>
        <textarea
          id={`${idPrefix}-desc`}
          rows={3}
          className={input}
          value={v.description || ''}
          onChange={(e) => set({ description: e.target.value })}
          placeholder="One or two lines shown in italics on the card"
        />
      </div>
      <div>
        <label className={label} htmlFor={`${idPrefix}-brief`}>
          Brief about the project
        </label>
        <textarea
          id={`${idPrefix}-brief`}
          rows={3}
          className={input}
          value={v.brief || ''}
          onChange={(e) => set({ brief: e.target.value })}
          placeholder="Short summary always visible on the card (below the quote)"
        />
      </div>
      <div>
        <label className={label} htmlFor={`${idPrefix}-idea`}>
          Brief idea (shown in popup)
        </label>
        <textarea
          id={`${idPrefix}-idea`}
          rows={6}
          className={input}
          value={v.briefIdea || ''}
          onChange={(e) => set({ briefIdea: e.target.value })}
          placeholder="Fuller narrative when visitors click the button"
        />
      </div>
      <div>
        <label className={label} htmlFor={`${idPrefix}-cta`}>
          Button label
        </label>
        <input
          id={`${idPrefix}-cta`}
          className={input}
          value={v.ctaLabel || ''}
          onChange={(e) => set({ ctaLabel: e.target.value })}
          placeholder="e.g. Read the idea, See our approach"
        />
      </div>
    </div>
  );
}
