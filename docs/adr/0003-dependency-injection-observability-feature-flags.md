# ADR 0003: Dependency Injection, Observability, and Feature Flags

## Status

Accepted

## Context

Location, notification, storage, analytics, crash reporting, and networking providers are likely to change as the app matures.

## Decision

Expose app services through interfaces and compose them in `src/core/di`. Add no-op analytics and crash reporters by default, a logger abstraction, and a typed feature flag service.

## Consequences

Features can be tested with mocks, production SDKs can be introduced without rewriting modules, and risky native capabilities such as geofencing can be rolled out behind flags.
