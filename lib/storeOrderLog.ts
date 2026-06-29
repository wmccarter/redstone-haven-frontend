import { promises as fs } from 'node:fs';
import path from 'node:path';

export type FulfillmentStatus =
  | 'pending'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'canceled'
  | 'refunded';

export type FulfillmentHistoryEntry = {
  updatedAt: string;
  fromStatus: FulfillmentStatus;
  toStatus: FulfillmentStatus;
  note: string;
  source: 'admin';
};

export const FULFILLMENT_STATUSES: FulfillmentStatus[] = [
  'pending',
  'processing',
  'packed',
  'shipped',
  'delivered',
  'canceled',
  'refunded',
];

const FULFILLMENT_TRANSITIONS: Record<FulfillmentStatus, FulfillmentStatus[]> = {
  pending: ['processing', 'packed', 'canceled'],
  processing: ['packed', 'canceled'],
  packed: ['shipped', 'canceled'],
  shipped: ['delivered', 'refunded'],
  delivered: ['refunded'],
  canceled: ['refunded'],
  refunded: [],
};

export type StoreOrderRecord = {
  createdAt: string;
  eventType: string;
  orderIntentId: string;
  stripeSessionId: string;
  paymentStatus: string;
  customerEmail: string;
  customerName: string;
  amountTotalCents: number;
  currency: string;
  shippingRegion: string;
  taxJurisdiction: string;
  couponCode: string;
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  fulfillmentStatus: FulfillmentStatus;
  fulfillmentUpdatedAt: string;
  fulfillmentNotes: string;
  fulfillmentHistory: FulfillmentHistoryEntry[];
};

const DATA_DIR = path.join(process.cwd(), 'data');
const LOG_FILE = path.join(DATA_DIR, 'store-orders.jsonl');

async function ensureLogDirectory() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function withFulfillmentDefaults(record: StoreOrderRecord): StoreOrderRecord {
  return {
    ...record,
    fulfillmentStatus: record.fulfillmentStatus ?? 'pending',
    fulfillmentUpdatedAt: record.fulfillmentUpdatedAt ?? record.createdAt,
    fulfillmentNotes: record.fulfillmentNotes ?? '',
    fulfillmentHistory: record.fulfillmentHistory ?? [],
  };
}

async function writeStoreOrders(orders: StoreOrderRecord[]) {
  await ensureLogDirectory();
  const body = orders.map((order) => JSON.stringify(order)).join('\n');
  await fs.writeFile(LOG_FILE, body ? `${body}\n` : '', 'utf8');
}

export async function readStoreOrders(): Promise<StoreOrderRecord[]> {
  try {
    const raw = await fs.readFile(LOG_FILE, 'utf8');
    return raw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => withFulfillmentDefaults(JSON.parse(line) as StoreOrderRecord))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}

export async function appendStoreOrder(record: StoreOrderRecord) {
  await ensureLogDirectory();

  const existing = await readStoreOrders();
  if (existing.some((item) => item.stripeSessionId === record.stripeSessionId)) {
    return false;
  }

  await fs.appendFile(LOG_FILE, `${JSON.stringify(withFulfillmentDefaults(record))}\n`, 'utf8');
  return true;
}

export async function updateOrderFulfillment(
  stripeSessionId: string,
  fulfillmentStatus: FulfillmentStatus,
  fulfillmentNotes: string,
) {
  const orders = await readStoreOrders();
  const index = orders.findIndex((order) => order.stripeSessionId === stripeSessionId);
  if (index < 0) {
    return null;
  }

  const currentStatus = orders[index].fulfillmentStatus;
  if (
    currentStatus !== fulfillmentStatus &&
    !FULFILLMENT_TRANSITIONS[currentStatus].includes(fulfillmentStatus)
  ) {
    const error = new Error('Invalid fulfillment transition.');
    (error as Error & { code?: string }).code = 'INVALID_FULFILLMENT_TRANSITION';
    throw error;
  }

  const updated = {
    ...orders[index],
    fulfillmentStatus,
    fulfillmentNotes,
    fulfillmentUpdatedAt: new Date().toISOString(),
    fulfillmentHistory: [
      ...orders[index].fulfillmentHistory,
      {
        updatedAt: new Date().toISOString(),
        fromStatus: currentStatus,
        toStatus: fulfillmentStatus,
        note: fulfillmentNotes,
        source: 'admin' as const,
      },
    ],
  };
  orders[index] = updated;

  await writeStoreOrders(orders);
  return updated;
}

export function searchStoreOrders(orders: StoreOrderRecord[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return orders;
  }

  return orders.filter((order) => {
    return (
      order.orderIntentId.toLowerCase().includes(normalized) ||
      order.stripeSessionId.toLowerCase().includes(normalized) ||
      order.customerEmail.toLowerCase().includes(normalized) ||
      order.customerName.toLowerCase().includes(normalized) ||
      order.couponCode.toLowerCase().includes(normalized) ||
      order.taxJurisdiction.toLowerCase().includes(normalized) ||
      order.paymentStatus.toLowerCase().includes(normalized) ||
      order.fulfillmentStatus.toLowerCase().includes(normalized) ||
      order.fulfillmentNotes.toLowerCase().includes(normalized)
    );
  });
}
