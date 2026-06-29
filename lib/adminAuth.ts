import crypto from 'node:crypto';

export const ADMIN_SESSION_COOKIE_NAME = 'redstone_admin_session';
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 12;

type AdminSessionPayload = {
  username: string;
  exp: number;
};

function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() ?? '';
}

function base64url(input: string | Buffer) {
  return Buffer.from(input).toString('base64url');
}

function timingSafeEqualString(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

function signPayload(encodedPayload: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(encodedPayload).digest('base64url');
}

export function isAdminCredentialsValid(username: string, password: string) {
  const configuredUsername = process.env.ADMIN_LOGIN_USERNAME?.trim() ?? '';
  const configuredPassword = process.env.ADMIN_LOGIN_PASSWORD ?? '';

  if (!configuredUsername || !configuredPassword) {
    return false;
  }

  return (
    timingSafeEqualString(username, configuredUsername) &&
    timingSafeEqualString(password, configuredPassword)
  );
}

export function isAdminLoginConfigured() {
  return Boolean(
    process.env.ADMIN_LOGIN_USERNAME?.trim() &&
      process.env.ADMIN_LOGIN_PASSWORD &&
      getAdminSecret(),
  );
}

export function createAdminSessionToken(username: string) {
  const secret = getAdminSecret();
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is required for admin sessions.');
  }

  const payload: AdminSessionPayload = {
    username,
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS,
  };

  const encodedPayload = base64url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string) {
  if (!token) {
    return null;
  }

  const secret = getAdminSecret();
  if (!secret) {
    return null;
  }

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload, secret);
  if (!timingSafeEqualString(signature, expectedSignature)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as AdminSessionPayload;
    if (!parsed.username || !parsed.exp) {
      return null;
    }

    if (parsed.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function getAdminSessionTtlSeconds() {
  return ADMIN_SESSION_TTL_SECONDS;
}
