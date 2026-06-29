import crypto from 'node:crypto';

const MAX_TIMESTAMP_SKEW_SECONDS = 60 * 5;
const seenSlackRequests = new Map<string, number>();

function cleanupOldSlackRequests(nowSeconds: number) {
  for (const [key, seenAt] of seenSlackRequests.entries()) {
    if (nowSeconds - seenAt > MAX_TIMESTAMP_SKEW_SECONDS) {
      seenSlackRequests.delete(key);
    }
  }
}

export function verifySlackSignature({
  signingSecret,
  timestamp,
  signature,
  rawBody,
}: {
  signingSecret: string;
  timestamp: string;
  signature: string;
  rawBody: string;
}) {
  if (!signingSecret || !timestamp || !signature) {
    return false;
  }

  const timestampNumber = Number.parseInt(timestamp, 10);
  if (!Number.isFinite(timestampNumber)) {
    return false;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - timestampNumber) > MAX_TIMESTAMP_SKEW_SECONDS) {
    return false;
  }

  const baseString = `v0:${timestamp}:${rawBody}`;
  const expected = `v0=${crypto
    .createHmac('sha256', signingSecret)
    .update(baseString)
    .digest('hex')}`;

  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(signature);
  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
}

export function checkAndMarkSlackReplay(signature: string, timestamp: string) {
  const timestampNumber = Number.parseInt(timestamp, 10);
  if (!Number.isFinite(timestampNumber)) {
    return true;
  }

  cleanupOldSlackRequests(timestampNumber);
  const replayKey = `${timestamp}:${signature}`;
  if (seenSlackRequests.has(replayKey)) {
    return true;
  }

  seenSlackRequests.set(replayKey, timestampNumber);
  return false;
}
