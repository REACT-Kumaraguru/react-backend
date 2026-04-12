/**
 * Landing track sub-pages — /fellowship/:slug and /fellowship/:slug/forms
 * Team replaces placeholder copy, milestone dates, and optional externalFormUrl (redirect on /forms).
 */

export const FELLOWSHIP_TRACKS = [
  {
    slug: 'social-innovation-fellowship',
    title: 'The Social Innovation Fellowship',
    heroFor:
      '[One sentence — who this track is for, e.g. MSW students at KCLAS building social ventures.]',
    accent: '#7D5BBE',
    outputs: [
      '[Output — e.g. research paper to publication standard]',
      '[Output — e.g. working proof of concept + MVP]',
      '[Output — e.g. verified social impact report]',
      '[Output — e.g. registered entity]',
    ],
    milestones: [
      { title: '[Milestone title — team to edit]', date: '[Date TBC]' },
      { title: '[Milestone title — team to edit]', date: '[Date TBC]' },
      { title: '[Milestone title — team to edit]', date: '[Date TBC]' },
      { title: '[Milestone title — team to edit]', date: '[Date TBC]' },
    ],
    eligibility:
      '[Eligibility — one paragraph. Replace with who can apply, prerequisites, and partner institution notes.]',
    admission:
      '[Admission — one paragraph, keep high level.] Timelines and requirements may vary by intake. Reach out and we will walk you through it.',
    externalFormUrl: '',
  },
  {
    slug: 'young-builders-programme',
    title: 'The Young Builders Programme',
    heroFor:
      '[One sentence — who this track is for, e.g. Grade 7–12 students on IB or Cambridge pathways.]',
    accent: '#13B58C',
    outputs: [
      '[Output — e.g. documented research project]',
      '[Output — e.g. working prototype]',
      '[Output — e.g. university admissions portfolio]',
      '[Output — e.g. certificate / credential]',
    ],
    milestones: [
      { title: '[Milestone title — team to edit]', date: '[Date TBC]' },
      { title: '[Milestone title — team to edit]', date: '[Date TBC]' },
      { title: '[Milestone title — team to edit]', date: '[Date TBC]' },
      { title: '[Milestone title — team to edit]', date: '[Date TBC]' },
    ],
    eligibility:
      '[Eligibility — one paragraph. Replace with who can apply, prerequisites, and partner institution notes.]',
    admission:
      '[Admission — one paragraph, keep high level.] Timelines and requirements may vary by intake. Reach out and we will walk you through it.',
    externalFormUrl: '',
  },
  {
    slug: 'founders-track',
    title: 'The Founders Track',
    heroFor:
      '[One sentence — who this track is for, e.g. professionals turning a known problem into a venture.]',
    accent: '#F2A11C',
    outputs: [
      '[Output — e.g. validated problem statement]',
      '[Output — e.g. working MVP]',
      '[Output — e.g. grant application]',
      '[Output — e.g. registered entity]',
    ],
    milestones: [
      { title: '[Milestone title — team to edit]', date: '[Date TBC]' },
      { title: '[Milestone title — team to edit]', date: '[Date TBC]' },
      { title: '[Milestone title — team to edit]', date: '[Date TBC]' },
      { title: '[Milestone title — team to edit]', date: '[Date TBC]' },
    ],
    eligibility:
      '[Eligibility — one paragraph. Replace with who can apply, prerequisites, and partner institution notes.]',
    admission:
      '[Admission — one paragraph, keep high level.] Timelines and requirements may vary by intake. Reach out and we will walk you through it.',
    externalFormUrl: '',
  },
];

export function getFellowshipTrackBySlug(slug) {
  const s = String(slug || '')
    .trim()
    .toLowerCase();
  if (!s) return null;
  return FELLOWSHIP_TRACKS.find((t) => t.slug === s) ?? null;
}
