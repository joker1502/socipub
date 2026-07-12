-- Posts table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null default '',
  image_urls text[] default '{}',
  platforms text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published', 'failed')),
  scheduled_at timestamptz,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.posts enable row level security;

create policy "Users can view own posts"
  on public.posts for select
  using (auth.uid() = user_id);

create policy "Users can insert own posts"
  on public.posts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own posts"
  on public.posts for update
  using (auth.uid() = user_id);

create policy "Users can delete own posts"
  on public.posts for delete
  using (auth.uid() = user_id);
