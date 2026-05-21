# neuromancer

Jacopo Barone's personal website. Home for projects and, possibly, blog-style articles. Statically prerendered and deployed to GitHub Pages.

## Stack

- SvelteKit 2 + Svelte 5 (runes mode)
- `@sveltejs/adapter-static` — full prerender to plain files
- TypeScript, Vite
- GitHub Pages via GitHub Actions

## Commands

```sh
npm run dev       # local dev server
npm run build     # production build to build/
npm run preview   # serve the production build at localhost:4173
npm run check     # type + Svelte diagnostics
```

Always run `npm run build` and fix any errors before committing — a build failure breaks the deploy.

## Project structure

```text
src/routes/     pages (file-based routing)
src/lib/        reusable components and content data
static/         assets served verbatim (favicon, .nojekyll)
```