import { NextRequest, NextResponse } from 'next/server';

interface IncomingAnalyticsEvent {
  eventType?: string;
  pagePath?: string;
  pageTitle?: string;
  sessionId?: string;
  visitorId?: string;
  elementLabel?: string;
  elementTarget?: string;
  elementType?: string;
  scrollPercent?: number;
  deviceType?: string;
  browserName?: string;
  osName?: string;
  viewportWidth?: number;
  viewportHeight?: number;
  language?: string;
  referrer?: string;
  metadata?: Record<string, string | number | boolean | null>;
  occurredAt?: string;
}

function sanitizeEvent(event: IncomingAnalyticsEvent, request: NextRequest) {
  if (!event.eventType || !event.pagePath || !event.sessionId || !event.visitorId) {
    return null;
  }

  return {
    event_type: event.eventType,
    page_path: event.pagePath,
    page_title: event.pageTitle ?? null,
    session_id: event.sessionId,
    visitor_id: event.visitorId,
    element_label: event.elementLabel ?? null,
    element_target: event.elementTarget ?? null,
    element_type: event.elementType ?? null,
    scroll_percent:
      typeof event.scrollPercent === 'number' && Number.isFinite(event.scrollPercent)
        ? event.scrollPercent
        : null,
    device_type: event.deviceType ?? 'unknown',
    browser_name: event.browserName ?? 'Unknown',
    os_name: event.osName ?? 'Unknown',
    viewport_width:
      typeof event.viewportWidth === 'number' && Number.isFinite(event.viewportWidth)
        ? event.viewportWidth
        : null,
    viewport_height:
      typeof event.viewportHeight === 'number' && Number.isFinite(event.viewportHeight)
        ? event.viewportHeight
        : null,
    language: event.language ?? null,
    referrer: event.referrer ?? null,
    metadata: event.metadata ?? {},
    occurred_at: event.occurredAt ?? new Date().toISOString(),
    user_agent: request.headers.get('user-agent'),
  };
}

export async function POST(request: NextRequest) {
  const analyticsUrl = process.env.ANALYTICS_SUPABASE_URL;
  const analyticsServiceRoleKey = process.env.ANALYTICS_SUPABASE_SERVICE_ROLE_KEY;

  if (!analyticsUrl || !analyticsServiceRoleKey) {
    return NextResponse.json(
      { error: 'Missing analytics database environment variables.' },
      { status: 503 }
    );
  }

  let payload: IncomingAnalyticsEvent;

  try {
    payload = (await request.json()) as IncomingAnalyticsEvent;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const row = sanitizeEvent(payload, request);

  if (!row) {
    return NextResponse.json({ error: 'Invalid analytics payload.' }, { status: 400 });
  }

  const response = await fetch(`${analyticsUrl}/rest/v1/analytics_events`, {
    method: 'POST',
    headers: {
      apikey: analyticsServiceRoleKey,
      Authorization: `Bearer ${analyticsServiceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: 'Failed to store analytics event.', details: errorText.slice(0, 400) },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
