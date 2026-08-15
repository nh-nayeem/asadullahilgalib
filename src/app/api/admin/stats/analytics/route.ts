import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

interface CountResponse {
  query?: { since?: string; until?: string };
  data?: { visitors?: number; pageviews?: number };
}

interface AggregateResponse {
  data?: Array<Record<string, unknown>>;
}

function findLatestActivity(rows: Array<Record<string, unknown>>): string | null {
  const timestamps = rows.flatMap(row => {
    const values = [row.timestamp, row.time, row.date, row.day, row.key];
    return values
      .filter((value): value is string | number => typeof value === 'string' || typeof value === 'number')
      .map(value => new Date(value).getTime())
      .filter(value => Number.isFinite(value));
  });
  return timestamps.length ? new Date(Math.max(...timestamps)).toISOString() : null;
}

export async function GET(request: NextRequest) {
  if (!validateAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    return NextResponse.json(
      { error: 'Vercel Analytics is not configured', configured: false },
      { status: 503 }
    );
  }

  const baseParams = new URLSearchParams({ projectId });
  if (teamId) baseParams.set('teamId', teamId);
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const countResponse = await fetch(
      `https://api.vercel.com/v1/query/web-analytics/visits/count?${baseParams}`,
      { headers, cache: 'no-store' }
    );

    if (!countResponse.ok) {
      const error = await countResponse.text();
      console.error('Vercel Analytics count error:', countResponse.status, error);
      return NextResponse.json({ error: 'Could not load Vercel Analytics' }, { status: 502 });
    }

    const counts = await countResponse.json() as CountResponse;
    const until = new Date();
    const since = new Date(until);
    since.setUTCDate(since.getUTCDate() - 30);
    const aggregateParams = new URLSearchParams(baseParams);
    aggregateParams.set('since', since.toISOString());
    aggregateParams.set('until', until.toISOString());
    aggregateParams.set('by', 'day');

    const aggregateResponse = await fetch(
      `https://api.vercel.com/v1/query/web-analytics/visits/aggregate?${aggregateParams}`,
      { headers, cache: 'no-store' }
    );
    const aggregate = aggregateResponse.ok
      ? await aggregateResponse.json() as AggregateResponse
      : { data: [] };

    return NextResponse.json({
      configured: true,
      visitors: counts.data?.visitors ?? 0,
      pageviews: counts.data?.pageviews ?? 0,
      lastActivity: findLatestActivity(aggregate.data ?? []),
      since: counts.query?.since ?? null,
      until: counts.query?.until ?? null,
    });
  } catch (error) {
    console.error('Vercel Analytics request failed:', error);
    return NextResponse.json({ error: 'Could not connect to Vercel Analytics' }, { status: 502 });
  }
}
