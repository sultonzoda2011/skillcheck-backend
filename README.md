# SkillCheck Backend

Backend API for SkillCheck, built with NestJS + Prisma + PostgreSQL.

This service provides:
- authentication with JWT access token + refresh token cookie;
- profile management (including avatar upload);
- best results and leaderboard;
- reviews with moderation flow;
- admin endpoints for user management.

## Tech Stack

- Node.js + TypeScript
- NestJS 11
- Prisma 7 (`@prisma/adapter-pg`)
- PostgreSQL
- Swagger (`/api-docs`)
- JWT + Passport

## Module Overview

- `auth`: register, login, refresh, logout.
- `profile`: current user profile, profile update, password change.
- `best-results`: personal bests, top-15 leaderboard, top-5 leaderboard.
- `reviews`: public approved reviews, create review, admin moderation.
- `admin`: list users and block/unblock users (ADMIN only).
- `prisma`: global Prisma service and DB connection lifecycle.

## Data Model (Prisma)

Main entities in `prisma/schema.prisma`:

- `User`: account data, role (`USER`/`ADMIN`), block flag.
- `BestResult`: per-user best scores and cumulative `totalScore`.
- `Review`: user reviews with moderation flag `isApproved`.

## Environment Variables

Create a `.env` file in project root.

| Name | Required | Example | Description |
| --- | --- | --- | --- |
| `POSTGRES_USER` | yes | `root` | PostgreSQL user (used by Docker Compose). |
| `POSTGRES_PASSWORD` | yes | `123456` | PostgreSQL password (used by Docker Compose). |
| `POSTGRES_HOST` | yes | `localhost` | PostgreSQL host. |
| `POSTGRES_PORT` | yes | `5432` | PostgreSQL port. |
| `POSTGRES_DATABASE` | yes | `skillcheck-db` | PostgreSQL database name. |
| `DIRECT_URL` | optional | `postgresql://...` | Direct URL for Prisma workflows. |
| `DATABASE_URL` | yes | `postgresql://...` | Main DB connection string used by Prisma adapter. |
| `JWT_SECRET` | yes | `your-long-random-secret` | JWT signing secret (HS256). |
| `JWT_ACCESS_TOKEN_TTL` | yes | `2 h` | Access token lifetime. |
| `JWT_REFRESH_TOKEN_TTL` | yes | `7 d` | Refresh token lifetime. |
| `COOKIE_DOMAIN` | yes | `localhost` | Domain for `refreshToken` cookie. |
| `NODE_ENV` | yes | `development` | Environment mode. |

## Local Run

1. Install dependencies:

```bash
npm install
```

2. Start PostgreSQL in Docker:

```bash
docker compose up -d postgres
```

3. Sync Prisma schema to DB:

```bash
npx prisma db push
```

4. Start API in watch mode:

```bash
npm run start:dev
```

Server runs on `http://localhost:4000`.

## API Docs

- Swagger UI: `http://localhost:4000/api-docs`
- OpenAPI JSON: `http://localhost:4000/swagger/json`
- OpenAPI YAML: `http://localhost:4000/swagger/yaml`

## Auth and Access Control

- Access token is returned in response body.
- Refresh token is stored in HTTP-only cookie `refreshToken`.
- Protected routes require `Authorization: Bearer <accessToken>`.
- `ADMIN` routes are protected by `JwtAuthGuard + RolesGuard`.
- New user becomes `ADMIN` only when registering with email `admin@tjk.com`.
- Blocked users cannot pass JWT validation.

## Response Format

Most endpoints are wrapped by a global interceptor and return:

```json
{
  "message": "Operation successful",
  "data": {},
  "status": 200
}
```

## API Endpoints

### Public

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Health-like root endpoint. |
| `POST` | `/auth/register` | Register user and return tokens. |
| `POST` | `/auth/login` | Login user and return tokens. |
| `POST` | `/auth/refresh` | Refresh access token using refresh cookie. |
| `POST` | `/auth/logout` | Clear refresh cookie. |
| `GET` | `/best-results/leaderboard` | Top 15 users by score. |
| `GET` | `/best-results/leaderboard-5` | Top 5 users by score. |
| `GET` | `/reviews` | List approved reviews. |

### Authenticated User

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/profile` | Get current user profile. |
| `PATCH` | `/profile` | Update profile (supports avatar upload via `multipart/form-data`). |
| `POST` | `/profile/change-password` | Change password. |
| `GET` | `/best-results/my-best` | Get own best result record. |
| `POST` | `/best-results/my-best` | Save test result (`type`, `score`). |
| `POST` | `/reviews` | Create a review (pending moderation). |

### Admin Only

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/admin/users` | List users (`USER` role only). |
| `POST` | `/admin/user/status` | Block/unblock user. |
| `GET` | `/reviews/pending` | List pending reviews. |
| `POST` | `/reviews/approve/:id` | Approve review by id. |

## File Upload Notes

- Avatar files are stored in `uploads/avatars`.
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`.
- Saved value in DB is URL-like path (for example `/uploads/avatars/<file>`).
- Existing avatar file is deleted after a successful avatar update.
- Static file serving for `/uploads` is not configured in current codebase.

## NPM Scripts

| Script | Description |
| --- | --- |
| `npm run start` | Start Nest application. |
| `npm run start:dev` | Start in watch mode. |
| `npm run start:prod` | Run compiled build from `dist`. |
| `npm run build` | Generate Prisma client and build Nest app. |
| `npm run lint` | Run ESLint with `--fix`. |
| `npm run test` | Run unit tests (`*.spec.ts` under `src`). |
| `npm run test:e2e` | Run e2e tests from `test/`. |

## Current Repository Status (as checked on 2026-03-30)

- `npm run lint` fails due current code issues (unused vars and unsafe typing in tests).
- `npm run test` returns "No tests found" (no unit tests in `src`).
- `npm run test:e2e` fails in current setup (`supertest` import / TS config mismatch).

## Notes

- Prisma client is generated into `src/generated/prisma`.
- Application port is currently fixed to `4000` in `src/main.ts`.
