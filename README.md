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

Result (as of now):
1. inserting likes with individual queries vs in batch. Both inserted 50k entries but batch insert was  *~100x faster*
```
 Console Output: 
  likes_individual: 4:40.517 (m:ss.mmm)
  likes_batch: 2.759s
```

<br>

## Quick start

```bash
# 1. install deps
npm i

# 2. create schema
psql -U postgres -d dbname-here -f db-init.sql   # inside PG container

# 3. run the seed script
npm run seed
