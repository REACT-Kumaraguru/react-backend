import {
  BadgeDollarSign,
  Binary,
  Bot,
  Building2,
  ChartNoAxesCombined,
  Cpu,
  Factory,
  FlaskConical,
  Gauge,
  HandCoins,
  Leaf,
  Microscope,
  Radar,
  RotateCcw,
  ScanLine,
  Sprout,
  Timer,
  Tractor,
  Users,
  Waves
} from 'lucide-react';

export const problemStats = [
  { value: 400, prefix: '$', suffix: 'M', label: 'annual economic loss from inefficient papaya cultivation', tone: 'earth' },
  { value: 50, suffix: '%', label: 'land wasted before productive female plants are known', tone: 'green' },
  { value: 40, suffix: '%', label: 'labor wasted on non-productive male plants', tone: 'earth' },
  { value: 30, suffix: '%', label: 'water and fertilizer inefficiency before sorting', tone: 'green' }
];

export const existingSolutions = [
  {
    name: 'Traditional methods',
    icon: Sprout,
    accuracy: 'Low',
    speed: 'Months',
    cost: 'Low upfront',
    limitation: 'Sex is known only after plant growth, causing wasted land and inputs.'
  },
  {
    name: 'DNA PCR',
    icon: FlaskConical,
    accuracy: 'Very high',
    speed: 'Hours-days',
    cost: 'High',
    limitation: 'Lab-dependent, expensive, and difficult to scale for small farmers.'
  },
  {
    name: 'Spectroscopy',
    icon: Waves,
    accuracy: 'High',
    speed: 'Seconds',
    cost: 'Medium',
    limitation: 'Needs AI integration and automated sorting to become field-ready.'
  },
  {
    name: 'LAMP Molecular Test',
    icon: Microscope,
    accuracy: 'High',
    speed: 'Fast',
    cost: 'Medium-high',
    limitation: 'Still reagent-based and less suitable for continuous seed-line sorting.'
  }
];

export const technologyCards = [
  { title: 'NIR spectroscopy scanning', icon: ScanLine, copy: 'Reads invisible seed signatures without cutting, soaking, or damaging the seed.' },
  { title: 'Machine learning classification', icon: Binary, copy: 'Transforms spectral curves into male/female prediction confidence in seconds.' },
  { title: 'Automated seed sorting', icon: RotateCcw, copy: 'Servo actuation sends classified seeds into the correct channel instantly.' },
  { title: 'Edge AI deployment', icon: Cpu, copy: 'Runs inference close to the sensor for portable, farmer-friendly operation.' }
];

export const processFlow = [
  { title: 'NIR sensing', icon: Radar },
  { title: 'AI inference', icon: Bot },
  { title: 'Servo actuation', icon: Gauge },
  { title: 'Precision sorting', icon: Leaf }
];

export const keyFeatures = [
  { title: 'Non-destructive sensing', icon: ScanLine, text: 'Seed quality remains intact for planting after analysis.' },
  { title: 'Edge AI intelligence', icon: Cpu, text: 'Fast local inference without constant cloud dependency.' },
  { title: 'Real-time classification', icon: Timer, text: 'Seconds-level decisions for scalable sorting workflows.' },
  { title: 'Automated sorting', icon: Factory, text: 'Servo-powered separation reduces manual work and error.' }
];

export const uniqueness = [
  { title: 'Faster than traditional methods', icon: Timer },
  { title: 'Near DNA-level accuracy', icon: Microscope },
  { title: 'Lower cost', icon: BadgeDollarSign },
  { title: 'No lab requirement', icon: Leaf },
  { title: 'Portable and farmer-friendly', icon: Tractor },
  { title: 'Scalable to other crops', icon: ChartNoAxesCombined }
];

export const impactStats = [
  { value: 40, suffix: '%', label: 'yield improvement potential' },
  { value: 35, suffix: '%', label: 'less water wastage' },
  { value: 28, suffix: '%', label: 'higher farmer income' }
];

export const stakeholders = [
  { title: 'Papaya farmers', icon: Tractor },
  { title: 'Seed suppliers', icon: Sprout },
  { title: 'Agri-tech startups', icon: Cpu },
  { title: 'Government institutions', icon: Building2 },
  { title: 'Commercial plantations', icon: Users }
];

export const strategy = [
  { title: 'Farmer-first pilots', icon: Tractor },
  { title: 'Seed supplier partnerships', icon: HandCoins },
  { title: 'Portable device sales', icon: Factory },
  { title: 'Crop expansion model', icon: Leaf }
];
