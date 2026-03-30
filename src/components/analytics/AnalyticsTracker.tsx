'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

type AnalyticsEventType = 'page_view' | 'click' | 'scroll_depth';

interface AnalyticsEventPayload {
  eventType: AnalyticsEventType;
  pagePath: string;
  pageTitle?: string;
  sessionId: string;
  visitorId: string;
  elementLabel?: string;
  elementTarget?: string;
  elementType?: string;
  scrollPercent?: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browserName: string;
  osName: string;
  viewportWidth: number;
  viewportHeight: number;
  language?: string;
  referrer?: string;
  metadata?: Record<string, string | number | boolean | null>;
  occurredAt: string;
}

const SESSION_STORAGE_KEY = 'chattiphy_analytics_session_id';
const VISITOR_STORAGE_KEY = 'chattiphy_analytics_visitor_id';
const SCROLL_MILESTONES = [25, 50, 75, 100];

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function getOrCreateStorageId(storage: Storage, key: string, prefix: string) {
  const existing = storage.getItem(key);
  if (existing) {
    return existing;
  }

  const nextValue = createId(prefix);
  storage.setItem(key, nextValue);
  return nextValue;
}

function getDeviceType(viewportWidth: number): 'mobile' | 'tablet' | 'desktop' {
  if (viewportWidth < 768) {
    return 'mobile';
  }

  if (viewportWidth < 1024) {
    return 'tablet';
  }

  return 'desktop';
}

function getBrowserName(userAgent: string) {
  if (/edg/i.test(userAgent)) return 'Edge';
  if (/chrome|crios/i.test(userAgent)) return 'Chrome';
  if (/safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent)) return 'Safari';
  if (/firefox|fxios/i.test(userAgent)) return 'Firefox';
  return 'Unknown';
}

function getOsName(userAgent: string) {
  if (/android/i.test(userAgent)) return 'Android';
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'iOS';
  if (/mac os x/i.test(userAgent)) return 'macOS';
  if (/windows/i.test(userAgent)) return 'Windows';
  if (/linux/i.test(userAgent)) return 'Linux';
  return 'Unknown';
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function sendAnalyticsEvent(payload: AnalyticsEventPayload) {
  const body = JSON.stringify(payload);

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon('/api/analytics', blob);
    return;
  }

  void fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  });
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const trackedScrollMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const sessionId = getOrCreateStorageId(sessionStorage, SESSION_STORAGE_KEY, 'sess');
    const visitorId = getOrCreateStorageId(localStorage, VISITOR_STORAGE_KEY, 'visitor');
    const userAgent = navigator.userAgent;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const basePayload = {
      pagePath: pathname || '/',
      sessionId,
      visitorId,
      deviceType: getDeviceType(viewportWidth),
      browserName: getBrowserName(userAgent),
      osName: getOsName(userAgent),
      viewportWidth,
      viewportHeight,
      language: navigator.language,
      referrer: document.referrer || undefined,
      occurredAt: new Date().toISOString(),
    } as const;

    trackedScrollMilestones.current = new Set();

    sendAnalyticsEvent({
      eventType: 'page_view',
      pageTitle: document.title,
      metadata: {
        url: window.location.href,
      },
      ...basePayload,
    });

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const clickable = target?.closest<HTMLElement>('button, a, [role="button"], [data-analytics]');

      if (!clickable) {
        return;
      }

      const label = normalizeText(
        clickable.getAttribute('data-analytics-label') ||
          clickable.getAttribute('aria-label') ||
          clickable.textContent ||
          clickable.getAttribute('title') ||
          clickable.id ||
          clickable.tagName
      ).slice(0, 160);

      sendAnalyticsEvent({
        eventType: 'click',
        elementLabel: label || 'unknown',
        elementTarget:
          clickable.getAttribute('href') ||
          clickable.getAttribute('data-analytics-target') ||
          clickable.id ||
          undefined,
        elementType:
          clickable.getAttribute('data-analytics') ||
          clickable.getAttribute('role') ||
          clickable.tagName.toLowerCase(),
        metadata: {
          x: event.clientX,
          y: event.clientY,
        },
        ...basePayload,
        occurredAt: new Date().toISOString(),
      });
    };

    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(() => {
        const maxScrollable = document.documentElement.scrollHeight - window.innerHeight;

        if (maxScrollable <= 0) {
          ticking = false;
          return;
        }

        const progress = Math.min(100, Math.round((window.scrollY / maxScrollable) * 100));

        for (const milestone of SCROLL_MILESTONES) {
          if (progress >= milestone && !trackedScrollMilestones.current.has(milestone)) {
            trackedScrollMilestones.current.add(milestone);

            sendAnalyticsEvent({
              eventType: 'scroll_depth',
              scrollPercent: milestone,
              metadata: {
                scrollY: window.scrollY,
              },
              ...basePayload,
              occurredAt: new Date().toISOString(),
            });
          }
        }

        ticking = false;
      });
    };

    document.addEventListener('click', handleClick, true);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return null;
}
