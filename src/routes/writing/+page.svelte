<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(iso: string) {
		return new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>Writing — neuromancer</title>
	<meta name="description" content="Articles on data science, neuroscience, and research." />
</svelte:head>

<section class="flex flex-column" style="gap: 3rem;">
	<h1 class="f3 fw6 ma0 font-mono anim-1">
		<span class="theme-muted" aria-hidden="true">// </span>writing
	</h1>

	{#if data.posts.length === 0}
		<p class="theme-muted f5 ma0">Nothing here yet.</p>
	{:else}
		<ol class="list pl0 ma0 flex flex-column anim-2" style="gap: 2rem;">
			{#each data.posts as post (post.slug)}
				<li>
					<a href="{base}/writing/{post.slug}/" class="post-link flex flex-column no-underline" style="gap: 0.5rem;">
						<span class="f5 fw6 theme-accent font-mono">{post.title}</span>
						<span class="f7 theme-muted font-mono">{formatDate(post.date)}</span>
						{#if post.description}
							<span class="f6 theme-muted lh-copy">{post.description}</span>
						{/if}
						{#if post.tags.length}
							<div class="flex flex-wrap" style="gap: 0.4rem; margin-top: 0.25rem;">
								{#each post.tags as tag (tag)}
									<span class="f7 font-mono ba b--theme-border pv1 ph2 theme-muted">{tag}</span>
								{/each}
							</div>
						{/if}
					</a>
				</li>
			{/each}
		</ol>
	{/if}
</section>

<style>
	@keyframes fadeUp {
		from { opacity: 0; transform: translateY(20px); }
		to   { opacity: 1; transform: translateY(0); }
	}
	.anim-1 { animation: fadeUp 0.5s cubic-bezier(0.33, 1, 0.68, 1) 0.1s both; }
	.anim-2 { animation: fadeUp 0.5s cubic-bezier(0.33, 1, 0.68, 1) 0.25s both; }

	.post-link { transition: opacity 0.15s ease; }
	.post-link:hover { opacity: 0.75; }
</style>
