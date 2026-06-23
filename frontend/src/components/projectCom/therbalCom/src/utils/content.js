import {
  BadgeDollarSign,
  Factory,
  HandHeart,
  Layers3,
  Leaf,
  PackageOpen,
  Sprout,
  SunMedium,
  Users,
  Wind,
} from 'lucide-react'

import architectureLayers from '../assets/images/architecture-layers.png'
import chartPhase from '../assets/images/chart-phase.png'
import chartSpectral from '../assets/images/chart-spectral.png'
import existingSolutions from '../assets/images/existing-solutions.png'
import experimentSetup from '../assets/images/experiment-setup.png'
import heroTomatoes from '../assets/images/hero-tomatoes.png'
import leavesDry from '../assets/images/leaves-dry.png'
import leavesFresh from '../assets/images/leaves-fresh.png'
import problemCollage from '../assets/images/problem-collage.png'
import prototypeFolded from '../assets/images/prototype-folded.png'
import prototypeSheet from '../assets/images/prototype-sheet.png'
import thermalSheet from '../assets/images/thermal-sheet.png'

export const images = {
  architectureLayers,
  chartPhase,
  chartSpectral,
  existingSolutions,
  experimentSetup,
  heroTomatoes,
  leavesDry,
  leavesFresh,
  problemCollage,
  prototypeFolded,
  prototypeSheet,
  thermalSheet,
}

export const stats = [
  {
    value: '1.3B',
    suffix: 'tonnes',
    label: 'food is lost or wasted annually before it can become value.',
  },
  {
    value: '30-40',
    suffix: '%',
    label: 'of agricultural output can be lost across vulnerable supply chains.',
  },
  {
    value: '900+',
    suffix: 'B USD',
    label: 'in economic value disappears through preventable food loss.',
  },
]

export const solutions = [
  {
    title: 'Open-air drying',
    note: 'Low cost, but highly exposed to dust, animals, rain, and uneven moisture.',
    tag: 'Accessible',
  },
  {
    title: 'Tarpaulin drying',
    note: 'Portable and familiar, yet still vulnerable to contamination and weather shocks.',
    tag: 'Informal',
  },
  {
    title: 'Tunnel dryers',
    note: 'More controlled, but harder to distribute across small, dispersed farms.',
    tag: 'Centralized',
  },
  {
    title: 'Biomass dryers',
    note: 'Useful where fuel exists, but they add recurring cost and emissions complexity.',
    tag: 'Fueled',
  },
  {
    title: 'Industrial systems',
    note: 'Precise and productive, but expensive, fixed, and distant from many producers.',
    tag: 'Capital-heavy',
  },
]

export const productFeatures = [
  {
    icon: PackageOpen,
    title: 'Rollable thermal sheet',
    text: 'A sheet architecture that stores compactly, travels easily, and opens where harvest pressure appears.',
  },
  {
    icon: Wind,
    title: 'Flexible deployment',
    text: 'Designed for courtyards, rooftops, farm edges, cooperatives, and small drying clusters.',
  },
  {
    icon: SunMedium,
    title: 'Passive solar transfer',
    text: 'Turns everyday sunlight into usable thermal flow without demanding complex machinery.',
  },
  {
    icon: Layers3,
    title: 'Modular architecture',
    text: 'Layered materials create a lightweight system that can scale from a single sheet to a local micro-enterprise.',
  },
]

export const layers = [
  {
    title: 'Transmissive upper interface',
    detail: 'Admits solar energy while protecting produce from open exposure.',
    color: '#F5D7B5',
  },
  {
    title: 'Absorbing layer',
    detail: 'Captures and converts light into heat across the sheet body.',
    color: '#BD6B4C',
  },
  {
    title: 'Reflective boundary layer',
    detail: 'Reduces downward losses and redirects heat toward the drying zone.',
    color: '#D8D0C1',
  },
  {
    title: 'Controlled air gap',
    detail: 'Stabilizes convective movement for predictable moisture removal.',
    color: '#A6B092',
  },
  {
    title: 'Thermal transfer',
    detail: 'Moves accessible heat into produce preservation without fixed infrastructure.',
    color: '#35322C',
  },
]

export const impactCards = [
  {
    icon: Leaf,
    title: 'Value preservation',
    text: 'Keeps more harvest nutrition and market value inside the community that produced it.',
    metric: 40,
    suffix: '%',
  },
  {
    icon: HandHeart,
    title: 'Farmer empowerment',
    text: 'Places drying capacity closer to decision makers at the farm and cooperative level.',
    metric: 24,
    suffix: 'h',
  },
  {
    icon: Sprout,
    title: 'Reduced waste',
    text: 'Transforms moisture instability into a manageable preservation window.',
    metric: 1.3,
    suffix: 'B t',
  },
  {
    icon: BadgeDollarSign,
    title: 'Local enterprise',
    text: 'Supports distributed service models around drying, packaging, and preserved foods.',
    metric: 900,
    suffix: 'B+',
  },
  {
    icon: Users,
    title: 'Women-led production',
    text: 'Enables accessible ownership models for processing groups and local makers.',
    metric: 5,
    suffix: 'x',
  },
]

export const validationCards = [
  {
    title: 'Thermal response',
    image: chartPhase,
    text: 'Phase behavior and temperature response visualized as a calmer research narrative.',
  },
  {
    title: 'Spectral behavior',
    image: chartSpectral,
    text: 'Material selection can tune transmission, absorption, and reflective performance.',
  },
  {
    title: 'Prototype setup',
    image: experimentSetup,
    text: 'Bench validation connects the sheet concept to real drying environments.',
  },
]

export const navItems = [
  ['Problem', '#problem'],
  ['Idea', '#idea'],
  ['Product', '#product'],
  ['Validation', '#validation'],
  ['Impact', '#impact'],
]

export const footerLinks = [
  ['Research', '#validation'],
  ['Architecture', '#works'],
  ['Contact', 'mailto:hello@therbel.example'],
]

export const solutionIcon = Factory
