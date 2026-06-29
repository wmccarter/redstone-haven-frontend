export type StoreProduct = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: 'Shelter' | 'Power' | 'Water' | 'Comms';
  priceCents: number;
  stock: 'In Stock' | 'Low Stock' | 'Preorder';
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'drop-hab-core-kit',
    slug: 'drop-hab-core-kit',
    name: 'Drop Hab Core Kit',
    tagline: 'Rapid shelter deployment module',
    description:
      'A compact starter shelter package designed for fast setup, weather protection, and modular expansion in austere conditions.',
    category: 'Shelter',
    priceCents: 149900,
    stock: 'Preorder',
  },
  {
    id: 'gridline-power-bundle',
    slug: 'gridline-power-bundle',
    name: 'Gridline Power Bundle',
    tagline: 'Backup power continuity package',
    description:
      'Battery and runtime planning bundle for emergency lighting, comms equipment, and essential low-draw systems.',
    category: 'Power',
    priceCents: 49900,
    stock: 'In Stock',
  },
  {
    id: 'clearstream-water-module',
    slug: 'clearstream-water-module',
    name: 'Clearstream Water Module',
    tagline: 'Portable water purification and storage',
    description:
      'Field-friendly filtration, storage, and transport package for short outages and extended readiness scenarios.',
    category: 'Water',
    priceCents: 32900,
    stock: 'In Stock',
  },
  {
    id: 'signalguard-comms-pack',
    slug: 'signalguard-comms-pack',
    name: 'Signalguard Comms Pack',
    tagline: 'Mission comms reliability kit',
    description:
      'A communications loadout with practical accessories for maintaining local coordination when primary networks fail.',
    category: 'Comms',
    priceCents: 21900,
    stock: 'Low Stock',
  },
];

export function formatUsd(priceCents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(priceCents / 100);
}
