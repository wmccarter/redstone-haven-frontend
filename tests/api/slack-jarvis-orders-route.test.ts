import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const originalCwd = process.cwd();
const originalSlackSecret = process.env.SLACK_SIGNING_SECRET;

let tempDir = '';

function signSlackBody(secret: string, timestamp: string, body: string) {
  const baseString = `v0:${timestamp}:${body}`;
  const digest = crypto.createHmac('sha256', secret).update(baseString).digest('hex');
  return `v0=${digest}`;
}

beforeEach(async () => {
  vi.resetModules();
  tempDir = await mkdtemp(path.join(os.tmpdir(), 'slack-jarvis-route-test-'));
  process.chdir(tempDir);
  process.env.SLACK_SIGNING_SECRET = 'slack-signing-secret-test';
});

afterEach(async () => {
  process.chdir(originalCwd);

  if (originalSlackSecret === undefined) {
    delete process.env.SLACK_SIGNING_SECRET;
  } else {
    process.env.SLACK_SIGNING_SECRET = originalSlackSecret;
  }

  delete process.env.SLACK_ALLOWED_CHANNEL_ID;

  if (tempDir) {
    await rm(tempDir, { recursive: true, force: true });
    tempDir = '';
  }
});

describe('POST /api/slack/jarvis/orders', () => {
  it('rejects invalid signature', async () => {
    const { POST } = await import('../../app/api/slack/jarvis/orders/route');
    const timestamp = `${Math.floor(Date.now() / 1000)}`;
    const body = 'text=recent&channel_id=C123';

    const response = await POST(
      new Request('http://localhost/api/slack/jarvis/orders', {
        method: 'POST',
        headers: {
          'x-slack-request-timestamp': timestamp,
          'x-slack-signature': 'v0=invalid',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      }),
    );

    expect(response.status).toBe(401);
  });

  it('returns recent orders for a valid signed request', async () => {
    const { appendStoreOrder } = await import('../../lib/storeOrderLog');
    const { POST } = await import('../../app/api/slack/jarvis/orders/route');

    await appendStoreOrder({
      createdAt: new Date().toISOString(),
      eventType: 'checkout.session.completed',
      orderIntentId: 'SLACK-ORDER-001',
      stripeSessionId: 'cs_slack_001',
      paymentStatus: 'paid',
      customerEmail: 'slack@example.com',
      customerName: 'Slack Order',
      amountTotalCents: 1500,
      currency: 'usd',
      shippingRegion: 'US',
      taxJurisdiction: 'US-CA',
      couponCode: '',
      subtotalCents: 1200,
      discountCents: 0,
      shippingCents: 200,
      taxCents: 100,
      totalCents: 1500,
      fulfillmentStatus: 'pending',
      fulfillmentUpdatedAt: new Date().toISOString(),
      fulfillmentNotes: '',
      fulfillmentHistory: [],
    });

    const timestamp = `${Math.floor(Date.now() / 1000)}`;
    const body = 'text=recent&channel_id=C123';
    const signature = signSlackBody(process.env.SLACK_SIGNING_SECRET!, timestamp, body);

    const response = await POST(
      new Request('http://localhost/api/slack/jarvis/orders', {
        method: 'POST',
        headers: {
          'x-slack-request-timestamp': timestamp,
          'x-slack-signature': signature,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      }),
    );

    expect(response.status).toBe(200);
    const payload = (await response.json()) as { text: string };
    expect(payload.text).toContain('Recent Orders:');
    expect(payload.text).toContain('SLACK-ORDER-001');
  });

  it('rejects replayed signed requests', async () => {
    const { POST } = await import('../../app/api/slack/jarvis/orders/route');

    const timestamp = `${Math.floor(Date.now() / 1000)}`;
    const body = 'text=recent&channel_id=C123';
    const signature = signSlackBody(process.env.SLACK_SIGNING_SECRET!, timestamp, body);

    const firstResponse = await POST(
      new Request('http://localhost/api/slack/jarvis/orders', {
        method: 'POST',
        headers: {
          'x-slack-request-timestamp': timestamp,
          'x-slack-signature': signature,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      }),
    );
    expect(firstResponse.status).toBe(200);

    const replayResponse = await POST(
      new Request('http://localhost/api/slack/jarvis/orders', {
        method: 'POST',
        headers: {
          'x-slack-request-timestamp': timestamp,
          'x-slack-signature': signature,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      }),
    );
    expect(replayResponse.status).toBe(409);
  });
});
