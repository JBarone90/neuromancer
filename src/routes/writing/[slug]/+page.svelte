<script lang="ts">
	import { base } from '$app/paths';
	import type { Component } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const PostContent = $derived(data.content as unknown as Component);

	function formatDate(iso: string) {
		return new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>{data.meta.title} — neuromancer</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:title" content="{data.meta.title} — neuromancer" />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:type" content="article" />
</svelte:head>

<article class="flex flex-column" style="gap: 2.5rem; padding-bottom: 4rem;">
	<header class="flex flex-column anim-1" style="gap: 0.75rem;">
		<a href="{base}/writing/" class="f7 theme-muted font-mono back-link" style="align-self: flex-start;">← writing</a>
		<h1 class="f3 fw6 ma0 lh-title" style="max-width: 36ch;">{data.meta.title}</h1>
		<div class="flex flex-wrap items-center" style="gap: 0.75rem;">
			<span class="f7 theme-muted font-mono">{formatDate(data.meta.date)}</span>
			{#each data.meta.tags as tag (tag)}
				<span class="f7 font-mono ba b--theme-border pv1 ph2 theme-muted">{tag}</span>
			{/each}
		</div>
	</header>

	<div class="prose anim-2">
		<PostContent />
	</div>
</article>

<style>
	@keyframes fadeUp {
		from { opacity: 0; transform: translateY(20px); }
		to   { opacity: 1; transform: translateY(0); }
	}
	.anim-1 { animation: fadeUp 0.5s cubic-bezier(0.33, 1, 0.68, 1) 0.1s both; }
	.anim-2 { animation: fadeUp 0.5s cubic-bezier(0.33, 1, 0.68, 1) 0.25s both; }

	.back-link { transition: color 0.15s ease; }
	.back-link:hover { color: var(--color-accent); }

	/* Prose styles for mdsvex-rendered markdown */
	.prose :global(p) {
		margin: 0 0 1.25rem;
		line-height: 1.8;
		color: var(--color-text-muted);
		max-width: 68ch;
		font-size: 0.9375rem;
	}
	.prose :global(h2) {
		margin: 2rem 0 0.75rem;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--color-text);
	}
	.prose :global(h3) {
		margin: 1.5rem 0 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text);
	}
	.prose :global(a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.prose :global(a:hover) { opacity: 0.75; }
	.prose :global(code) {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		padding: 0.1em 0.4em;
		border-radius: 3px;
		font-size: 0.875em;
		color: var(--color-accent);
	}
	.prose :global(pre) {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		padding: 1rem;
		overflow-x: auto;
		margin: 0 0 1.25rem;
	}
	.prose :global(pre code) {
		background: none;
		border: none;
		padding: 0;
		color: var(--color-text);
		font-size: 0.875rem;
	}
	.prose :global(blockquote) {
		border-left: 2px solid var(--color-accent);
		margin: 0 0 1.25rem;
		padding: 0.25rem 0 0.25rem 1rem;
		color: var(--color-text-muted);
	}
	.prose :global(ul), .prose :global(ol) {
		margin: 0 0 1.25rem;
		padding-left: 1.5rem;
		color: var(--color-text-muted);
		max-width: 68ch;
	}
	.prose :global(li) { margin-bottom: 0.4rem; line-height: 1.8; }
	.prose :global(hr) {
		border: none;
		border-top: 1px solid var(--color-border);
		margin: 2rem 0;
	}
</style>
