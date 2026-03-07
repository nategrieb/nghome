# NATE Command Center

Minimal launcher and lightweight SSO-ready home for your app ecosystem.

## Included Routes

- `/` command center homepage with app cards
- `/login` auth shell login page (Phase 1 cookie session)
- `/settings` basic profile/preferences surface
- `/health` JSON health endpoint

## Environment

Copy `.env.example` to `.env.local` and set values:

```bash
NEXT_PUBLIC_APP_URL_MENU=https://food.nategrieb.com
NEXT_PUBLIC_APP_URL_NATESTEGRAM=https://photos.nategrieb.com
AUTH_REQUIRED=false
AUTH_COOKIE_SECRET=replace-with-long-random-string
```

## Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run build
```

## Deploy (Vercel)

1. Import the repo in Vercel.
2. Add domains in Vercel project settings:
	- `nategrieb.com` (primary)
	- `www.nategrieb.com` (optional redirect target)
3. Configure environment variables in Vercel:
	- `NEXT_PUBLIC_APP_URL_MENU=https://food.nategrieb.com`
	- `NEXT_PUBLIC_APP_URL_NATESTEGRAM=https://photos.nategrieb.com`
	- `AUTH_REQUIRED=false` (or `true` when you want to enforce login)
	- `AUTH_COOKIE_SECRET=<long-random-secret>`
4. Ensure DNS records point to Vercel:
	- `A` record for apex `nategrieb.com` to Vercel (or nameserver integration)
	- `CNAME` records for `food` and `photos` to each app's Vercel target
5. Deploy with default Next.js settings.
