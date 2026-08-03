# AGENTS.md

## Commands

- `npm run dev` — dev server
- `npm run check` — svelte-check typecheck (`svelte-kit sync` runs first; `prepare` script also syncs on install)
- `npm run lint` — `prettier --check . && eslint .`
- `npm run format` — `prettier --write .`
- `npm run test:unit` — vitest (watch by default; use `npm run test:unit -- --run` for one-shot)
- `npm run test:e2e` — playwright (spawns `npm run build && npm run preview` on port 4173; matches `**/*.e2e.{ts,js}`)
- `npm run test` — `test:unit -- --run` then e2e

Verify with `npm run check` and `npm run lint` after changes.

## Layout

Two independent games, each fully self-contained under a route group (groups only affect URLs):
- `src/routes/(sherif)/sherif/` — "Shérif et bandit" board game (URL `/sherif`). Game data + grid live in `data.ts`, logic in `state.store.ts`, types in `types.ts`.
- `src/routes/(sur-le-toit)/sur-le-toit/` — 3D maze game (URL `/sur-le-toit`). Includes a legacy `old/` folder.

## Conventions

- **State management uses `@amadeus-it-group/tansu`** (`writable`, `computed`, `batch`) in `state.store.ts` files — not Svelte stores or runes. `$`-suffixed names like `sherif$` are stores.
- **Runes mode is forced on** project-wide (except `node_modules`) via `compilerOptions.runes` in `vite.config.ts`.
- **No `svelte.config.js/ts` exists.** The static adapter and Tailwind v4 plugin are configured directly in `vite.config.ts` via `sveltekit({ adapter: adapter() })`. Tailwind v4 is CSS-first (no `tailwind.config`); the global stylesheet is `src/routes/layout.css` (also referenced by prettier).
- **Relative imports use explicit extensions** (e.g. `import type { Cell } from './types.ts'`) — `rewriteRelativeImportExtensions` is on.
- **Prettier style**: tabs, single quotes, `trailingComma: 'none'`, print width 100.

## Gotchas

- `npm run check` currently reports ~133 errors in `src/routes/(sur-le-toit)/sur-le-toit/solve-maze.js` and `old/` files. These are pre-existing/legacy; do not treat them as your change's failures.
- Vitest requires explicit assertions (`expect: { requireAssertions: true }`).
