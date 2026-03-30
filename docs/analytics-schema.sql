create extension if not exists pgcrypto;

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  occurred_at timestamptz not null default now(),
  event_type text not null,
  page_path text not null,
  page_title text,
  session_id text not null,
  visitor_id text not null,
  element_label text,
  element_target text,
  element_type text,
  scroll_percent integer,
  device_type text,
  browser_name text,
  os_name text,
  viewport_width integer,
  viewport_height integer,
  language text,
  referrer text,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists analytics_events_created_at_idx
  on public.analytics_events (created_at desc);

create index if not exists analytics_events_event_type_idx
  on public.analytics_events (event_type);

create index if not exists analytics_events_page_path_idx
  on public.analytics_events (page_path);

create index if not exists analytics_events_session_id_idx
  on public.analytics_events (session_id);

create index if not exists analytics_events_scroll_percent_idx
  on public.analytics_events (scroll_percent)
  where scroll_percent is not null;

alter table public.analytics_events enable row level security;

create policy "analytics_events_no_public_access"
  on public.analytics_events
  for all
  to public
  using (false)
  with check (false);
