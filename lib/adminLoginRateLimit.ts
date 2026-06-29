type AttemptState = {
  failedCount: number;
  firstFailedAt: number;
  lockedUntil: number;
};

const attemptsByKey = new Map<string, AttemptState>();

function getAttemptKey(ipAddress: string, username?: string) {
  const normalizedIp = ipAddress.trim() || 'unknown-ip';
  const normalizedUser = (username ?? '').trim().toLowerCase() || 'unknown-user';
  return `${normalizedIp}|${normalizedUser}`;
}

function getWindowSeconds() {
  return Number.parseInt(process.env.ADMIN_LOGIN_WINDOW_SECONDS ?? '900', 10) || 900;
}

function getMaxAttempts() {
  return Number.parseInt(process.env.ADMIN_LOGIN_MAX_ATTEMPTS ?? '5', 10) || 5;
}

function getLockoutSeconds() {
  return Number.parseInt(process.env.ADMIN_LOGIN_LOCKOUT_SECONDS ?? '1800', 10) || 1800;
}

function nowMs() {
  return Date.now();
}

function getOrCreateState(key: string): AttemptState {
  const current = attemptsByKey.get(key);
  if (current) {
    return current;
  }

  const created: AttemptState = {
    failedCount: 0,
    firstFailedAt: nowMs(),
    lockedUntil: 0,
  };
  attemptsByKey.set(key, created);
  return created;
}

function resetIfWindowExpired(state: AttemptState) {
  const windowMs = getWindowSeconds() * 1000;
  if (nowMs() - state.firstFailedAt > windowMs) {
    state.failedCount = 0;
    state.firstFailedAt = nowMs();
  }
}

export function getClientIpAddress(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return request.headers.get('x-real-ip') ?? 'unknown-ip';
}

export function checkLoginLockout(ipAddress: string, username?: string) {
  const key = getAttemptKey(ipAddress, username);
  const state = getOrCreateState(key);
  resetIfWindowExpired(state);

  const remainingMs = state.lockedUntil - nowMs();
  if (remainingMs > 0) {
    return {
      isLocked: true,
      retryAfterSeconds: Math.ceil(remainingMs / 1000),
    };
  }

  return {
    isLocked: false,
    retryAfterSeconds: 0,
  };
}

export function recordFailedLoginAttempt(ipAddress: string, username?: string) {
  const key = getAttemptKey(ipAddress, username);
  const state = getOrCreateState(key);
  resetIfWindowExpired(state);

  state.failedCount += 1;

  if (state.failedCount >= getMaxAttempts()) {
    state.lockedUntil = nowMs() + getLockoutSeconds() * 1000;
    state.failedCount = 0;
    state.firstFailedAt = nowMs();

    return {
      nowLocked: true,
      retryAfterSeconds: getLockoutSeconds(),
    };
  }

  return {
    nowLocked: false,
    retryAfterSeconds: 0,
  };
}

export function clearLoginAttempts(ipAddress: string, username?: string) {
  const key = getAttemptKey(ipAddress, username);
  attemptsByKey.delete(key);
}
