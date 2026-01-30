import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    const isValid = validateAdminAuth(request);

    if (isValid) {
      return NextResponse.json(
        { authenticated: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
