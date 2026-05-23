<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>{page.status} — neuromancer</title>
</svelte:head>

<section class="flex flex-column items-center tc" style="min-height: 55vh; justify-content: center; gap: 2rem;">
	<p class="font-mono theme-accent ma0 fw7" style="font-size: clamp(4rem, 15vw, 7rem); line-height: 1;">
		{page.status}
	</p>
	<p class="f5 theme-muted ma0 lh-copy">
		{page.error?.message ?? 'Something went wrong.'}
	</p>
	<a href="{base}/" class="dib ba b--theme-border pv2 ph3 f6 theme-muted cta-link">← go home</a>
</section>

<style>
	.cta-link { transition: color 0.2s ease, border-color 0.2s ease; }
	.cta-link:hover { color: var(--color-text); border-color: var(--color-accent); }
</style>
