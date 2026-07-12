-- Social media connected accounts
create table if not exists public.social_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  platform text not null check (platform in ('twitter', 'linkedin')),
  platform_account_id text not null,
  platform_username text,
  platform_name text,
  avatar_url text,
  access_token text not null,
  refresh_token text,
  token_expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, platform)
);

alter table public.social_accounts enable row level security;

create policy "Users can view own accounts"
  on public.social_accounts for select
  using (auth.uid() = user_id);

create policy "Users can insert own accounts"
  on public.social_accounts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own accounts"
  on public.social_accounts for update
  using (auth.uid() = user_id);

create policy "Users can delete own accounts"
  on public.social_accounts for delete
  using (auth.uid() = user_id);
