# System Patterns

## Architecture Overview
- Entry layer: Fastify HTTP server (src/app.ts, src/server.ts) with routes and controllers in src/http
- Application layer: Use-cases encapsulating business rules in src/use-cases
- Data access layer: Repositories abstract persistence in src/repositories with:
  - In-memory implementations for unit tests
  - Prisma implementations for production (users present; gyms/check-ins pending)
- Persistence: Prisma ORM with PostgreSQL, migrations under prisma/migrations
- Utilities: Pure functions for domain helpers (e.g., distance calculation)

Flow:
HTTP Controller -> Use-case -> Repository -> Prisma/Memory

## Key Design Patterns
- Repository Pattern: Interface per aggregate (UsersRepository, GymsRepository, CheckInsRepository) with multiple implementations (in-memory, prisma)
- Dependency Inversion: Use-cases depend on repository interfaces, not concrete DB
- Factory Pattern: make-*.ts to assemble use-cases with concrete repositories for runtime
- Error-as-Result Domain Errors: Specific error classes (InvalidCredentialsError, ResourceNotFoundError, MaxDistanceError, MaxNumberOfCheckInsError) to signal rule violations
- Pure Utility Functions: Deterministic domain computations isolated in src/utils

## Components and Relationships
- Controllers (e.g., http/controllers/register.ts, authenticate.ts)
  - Parse/validate input
  - Invoke corresponding use-case
  - Translate domain errors to HTTP responses
- Use-cases (authenticate, register, create-gym, check-in, get-user-profile)
  - Orchestrate domain logic and validation
  - Call repositories
  - Throw domain errors as needed
- Repositories
  - users-repository.ts
  - gyms-repository.ts
  - check-ins-repository.ts
  - In-memory and Prisma variants map between domain models and DB
- Prisma
  - prisma/schema.prisma aligns with migrations for users, gyms, check-ins, relationships

## Critical Implementation Paths
1) Authentication
   - Controller -> AuthenticateUseCase -> UsersRepository.findByEmail
   - Password verification, return user or throw InvalidCredentialsError
2) Registration
   - Controller -> RegisterUseCase -> UsersRepository.create
   - Handle unique email, throw UserAlreadyExistsError
3) Get User Profile
   - Use-case -> UsersRepository.findById
   - Throw ResourceNotFoundError if missing
4) Create Gym
   - Use-case -> GymsRepository.create
   - Store coordinates and metadata
5) Check-in
   - Use-case -> CheckInsRepository + GymsRepository
   - Load gym, compute distance via utils/get-distance-between-coordinates
   - Enforce max daily check-ins (same day), enforce max distance
   - Persist check-in or throw MaxDistanceError / MaxNumberOfCheckInsError

## Error Handling Strategy
- Domain errors thrown from use-cases
- Controllers map errors to appropriate HTTP statuses:
  - 400/401 InvalidCredentialsError
  - 404 ResourceNotFoundError
  - 400/403 MaxDistanceError / MaxNumberOfCheckInsError
- Unknown errors bubble to global error handler

## Testing Strategy
- Unit tests focus on use-cases with in-memory repositories (Vitest)
- Arrange: seed in-memory repos
- Act: invoke use-case
- Assert: outputs and thrown domain errors
- Distance and date boundary conditions covered

## Important Conventions
- File naming aligns with feature scope (use-cases/*, repositories/*, http/controllers/*)
- Keep use-cases small and cohesive
- Repositories hide Prisma specifics from application layer
- Utility functions stay side-effect free

## Known Refactors To Track
- Filenames typos:
  - src/repositories/in-memory/in-memory-gyms-repositoy.ts -> in-memory-gyms-repository.ts
  - src/use-cases/errors/max-rumber-of-check-ins-error.ts -> max-number-of-check-ins-error.ts
- Add Prisma implementations for Gyms and Check-ins repositories
- Add controllers/routes for gyms and check-ins
