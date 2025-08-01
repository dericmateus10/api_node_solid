# Active Context

## Current Focus
Initialize the Memory Bank for the project to ensure continuity across sessions and document the system’s intent, architecture, and progress.

## Recent Changes
- Created core Memory Bank documents:
  - projectbrief.md
  - productContext.md
  - systemPatterns.md
  - techContext.md

## Next Steps
- Add remaining Memory Bank file: progress.md tracking current status and known issues.
- Audit repository implementations:
  - Implement Prisma repositories for Gyms and Check-ins.
  - Fix filename typos to maintain consistency.
- Expand HTTP layer:
  - Controllers and routes for gyms (create/search) and check-ins.
  - Map domain errors to HTTP responses consistently.
- Validate package.json scripts and document exact commands in techContext.md.
- Ensure test suite is green; expand tests for distance and daily check-in constraints.

## Decisions and Preferences
- SOLID architecture with use-case centric application layer.
- Repository pattern with in-memory implementations for tests and Prisma for production.
- Domain errors represented by specific error classes to keep flows explicit.
- Pure utility functions for deterministic domain calculations (distance).

## Important Patterns
- Use-case factories (make-*.ts) to wire app dependencies at runtime.
- Controllers slimmed to validation, orchestration and error mapping.
- Unit tests operate on in-memory repos for speed and determinism.

## Risks and Considerations
- File naming inconsistencies can cause import issues (typos identified).
- Missing Prisma repositories for gyms/check-ins can block HTTP layer features.
- Auth strategy at HTTP layer (JWT/session) must align with authenticate use-case output.

## Working Assumptions
- PostgreSQL via docker-compose; Prisma migrations already created for core entities.
- Fastify as the HTTP server; environment variables loaded from .env.
- Vitest for unit tests.

## Short-Term Checklist
- [ ] Create progress.md with status, known issues, and roadmap.
- [ ] Implement prisma repositories for gyms and check-ins.
- [ ] Add controllers and routes for gyms and check-ins.
- [ ] Confirm and document npm scripts from package.json in techContext.md.
- [ ] Resolve typos in filenames and references.
