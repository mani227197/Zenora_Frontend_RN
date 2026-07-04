# ADR 0001: Use React Native CLI

## Status

Accepted

## Context

Zenora needs background location, geofencing, notification tap handling, native permissions, and CI/CD coverage across iOS and Android.

## Decision

Use a React Native CLI application instead of Expo.

## Consequences

The app can integrate native SDKs directly, own platform configuration, and demonstrate production mobile capabilities. The tradeoff is that dependency linking, native project maintenance, and build pipelines stay inside this repository.
