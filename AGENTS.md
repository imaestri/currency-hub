# AGENTS.md

## Project Overview

CurrencyHub is a frontend study project for exchange-rate flows built with React, TypeScript and Vite. The app consumes Frankfurter data, organizes code by feature/domain, persists favorites with Zustand, and uses functional tests with Vitest.

This file is intended to help engineers and coding agents make changes without fighting the existing architecture.

## Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- React Hook Form
- Tailwind CSS
- shadcn/ui
- Recharts
- Vitest + React Testing Library + MSW

## Runbook

Install dependencies:

```bash
npm install
```

Development:

```bash
npm run dev
```

Validation:

```bash
npm run lint
npm run test
npm run build
```

## Environment

The app reads the Frankfurter base URL from:

```bash
VITE_FRANKFURTER_API_BASE_URL=https://api.frankfurter.dev/v1
```

Use `.env.local` for local overrides. The GitHub Actions workflow also injects this variable.

## Architecture

The project uses a feature-based structure, not Feature-Sliced Design.

```text
src/
  app/                 # global app setup
  components/
    shared/            # layout/shared presentational pieces
    ui/                # shadcn/ui primitives
  features/
    rates/
      components/      # feature UI
      hooks/           # React Query/form hooks
      lib/             # feature-local pure helpers
      services/        # API calls and response shaping
      store/           # Zustand client state
      types/           # domain types
  lib/
    hooks/             # app-generic hooks
    utils/             # app-generic helpers
  pages/               # route entry points only
  test/                # test helpers, server, mocks
```

## Feature Mental Model

A feature should be treated as a self-contained vertical slice.

When implementing something new in `rates`:

1. Start from the user interaction (UI)
2. Move logic into a feature hook
3. Fetch via a service
4. Normalize data into domain types
5. Render using dumb components

Avoid jumping layers or skipping steps.

## Layer Rules

- `pages/` should stay thin. They compose screens and route-level boundaries, but should not own business logic.
- `components/` must not call APIs directly.
- `hooks/` are the place for React Query usage, form state, and orchestration logic.
- `services/` handle remote calls and map external responses into domain shapes.
- `store/` is only for client state that should outlive a single component tree. Today this is mainly favorites.
- `lib/` should contain pure helpers or generic hooks, not hidden business workflows.
- Avoid cross-feature imports. Everything currency/rates-related should stay inside `features/rates`.

## Current Domain Model

The main feature is `rates`.

Important behaviors already in the app:

- currency directory at `/currencies`
- currency detail at `/currencies/:code`
- dashboard at `/`
- favorites persisted with Zustand + localStorage
- favorite spotlight in the header
- dynamic `document.title` based on the highlighted favorite
- Frankfurter-backed list and detail data

## Routing

Routes are configured under `src/app/router`.

Current route shape:

- `/` -> dashboard
- `/currencies` -> currencies list
- `/currencies/:code` -> currency detail
- `*` -> not found

Keep route components simple and push real screen behavior down into feature components.

## Data Flow Expectations

Preferred flow:

1. page renders feature component
2. feature hook calls React Query
3. service fetches external data
4. component renders data
5. Zustand is used only for client-driven state such as favorites

Do not move Frankfurter fetches into UI components.

## State Management

Use TanStack Query for:

- server data
- caching
- suspense queries
- async status

Use Zustand for:

- user preferences
- favorites
- state shared across distant parts of the UI

Do not duplicate server data into Zustand unless there is a very strong reason.

## Testing Guidance

Tests intentionally focus on visible functionality rather than implementation details.

Current test stack:

- Vitest
- React Testing Library
- user-event
- jsdom
- MSW

Test infrastructure lives in `src/test`:

- `setup.ts` for global test setup
- `server.ts` for the MSW server
- `mocks/handlers.ts` for Frankfurter mocks
- `render-with-providers.tsx` for Query Client + Router test rendering

When adding tests:

- prefer user-visible assertions over snapshots
- prefer MSW over mocking service internals
- reset or isolate global state when needed
- cover critical flows first

## CI/CD

GitHub Actions workflow:

- `quality` runs `lint`, `test`, and `build`
- `github-pages-build` prepares the Pages artifact on `main`/`master`
- `github-pages-deploy` publishes to GitHub Pages on `main`/`master`

`develop` runs CI only and does not deploy.

## GitHub Pages Note

`vite.config.ts` sets `base` dynamically for GitHub Pages when running in GitHub Actions. Do not hardcode a repo path in application code unless the deployment strategy changes.

## Practical Do/Don't

Do:

- use `@/` imports
- keep feature logic inside `features/rates`
- add tests for user-facing behavior when changing flows
- run `npm run lint`, `npm run test`, and `npm run build` before merging meaningful changes

Don't:

- reintroduce `entities`, `widgets`, or `shared` as FSD layers
- fetch directly inside components
- put route logic and feature logic together inside `pages/`
- add abstraction layers without a real second use case
- treat the store as a general-purpose cache
- Do not call React Query directly inside components
- Do not store API responses in Zustand
- Do not create global utils for feature-specific logic
- Do not bypass services to fetch data
- Do not introduce new architectural layers


## When Changing the Frankfurter Integration

Be careful with:

- API shape mapping in `services`
- which currencies are safe to show in the list
- rate inversion logic used to display BRL-relative values
- test mocks in `src/test/mocks/handlers.ts`

If you change the service contract, update tests and UI expectations together.


## Naming Conventions

- hooks: useXxx (e.g. useRates, useCurrencyDetail)
- services: xxx.service.ts
- types: xxx.types.ts
- components: PascalCase
- test files: *.test.tsx


 ## Testing Philosophy

- Test behavior, not implementation
- Avoid testing internal hooks directly
- Prefer integration-style tests via UI
- Mock network using MSW only


## Purpose of This File

This file defines how both humans and AI agents should reason about, modify, and extend the codebase.
If something here conflicts with implementation, prefer updating this file first, then refactoring the code.

