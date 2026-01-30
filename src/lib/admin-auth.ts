import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

const ADMIN_SECRET = process.env.ADMIN_SECRET;
const COOKIE_NAME = 'admin_session';

export function createAuthCookie(): string {
  if (!ADMIN_SECRET) {
    throw new Error('ADMIN_SECRET environment variable is not set');
  }

  return serialize(COOKIE_NAME, ADMIN_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

export function createLogoutCookie(): string {
  return serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
}

export function validateAdminAuth(request: NextRequest): boolean {
  if (!ADMIN_SECRET) {
    console.error('ADMIN_SECRET environment variable is not set');
    return false;
  }

  const cookie = request.cookies.get(COOKIE_NAME);
  
  if (!cookie || cookie.value !== ADMIN_SECRET) {
    return false;
  }

  return true;
}

export function getAuthMiddleware() {
  return (request: NextRequest) => {
    if (!validateAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    return null;
  };
}
