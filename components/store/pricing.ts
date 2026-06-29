import { STORE_PRODUCTS } from './catalog';

export type CartItem = {
  productId: string;
  quantity: number;
};

export type ShippingRegion =
  | 'us'
  | 'canada'
  | 'international';

export type TaxJurisdiction =
  | 'US-CA'
  | 'US-TX'
  | 'US-FL'
  | 'US-NY'
  | 'US-WA'
  | 'US-OTHER'
  | 'CA-ON'
  | 'CA-BC'
  | 'CA-AB'
  | 'CA-QC'
  | 'CA-OTHER'
  | 'INTL';

export type CouponDefinition = {
  code: string;
  label: string;
  discountPercent: number;
};

const SHIPPING_CENTS: Record<ShippingRegion, number> = {
  us: 1499,
  canada: 3499,
  international: 5999,
};

const TAX_RATE_BY_JURISDICTION: Record<TaxJurisdiction, number> = {
  'US-CA': 0.0725,
  'US-TX': 0.0625,
  'US-FL': 0.06,
  'US-NY': 0.04,
  'US-WA': 0.065,
  'US-OTHER': 0.055,
  'CA-ON': 0.13,
  'CA-BC': 0.12,
  'CA-AB': 0.05,
  'CA-QC': 0.14975,
  'CA-OTHER': 0.1,
  INTL: 0,
};

export const SHIPPING_REGION_LABELS: Record<ShippingRegion, string> = {
  us: 'United States',
  canada: 'Canada',
  international: 'International',
};

export const TAX_JURISDICTION_LABELS: Record<TaxJurisdiction, string> = {
  'US-CA': 'United States - California',
  'US-TX': 'United States - Texas',
  'US-FL': 'United States - Florida',
  'US-NY': 'United States - New York',
  'US-WA': 'United States - Washington',
  'US-OTHER': 'United States - Other State',
  'CA-ON': 'Canada - Ontario',
  'CA-BC': 'Canada - British Columbia',
  'CA-AB': 'Canada - Alberta',
  'CA-QC': 'Canada - Quebec',
  'CA-OTHER': 'Canada - Other Province',
  INTL: 'International (No Tax Estimate)',
};

export const DEFAULT_TAX_JURISDICTION: TaxJurisdiction = 'US-CA';

export const COUPONS: CouponDefinition[] = [
  {
    code: 'HAVEN10',
    label: 'Launch Discount',
    discountPercent: 10,
  },
];

export type PricingBreakdown = {
  subtotalCents: number;
  discountCents: number;
  shippingRegion: ShippingRegion;
  taxJurisdiction: TaxJurisdiction;
  taxRate: number;
  shippingCents: number;
  taxableCents: number;
  taxCents: number;
  totalCents: number;
  appliedCoupon: CouponDefinition | null;
};

export function normalizeCouponCode(input: string) {
  return input.trim().toUpperCase();
}

export function findCoupon(code: string) {
  const normalized = normalizeCouponCode(code);
  if (!normalized) {
    return null;
  }

  return COUPONS.find((coupon) => coupon.code === normalized) ?? null;
}

export function getShippingRegionForJurisdiction(jurisdiction: TaxJurisdiction): ShippingRegion {
  if (jurisdiction.startsWith('US-')) {
    return 'us';
  }

  if (jurisdiction.startsWith('CA-')) {
    return 'canada';
  }

  return 'international';
}

function getSubtotalCents(items: CartItem[]) {
  const byId = new Map(STORE_PRODUCTS.map((product) => [product.id, product]));
  return items.reduce((sum, item) => {
    const product = byId.get(item.productId);
    if (!product || item.quantity <= 0) {
      return sum;
    }

    return sum + product.priceCents * Math.min(item.quantity, 99);
  }, 0);
}

export function calculatePricing(
  items: CartItem[],
  taxJurisdiction: TaxJurisdiction,
  couponCode?: string,
): PricingBreakdown {
  const subtotalCents = getSubtotalCents(items);
  const appliedCoupon = couponCode ? findCoupon(couponCode) : null;
  const discountRate = appliedCoupon ? appliedCoupon.discountPercent / 100 : 0;
  const discountCents = Math.round(subtotalCents * discountRate);
  const discountedSubtotal = Math.max(subtotalCents - discountCents, 0);
  const shippingRegion = getShippingRegionForJurisdiction(taxJurisdiction);
  const shippingCents = subtotalCents > 0 ? SHIPPING_CENTS[shippingRegion] : 0;
  const taxableCents = discountedSubtotal + shippingCents;
  const taxRate = TAX_RATE_BY_JURISDICTION[taxJurisdiction];
  const taxCents = Math.round(taxableCents * taxRate);
  const totalCents = taxableCents + taxCents;

  return {
    subtotalCents,
    discountCents,
    shippingRegion,
    taxJurisdiction,
    taxRate,
    shippingCents,
    taxableCents,
    taxCents,
    totalCents,
    appliedCoupon,
  };
}
