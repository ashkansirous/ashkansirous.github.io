# CLAUDE.md — ashkansirous.github.io

Project-specific guidance. Global instructions in `~/.claude/CLAUDE.md` still apply.

## What this is

Ashkan Sirous's personal website — a professional, evergreen presence optimised for
**future job leverage** (next Staff/Principal move). Static site on GitHub Pages at
`ashkansirous.github.io`. See `scope.md` and `plan.md` at the repo root for goals and the
build slices.

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
- Design system is authored in **Claude Design** (claude.ai/design) and synced via
  `/design-sync`. Keep the local component library in sync incrementally — never wholesale.

## Honest-framing guardrails (from the master context)

Everything on the site must be truthful and defensible in an interview:

- Primary stack is **C#/.NET/Azure**. Do **not** claim Python/Go/Ruby production, GPU/ML
  serving, chaos engineering, or packet-level networking.
- Frontend React/TS = working level — keep low-key.
- Open source: "**contributor**", not "active contributor".
- The 250GB DB story = diagnosis/remediation **judgment**, not "large-scale".
- Never use the phrase "access control". No invented metrics/dates/scope. No SLO/KPI claims.

## Repeatable GitHub repo-selection rubric

When (re)building the public-projects section, pull all **owned, non-fork** repos and:

- **Feature** a repo only if it has a README **and** (active within ~12 months **or** has
  stars/external engagement) **and** isn't a throwaway demo.
- **Auto-tag state**: `Active` / `WIP` (open `plan/` branch or scaffold-stage commits) /
  `Experiment` / `Archived`. Always show an honest status badge.
- **Forks** with real upstream PRs → "Contributions" strip, never case studies.
- As a repo matures, a re-run promotes it automatically.
