import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { STORE_PRODUCTS } from '../../../../components/store/catalog';
import {
  calculatePricing,
  DEFAULT_TAX_JURISDICTION,
  normalizeCouponCode,
  type CartItem,
  type TaxJurisdiction,
} from '../../../../components/store/pricing';

type CheckoutRequestBody = {
  items?: CartItem[];
  taxJurisdiction?: TaxJurisdiction;
  couponCode?: string;
};

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Set STRIPE_SECRET_KEY.' },
      { status: 500 },
    );
  }

  const stripe = new Stripe(secretKey);

  let body: CheckoutRequestBody;
  try {
    body = (await request.json()) as CheckoutRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const requestItems = Array.isArray(body.items) ? body.items : [];
  const validItems = requestItems
    .filter(
      (item) =>
        item &&
        typeof item.productId === 'string' &&
        Number.isFinite(item.quantity) &&
        item.quantity > 0,
    )
    .map((item) => ({
      productId: item.productId,
      quantity: Math.min(Math.round(item.quantity), 99),
    }));

  if (validItems.length === 0) {
    return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
  }

  const taxJurisdiction = body.taxJurisdiction ?? DEFAULT_TAX_JURISDICTION;
  const couponCode = normalizeCouponCode(body.couponCode ?? '');
  const pricing = calculatePricing(validItems, taxJurisdiction, couponCode);

  const byId = new Map(STORE_PRODUCTS.map((product) => [product.id, product]));
  const merchandiseUnits: Array<{ name: string; description: string; unitAmount: number }> = [];

  for (const item of validItems) {
    const product = byId.get(item.productId);
    if (!product) {
      continue;
    }

    for (let index = 0; index < item.quantity; index += 1) {
      merchandiseUnits.push({
        name: product.name,
        description: product.tagline,
        unitAmount: product.priceCents,
      });
    }
  }

  if (merchandiseUnits.length === 0) {
    return NextResponse.json({ error: 'No valid products found in cart.' }, { status: 400 });
  }

  let remainingDiscount = pricing.discountCents;
  const discountedUnits = merchandiseUnits.map((unit) => {
    if (remainingDiscount <= 0) {
      return unit;
    }

    const reduction = Math.min(remainingDiscount, unit.unitAmount);
    remainingDiscount -= reduction;
    return {
      ...unit,
      unitAmount: unit.unitAmount - reduction,
    };
  });

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = discountedUnits.map((unit) => ({
    quantity: 1,
    price_data: {
      currency: 'usd',
      unit_amount: unit.unitAmount,
      product_data: {
        name: unit.name,
        description: unit.description,
      },
    },
  }));

  if (pricing.shippingCents > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: 'usd',
        unit_amount: pricing.shippingCents,
        product_data: {
          name: `Shipping (${pricing.shippingRegion.toUpperCase()})`,
          description: 'Region-based shipping estimate',
        },
      },
    });
  }

  if (pricing.taxCents > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: 'usd',
        unit_amount: pricing.taxCents,
        product_data: {
          name: 'Estimated tax',
          description: 'Region-based estimated tax',
        },
      },
    });
  }

  const successUrl = new URL('/store/checkout?status=success', request.url).toString();
  const cancelUrl = new URL('/store/checkout?status=canceled', request.url).toString();

  try {
    const orderIntentId = `RSH-${Date.now().toString(36).toUpperCase()}`;
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      client_reference_id: orderIntentId,
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_creation: 'always',
      metadata: {
        orderIntentId,
        shippingRegion: pricing.shippingRegion,
        taxJurisdiction,
        couponCode: pricing.appliedCoupon?.code ?? '',
        subtotalCents: String(pricing.subtotalCents),
        discountCents: String(pricing.discountCents),
        shippingCents: String(pricing.shippingCents),
        taxCents: String(pricing.taxCents),
        totalCents: String(pricing.totalCents),
        cartCount: String(validItems.reduce((sum, item) => sum + item.quantity, 0)),
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Failed to initialize checkout session.' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create checkout session.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
