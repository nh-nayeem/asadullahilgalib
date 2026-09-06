import { NextRequest, NextResponse } from 'next/server';
import { isIP } from 'node:net';
import { validateAdminAuth } from '@/lib/admin-auth';

const isPrivateAddress = (hostname: string) => {
  const normalized = hostname.toLowerCase();
  if (normalized === 'localhost' || normalized.endsWith('.localhost')) return true;
  if (isIP(normalized) === 6) return normalized === '::1' || normalized.startsWith('fc') || normalized.startsWith('fd') || normalized.startsWith('fe80');
  if (isIP(normalized) !== 4) return false;
  const [first, second] = normalized.split('.').map(Number);
  return first === 0 || first === 10 || first === 127 || first === 169 && second === 254 || first === 172 && second >= 16 && second <= 31 || first === 192 && second === 168;
};

const getMetaContent = (html: string, key: string) => {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${escapedKey}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escapedKey}["'][^>]*>`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1].replace(/&amp;/g, '&');
  }
  return '';
};

const getTitle = (html: string) => html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
  ?.replace(/\s+/g, ' ')
  .trim() || '';

const formatDate = (value: string) => {
  const normalized = value.replace(/[০-৯]/g, digit => String('০১২৩৪৫৬৭৮৯'.indexOf(digit)));
  const timestamp = Date.parse(normalized);
  return Number.isNaN(timestamp)
    ? ''
    : new Intl.DateTimeFormat('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(timestamp));
};

const getReaderFallback = async (url: string) => {
  // Some publishers (including Dhaka Post) serve a bot challenge instead of
  // their public Open Graph tags. The reader is used only after that direct
  // request provides no usable preview data.
  const readerUrl = `https://r.jina.ai/http://${new URL(url).host}${new URL(url).pathname}${new URL(url).search}`;
  const response = await fetch(readerUrl, {
    headers: { 'User-Agent': 'PressPreview/1.0' },
    signal: AbortSignal.timeout(12000),
    cache: 'no-store',
  });
  if (!response.ok) return { title: '', thumbnail: '', publishedAt: '' };
  const text = await response.text();
  const title = text.match(/^Title:\s*(.+)$/m)?.[1]?.trim() || '';
  const thumbnail = text.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/)?.[1] || '';
  const publishedAt = text.match(/^Published Time:\s*(.+)$/m)?.[1]?.trim() || '';
  return { title, thumbnail, publishedAt };
};

const createPreview = async (url: unknown) => {
  try {
    if (typeof url !== 'string' || !url.trim()) throw new Error('A URL is required.');
    const parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol) || isPrivateAddress(parsedUrl.hostname)) {
      return NextResponse.json({ error: 'Please enter a public HTTP(S) URL.' }, { status: 400 });
    }

    let html = '';
    let finalUrl = parsedUrl.toString();
    try {
      const response = await fetch(parsedUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PressPreview/1.0)' },
        redirect: 'follow',
        signal: AbortSignal.timeout(8000),
        cache: 'no-store',
      });
      if (response.ok) {
        html = await response.text();
        finalUrl = response.url || finalUrl;
      }
    } catch {
      // A fallback is attempted below for sources that reject direct requests.
    }

    let thumbnail = getMetaContent(html, 'og:image') || getMetaContent(html, 'twitter:image');
    let title = getMetaContent(html, 'og:title') || getMetaContent(html, 'twitter:title') || getTitle(html);
    let publishedAt = getMetaContent(html, 'article:published_time')
      || getMetaContent(html, 'date')
      || getMetaContent(html, 'publish_date')
      || html.match(/"datePublished"\s*:\s*"([^"\\]+)"/)?.[1]
      || '';
    if ((!title || !thumbnail) || /just a moment/i.test(title)) {
      const fallback = await getReaderFallback(finalUrl);
      title = /just a moment/i.test(title) || !title ? fallback.title : title;
      thumbnail = thumbnail || fallback.thumbnail;
      publishedAt = publishedAt || fallback.publishedAt;
    }
    if (!title && !thumbnail) throw new Error('This publisher did not provide preview metadata.');
    const publisher = getMetaContent(html, 'og:site_name') || new URL(finalUrl).hostname.replace(/^www\./, '');
    const date = formatDate(publishedAt);

    return {
      title,
      publisher,
      thumbnail: thumbnail ? new URL(thumbnail, finalUrl).toString() : '',
      url: finalUrl,
      date,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? `Could not generate a preview: ${error.message}` : 'Could not generate a preview.');
  }
};

const previewResponse = async (url: unknown, cacheable = false) => {
  try {
    const preview = await createPreview(url);
    return NextResponse.json(preview, {
      headers: cacheable ? { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } : undefined,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Could not generate a preview.' }, { status: 422 });
  }
};

// Public, cacheable endpoint used only for homepage Press cards that have
// missing optional metadata. It returns no private data.
export async function GET(request: NextRequest) {
  return previewResponse(new URL(request.url).searchParams.get('url'), true);
}

export async function POST(request: NextRequest) {
  if (!validateAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { url } = await request.json();
  return previewResponse(url);
}
