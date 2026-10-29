# AGENTS.md

## Tech stack

- **SvelteKit 3** + **Svelte 5** (runes mode) + **TypeScript 6**
- **Vite 8** with `@sveltejs/vite-plugin-svelte` 7
- **Tailwind CSS v4** via `@tailwindcss/vite` (forms + typography plugins)
- **`@amadeus-it-group/tansu`** for state management
- **Vitest 5** (Node + browser projects via Playwright); **Playwright** for e2e
- **`@sveltejs/adapter-static`** — prerendered static site
- **ESLint 10**, **Prettier 3**, **Stylelint 17**
- Requires **Node >= 22.17** (SvelteKit 3 minimum)

## Commands

- `npm run dev` — dev server
- `npm run check` — typecheck + lint (`svelte-kit sync && svelte-check && npm run lint`; `prepare` also syncs on install)
- `npm run check:fix` — autofix lint issues (`lint:fix` + `lint:css:fix`)
- `npm run lint` — `prettier --check . && eslint . && stylelint`
- `npm run lint:fix` — eslint autofix (cached)
- `npm run lint:css` / `lint:css:fix` — stylelint on `src/**/*.{css,svelte}`
- `npm run format` / `format:check` — prettier write / check
- `npm run tdd` — vitest (watch by default; use `npm run tdd -- --run` for one-shot)
- `npm run test:e2e` — playwright (spawns `npm run build && npm run preview` on port 4173; matches `**/*.e2e.{ts,js}`)
- `npm run test` — `tdd -- --run` then e2e

Verify with `npm run check` and `npm run lint` after changes.

## Layout

Two independent games, each fully self-contained under a route group (groups only affect URLs):

- `src/routes/(sherif)/sherif/` — "Shérif et bandit" board game (URL `/sherif`). Game data + grid live in `data.ts`, logic in `state.store.ts`, types in `types.ts`.
- `src/routes/(sur-le-toit)/sur-le-toit/` — 3D maze game (URL `/sur-le-toit`).
- `src/routes/(othello)/othello/` — Othello board game (URL `/othello`). Game logic in `code.ts`, tests in `code.spec.ts`.

## Conventions

- **State management uses `@amadeus-it-group/tansu`** (`writable`, `computed`, `batch`) in `state.store.ts` files — not Svelte stores or runes. `$`-suffixed names like `sherif$` are stores.
- **Runes mode is forced on** project-wide (except `node_modules`) via `compilerOptions.runes` in `vite.config.ts`.
- **No `svelte.config.js/ts` exists.** The static adapter and Tailwind v4 plugin are configured directly in `vite.config.ts` via `sveltekit({ adapter: adapter() })`. Tailwind v4 is CSS-first (no `tailwind.config`); the global stylesheet is `src/routes/layout.css` (also referenced by prettier).
- **Relative imports use explicit extensions** (e.g. `import type { Cell } from './types.ts'`) — `rewriteRelativeImportExtensions` is on.
- **Prettier style**: tabs, double quotes, `trailingComma: 'all'`, `bracketSpacing: false`, print width 100.

## Gotchas

- Vitest requires explicit assertions (`expect: { requireAssertions: true }`).
