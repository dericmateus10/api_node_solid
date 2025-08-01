# Tech Context

## Stack
- Runtime: Node.js (TypeScript)
- Web Framework: Fastify
- ORM: Prisma
- Database: PostgreSQL (docker-compose.yml provided)
- Testing: Vitest
- Linting: ESLint
- Build/Tooling: ts-node/tsup/tsc (per tsconfig), Vite config present (likely for consistency or future client)
- Package Manager: npm (package-lock.json present)

## Project Structure Highlights
- src/app.ts, src/server.ts: Fastify bootstrap and server entry
- src/http/: Routes and controllers
- src/use-cases/: Application layer with business logic
- src/repositories/: Repository interfaces and implementations
  - in-memory/ for unit tests
  - prisma/ for DB-backed implementations (users implemented; gyms/check-ins pending)
- src/utils/: Pure helpers (e.g., get-distance-between-coordinates.ts)
- prisma/schema.prisma and prisma/migrations/: Database schema and history

## Environment
- .env.example provided; expects environment variables for DB and application
- Linux 5.15, default shell fish on the development machine

## Dependencies and Setup
- Prisma requires:
  - Setting DATABASE_URL in .env
  - npx prisma generate
  - npx prisma migrate deploy (or migrate dev in local)
- Docker-compose for Postgres:
  - Start DB before running app (docker-compose up -d db or the defined service)

## Commands (expected)
- dev: Start Fastify server in watch mode
- test: Run Vitest test suite
- build: Compile TypeScript
(Exact scripts should be verified in package.json when needed.)

## Conventions
- SOLID-aligned use-case structure
- Repository pattern for persistence abstraction
- Domain errors represented as dedicated classes
- In-memory repositories for unit tests to keep tests fast and deterministic

## Technical Constraints
- Keep use-cases side-effect free except through repository interfaces
- Distance calculations must be deterministic and unit tested
- Ensure date-sensitive logic (daily check-ins) relies on testable time sources when possible

## Open Technical Items
- Implement Prisma repositories for gyms and check-ins
- Expand HTTP routes/controllers for gyms and check-ins
- Decide and implement auth strategy at HTTP layer (JWT, session) aligning with authenticate use-case
