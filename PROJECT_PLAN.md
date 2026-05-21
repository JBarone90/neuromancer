# neuromancer — plan & setup

## Guiding principle: deploy first, then build

The biggest source of wasted iterations on static sites is discovering deploy/base-path problems _after_ building everything. So Phase 0 ships a near-empty site to GitHub Pages and confirms the whole pipeline works. Every later phase is a small, independently-shippable slice.

## Iteration roadmap

- **Phase 0 — Skeleton + green deploy.** Scaffold, add adapter-static + the deploy workflow, push, confirm a "hello" page is live on Pages. Nothing else.
- **Phase 1 — Shell.** Root layout, nav, footer, global styles/tokens, responsive container. Still placeholder content.
- **Phase 2 — Home.** Hero + short intro/about. This is the page that matters most; get it right.
- **Phase 3 — Projects.** A `projects` data array in `src/lib/content/` rendered by one card component. Adding a project = appending to the array.
- **Phase 4 — Polish.** Responsive pass, accessibility pass (`npm run check`), meta tags / Open Graph, favicon, 404 page.
- **Phase 5 (optional) — Writing.** Add `mdsvex` for markdown posts only if you actually want a blog.

Work one phase per session/branch. Don't pull work forward.

## One-time setup

Run these locally. A user-site repo (`<username>.github.io`) is simplest — it serves from `/` and avoids base-path issues entirely. A normal project repo also works (the config handles it).

```bash
# 1. Scaffold (the current Svelte CLI). Choose: SvelteKit minimal, TypeScript.
npx sv create neuromancer
cd neuromancer

# 2. Static adapter for prerendering to plain files
npm install -D @sveltejs/adapter-static

# 3. Drop in the provided files (adjust paths to your machine):
#    - CLAUDE.md                     -> repo root
#    - .claude/rules/svelte.md       -> repo .claude/rules/
#    - .claude/rules/deployment.md   -> repo .claude/rules/
#    - .github/workflows/deploy.yml  -> repo .github/workflows/
#    - PROJECT_PLAN.md               -> repo root
touch static/.nojekyll
```

Then make the three config edits described in `.claude/rules/deployment.md`:

1. Use `adapter-static` in `svelte.config.js` and set `paths.base = process.env.BASE_PATH || ''`.
2. Create `src/routes/+layout.ts` exporting `prerender = true` and `trailingSlash = 'always'`.
3. Verify with `npm run build` then `npm run preview`.

Finally, on GitHub:

```bash
git init && git add -A && git commit -m "scaffold neuromancer"
# create the repo on GitHub, then:
git remote add origin <your-repo-url>
git push -u origin main
```

In the repo: **Settings → Pages → Source → GitHub Actions.** The push triggers `deploy.yml`.

## Using Claude Code from here

- Run `claude` in the repo root. Run `/init` once — it inspects the project and proposes additions to `CLAUDE.md` (it won't overwrite). Set `CLAUDE_CODE_NEW_INIT=1` first for the interactive flow.
- Start each session by telling Claude which PROJECT_PLAN phase you're on.
- `/memory` lists every instruction file currently loaded — use it to confirm the rule files are picked up when you edit Svelte vs config files.
