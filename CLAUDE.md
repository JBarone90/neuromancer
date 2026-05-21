# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- Keep this file lean: it loads in full at the start of EVERY session. -->
<!-- Detailed, situational guidance lives in .claude/rules/ and only loads when relevant files are touched. -->

Personal website (neuromancer). Built with SvelteKit, statically prerendered, deployed to GitHub Pages. Hosts projects and, possibly, blog-style articles.

The Svelte MCP server is configured — see `.claude/rules/svelte.md` for tool usage instructions (`list-sections`, `get-documentation`, `svelte-autofixer`, `playground-link`).

## Stack

- SvelteKit 2 + Svelte 5 (runes)
- `@sveltejs/adapter-static` (whole site prerendered)
- TypeScript, Vite
- Hosted on GitHub Pages via GitHub Actions

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build to `build/` (run this before every commit)
- `npm run preview` — serve the production build locally
- `npm run check` — type + Svelte diagnostics

## How we work

- **Minimal iterations.** One small, self-contained change at a time. Don't scaffold features we haven't reached in PROJECT_PLAN.md.
- **Build before commit.** Always run `npm run build` locally and fix errors before committing. The deploy is static, so build failures = broken site.
- **Deploy works already.** The GitHub Actions pipeline is set up. Don't touch `.github/workflows/` or deploy config unless explicitly asked.
- **Commit messages.**
  - Use short, imperative messages (`add hero section`, not `added hero section`)
  - Prefix every commit with a type:
    - `feat:` new features
    - `fix:` bug fixes
    - `refactor:` code restructuring
    - `docs:` documentation
    - `chore:` maintenance/config/tooling
    - `style:` formatting/styling only
    - `test:` tests
  - Examples:
    - `feat: add hero section`
    - `fix: prevent navbar overflow`
    - `chore: update favicon assets`
  - Keep commit titles concise and lowercase
  - No trailing period
- Don't add dependencies without flagging why. Prefer the platform (CSS, Svelte built-ins) over libraries.
- **CSS: use Tachyons.** Tachyons is the preferred styling approach — utility classes directly in markup. Don't introduce other CSS frameworks.

## Repo map

- `src/routes/` — pages (file-based routing)
- `src/lib/` — reusable components and content data
- `static/` — assets served verbatim (favicon, images, `.nojekyll`)
- `svelte.config.js` — adapter + base path config
- `PROJECT_PLAN.md` — the iteration roadmap; check current phase before starting work

## Memory architecture (how guidance is organized here)

- This file = always-on, project-wide facts only.
- `@.claude/rules/svelte.md` = front-end conventions; **auto-loads only when editing Svelte/TS files.**
- Don't restate rule-file content here — that would defeat the point of keeping context lean.

## Don'ts

- No secrets, API keys, or runtime server logic — this is a static site (no server at runtime).
- No `localStorage`-dependent core features without a no-JS fallback.
