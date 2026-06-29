import os from 'node:os';
import path from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const originalCwd = process.cwd();
const originalApiKey = process.env.ADMIN_ORDER_API_KEY;

let tempDir = '';

async function importOrdersRoute() {
  return import('../../app/api/store/orders/route');
}

async function seedPendingOrder() {
  const { appendStoreOrder } = await import('../../lib/storeOrderLog');

  await appendStoreOrder({
    createdAt: new Date().toISOString(),
    eventType: 'checkout.session.completed',
    orderIntentId: 'TEST-ORDER-001',
    stripeSessionId: 'cs_test_123',
    paymentStatus: 'paid',
    customerEmail: 'test@example.com',
    customerName: 'Test User',
    amountTotalCents: 1000,
    currency: 'usd',
    shippingRegion: 'US',
    taxJurisdiction: 'US-CA',
    couponCode: '',
    subtotalCents: 850,
    discountCents: 0,
    shippingCents: 100,
    taxCents: 50,
    totalCents: 1000,
    fulfillmentStatus: 'pending',
    fulfillmentUpdatedAt: new Date().toISOString(),
    fulfillmentNotes: '',
    fulfillmentHistory: [],
  });
}

beforeEach(async () => {
  vi.resetModules();
  tempDir = await mkdtemp(path.join(os.tmpdir(), 'store-orders-route-test-'));
  process.chdir(tempDir);
  delete process.env.ADMIN_ORDER_API_KEY;
});

afterEach(async () => {
  process.chdir(originalCwd);

  if (originalApiKey === undefined) {
    delete process.env.ADMIN_ORDER_API_KEY;
  } else {
    process.env.ADMIN_ORDER_API_KEY = originalApiKey;
  }

  if (tempDir) {
    await rm(tempDir, { recursive: true, force: true });
    tempDir = '';
  }
});

describe('PATCH /api/store/orders', () => {
  it('returns 401 when admin key is configured and missing', async () => {
    process.env.ADMIN_ORDER_API_KEY = 'super-secret';

    const { PATCH } = await importOrdersRoute();
    const request = new Request('http://localhost/api/store/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stripeSessionId: 'cs_test_123',
        fulfillmentStatus: 'processing',
      }),
    });

    const response = await PATCH(request);

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized.' });
  });

  it('returns 409 for invalid fulfillment transition', async () => {
    process.env.ADMIN_ORDER_API_KEY = 'super-secret';
    await seedPendingOrder();

    const { PATCH } = await importOrdersRoute();
    const request = new Request('http://localhost/api/store/orders', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': 'super-secret',
      },
      body: JSON.stringify({
        stripeSessionId: 'cs_test_123',
        fulfillmentStatus: 'shipped',
        fulfillmentNotes: 'Attempted invalid jump',
      }),
    });

    const response = await PATCH(request);

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({ error: 'Invalid fulfillment transition.' });
  });

  it('persists a valid update and writes audit history', async () => {
    process.env.ADMIN_ORDER_API_KEY = 'super-secret';
    await seedPendingOrder();

    const { PATCH } = await importOrdersRoute();
    const request = new Request('http://localhost/api/store/orders', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': 'super-secret',
      },
      body: JSON.stringify({
        stripeSessionId: 'cs_test_123',
        fulfillmentStatus: 'processing',
        fulfillmentNotes: 'Picked and staged',
      }),
    });

    const response = await PATCH(request);
    const payload = (await response.json()) as {
      item: {
        fulfillmentStatus: string;
        fulfillmentNotes: string;
        fulfillmentHistory: Array<{
          fromStatus: string;
          toStatus: string;
          note: string;
          source: string;
        }>;
      };
    };

    expect(response.status).toBe(200);
    expect(payload.item.fulfillmentStatus).toBe('processing');
    expect(payload.item.fulfillmentNotes).toBe('Picked and staged');
    expect(payload.item.fulfillmentHistory).toHaveLength(1);
    expect(payload.item.fulfillmentHistory[0]).toMatchObject({
      fromStatus: 'pending',
      toStatus: 'processing',
      note: 'Picked and staged',
      source: 'admin',
    });
  });
});
