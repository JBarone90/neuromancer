<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Jacopo Barone - Data Scientist</title>
</svelte:head>

<section class="flex flex-column" style="gap: 3rem;">
	<h1 class="f1 fw7 lh-title ma0 anim-1" style="font-size: clamp(2.5rem, 5vw, 3rem);">
		Jacopo Barone - Data Scientist
	</h1>

	<div class="flex flex-column mw6 anim-2" style="gap: 1rem;">
		<p class="f4 theme-muted ma0 lh-copy">
			I'm a Data Scientist working for the UK government, currently focused on
			containerised trade.
		</p>
		<p class="f4 theme-muted ma0 lh-copy">
			My background is in cognitive neuroscience and I hold a PhD in
			neuroimaging, with research centred on neural oscillations in the motor
			system.
		</p>
		<p class="f4 theme-muted ma0 lh-copy">I created this space to share my projects and ideas.</p>
		<p class="f4 theme-muted ma0 lh-copy">
			You can reach me on
			<a
				href="https://www.linkedin.com/in/baronej/"
				target="_blank"
				rel="noopener noreferrer"
				class="social-icon-link"
				aria-label="LinkedIn"
			><svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					width="18"
					height="18"
					aria-hidden="true"
				><path
						d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
					/></svg
				></a>.
		</p>
	</div>

	<a href="{base}/projects/" class="dib ba b--theme-border pv2 ph3 f6 theme-muted cta-link anim-3" style="align-self: flex-start;">
		View projects →
	</a>
</section>

<style>
	@keyframes fadeUp {
		from { opacity: 0; transform: translateY(20px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	.anim-1 { animation: fadeUp 0.5s cubic-bezier(0.33, 1, 0.68, 1) 0.1s both; }
	.anim-2 { animation: fadeUp 0.5s cubic-bezier(0.33, 1, 0.68, 1) 0.25s both; }
	.anim-3 { animation: fadeUp 0.5s cubic-bezier(0.33, 1, 0.68, 1) 0.4s both; }

	.social-icon-link {
		display: inline-flex;
		align-items: center;
		color: var(--color-accent);
		vertical-align: middle;
	}
	.social-icon-link:hover { opacity: 0.75; }
	.cta-link { transition: color 0.2s ease, border-color 0.2s ease; }
	.cta-link:hover { color: var(--color-text); border-color: var(--color-accent); }
</style>
