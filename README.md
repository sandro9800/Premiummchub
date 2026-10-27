# Premium MC Hub

A full-stack catalog of Minecraft clients, mods and macros with a public storefront-style UI and a password-protected admin panel. Data is stored in Upstash Redis and served through a Vercel serverless API, so changes sync across every browser and device.

**Live demo:** https://premiummchub.vercel.app

> The visual design is modeled after the existing site premiumvault.vercel.app. The code in this repository is my own implementation.

## Features

**Public site**
- Home page with hero, stats, featured, popular and recent items
- Browse clients and mods/macros with filtering, sorting and pagination
- Item detail pages with image gallery and download buttons (each click is logged)
- Full-text search across name, description, content, author and tags

**Admin panel**
- Login-protected dashboard with stats, recent downloads and backend status
- Create, edit and delete clients, mods and macros
- Media manager with image upload (stored as base64)
- Analytics: 30-day chart, top items, breakdown by type
- Site settings: site name, SEO, upload limit, data reset

## Tech stack

| Area | Tools |
| ---- | ----- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 3 |
| Routing | react-router-dom v6 |
| Charts / icons | recharts, lucide-react |
| Backend | Vercel Serverless Function (`api/data.js`) |
| Database | Upstash Redis (`@upstash/redis`) |
| Hosting | Vercel |

## Project structure

```
api/data.js            Single serverless function, dispatches on ?action=
src/lib/api.ts         Typed wrapper around the API (all reads/writes go through it)
src/lib/DataContext.tsx  Loads all data on mount and exposes it to the app
src/lib/auth.ts        Admin login / session helpers
src/pages/             Public pages
src/pages/admin/       Admin pages
src/components/        Shared UI components
```

## Getting started

```bash
npm install
npm run dev
```

The serverless API only runs on Vercel. Locally, the UI falls back to an in-memory seed so you can still inspect the design.

### Environment variables

Copy `.env.example` to `.env.local` and fill in your own values. Never commit real credentials.

| Name | Description |
| ---- | ----------- |
| `VITE_ADMIN_USERNAME` | Admin username |
| `VITE_ADMIN_PASSWORD` | Admin password |
| `UPSTASH_REDIS_REST_URL` | REST URL from your Upstash database |
| `UPSTASH_REDIS_REST_TOKEN` | REST token from your Upstash database |

### Deploy

1. Push the repo to GitHub and import it into Vercel.
2. Create a free Upstash Redis database.
3. Add the four environment variables above in the Vercel project settings.
4. Deploy. The catalog is seeded automatically on the first request.

## Roadmap

- Move admin authentication to the server (token-protected write endpoints). Variables prefixed with `VITE_` are bundled into the client build, so the current admin login is suitable for a demo, not for sensitive data.
- Store uploaded media in object storage instead of base64.
- Add tests.

## Author

Sandro Iobidze - https://github.com/sandro9800
