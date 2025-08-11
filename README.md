Infinite Canvas Productivity App (MVP)

Quickstart
- Prereqs: Node 18+, pnpm, Postgres
- Copy .env.example to .env and set DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
- Install and run:
  - pnpm install
  - pnpm db:gen && pnpm db:migrate && pnpm db:seed
  - pnpm dev
  - Open http://localhost:3000, sign in as alice@example.com / password123

Scripts
- dev, build, start
- db:gen, db:migrate, db:seed
- test (Vitest), test:e2e (Playwright)
- lint, typecheck

Notes
- WebSockets: in-process room per Space via Edge route /api/ws. Presence and block updates broadcast to other tabs.
- Auth: NextAuth credentials, bcrypt. Seed creates Alice (Owner) and Bob (Editor).
- DB: Prisma + Postgres schema matches spec subsets. Seed includes space “Q3 GTM Plan” and demo blocks.

Next steps
- Expand blocks rendering, receipts, approvals, right-rail, search, command palette, and views per spec.



