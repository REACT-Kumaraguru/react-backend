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
  {
    slug: 'social-impact-fellowship',
    title: 'The Social Impact Fellowship',
    heroFor: 'Any graduate from any discipline, any institution, anywhere in the world — ready to go deep on a real problem.',
    accent: '#0F2A44',
    outputs: [
      'A published or submitted research paper',
      'A working proof of concept, tested and documented in the field',
      'A minimum viable product tested with real users',
      'A registered or actively developing social venture with a verified community impact report',
    ],
    milestones: [
      { title: 'Application opens', date: 'February' },
      { title: 'Application closes', date: 'July' },
      { title: 'Field immersion begins', date: 'Cohort start' },
      { title: 'Demo Day', date: 'End of programme' },
    ],
    eligibility:
      'Any graduate from any discipline, any institution, anywhere in the world. Designed for graduates between a first degree and doctoral research, between education and building something, or at the point of deciding which direction their work takes. No host degree required.',
    admission:
      'One year, full-time, immersive. 40 credits. Intake once a year, February to July application window. Reach out and we will walk you through the process.',
    externalFormUrl: '',
  },
  {
    slug: 'social-innovation-certification',
    title: 'The Social Innovation Certification',
    heroFor: 'Any current UG, PG, or PhD student at any institution who wants a validated problem statement to carry back.',
    accent: '#C06840',
    outputs: [
      'Validated problem statement',
      'Structured gap analysis across all four gap types',
      'Documented community understanding',
    ],
    milestones: [
      { title: 'Summer intake opens', date: 'May' },
      { title: 'Summer intake closes', date: 'July' },
      { title: 'Winter intake opens', date: 'December' },
      { title: 'Winter intake closes', date: 'January' },
    ],
    eligibility:
      'Any current UG, PG, or PhD student at any institution. You return to your own institution after the certification with a validated problem statement, a structured gap analysis, and a documented community understanding. A credential in its own right and the natural entry point for anyone considering the full Diploma.',
    admission:
      'One semester. Twice a year — May to July and December to January. Reach out and we will walk you through the process.',
    externalFormUrl: '',
  },
  {
    slug: 'field-internship',
    title: 'The Field Internship',
    heroFor: 'Students and early-career professionals ready to contribute to live programme work with real stakes.',
    accent: '#374151',
    outputs: [
      'Documented gap analysis contribution',
      'Real deliverable tied to an active fellow or partner project',
      'Programme operations experience in a live social innovation centre',
    ],
    milestones: [
      { title: 'Rolling intake — no fixed window', date: 'Write to us' },
      { title: 'Position confirmation', date: 'Case by case' },
      { title: 'Start date', date: 'Confirmed individually' },
      { title: 'End date', date: 'Variable' },
    ],
    eligibility:
      'Any student or early-career professional. Positions are confirmed individually, case by case, based on active programme needs. Write to info.react@kumaraguru.in with your background, availability, and which area you want to work in.',
    admission:
      'Rolling intake. No fixed application window. Positions confirmed on a rolling basis based on active programme needs. Reach out directly.',
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
