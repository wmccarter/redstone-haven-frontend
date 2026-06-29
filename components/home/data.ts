export interface QuickRoute {
  href: string;
  label: string;
  title: string;
  hoverText?: string;
}

const ON_DOMAIN_STORE_HREF = '/store';
const AMAZON_FBA_STORE_HREF = 'https://www.amazon.com/shops/redstonehaven';

export interface FeatureCardData {
  icon: string;
  title: string;
  body: string;
  ref: string;
  href?: string;
}

export interface MissionMetric {
  label: string;
  value: number;
}

export const QUICK_ROUTES: QuickRoute[] = [
  {
    href: ON_DOMAIN_STORE_HREF,
    label: 'PRIMARY STORE',
    title: 'Redstone Haven Systems Store',
    hoverText: "Let's go shopping",
  },
  {
    href: AMAZON_FBA_STORE_HREF,
    label: 'SHOP',
    title: 'Redstone Haven on Amazon',
    hoverText: "Let's go shopping",
  },
  {
    href: '/readiness-resource-center',
    label: 'PREPARE',
    title: 'Readiness Resource Center',
    hoverText: "Your guide to handling power outages, severe weather, and emergencies. It's not always about zombies!",
  },
  {
    href: '/infrastructure',
    label: 'OPERATE',
    title: 'DROP HAB MATRIX',
    hoverText: 'Platform architecture, system flows, and deployment roadmap.',
  },
];

export const FEATURE_CARDS: FeatureCardData[] = [
  {
    icon: 'hab',
    title: 'DROP HAB MATRIX',
    body: 'Meet the self deployable survival habitat built to withstand the elements of this world and engineered to disregard the limitations of the next.',
    ref: 'SYS_REF // GRID_A',
    href: '/infrastructure',
  },
  {
    icon: 'satellite',
    title: 'MEDIA TRANSMISSIONS',
    body: 'Enter the Narrative HUB: survival-book briefings, social channel feeds, RF operations pages, and a web-series video matrix.',
    ref: 'SYS_REF // MEDIA_HUB',
    href: '/narrative-hub',
  },
  {
    icon: 'cart',
    title: 'SUPPLY CHAIN MANIFEST',
    body: 'Launch point for products, store links, demos, and video previews under the Redstone banner.',
    ref: 'SYS_REF // MANIFEST_01',
    href: '/supply-chain-manifest',
  },
];

export const MISSION_METRICS: MissionMetric[] = [
  { label: '[ HABITAT DEPLOYMENT ]', value: 84 },
  { label: '[ POWER GRID STABILITY ]', value: 91 },
  { label: '[ WATER PURIFICATION LEVEL ]', value: 88 },
  { label: '[ OXYGEN SATURATION LEVEL ]', value: 94 },
];
