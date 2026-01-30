import { NextRequest, NextResponse } from 'next/server';
import { createLogoutCookie } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const cookie = createLogoutCookie();

    const response = NextResponse.json(
      { success: true, message: 'Logout successful' },
      { status: 200 }
    );

    response.headers.set('Set-Cookie', cookie);

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
