<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Jacopo Barone — Data Scientist</title>
</svelte:head>

<section class="hero">
	<h1>Jacopo Barone — Data Scientist</h1>

	<div class="intro">
		<p>
			I'm a Data Scientist working for the UK government, currently focused on containerised trade.
		</p>
		<p>
			My background is in cognitive neuroscience — I hold a PhD in neuroimaging, with research
			centred on neural oscillations in the motor system.
		</p>
		<p>I created this space to share my projects and ideas.</p>
		<p>
			You can reach me on
			<a
				href="https://www.linkedin.com/in/baronej/"
				target="_blank"
				rel="noopener noreferrer"
			>LinkedIn</a>.
		</p>
	</div>

	<a href="{base}/projects/" class="cta">View projects →</a>
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
	}

	h1 {
		font-size: clamp(2.5rem, 5vw, 3rem);
		font-weight: 700;
		line-height: 1.1;
		color: var(--color-text);
		margin: 0;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		max-width: 60ch;
	}

	.intro p {
		font-size: var(--font-size-lg, 1.125rem);
		color: var(--color-text-muted);
		margin: 0;
		line-height: 1.7;
	}

	.intro a {
		color: var(--color-accent);
		text-decoration: none;
	}

	.intro a:hover {
		text-decoration: underline;
	}

	.cta {
		display: inline-block;
		align-self: flex-start;
		border: 1px solid var(--color-border);
		padding: var(--space-2) var(--space-4);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color 0.2s ease, border-color 0.2s ease;
	}

	.cta:hover {
		color: var(--color-text);
		border-color: var(--color-accent);
	}
</style>
