'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { STORE_PRODUCTS } from './catalog';
import {
  calculatePricing,
  DEFAULT_TAX_JURISDICTION,
  normalizeCouponCode,
  type CartItem,
  type PricingBreakdown,
  type TaxJurisdiction,
} from './pricing';

type StoreContextValue = {
  items: CartItem[];
  cartCount: number;
  subtotalCents: number;
  pricing: PricingBreakdown;
  taxJurisdiction: TaxJurisdiction;
  couponCode: string;
  couponError: string | null;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setTaxJurisdiction: (jurisdiction: TaxJurisdiction) => void;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
  clearCart: () => void;
};

const STORE_CART_KEY = 'redstone-store-cart-v1';
const STORE_TAX_JURISDICTION_KEY = 'redstone-store-tax-jurisdiction-v1';
const STORE_COUPON_KEY = 'redstone-store-coupon-v1';

const StoreContext = createContext<StoreContextValue | null>(null);

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [taxJurisdiction, setTaxJurisdictionState] = useState<TaxJurisdiction>(DEFAULT_TAX_JURISDICTION);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE_CART_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw) as CartItem[];
      if (!Array.isArray(parsed)) {
        return;
      }

      setItems(
        parsed.filter(
          (item) =>
            item &&
            typeof item.productId === 'string' &&
            Number.isFinite(item.quantity) &&
            item.quantity > 0,
        ),
      );
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORE_CART_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    try {
      const savedJurisdiction = window.localStorage.getItem(STORE_TAX_JURISDICTION_KEY) as TaxJurisdiction | null;
      if (savedJurisdiction) {
        setTaxJurisdictionState(savedJurisdiction);
      }

      const savedCoupon = window.localStorage.getItem(STORE_COUPON_KEY);
      if (savedCoupon) {
        setCouponCode(savedCoupon);
      }
    } catch {
      setTaxJurisdictionState(DEFAULT_TAX_JURISDICTION);
      setCouponCode('');
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORE_TAX_JURISDICTION_KEY, taxJurisdiction);
  }, [taxJurisdiction]);

  useEffect(() => {
    if (!couponCode) {
      window.localStorage.removeItem(STORE_COUPON_KEY);
      return;
    }

    window.localStorage.setItem(STORE_COUPON_KEY, couponCode);
  }, [couponCode]);

  const addToCart = useCallback((productId: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...prev, { productId, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity: Math.min(quantity, 99) } : item,
        ),
      );
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const setTaxJurisdiction = useCallback((jurisdiction: TaxJurisdiction) => {
    setTaxJurisdictionState(jurisdiction);
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const normalized = normalizeCouponCode(code);
    if (!normalized) {
      setCouponCode('');
      setCouponError('Enter a coupon code.');
      return false;
    }

    const pricing = calculatePricing(items, taxJurisdiction, normalized);
    if (!pricing.appliedCoupon) {
      setCouponError('Invalid or expired coupon code.');
      return false;
    }

    setCouponCode(normalized);
    setCouponError(null);
    return true;
  }, [items, taxJurisdiction]);

  const clearCoupon = useCallback(() => {
    setCouponCode('');
    setCouponError(null);
  }, []);

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotalCents = useMemo(() => {
    const byId = new Map(STORE_PRODUCTS.map((product) => [product.id, product]));
    return items.reduce((sum, item) => {
      const product = byId.get(item.productId);
      if (!product) {
        return sum;
      }

      return sum + product.priceCents * item.quantity;
    }, 0);
  }, [items]);

  const pricing = useMemo(
    () => calculatePricing(items, taxJurisdiction, couponCode),
    [items, taxJurisdiction, couponCode],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      items,
      cartCount,
      subtotalCents,
      pricing,
      taxJurisdiction,
      couponCode,
      couponError,
      addToCart,
      removeFromCart,
      updateQuantity,
      setTaxJurisdiction,
      applyCoupon,
      clearCoupon,
      clearCart,
    }),
    [
      items,
      cartCount,
      subtotalCents,
      pricing,
      taxJurisdiction,
      couponCode,
      couponError,
      addToCart,
      removeFromCart,
      updateQuantity,
      setTaxJurisdiction,
      applyCoupon,
      clearCoupon,
      clearCart,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider.');
  }

  return context;
}
