<script lang="ts">
	import type { Project } from '$lib/content/projects';

	let { project }: { project: Project } = $props();
</script>

<article class="bg-surface ba b--theme-border pa4 flex flex-column project-card" style="gap: 1rem;">
	<div class="flex items-baseline justify-between">
		<h3 class="f5 fw6 ma0 font-mono">
			<span class="theme-muted" aria-hidden="true">› </span><span class="theme-accent">{project.title}</span>
		</h3>
		{#if project.year}
			<span class="f7 theme-muted font-mono ml3">{project.year}</span>
		{/if}
	</div>
	<p class="f6 theme-muted ma0 lh-copy" style="flex: 1;">{project.description}</p>
	<div class="flex flex-wrap" style="gap: 0.4rem;">
		{#each project.tags as tag (tag)}
			<span class="f7 font-mono ba b--theme-border pv1 ph2 theme-muted">{tag}</span>
		{/each}
	</div>
	{#if project.url}
		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			class="f7 theme-accent font-mono project-link"
			style="align-self: flex-start;"
		>view →</a>
	{/if}
</article>

<style>
	.project-card {
		transition: border-color 0.2s ease;
	}
	.project-card:hover {
		border-color: var(--color-accent);
	}
	.project-link {
		transition: opacity 0.15s ease;
	}
	.project-link:hover {
		opacity: 0.75;
	}
</style>
