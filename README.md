# ashkansirous.github.io

Personal website for Ashkan Sirous — Staff Software Engineer (C#/.NET, Azure, distributed
systems, enterprise AI infrastructure). A professional, evergreen presence optimised for
future Staff/Principal opportunities.

Built with **Astro + TypeScript + Tailwind CSS v4**, deployed to **GitHub Pages**.

## Local development

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:4321
npm run build    # produce the static site in ./dist
npm run preview  # preview the production build locally
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds with the official
`withastro/action` and publishes to GitHub Pages. The live site is
[ashkan.sirous.uk](https://ashkan.sirous.uk) (custom domain; `sirous.uk` 301-redirects to it
via Cloudflare). The GitHub Pages URL `ashkansirous.github.io` also resolves.

> One-time GitHub setup: repo **Settings → Pages → Build and deployment → Source = GitHub Actions**,
> custom domain `ashkan.sirous.uk` (in `public/CNAME`), **Enforce HTTPS** on.
> Cloudflare: keep `ashkan.sirous.uk` **DNS-only** (grey cloud) so GitHub can issue the cert;
> redirect `sirous.uk` → `https://ashkan.sirous.uk`.

## Project structure

```
src/
  layouts/   shared page shells (Layout.astro)
  pages/     routes (index.astro)
  styles/    global.css (Tailwind entry)
public/      static assets served as-is
```

## Planning

- [`scope.md`](./scope.md) — lightweight goals/approach.
- [`plan.md`](./plan.md) — full build plan, vertical slices, and the repeatable
  GitHub repo-selection rubric.

See [`CLAUDE.md`](./CLAUDE.md) for project-specific conventions.
