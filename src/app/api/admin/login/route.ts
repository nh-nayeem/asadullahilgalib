import { NextRequest, NextResponse } from 'next/server';
import { createAuthCookie } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json();

    if (!secret) {
      return NextResponse.json(
        { error: 'Secret is required' },
        { status: 400 }
      );
    }

    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    const cookie = createAuthCookie();

    const response = NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );

    response.headers.set('Set-Cookie', cookie);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
