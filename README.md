# Revalor — Give Waste Its Next Value.

AI-powered e-waste recovery platform. Scan → Understand → Value → Find → Collect → Track → Impact.

This repo ships in **Demo Mode** by default: the full product flow (scanner,
recycler discovery, pickup tracking, rewards, impact, org & admin dashboards)
works with no external API keys and no database connection, using clearly
labeled demo data (`Demo data` badges throughout the UI). Wire up a real
database, AI provider, and maps provider using the environment variables
below to move it to production.

## 1. Project structure

```
app/                 Next.js App Router pages & API routes
  page.tsx            Landing page
  dashboard/          User dashboard (overview, items, profile, settings)
  scan/                AI waste scanner flow
  recyclers/           Find a Recycler (filters + demo map)
  pickup/              Pickup request + status tracking
  rewards/             Points, levels, badges
  impact/              Charts: recovery history, category split, monthly activity
  org/                 Organization dashboard (campaigns, reporting)
  admin/               Platform admin (partners, users, categories, impact factors)
  login/               Auth screen (email/password + Google button)
  api/scan/route.ts   Scan analysis endpoint (calls lib/ai-service.ts)
components/          Reusable UI (Navbar, Footer, Sidebar, Topbar, ui/*)
lib/                 ai-service.ts (AI abstraction), demo-data.ts, utils.ts
types/               Shared TypeScript types
prisma/schema.prisma Full production data model
```

## 2. Install & run locally

Requires Node.js 18.18+.

```bash
npm install
cp .env.example .env.local     # demo mode works with zero values filled in
npm run dev
```

Open http://localhost:3000. The scanner, dashboard, recyclers map, pickup
flow, rewards, impact charts, org dashboard, and admin panel all work
immediately in demo mode — no database or API keys required.

## 3. Environment variables

All variables live in `.env.local` (see `.env.example`). None are required
to run in demo mode.

| Variable | Purpose | Demo-mode behavior if unset |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | App uses in-file demo data instead of Prisma queries |
| `JWT_SECRET` | Signs auth sessions | Login page submits but doesn't persist a real session |
| `NEXTAUTH_URL` | Base URL for auth callbacks | — |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google login | "Continue with Google" is shown but not wired to OAuth |
| `AI_PROVIDER` | `demo` \| `anthropic` \| `openai` | Defaults to `demo` — realistic mock scan results |
| `AI_API_KEY` | Key for the chosen AI provider | Ignored while `AI_PROVIDER=demo` |
| `NEXT_PUBLIC_MAPS_PROVIDER` | `demo` \| `google` \| `osm` | Defaults to `demo` — static illustrative map |
| `NEXT_PUBLIC_MAPS_API_KEY` | Key for Google Maps / OSM tile provider | Ignored while provider is `demo` |
| `STORAGE_PROVIDER` | `local` \| `s3` | Defaults to `local` — uploads handled in-memory client-side |

## 4. Database setup (moving off demo data)

1. Provision a PostgreSQL database (Neon, Supabase, Railway, RDS, or local Postgres all work).
2. Set `DATABASE_URL` in `.env.local`.
3. Generate the client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. `prisma/schema.prisma` defines every model referenced in the product spec:
   `User`, `Organization`, `WasteCategory`, `WasteItem`, `WasteScan`,
   `RecyclerPartner`, `CollectionRequest`, `RecoveryEvent`, `Reward`,
   `UserReward`, `ImpactRecord`, `Campaign`, `CampaignParticipant`,
   `Notification`, `ImpactFactor`.
5. Replace the demo-data reads in each page (`lib/demo-data.ts` imports) with
   Prisma queries via server components or API routes as you wire up each
   feature — the page components already consume the same shapes defined in
   `types/index.ts`, so swapping the data source doesn't require UI changes.

## 5. Enabling the real AI scanner

`lib/ai-service.ts` is the single abstraction every page calls through
(`app/api/scan/route.ts` → `analyzeImage()`). To go live:

