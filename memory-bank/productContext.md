# Product Context

## Why This Project Exists
Provide a reliable backend for a fitness/gyms application where users can register, authenticate, find gyms, and perform check-ins subject to domain constraints like distance and daily limits. The aim is to model clear business rules using SOLID principles for maintainability and testability.

## Users and Stakeholders
- End Users: Individuals who want to check in at gyms.
- Gym Admins/Operators (future): Manage gyms data.
- Developers: Need a clean architecture to extend features safely.

## Primary User Flows
1. Registration: A user creates an account with email/password.
2. Authentication: The user logs in to obtain credentials (e.g., JWT/session) for protected actions.
3. Profile: The user retrieves their own profile for client display.
4. Create Gym (likely admin or trusted role): Add new gyms with metadata and location (lat/lng).
5. Check-in: The user checks in at a nearby gym, validated by distance and daily frequency constraints.

## Domain Rules and Constraints
- Distance Constraint: A check-in must be within a maximum distance threshold from the gym (see MaxDistanceError).
- Daily Check-in Limit: A user can only check in a limited number of times per day (typically once) to the same gym or per constraints (MaxNumberOfCheckInsError).
- Authentication: Protected actions require valid credentials (InvalidCredentialsError). Resource lookups must be validated (ResourceNotFoundError).
- Location Calculations: Use a deterministic, tested utility to compute distances between coordinates.

## Product Goals
- Consistency: Predictable behavior and explicit error cases.
- Reliability: Strong test coverage of use-cases to ensure domain rules remain intact while evolving the system.
- Extensibility: Clear separation of concerns to add features like searching gyms, pagination, or admin tools without breaking core flows.

## Success Criteria
- All core use-cases (register, authenticate, get profile, create gym, check-in) implemented with repository abstractions.
- Domain errors are returned consistently from the application layer.
- Unit tests validate core invariants and edge cases.

## Future Considerations
- Gym search and discovery with pagination and filtering.
- Admin roles/permissions.
- Enhanced analytics on check-ins and gym usage.
- Geofencing rules refinement and configurable thresholds.
