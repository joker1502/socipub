-- AI credits tracking
create table if not exists public.ai_credits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  credits_remaining int not null default 0,
  total_purchased int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id)
);

alter table public.ai_credits enable row level security;

create policy "Users can view own credits"
  on public.ai_credits for select
  using (auth.uid() = user_id);

create policy "Users can update own credits"
  on public.ai_credits for update
  using (auth.uid() = user_id);
