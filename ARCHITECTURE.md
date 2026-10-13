# Architecture notes — RetryCraft

## Runtime
Static browser application. `index.html` loads only local `styles.css`, `core.js`, and `app.js`. No CDN, external font, backend, dependency install, or build step is required.

## Domain layer
`core.js` contains deterministic domain rules and exports them to both the browser global and CommonJS for dependency-free tests. Keep these rules free of DOM and browser-storage concerns.

## UI layer
`app.js` is responsible for rendering, browser events, and local demo state. All imported or user-provided text is escaped before inserting into HTML. Exports are generated with browser Blob URLs.

## Persistence and threat boundary
Browser storage is only a convenience for synthetic data, not a security boundary. Production replacement should move sensitive state to a server API with authentication, authorization, validation, audit trails, rate limits and monitoring.

## Production evolution
1. Define API contracts and invariants.
2. Persist domain state transactionally on the server.
3. Add authorization and audit requirements.
4. Add contract tests, integration tests and threat modeling.
5. Add telemetry, SLOs, operational runbooks and deployment controls.
