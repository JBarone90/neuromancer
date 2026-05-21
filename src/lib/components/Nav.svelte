<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';

	const navLinks: { label: string; href: string; anchor: boolean }[] = [
		{ label: 'Home', href: '/', anchor: false },
		{ label: 'Projects', href: '#projects', anchor: true },
	];
</script>

<nav class="fixed top-0 left-0 right-0 z-999 bg-surface bb b--theme-border nav-h flex items-center">
	<div class="mw7 center ph4 w-100 flex items-center justify-between">
		<a class="font-mono theme-accent f4 fw6 no-underline" href="{base}/">neuromancer</a>
		<ul class="list pl0 ma0 dn flex-ns items-center">
			{#each navLinks as link (link.href)}
				<li class="ml4">
					<a
						href={link.anchor ? link.href : `${base}${link.href}`}
						class="theme-muted f6 no-underline nav-link"
						class:nav-active={!link.anchor && page.url.pathname === base + link.href}
					>{link.label}</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	.nav-link { transition: color 0.15s ease; }
	.nav-link:hover { color: var(--color-accent); }
	.nav-active { color: var(--color-accent); }
</style>
