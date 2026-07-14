# AGENTS.md

## Stack And Entry Points
- Single Angular 19 app, not a monorepo. `src/main.ts` bootstraps a standalone app through `src/app/app.config.ts`.
- Top-level routing lives in `src/app/app.routes.ts`: `authentication/*` uses the blank layout, everything else uses the full layout plus `isAuthGuard` and `permissionGuard`.
- Most feature pages are lazy standalone components under `src/app/pages/dashboard/**` via `loadComponent`.

## Commands
- Use Node `v22.14.0` from `.nvmrc` when you need repo-consistent behavior.
- Install with `npm install`.
- Dev server: `npm start`.
- Production-style verification: `npm run build`.
- Development watch build: `npm run watch`.
- Regenerate GraphQL client types/services: `npm run generate`.

## Verification Reality
- There is no lint script and no dedicated typecheck script. `npm run build` is the main verification step because it catches TypeScript, Angular template, and bundling errors.
- `npm test -- --watch=false` currently fails with `TS18003` because the repo has no `src/**/*.spec.ts` files.
- `angular.json` test config also points to `src/styles.scss`, but the repo styles live under `src/styles/`; if you introduce Karma specs, fix that test style path first.

## GraphQL Workflow
- GraphQL operations live in `src/app/graphql/*.graphql`.
- `src/app/graphql/generated.ts` is generated code. Edit the `.graphql` documents, then run `npm run generate`.
- Codegen reads `src/environments/environment.development.ts`, so it expects the API schema at `http://localhost:4000/graphql` unless you change that file.
- Apollo client setup is in `src/app/graphql/config-client.ts` and uses `environment.graphqlUri`.

## Repo Conventions That Are Easy To Miss
- Path aliases in `tsconfig.json` are used heavily. `@components/*` resolves to both `src/app/components/*` and `src/app/layouts/*`, so layout imports also come through `@components/...`.
- Sidebar/navigation metadata is separate from Angular route registration. When adding or renaming pages, update both the router config and `src/app/routes/routes-data.ts` if the page should appear in navigation or carry permissions.
- Global session, branch, cycle, activity, enrollment, and student state is persisted in `GlobalStateService` using `sessionStorage` and `localStorage`; avoid introducing parallel storage keys.
- App-wide date and decimal behavior is initialized in `src/app/app.component.ts`: `date-fns` locale is Spanish and `decimal.js` precision/rounding are set globally.

## Styles And Assets
- Components default to `scss` via `angular.json` schematics.
- Global styles are split across Angular Material theming in `src/styles/material.scss` and Tailwind v4 import/theme config in `src/styles/tailwind.css`.
- The build copies `public/**` and `@mdi/angular-material/mdi.svg`; SVG icon registration happens in `AppComponent`.
