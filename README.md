Infinite Canvas Productivity App (MVP)

Overview
- A Next.js 14 app that provides a collaborative, draggable infinite canvas with typed data blocks (text, table, chart, metric, task, etc.), authentication, real‑time updates, and a Postgres-backed data model.

Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS
- tRPC 11 + TanStack Query 5
- Prisma ORM + PostgreSQL
- NextAuth (credentials provider)
- WebSockets (edge runtime) for realtime presence/updates

Requirements
- Node.js 18–20
- PostgreSQL (local or hosted)

Environment
Create a `.env` in the repo root with:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME"
NEXTAUTH_SECRET="a-long-random-string"
NEXTAUTH_URL="http://localhost:3000"
```

Local Development
```
npm install
npm run db:gen
npm run db:migrate
npm run db:seed
npm run dev
```
Open http://localhost:3000 and sign in with:
- Email: alice@example.com
- Password: password123

Scripts
- dev, build, start
- db:gen, db:migrate, db:seed
- test (Vitest), test:e2e (Playwright)
- lint, typecheck

Deployment (Railway/Vercel)
- Ensure environment variables are configured as above.
- Postinstall runs `prisma generate` automatically.
- Build command: `npm run build`  Start command: `npm start`
- Node engine is pinned to 18–20 in `package.json`.

Notes
- WebSockets: edge route `/api/ws` manages per-space broadcast (simple in-memory room).
- Auth: NextAuth credentials + bcrypt. Seeder creates Alice (Owner) and Bob (Editor).
- DB: Prisma schema models Users, Spaces, Blocks, Versions, Approvals, Comments, Views, Runbooks.

Roadmap
- Richer block rendering (charts/tables), approvals UI, right-rail, search, command palette, saved views.



