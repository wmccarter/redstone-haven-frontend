import { NextResponse } from 'next/server';
import {
  FULFILLMENT_STATUSES,
  readStoreOrders,
  searchStoreOrders,
  updateOrderFulfillment,
  type FulfillmentStatus,
} from '../../../../lib/storeOrderLog';
import { ADMIN_SESSION_COOKIE_NAME, verifyAdminSessionToken } from '../../../../lib/adminAuth';

export const runtime = 'nodejs';

function isAuthorized(request: Request) {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const cookieParts = cookieHeader.split(';').map((part) => part.trim());
  const sessionToken =
    cookieParts
      .find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE_NAME}=`))
      ?.slice(ADMIN_SESSION_COOKIE_NAME.length + 1) ?? '';
  if (verifyAdminSessionToken(sessionToken)) {
    return true;
  }

  const configuredApiKey = process.env.ADMIN_ORDER_API_KEY;
  if (!configuredApiKey) {
    return false;
  }

  const providedApiKey = request.headers.get('x-admin-key');
  return providedApiKey === configuredApiKey;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') ?? '';
  const limit = Number.parseInt(url.searchParams.get('limit') ?? '50', 10);

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }

  const statusFilter = (url.searchParams.get('status') ?? '').trim().toLowerCase();
  const isStatusFilterValid = FULFILLMENT_STATUSES.includes(statusFilter as FulfillmentStatus);

  const orders = await readStoreOrders();
  const byStatus = isStatusFilterValid
    ? orders.filter((order) => order.fulfillmentStatus === statusFilter)
    : orders;
  const filtered = searchStoreOrders(byStatus, query);

  return NextResponse.json({
    count: filtered.length,
    items: filtered.slice(0, Number.isFinite(limit) ? Math.max(1, Math.min(limit, 250)) : 50),
  }, { headers: { 'Cache-Control': 'no-store' } });
}

type UpdateFulfillmentRequestBody = {
  stripeSessionId?: string;
  fulfillmentStatus?: FulfillmentStatus;
  fulfillmentNotes?: string;
};

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }

  let body: UpdateFulfillmentRequestBody;
  try {
    body = (await request.json()) as UpdateFulfillmentRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  const stripeSessionId = (body.stripeSessionId ?? '').trim();
  const fulfillmentStatus = body.fulfillmentStatus;
  const fulfillmentNotes = (body.fulfillmentNotes ?? '').trim().slice(0, 500);

  if (!stripeSessionId) {
    return NextResponse.json({ error: 'stripeSessionId is required.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  if (!fulfillmentStatus || !FULFILLMENT_STATUSES.includes(fulfillmentStatus)) {
    return NextResponse.json({ error: 'Invalid fulfillmentStatus.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  let updated;
  try {
    updated = await updateOrderFulfillment(stripeSessionId, fulfillmentStatus, fulfillmentNotes);
  } catch (error) {
    if ((error as Error & { code?: string }).code === 'INVALID_FULFILLMENT_TRANSITION') {
      return NextResponse.json({ error: 'Invalid fulfillment transition.' }, { status: 409, headers: { 'Cache-Control': 'no-store' } });
    }

    throw error;
  }
  if (!updated) {
    return NextResponse.json({ error: 'Order not found.' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }

  return NextResponse.json({
    item: updated,
  }, { headers: { 'Cache-Control': 'no-store' } });
}
