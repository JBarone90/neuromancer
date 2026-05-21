---
paths:
  - "svelte.config.js"
  - ".github/workflows/*"
  - "src/routes/+layout.ts"
---

# Deployment configuration

This site uses `@sveltejs/adapter-static` for full prerendering and deploys to GitHub Pages via GitHub Actions.

## Three required config edits (one-time setup)

### 1. `svelte.config.js` — use adapter-static with base path

```js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.BASE_PATH || ''
    }
  }
};

export default config;
```

`BASE_PATH` is injected by the GitHub Actions workflow for project repos (e.g. `/jb-website`). For a user-site repo (`<username>.github.io`) it stays empty — no base path needed.

### 2. `src/routes/+layout.ts` — enable prerendering site-wide

```ts
export const prerender = true;
export const trailingSlash = 'always';
```

`trailingSlash = 'always'` is required by adapter-static so every route resolves to `index.html` in its own directory.

### 3. `static/.nojekyll` — prevent Jekyll stripping `_` prefixed files

```bash
touch static/.nojekyll
```

GitHub Pages runs Jekyll by default and strips files starting with `_` (including SvelteKit's `_app/` bundle). This empty file disables that.

## GitHub Actions workflow

The deploy workflow lives at `.github/workflows/deploy.yml`. **Do not touch it** unless explicitly asked. It:
1. Runs `npm run build` with `BASE_PATH` set to the repo name (for project repos)
2. Uploads the `build/` directory as a Pages artifact
3. Deploys via the `actions/deploy-pages` action

## Verify before committing

```bash
npm run build   # must produce build/ with no errors
npm run preview # spot-check at localhost:4173
```

A build failure = broken deploy. Always fix build errors locally before pushing.
