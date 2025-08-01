# Project Brief

## Project Name
API Node SOLID - Gyms & Check-ins

## Goal
Build a backend API applying SOLID principles for user authentication, gym management, and user check-ins with domain constraints (distance and daily limits).

## Core Requirements
- User
  - Register a new user
  - Authenticate with email/password
  - Get user profile
- Gyms
  - Create gym with title, description, phone, latitude, longitude
  - List/search gyms (future)
- Check-ins
  - Perform a check-in at a gym
  - Validate maximum distance from user location to gym
  - Enforce maximum number of check-ins per user per day
- Errors and Domain Rules
  - InvalidCredentialsError
  - ResourceNotFoundError
  - MaxDistanceError
  - MaxNumberOfCheckInsError

## Architecture & Patterns
- Presentation: Fastify HTTP controllers and routes
- Application: Use-cases (per feature)
- Persistence: Repository pattern (in-memory for tests, Prisma for production)
- ORM: Prisma (PostgreSQL via docker-compose)
- Testing: Unit tests with in-memory repositories

## Non-Functional Requirements
- TypeScript codebase with ESLint
- Environment variables via .env (see .env.example)
- Deterministic business logic with unit tests (Vitest)
- Code structured by responsibility boundaries (use-cases, repositories, http, utils)

## Constraints & Assumptions
- PostgreSQL database (docker-compose.yml present)
- Prisma schema and migrations exist for users, gyms, check-ins, relationships
- JWT or session for auth can be added if required (not fully wired yet in http layer)

## Out of Scope (for now)
- Admin management UI
- Advanced search/filtering/pagination
- Analytics or reporting
- Email delivery
