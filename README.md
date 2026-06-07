# Premium MC Hub

A premium vault/directory of Minecraft clients, mods and macros — built as a
1:1 rebrand of `premiumvault.vercel.app`. Fully synced across all browsers
and devices via **Upstash Redis** through a Vercel serverless API.

## Stack

- **Frontend:** React 19 + Vite + TypeScript + Tailwind CSS v3 (with PostCSS)
- **Routing:** react-router-dom v6
- **Charts:** recharts
- **Icons:** lucide-react
- **Backend:** Vercel Serverless Function at `api/data.js` using `@upstash/redis`
- **Auth:** env-var credentials (`VITE_ADMIN_USERNAME`, `VITE_ADMIN_PASSWORD`),
  session kept in `sessionStorage` (per-tab, not per-browser)

## Deploy to Vercel

1. **Push the repo to GitHub** and import it into Vercel.
2. **Create an Upstash Redis database** (free tier is fine) at
   <https://console.upstash.com>.
3. **Add these Environment Variables** in the Vercel project settings:

   | Name | Value |
   | ---- | ----- |
   | `VITE_ADMIN_USERNAME` | your admin username |
   | `VITE_ADMIN_PASSWORD` | your strong password |
   | `UPSTASH_REDIS_REST_URL` | the URL from Upstash |
   | `UPSTASH_REDIS_REST_TOKEN` | the token from Upstash |

4. **Deploy.** The catalog is auto-seeded on the first request to
   `GET /api/data?action=all`.

## Local development

```bash
npm install
npm run dev
```

`/api/data.js` only runs on Vercel. Locally the UI falls back to an
in-memory seed so the design can be inspected.

## Architecture

- `api/data.js` — single serverless function, dispatches on `?action=`
  (`all`, `items`, `media`, `settings`, `downloads`, `analytics`, `init`,
  `reset`, `log-download`).
- `src/lib/api.ts` — typed wrapper around the API; **every** read/write goes
  through here.
- `src/lib/DataContext.tsx` — fetches all data on mount, exposes
  `{ items, media, settings, downloads, analytics, refresh, saveItem, ... }`.
- `src/lib/auth.ts` — synchronous env-var auth (login, logout,
  isAuthenticated, hasAdminCredentials).
- `src/App.tsx` — calls `initStorage()` in a `useEffect`; renders a
  full-screen spinner while connecting.
- `src/pages/...` — public and admin pages.

## Pages

**Public**
- `/` — hero, stats, featured, popular, recent
- `/clients` — PvP & all-in-one clients
- `/mods-and-macros` — combined mods + macros, with filter / sort / pagination
- `/:type/:id` — item detail with gallery, download buttons (each click
  calls `log-download`)
- `/search` — full-text search across name / description / content / author / tags

**Admin** (protected by `isAuthenticated()`)
- `/admin/login`
- `/admin` — dashboard with stats, recent downloads, backend status
- `/admin/clients` — manage clients
- `/admin/tools` — manage mods + macros
- `/admin/edit/:type[/:id]` — create / edit any item
- `/admin/media` — upload / manage images (stored as base64)
- `/admin/analytics` — 30-day chart, top items, type breakdown
- `/admin/settings` — site name, SEO, upload limit, danger zone (reset)
