import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

const ADMIN_SECRET = process.env.ADMIN_SECRET;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-jwt-secret-change-in-production';
const COOKIE_NAME = 'admin_session';

interface JWTPayload {
  authenticated: boolean;
  timestamp: number;
}

export function createAuthCookie(): string {
  if (!ADMIN_SECRET) {
    throw new Error('ADMIN_SECRET environment variable is not set');
  }

  const payload: JWTPayload = {
    authenticated: true,
    timestamp: Date.now()
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

  return serialize(COOKIE_NAME, token, {
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
  
  if (!cookie || !cookie.value) {
    return false;
  }

  try {
    const decoded = jwt.verify(cookie.value, JWT_SECRET) as JWTPayload;
    return decoded.authenticated === true;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return false;
  }
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
