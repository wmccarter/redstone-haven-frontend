import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { appendStoreOrder } from '../../../../lib/storeOrderLog';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    return NextResponse.json(
      { error: 'Stripe webhook is not configured. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET.' },
      { status: 500 },
    );
  }

  const stripe = new Stripe(stripeSecretKey);
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid webhook signature.';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ received: true, ignored: true });
    }

    await appendStoreOrder({
      createdAt: new Date().toISOString(),
      eventType: event.type,
      orderIntentId: session.client_reference_id ?? session.metadata?.orderIntentId ?? 'UNKNOWN',
      stripeSessionId: session.id,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email ?? '',
      customerName: session.customer_details?.name ?? '',
      amountTotalCents: session.amount_total ?? 0,
      currency: session.currency ?? 'usd',
      shippingRegion: session.metadata?.shippingRegion ?? '',
      taxJurisdiction: session.metadata?.taxJurisdiction ?? '',
      couponCode: session.metadata?.couponCode ?? '',
      subtotalCents: Number.parseInt(session.metadata?.subtotalCents ?? '0', 10),
      discountCents: Number.parseInt(session.metadata?.discountCents ?? '0', 10),
      shippingCents: Number.parseInt(session.metadata?.shippingCents ?? '0', 10),
      taxCents: Number.parseInt(session.metadata?.taxCents ?? '0', 10),
      totalCents: Number.parseInt(session.metadata?.totalCents ?? '0', 10),
      fulfillmentStatus: 'pending',
      fulfillmentUpdatedAt: new Date().toISOString(),
      fulfillmentNotes: '',
      fulfillmentHistory: [],
    });
  }

  return NextResponse.json({ received: true });
}
