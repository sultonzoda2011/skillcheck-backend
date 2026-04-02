# SkillCheck Backend

Backend API for **SkillCheck** — a platform for testing programming skills with AI-generated questions.

Built with **NestJS + Prisma + PostgreSQL + Google Gemini AI**.

## Features

- **Authentication** — JWT access token + refresh token (HTTP-only cookie)
- **Profile Management** — update profile info, avatar upload, password change
- **AI Quiz Engine** — generates unique questions using Google Gemini AI
  - Marathon mode (type + topic + difficulty)
  - Random mode (type + topic)
- **Quiz Topics** — dynamic configuration for test types, topics, and difficulty levels
- **Best Results & Leaderboard** — track personal bests and compete globally
- **Reviews System** — user reviews with admin moderation workflow
- **Admin Panel** — user management, block/unblock functionality

## Tech Stack

| Category | Technology |
| --- | --- |
| Runtime | Node.js 22+ |
| Language | TypeScript 5.7 |
| Framework | NestJS 11 |
| ORM | Prisma 7 (`@prisma/adapter-pg`) |
| Database | PostgreSQL |
| AI | Google Gemini (`@google/genai`) |
| Auth | JWT + Passport |
| Validation | class-validator, Zod |
| Docs | Swagger (`/api-docs`) |
| Deployment | Vercel |

## Module Overview

| Module | Description |
| --- | --- |
| `auth` | Register, login, forgot/reset password, refresh token, logout |
| `profile` | Get/update profile, change password, avatar upload |
| `best-results` | Personal bests, Top-15 and Top-5 leaderboards |
| `reviews` | Public reviews, create review, admin moderation |
| `admin` | List users, block/unblock users (ADMIN only) |
| `ai/marathon` | AI-generated questions for marathon mode |
| `ai/random` | AI-generated random questions |
| `quiz-topics` | Test types, topics, and difficulty configuration |
| `prisma` | Global Prisma service and DB connection lifecycle |

## Data Model (Prisma)

Main entities in `prisma/schema.prisma`:

| Entity | Description |
| --- | --- |
| `User` | Account data, role (`USER`/`ADMIN`), block status, profile picture |
| `BestResult` | Per-user best scores for Frontend, Backend, Mobile + total score |
| `Review` | User reviews with rating and moderation flag (`isApproved`) |
| `QuizTopic` | Test configuration: type, topic, difficulty, code languages |

## Environment Variables

Create a `.env` file in project root:

| Name | Required | Example | Description |
| --- | --- | --- | --- |
| `POSTGRES_USER` | yes | `root` | PostgreSQL user (Docker Compose) |
| `POSTGRES_PASSWORD` | yes | `123456` | PostgreSQL password (Docker Compose) |
| `POSTGRES_HOST` | yes | `localhost` | PostgreSQL host |
| `POSTGRES_PORT` | yes | `5432` | PostgreSQL port |
| `POSTGRES_DATABASE` | yes | `skillcheck-db` | PostgreSQL database name |
| `DATABASE_URL` | yes | `postgresql://...` | Main DB connection string (Prisma) |
| `DIRECT_URL` | optional | `postgresql://...` | Direct URL for Prisma migrations |
| `JWT_SECRET` | yes | `your-long-random-secret` | JWT signing secret (HS256) |
| `JWT_ACCESS_TOKEN_TTL` | yes | `2 h` | Access token lifetime |
| `JWT_REFRESH_TOKEN_TTL` | yes | `7 d` | Refresh token lifetime |
| `COOKIE_DOMAIN` | yes | `localhost` | Domain for `refreshToken` cookie (no protocol) |
| `NODE_ENV` | yes | `development` | Environment mode |
| `GEMINI_API_KEY` | yes | `AIza...` | Google Gemini API key for AI features |
| `PORT` | optional | `4000` | Server port (default: 4000) |
| `MAIL_HOST` | yes | `smtp.gmail.com` | SMTP host for sending emails |
| `MAIL_PORT` | yes | `587` | SMTP port |
| `MAIL_USER` | yes | `your-email@gmail.com` | SMTP username |
| `MAIL_PASS` | yes | `your-app-password` | SMTP password (Gmail App Password) |

## Local Development

### Prerequisites

- Node.js 22+
- Docker & Docker Compose
- Google Gemini API key

### Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Start PostgreSQL:**

```bash
docker compose up -d postgres
```

3. **Configure environment:**

```bash
cp .env.example .env
# Edit .env with your values
```

4. **Push schema to database:**

