import { NextResponse } from 'next/server';
import { readStoreOrders, searchStoreOrders } from '../../../../../lib/storeOrderLog';
import { checkAndMarkSlackReplay, verifySlackSignature } from '../../../../../lib/slackAuth';

export const runtime = 'nodejs';

function maskEmail(email: string) {
  if (!email.includes('@')) {
    return email || 'n/a';
  }

  const [local, domain] = email.split('@');
  const maskedLocal = local.length <= 2 ? `${local[0] ?? '*'}*` : `${local.slice(0, 2)}***`;
  return `${maskedLocal}@${domain}`;
}

function formatOrderLine(order: {
  orderIntentId: string;
  stripeSessionId: string;
  customerEmail: string;
  totalCents: number;
  fulfillmentStatus: string;
}) {
  return [
    `• ${order.orderIntentId}`,
    `(session: ${order.stripeSessionId})`,
    `email: ${maskEmail(order.customerEmail)}`,
    `total: $${(order.totalCents / 100).toFixed(2)}`,
    `fulfillment: ${order.fulfillmentStatus}`,
  ].join(' ');
}

function usageText() {
  return [
    'Jarvis Orders Commands:',
    '• search <term>  - search by email/session/order id/coupon/status',
    '• recent          - latest 5 orders',
    '• stuck           - pending/processing/packed older than 24h',
  ].join('\n');
}

export async function POST(request: Request) {
  const signingSecret = process.env.SLACK_SIGNING_SECRET?.trim() ?? '';
  if (!signingSecret) {
    return NextResponse.json({ error: 'SLACK_SIGNING_SECRET is not configured.' }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('x-slack-signature') ?? '';
  const timestamp = request.headers.get('x-slack-request-timestamp') ?? '';
  const isValid = verifySlackSignature({
    signingSecret,
    timestamp,
    signature,
    rawBody,
  });

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid Slack signature.' }, { status: 401 });
  }

  if (checkAndMarkSlackReplay(signature, timestamp)) {
    return NextResponse.json({ error: 'Replay request rejected.' }, { status: 409 });
  }

  const form = new URLSearchParams(rawBody);
  const channelId = form.get('channel_id') ?? '';
  const commandText = (form.get('text') ?? '').trim();

  const allowedChannelId = process.env.SLACK_ALLOWED_CHANNEL_ID?.trim() ?? '';
  if (allowedChannelId && allowedChannelId !== channelId) {
    return NextResponse.json({
      response_type: 'ephemeral',
      text: 'This command is restricted to the configured ops channel.',
    });
  }

  if (!commandText || commandText === 'help') {
    return NextResponse.json({ response_type: 'ephemeral', text: usageText() });
  }

  const orders = await readStoreOrders();

  if (commandText === 'recent') {
    const recent = orders.slice(0, 5);
    if (recent.length === 0) {
      return NextResponse.json({ response_type: 'ephemeral', text: 'No orders found.' });
    }

    return NextResponse.json({
      response_type: 'ephemeral',
      text: ['Recent Orders:', ...recent.map((order) => formatOrderLine(order))].join('\n'),
    });
  }

  if (commandText === 'stuck') {
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    const stuck = orders
      .filter((order) => ['pending', 'processing', 'packed'].includes(order.fulfillmentStatus))
      .filter((order) => new Date(order.fulfillmentUpdatedAt).getTime() < cutoff)
      .slice(0, 10);

    if (stuck.length === 0) {
      return NextResponse.json({ response_type: 'ephemeral', text: 'No stuck orders older than 24h.' });
    }

    return NextResponse.json({
      response_type: 'ephemeral',
      text: ['Stuck Orders (>24h):', ...stuck.map((order) => formatOrderLine(order))].join('\n'),
    });
  }

  if (commandText.startsWith('search ')) {
    const query = commandText.slice('search '.length).trim();
    if (!query) {
      return NextResponse.json({ response_type: 'ephemeral', text: 'Usage: search <term>' });
    }

    const matches = searchStoreOrders(orders, query).slice(0, 10);
    if (matches.length === 0) {
      return NextResponse.json({ response_type: 'ephemeral', text: `No orders found for "${query}".` });
    }

    return NextResponse.json({
      response_type: 'ephemeral',
      text: [`Search Results (${matches.length}):`, ...matches.map((order) => formatOrderLine(order))].join('\n'),
    });
  }

  return NextResponse.json({ response_type: 'ephemeral', text: usageText() });
}
