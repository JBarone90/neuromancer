<script lang="ts">
	import { page } from '$app/state';

	const navLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'About', href: '/about' },
	];
</script>

<nav>
	<div class="container inner">
		<a class="site-name" href="/">neuromancer</a>
		<ul class="nav-links">
			{#each navLinks as link (link.href)}
				<li>
					<a
						href={link.href}
						class:active={page.url.pathname === link.href}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: var(--nav-height);
		background-color: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		z-index: 100;
		display: flex;
		align-items: center;
	}

	.inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.site-name {
		font-family: var(--font-mono);
		color: var(--color-accent);
		font-size: var(--font-size-lg);
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.nav-links {
		list-style: none;
		display: flex;
		gap: var(--space-6);
		align-items: center;
	}

	.nav-links a {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		transition: color 0.15s ease;
	}

	.nav-links a:hover {
		color: var(--color-text);
	}

	.nav-links a.active {
		color: var(--color-accent);
	}

	@media (max-width: 640px) {
		.nav-links {
			display: none;
		}
	}
</style>