```bash
npx prisma db push
```

5. **Seed quiz topics (optional):**

```bash
node seed-topics.mjs
```

6. **Start development server:**

```bash
npm run start:dev
```

Server runs at `http://localhost:4000`.

## API Documentation

| URL | Description |
| --- | --- |
| `http://localhost:4000/api-docs` | Swagger UI |
| `http://localhost:4000/swagger/json` | OpenAPI JSON |
| `http://localhost:4000/swagger/yaml` | OpenAPI YAML |

## Authentication & Access Control

- Access token returned in response body
- Refresh token stored in HTTP-only cookie (`refreshToken`)
- Protected routes require `Authorization: Bearer <accessToken>`
- Admin routes protected by `JwtGuard` + `RolesGuard`
- User registered with email `admin@tjk.com` gets `ADMIN` role
- Blocked users cannot authenticate
- Password reset uses secure email-based flow (JWT token, 15 min expiry)

## Response Format

All endpoints return a standardized response:

```json
{
  "message": "Operation successful",
  "data": { ... },
  "status": 200
}
```

## API Endpoints

### Public Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/auth/register` | Register new user and return tokens |
| `POST` | `/auth/login` | Login and return tokens |
| `POST` | `/auth/refresh` | Refresh access token using cookie |
| `POST` | `/auth/forgot-password` | Send password reset email (15 min token) |
| `POST` | `/auth/reset-password` | Reset password using token from email |
| `POST` | `/auth/logout` | Clear refresh token cookie |
| `GET` | `/best-results/leaderboard` | Top 15 users by total score |
| `GET` | `/best-results/leaderboard-5` | Top 5 users (for widgets) |
| `GET` | `/reviews` | List approved reviews |
| `GET` | `/quiz-topics/types` | List available test types |
| `GET` | `/quiz-topics/topics?type=` | List topics for a test type |
| `GET` | `/quiz-topics/difficulties?type=&topic=` | List difficulty levels |
| `GET` | `/marathon/questions?type=&topic=&difficulty=` | Generate 10 AI marathon questions |
| `GET` | `/random/questions?type=&topic=` | Generate 10 AI random questions |

### Authenticated User Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/profile` | Get current user profile |
| `PATCH` | `/profile` | Update profile (multipart/form-data for avatar) |
| `POST` | `/profile/change-password` | Change password |
| `GET` | `/best-results/my-best` | Get own best results |
| `POST` | `/best-results/my-best` | Save/update best result |
| `POST` | `/reviews` | Create review (pending moderation) |

### Admin Only Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/admin/users` | List all users |
| `POST` | `/admin/user/status` | Block/unblock user |
| `GET` | `/reviews/pending` | List pending reviews |
| `POST` | `/reviews/approve/:id` | Approve review by ID |

## File Uploads

- Avatar files stored in `uploads/avatars/`
- Allowed formats: `image/jpeg`, `image/png`, `image/webp`
- Old avatar automatically deleted on update
- Path stored in DB: `/uploads/avatars/<filename>`

## NPM Scripts

| Script | Description |
| --- | --- |
| `npm run start` | Start NestJS application |
| `npm run start:dev` | Start in watch mode |
| `npm run start:debug` | Start with debugger |
| `npm run start:prod` | Run compiled build |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run e2e tests |
| `npm run test:cov` | Run tests with coverage |

## Deployment

### Vercel

The project is configured for Vercel deployment via `vercel.json`:

```bash
npm run vercel-build
```

**CORS Origins:**
- `http://localhost:3000` (development)
- `https://skillcheck.kavsaracademy.tj` (production)
- `*.vercel.app` (preview deployments)

## Project Structure

```
src/
├── admin/          # Admin user management
├── ai/             # AI question generation
│   ├── marathon/   # Marathon mode questions
│   └── random/     # Random mode questions
├── auth/           # Authentication & authorization
├── best-results/   # User scores & leaderboard
├── common/         # Shared guards, decorators, interceptors
├── config/         # JWT & Swagger configuration
├── generated/      # Prisma generated client
├── prisma/         # Prisma service
├── profile/        # User profile management
├── quiz-topics/    # Quiz configuration
├── reviews/        # User reviews & moderation
├── strategies/     # Passport JWT strategy
├── utils/          # Utility functions
├── app.module.ts   # Root module
└── main.ts         # Application entry point
```

## Notes

- Prisma client generated to `src/generated/prisma`
- Default port: `4000` (configurable via `PORT` env var)
- Quiz topics can be seeded using `seed-topics.mjs`
