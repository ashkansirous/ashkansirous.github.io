# CLAUDE.md — ashkansirous.github.io

Project-specific guidance for this repository. Global instructions in `~/.claude/CLAUDE.md`
still apply.

## What this is

Ashkan Sirous's personal website — a professional presence presenting who he is and his
work. Static site built with Astro and deployed to GitHub Pages at `ashkansirous.github.io`.

## Stack

- **Astro + TypeScript + Tailwind CSS v4** (Tailwind via the official `@tailwindcss/vite`
  plugin; CSS entry is `src/styles/global.css` with `@import "tailwindcss"`).
- Static output only — **no backend, no server-rendered routes** (GitHub Pages constraint).
- Deploy via `.github/workflows/deploy.yml` (`withastro/action`) on push to `main`.

## Conventions

- This is a **user-pages** site served at the apex — `astro.config.mjs` sets `site` but
  **no `base`** (that's only for project pages).
- `Layout.astro` owns `<head>`, meta/OG tags, and the page shell. Pages stay thin.
- Always query **context7** before touching Astro / Tailwind / Pages config — versions move.
- The design system is authored in **Claude Design** (claude.ai/design) and synced via
  `/design-sync`. Keep the local component library in sync incrementally — never wholesale.
- Content must be accurate and verifiable. Don't invent metrics, dates, or scope.

## Shipped products vs. Open source

Two distinct sections cover finished work, and they must not be conflated:

- **`ShippedProducts.astro`** ("Things I've shipped") — hand-curated, real-world
  products regardless of source visibility. Covers apps with a private repo
  (e.g. Lets-Call-Mom) that have no public GitHub metadata to pull. Update this
  file by hand when a product's capabilities change materially.
- **`Projects.astro`** ("Open source" / "Public projects") — strictly public,
  owned GitHub repos, fetched live at build time. Never add a private-repo entry
  here — its "View repo →" link would 404 for visitors, and the "pulled from
  GitHub" copy would be false for it.

A product that is both shipped *and* open source (e.g. ReadTheStupidText) may
appear in both sections — that overlap is fine.

## Featured-projects selection rubric

The "public projects" section is built from GitHub. When (re)building it, pull all
**owned, non-fork** repos and:

- **Feature** a repo only if it has a README **and** (active within ~12 months **or** has
  stars/external engagement) **and** isn't a throwaway demo.
- **Auto-tag state**: `Active` / `WIP` (open `plan/` branch or scaffold-stage commits) /
  `Experiment` / `Archived`. Always show an honest status badge.
- **Forks** with real upstream PRs → "Contributions" strip, never featured projects.
- As a repo matures, a re-run promotes it automatically.

## Project structure

```
src/
  layouts/   shared page shells (Layout.astro)
  lib/       shared data: site.ts (title, employer, email, CV URL — single source), github.ts
  pages/     routes (index.astro)
  styles/    global.css (Tailwind entry)
public/      static assets served as-is
```
