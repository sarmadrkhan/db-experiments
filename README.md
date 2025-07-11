🧪 Postgres‑Playground

Tiny repo for stress‑testing **PostgreSQL** from a minimal **Node + TypeScript** backend.

<br>

## What’s inside?

| Layer | Package |
| ----- | --- |
| Database | Postgres (UUID PKs) |
| Seeding  | `@faker-js/faker` |
| API      | Express + `pg` |
| Logging  | Morgan + console timers |

I created **4 tables** varying in size (100 rows, 1000 rows, 10k rows, 100k rows)

Still work in progress and i will keep updating this whenever i can

<br>

## Quick start

```bash
# 1. install deps
npm i

# 2. create schema
psql -U postgres -d dbname-here -f db-init.sql   # inside PG container

# 3. run the seed script
npm run seed
