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
  pages/     routes (index.astro)
  styles/    global.css (Tailwind entry)
public/      static assets served as-is
```
