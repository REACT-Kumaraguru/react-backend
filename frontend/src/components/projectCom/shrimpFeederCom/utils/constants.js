// Single source of truth — all copy & figures derived from the Thynk proposal.

export const NAV_LINKS = [
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Innovation' },
  { id: 'features', label: 'Features' },
  { id: 'impact', label: 'Impact' },
  { id: 'timeline', label: 'Roadmap' },
];

export const HERO_STATS = [
  { value: 30, suffix: '%', label: 'Feed Waste Reduced', prefix: '~' },
  { value: 100, suffix: '%', label: 'Improved Water Quality', prefix: '' },
  { value: 360, suffix: '°', label: 'Multi-Direction Feeding', prefix: '' },
];

export const PROBLEM_STATS = [
  {
    value: 30,
    prefix: '20–',
    suffix: '%',
    label: 'of feed wasted from uneven distribution & overfeeding',
  },
  {
    value: 2.2,
    prefix: '$1.5–',
    suffix: 'B',
    decimals: 1,
    label: 'estimated global economic loss every year',
  },
  {
    value: 70,
    prefix: '50–',
    suffix: '%',
    label: 'of farming operational cost comes from feed',
  },
];

export const PROBLEM_POINTS = [
  {
    title: 'Feed Wastage',
    text: 'Nearly 20–30% of feed is wasted due to uneven distribution and overfeeding in shrimp farming.',
  },
  {
    title: 'Uneven Distribution',
    text: 'Feed dropped in a single location causes shrimp crowding, competition and uneven growth.',
  },
  {
    title: 'Water Pollution',
    text: 'Poor feeding practices drive water pollution, ammonia formation and disease outbreaks.',
  },
  {
    title: 'Economic Loss',
    text: 'An estimated USD 1.5–2.2 billion is lost globally each year from inefficient feeding.',
  },
];

export const EXISTING_SOLUTIONS = [
  {
    name: 'Manual Feeding',
    how: 'Feed distributed by workers based on experience and visual observation — the most common traditional method.',
    limitation:
      'Continuous human involvement and uneven feed distribution; quality and efficiency drop.',
    waste: 30,
    efficiency: 45,
  },
  {
    name: 'Feed Tray Monitoring',
    how: 'Trays check leftover feed to estimate appetite after feeding; farmers decide the next quantity.',
    limitation:
      'No real-time prediction — appetite detected only after use. Manual checks every 2–4 hours.',
    waste: 30,
    efficiency: 58,
  },
  {
    name: 'Automated Feeding Tech',
    how: 'Feeders distribute at scheduled times using timers, sensors or smart controllers.',
    limitation:
      'Inaccurate automation still causes overfeeding; may reduce shrimp survival by 15–25%.',
    waste: 30,
    efficiency: 66,
  },
];

export const SOLUTION_BENEFITS = [
  {
    title: 'Uniform Feed Distribution',
    text: 'A precise multi-direction splitting mechanism spreads feed evenly across the entire tank instead of one concentrated area.',
  },
  {
    title: 'Reduced Clogging',
    text: 'An improved feed-flow pathway prevents pellet blockage and moisture-related clotting for continuous operation.',
  },
  {
    title: 'Better Shrimp Growth',
    text: 'Even availability reduces crowding and competition, supporting uniform, healthier shrimp growth.',
  },
  {
    title: 'Sustainable Aquaculture',
    text: 'Less waste means better water quality, reduced ammonia and a lower environmental footprint.',
  },
];

export const PRINCIPLE_STEPS = [
  {
    n: '01',
    title: 'Feed Enters Hopper',
    text: 'Pellets are stored in a sealed hopper, isolated from moisture.',
  },
  {
    n: '02',
    title: 'Controlled Pathway',
    text: 'Feed moves through a controlled, anti-clog feed pathway.',
  },
  {
    n: '03',
    title: 'Splitting Mechanism',
    text: 'The rotating splitter divides feed into multiple equal streams.',
  },
  {
    n: '04',
    title: 'Multi-Direction Release',
    text: 'Feed is launched outward in several directions simultaneously.',
  },
  {
    n: '05',
    title: 'Uniform Tank Coverage',
    text: 'Even coverage improves access, water quality and efficiency.',
  },
];

