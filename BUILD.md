# Building PumaGRC Standalone & Demo Versions

This document covers building the single-file offline HTML versions of PumaGRC. For general development, see the project README.

## Prerequisites

- Node.js 18+
- Dependencies installed: `npm install`

## Build Commands

### Standard Build (multi-file, for web server deployment)

```bash
npm run build
```

Output: `dist/` directory with standard Vite build artifacts.

### Standalone Build (single-file offline HTML)

```bash
npm run build:standalone
```

Output: `dist-standalone/index.html` (~3.7MB)

This produces a single HTML file with all JavaScript, CSS, fonts, and the favicon inlined. It can be opened directly in any browser via `file://` with no server required. All features are fully functional.

### Demo Build (single-file offline HTML with sample data)

```bash
npm run build:demo
```

Output: `dist-demo/index.html` (~3.9MB)

Same as the standalone build, plus:
- Pre-loaded with sample assessment data for NIST CSF 2.0, ISO 27001, and CMMC (including activity logs, compensating controls, and historical snapshots)
- Import, Export, and Reset functions are disabled
- A "Demo Mode" banner is displayed at the top
- Data resets to the original sample on every page refresh (session edits are allowed but not persisted)

## Troubleshooting

### TypeScript errors during build

The build scripts run `tsc -b` before `vite build`. If pre-existing type errors block the build, you can skip the type check and run Vite directly:

```bash
npx vite build --mode standalone
npx vite build --mode demo
```

### Fonts not inlining

The standalone and demo builds fetch Google Fonts at build time and inline them as base64. If the build machine has no internet access, the build still succeeds — the app falls back to system fonts (Inter -> system-ui -> sans-serif).

## How It Works

The three builds share the same codebase. Vite's `--mode` flag selects a build configuration:

- **`--mode production`** (default) — standard multi-file output
- **`--mode standalone`** — adds `vite-plugin-singlefile` to bundle everything into one HTML file, plus a custom plugin that inlines Google Fonts and the favicon
- **`--mode demo`** — same as standalone, plus sets a `__DEMO_MODE__` compile-time flag that enables demo data pre-loading and disables import/export/reset at the code level (dead-code-eliminated from non-demo builds)

Configuration lives in `vite.config.ts` and `.env.{production,standalone,demo}` files.
