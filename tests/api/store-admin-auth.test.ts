import os from 'node:os';
import path from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const originalCwd = process.cwd();
const originalEnv = {
  ADMIN_LOGIN_USERNAME: process.env.ADMIN_LOGIN_USERNAME,
  ADMIN_LOGIN_PASSWORD: process.env.ADMIN_LOGIN_PASSWORD,
  ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
  ADMIN_ORDER_API_KEY: process.env.ADMIN_ORDER_API_KEY,
};

let tempDir = '';

beforeEach(async () => {
  vi.resetModules();
  tempDir = await mkdtemp(path.join(os.tmpdir(), 'store-admin-auth-test-'));
  process.chdir(tempDir);
  delete process.env.ADMIN_ORDER_API_KEY;
  process.env.ADMIN_LOGIN_USERNAME = 'admin';
  process.env.ADMIN_LOGIN_PASSWORD = 'correct-horse-battery-staple';
  process.env.ADMIN_SESSION_SECRET = 'development-session-secret';
});

afterEach(async () => {
  process.chdir(originalCwd);

  if (originalEnv.ADMIN_LOGIN_USERNAME === undefined) {
    delete process.env.ADMIN_LOGIN_USERNAME;
  } else {
    process.env.ADMIN_LOGIN_USERNAME = originalEnv.ADMIN_LOGIN_USERNAME;
  }

  if (originalEnv.ADMIN_LOGIN_PASSWORD === undefined) {
    delete process.env.ADMIN_LOGIN_PASSWORD;
  } else {
    process.env.ADMIN_LOGIN_PASSWORD = originalEnv.ADMIN_LOGIN_PASSWORD;
  }

  if (originalEnv.ADMIN_SESSION_SECRET === undefined) {
    delete process.env.ADMIN_SESSION_SECRET;
  } else {
    process.env.ADMIN_SESSION_SECRET = originalEnv.ADMIN_SESSION_SECRET;
  }

  if (originalEnv.ADMIN_ORDER_API_KEY === undefined) {
    delete process.env.ADMIN_ORDER_API_KEY;
  } else {
    process.env.ADMIN_ORDER_API_KEY = originalEnv.ADMIN_ORDER_API_KEY;
  }

  if (tempDir) {
    await rm(tempDir, { recursive: true, force: true });
    tempDir = '';
  }
});

describe('Admin login auth flow', () => {
  it('rejects invalid credentials', async () => {
    const { POST } = await import('../../app/api/store/admin/login/route');

    const response = await POST(
      new Request('http://localhost/api/store/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'wrong' }),
      }),
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: 'Invalid credentials.' });
  });

  it('issues a session cookie and authorizes orders API with that cookie', async () => {
    const { POST } = await import('../../app/api/store/admin/login/route');
    const { appendStoreOrder } = await import('../../lib/storeOrderLog');
    const { GET } = await import('../../app/api/store/orders/route');

    await appendStoreOrder({
      createdAt: new Date().toISOString(),
      eventType: 'checkout.session.completed',
      orderIntentId: 'AUTH-TEST-ORDER',
      stripeSessionId: 'cs_auth_123',
      paymentStatus: 'paid',
      customerEmail: 'auth@example.com',
      customerName: 'Auth Test',
      amountTotalCents: 2000,
      currency: 'usd',
      shippingRegion: 'US',
      taxJurisdiction: 'US-CA',
      couponCode: '',
      subtotalCents: 1700,
      discountCents: 0,
      shippingCents: 200,
      taxCents: 100,
      totalCents: 2000,
      fulfillmentStatus: 'pending',
      fulfillmentUpdatedAt: new Date().toISOString(),
      fulfillmentNotes: '',
      fulfillmentHistory: [],
    });

    const loginResponse = await POST(
      new Request('http://localhost/api/store/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'admin',
          password: 'correct-horse-battery-staple',
        }),
      }),
    );

    expect(loginResponse.status).toBe(200);
    const setCookie = loginResponse.headers.get('set-cookie') ?? '';
    expect(setCookie).toContain('redstone_admin_session=');

    const cookieHeader = setCookie.split(';')[0];
    const ordersResponse = await GET(
      new Request('http://localhost/api/store/orders', {
        method: 'GET',
        headers: {
          cookie: cookieHeader,
        },
      }),
    );

    expect(ordersResponse.status).toBe(200);
    const payload = (await ordersResponse.json()) as {
      count: number;
      items: Array<{ orderIntentId: string }>;
    };

    expect(payload.count).toBe(1);
    expect(payload.items[0]?.orderIntentId).toBe('AUTH-TEST-ORDER');
  });

  it('locks login after repeated failed attempts from the same IP', async () => {
    process.env.ADMIN_LOGIN_MAX_ATTEMPTS = '3';
    process.env.ADMIN_LOGIN_LOCKOUT_SECONDS = '60';
    process.env.ADMIN_LOGIN_WINDOW_SECONDS = '900';

    const { POST } = await import('../../app/api/store/admin/login/route');

    for (let attempt = 1; attempt <= 2; attempt += 1) {
      const response = await POST(
        new Request('http://localhost/api/store/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': '203.0.113.42',
          },
          body: JSON.stringify({ username: 'admin', password: 'wrong-password' }),
        }),
      );

      expect(response.status).toBe(401);
    }

    const lockResponse = await POST(
      new Request('http://localhost/api/store/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '203.0.113.42',
        },
        body: JSON.stringify({ username: 'admin', password: 'wrong-password' }),
      }),
    );

    expect(lockResponse.status).toBe(429);
    expect(lockResponse.headers.get('Retry-After')).toBe('60');
  });
});