export const FEATURES = [
  {
    icon: 'Split',
    title: 'Precise Feed Splitting',
    text: 'Divides feed equally into multiple directions inside the tank.',
  },
  {
    icon: 'Radar',
    title: 'Uniform Distribution',
    text: 'Feed spread evenly across the culture tank, not one concentrated area.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Anti-Clogging System',
    text: 'Improved pathway prevents pellet blockage and moisture clogging.',
  },
  {
    icon: 'Waves',
    title: 'Smart Feed Flow',
    text: 'Smooth, continuous feeding operation even in humid environments.',
  },
  {
    icon: 'Droplets',
    title: 'Water Quality Protection',
    text: 'Less waste reduces ammonia formation and stabilises water quality.',
  },
  {
    icon: 'Leaf',
    title: 'Sustainable Farming',
    text: 'Lower feed loss and cost supports sustainable shrimp cultivation.',
  },
];

export const IMPACT_METRICS = [
  { label: 'Feed Wastage Reduced', value: 30, suffix: '%', tone: 'aqua' },
  { label: 'Shrimp Growth Uniformity', value: 85, suffix: '%', tone: 'teal' },
  { label: 'Vitamin B12 Nutrition Support', value: 100, suffix: '%', tone: 'cyanic' },
  { label: 'Ammonia Formation Reduced', value: 60, suffix: '%', tone: 'aqua' },
  { label: 'Operational Cost Lowered', value: 40, suffix: '%', tone: 'teal' },
];

export const AUDIENCE = [
  { icon: 'Sprout', title: 'Small-Scale Farmers', text: 'Using manual feeding methods seeking affordable automation.' },
  { icon: 'Recycle', title: 'Biofloc Farm Owners', text: 'Facing feed wastage and water quality problems.' },
  { icon: 'Building2', title: 'Indoor Operators', text: 'Intensive indoor farming requiring uniform feed distribution.' },
  { icon: 'TrendingUp', title: 'Commercial Managers', text: 'Aiming to reduce feed cost and improve production.' },
  { icon: 'Cpu', title: 'Aquaculture Technicians', text: 'Managing automated feeding and water-quality systems.' },
  { icon: 'Rocket', title: 'Sustainable Startups', text: 'Developing smart, sustainable shrimp-farming solutions.' },
];

export const SEAFOOD_PRODUCTION = [
  { year: '2020', value: 179 },
  { year: '2021', value: 185 },
  { year: '2022', value: 188 },
  { year: '2023', value: 192 },
  { year: '2024', value: 195 },
  { year: '2025', value: 197 },
];

export const MARKET_STATS = [
  { value: 79, prefix: '$75–', suffix: 'B', decimals: 0, label: 'Global shrimp market value (2025)' },
  { value: 6.1, suffix: 'M t', decimals: 1, label: 'Global shrimp production (2025)' },
  { value: 300, prefix: '$', suffix: 'B+', decimals: 0, label: 'Global aquaculture market value' },
  { value: 70, prefix: '50–', suffix: '%', decimals: 0, label: 'Operational cost from feed management' },
];

export const TIMELINE = [
  {
    date: 'May 2026',
    title: 'Prototype Stage',
    items: [
      'Build the precise feed splitting mechanism',
      'Test feed flow, motor operation & distribution accuracy',
      'Complete initial prototype design',
    ],
  },
  {
    date: 'June 2026',
    title: 'System Development',
    items: [
      'Integrate sensors and automation components',
      'Improve feeding accuracy and reduce feed wastage',
    ],
  },
  {
    date: 'July 2026',
    title: 'Testing & Analysis',
    items: [
      'Tank-level testing in shrimp farming conditions',
      'Monitor shrimp response, feed efficiency & water quality',
      'Compare results with conventional feeding methods',
    ],
  },
  {
    date: '2026 →',
    title: 'Commercial Deployment',
    items: [
      'Scale to South India & UAE shrimp farms',
      'Multi-tank feeder units for commercial farms',
      'Long-term sustainable market growth',
    ],
  },
];

export const TEAM = [
  { name: 'Yanis Petros', role: 'Project Lead & Presenter', tag: 'Vision · Strategy' },
  { name: 'Team Member', role: 'Mechanical Design', tag: 'Splitter & Hopper' },
  { name: 'Team Member', role: 'Embedded & Automation', tag: 'Sensors · Control' },
  { name: 'Team Member', role: 'Aquaculture Research', tag: 'Field Testing' },
];

export const TEAM_MISSION =
  'As a team we analysed the major challenges in shrimp farming — feed wastage, uneven distribution and feeder blockage — and collaboratively engineered a precise multi-direction feed splitting mechanism for efficient, sustainable shrimp cultivation.';

export const CONTACT_EMAIL = 'reactkumaraguru@gmail.com';

export const SOCIALS = [
  { icon: 'Github', label: 'GitHub', href: '#' },
  { icon: 'Linkedin', label: 'LinkedIn', href: '#' },
  { icon: 'Twitter', label: 'X / Twitter', href: '#' },
  { icon: 'Instagram', label: 'Instagram', href: '#' },
];
