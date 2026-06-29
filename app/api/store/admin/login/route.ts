import { NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE_NAME,
  createAdminSessionToken,
  getAdminSessionTtlSeconds,
  isAdminCredentialsValid,
  isAdminLoginConfigured,
} from '../../../../../lib/adminAuth';
import {
  checkLoginLockout,
  clearLoginAttempts,
  getClientIpAddress,
  recordFailedLoginAttempt,
} from '../../../../../lib/adminLoginRateLimit';

export const runtime = 'nodejs';

type LoginRequestBody = {
  username?: string;
  password?: string;
};

export async function POST(request: Request) {
  if (!isAdminLoginConfigured()) {
    return NextResponse.json(
      { error: 'Admin login is not configured on this environment.' },
      { status: 500 },
    );
  }

  const ipAddress = getClientIpAddress(request);

  let body: LoginRequestBody;
  try {
    body = (await request.json()) as LoginRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const username = (body.username ?? '').trim();
  const password = body.password ?? '';

  const lockout = checkLoginLockout(ipAddress, username);
  if (lockout.isLocked) {
    return NextResponse.json(
      { error: 'Too many failed login attempts. Try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': `${lockout.retryAfterSeconds}`,
          'Cache-Control': 'no-store',
        },
      },
    );
  }

  if (!username || !password) {
    return NextResponse.json(
      { error: 'Username and password are required.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  if (!isAdminCredentialsValid(username, password)) {
    const failed = recordFailedLoginAttempt(ipAddress, username);
    if (failed.nowLocked) {
      return NextResponse.json(
        { error: 'Too many failed login attempts. Try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': `${failed.retryAfterSeconds}`,
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    return NextResponse.json(
      { error: 'Invalid credentials.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  clearLoginAttempts(ipAddress, username);

  const token = createAdminSessionToken(username);
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: getAdminSessionTtlSeconds(),
  });

  response.headers.set('Cache-Control', 'no-store');
  return response;
}