1. Set `AI_PROVIDER=anthropic` and `AI_API_KEY=<your key>` in `.env.local`.
2. The included `runAnthropicAnalysis()` sends the captured image to Claude
   with a JSON-schema prompt and parses the structured result — no code
   changes needed beyond your key.
3. To use a different provider, implement the equivalent function (see the
   `runOpenAiAnalysis()` stub) and add a branch in `analyzeImage()`.
4. Demo mode (`AI_PROVIDER=demo`, the default) never claims measured
   accuracy — confidence values are illustrative and every result is tagged
   `isDemo: true`.

## 6. Enabling a real map / recycler network

`app/recyclers/page.tsx` renders a self-contained demo map (no external
tiles) when `NEXT_PUBLIC_MAPS_PROVIDER=demo`. To go live with Google Maps:

1. Set `NEXT_PUBLIC_MAPS_PROVIDER=google` and `NEXT_PUBLIC_MAPS_API_KEY`.
2. Swap the `DemoMap` component for `@react-google-maps/api` (or a
   `@vis.gl/react-google-maps` map), keeping the same `RecyclerPartner[]`
   prop shape from `types/index.ts`.
3. Replace `DEMO_RECYCLERS` reads with a query against `RecyclerPartner`
   (filtered by distance using PostGIS or a haversine query).

## 7. Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project → Import** this repo.
3. Framework preset: Next.js (auto-detected).
4. Add the environment variables from Section 3 in **Project Settings →
   Environment Variables**. You can deploy with none set — the app runs
   fully in demo mode on Vercel too.
5. If using a real database, add a `postinstall` Prisma generate step (or
   run `prisma generate` in the Vercel build command:
   `prisma generate && next build`) and run `prisma migrate deploy` against
   your production database before/after the first deploy.
6. Deploy. Vercel's default Node.js runtime supports every API route in
   this project as-is.

## 8. Future improvements

- Real authentication with hashed passwords (`bcryptjs` is already a
  dependency) and JWT session cookies via `JWT_SECRET`.
- Role-based route protection (middleware checking `Role` on `User`) for
  `/org` and `/admin`.
- Real file storage for scan images (S3-compatible) instead of client-side
  data URLs.
- Recycler-facing portal to push `RecoveryEvent` updates that drive the
  waste-journey timeline.
- Additional waste categories beyond e-waste, using the same
  `WasteCategory` model.
- Rate limiting on `/api/scan` and other mutating endpoints.

## 9. Testing checklist

- [ ] `npm run build` completes without type errors
- [ ] Landing page renders and both CTAs route correctly
- [ ] Login/signup form submits (route to `/dashboard`)
- [ ] Scanner: upload → preview → analyze → result works end to end
- [ ] Scanner: invalid file type shows the correct error state
- [ ] Scanner: API failure (e.g. throw in `analyzeImage`) shows retry state
- [ ] Dashboard cards and activity list render with demo data
- [ ] Recyclers page: filters correctly narrow the partner list
- [ ] Recyclers page: empty filter combination shows the empty state
- [ ] Pickup form: submitting shows the confirmation state
- [ ] Pickup tracking: timeline reflects the current demo status
- [ ] Rewards: points bar and badges render correctly
- [ ] Impact: all three charts render with no console errors
- [ ] Org dashboard: campaign creation form toggles and displays
- [ ] Admin: approving/rejecting a pending partner updates its badge
- [ ] All pages are usable at 375px width (mobile) and keyboard-navigable
- [ ] `prisma validate` passes once `DATABASE_URL` is set

## Notes on trustworthiness

Per the product's own standard: nothing in this codebase claims measured AI
accuracy, verified recycling outcomes, or real environmental impact without
data to back it up. Estimated values, demo partners, and demo statistics are
labeled as such in the UI (`Demo data` / `Estimated` tags) rather than
presented as fact.
