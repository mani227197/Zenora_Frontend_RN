# ADR 0002: Environment-Based API Configuration

## Status

Accepted

## Context

The backend currently runs locally, but mobile builds must switch between development, staging, QA, and production without touching feature code.

## Decision

Route all backend calls through `src/core/config` and `src/core/network`. Environment files define values such as `API_BASE_URL`, while application code consumes only `appConfig.apiBaseUrl`.

## Consequences

No feature module calls `localhost` or a hardcoded host directly. Build tooling can select the target environment, and tests can inject a config override through the DI container.
