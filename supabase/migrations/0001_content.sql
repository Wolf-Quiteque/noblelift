-- Noblelift Angola CMS — content store
-- One row per content document: 'site' | 'home' | 'products' | 'gallery' | 'about'.
-- The JSON in `data` matches the zod schemas in lib/schemas.ts.

create table if not exists public.content (
  key         text primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users (id)
);

-- keep updated_at fresh on every write
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists content_set_updated_at on public.content;
create trigger content_set_updated_at
  before update on public.content
  for each row execute function public.set_updated_at();

-- Row Level Security: the public site reads; only authenticated admins write.
alter table public.content enable row level security;

drop policy if exists "content_read" on public.content;
create policy "content_read"
  on public.content for select
  using (true);

drop policy if exists "content_write" on public.content;
create policy "content_write"
  on public.content for all
  to authenticated
  using (true)
  with check (true);
