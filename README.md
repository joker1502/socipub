# Socipub

Open source social media scheduler. Schedule posts to Twitter/X, LinkedIn, and more from one dashboard.

🌐 **Production**: [socipub.com](https://socipub.com) (via Vercel → Cloudflare)
📦 **Supabase**: `svxywwhzvdshjoewjyek` (us-west-2)
💳 **Payments**: Creem (月付 + 年付, 17% off yearly)
🤖 **AI**: OpenCode API (DeepSeek, free)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: shadcn/ui (Base UI) + Tailwind CSS v4
- **Auth**: Supabase Auth (GitHub OAuth, Google OAuth, email/password)
- **Database**: Supabase PostgreSQL
- **Payments**: Creem (Merchant of Record)

## Getting Started

```bash
pnpm install
cp .env.example .env.local  # fill in your keys
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Production at [socipub.com](https://socipub.com).

## Environment Variables

See `.env.local` for all required variables. Key ones:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (for webhooks) |
| `CREEM_API_KEY` | Creem API key |
| `CREEM_WEBHOOK_SECRET` | Creem webhook secret |
| `TWITTER_CLIENT_ID` | Twitter/X OAuth client ID |
| `TWITTER_CLIENT_SECRET` | Twitter/X OAuth client secret |
| `LINKEDIN_CLIENT_ID` | LinkedIn OAuth client ID |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn OAuth client secret |
| `OPENCODE_API_KEY` | OpenCode API key (free, for AI rewrite/translate via DeepSeek) |

## Database

Run migrations in `supabase/migrations/` against your Supabase project:

1. `001_profiles.sql` — User profiles + Creem subscription fields
2. `002_social_accounts.sql` — Connected social media accounts
3. `003_posts.sql` — Posts (drafts, scheduled, published)
4. `004_ai_credits.sql` — AI credit tracking

## Project Structure

```
src/
├── app/
│   ├── api/           # API routes (Creem, OAuth, AI, webhooks)
│   ├── blog/          # Blog listing + articles + tag filtering
│   ├── dashboard/     # Protected dashboard (overview, accounts, editor, calendar)
│   ├── features/      # SEO landing pages
│   ├── multi-platform/
│   ├── scheduling/
│   ├── markdown/
│   ├── pricing/
│   ├── trust/
│   ├── privacy/
│   ├── terms/
│   ├── sign-in/       # Auth pages (OAuth + email/password)
│   └── sign-up/
├── components/        # Shared UI components
├── lib/               # Utilities (Supabase clients, OAuth helpers, blog posts)
└── proxy.ts           # Auth middleware (Next.js 16 proxy)
```

## Key Features

- Multi-platform posting (Twitter/X, LinkedIn)
- AI-powered scheduling with calendar view
- Markdown editor with image upload
- Scheduled publish queue with automatic delivery
- AI Rewrite & Translate (GPT-powered)
- Team collaboration with seat management
- Creem payment integration (Free/Pro/Team plans)
- GDPR compliant with EU hosting option
- Open source (MIT license)

## SEO Strategy

Each page targets specific keywords per the mapping table in the spec. Key pages and their primary keywords:

| URL | Target Keywords |
|-----|----------------|
| `/` | social media scheduler, Socipub (brand anchor) |
| `/features` | open source social media scheduler, self-hosted social media scheduler, indie hacker social media tool, cross-platform content publisher |
| `/multi-platform` | multi-platform posting tool, single user social media scheduler |
| `/scheduling` | lightweight social media scheduler |
| `/markdown` | markdown social media tool |
| `/pricing` | social media scheduler pricing |
| `/trust` | gdpr compliant social media tool |
| `/blog/postiz-alternative-open-source` | postiz alternative |
| `/blog/buffer-alternative-open-source` | buffer alternative open source |
| `/blog/hootsuite-free-alternative` | hootsuite free alternative |
| `/blog/later-com-competitor` | later.com competitor |
| `/blog/schedule-twitter-linkedin-one-click` | schedule posts to twitter and linkedin at once |
| `/blog/gdpr-compliant-social-media-tool` | gdpr compliant social media scheduler |

## Development Principles

- **SEO first**: Define URL + metadata before writing page code
- **Visual spec**: All UI follows the design tokens in `globals.css` (brand indigo, dark mode zinc, etc.)
- **Creem only**: Stripe is not used; all payments go through Creem
- **Type safe**: New data structures get TypeScript interfaces before implementation
- **Surgical changes**: Touch only what the task requires; match existing style

## Build & Deploy

```bash
pnpm build      # production build (48 routes, SSG + dynamic)
pnpm dev        # development server
pnpm lint       # ESLint
```

The sitemap at `/sitemap.xml` auto-generates from all static pages, blog posts, and tag filter pages. RSS feed at `/feed.xml`.

### Deployment (Vercel)

```bash
vercel deploy --prod
```

Auto-deploys on push to `main` via GitHub webhook.

## Project Status

Current version: **v1.7** — see `git tag` for release history.

| Step | Area | Status |
|------|------|--------|
| 1 | Performance (next/image, lint) | ✅ |
| 2 | UX (skeleton, toast, error boundaries) | ✅ |
| 3 | SEO (breadcrumb, schema, RSS) | ✅ |
| 4 | Features (password reset, email verify, posts) | ✅ |
| 5 | Code quality (cleanup, types, README) | ✅ |
