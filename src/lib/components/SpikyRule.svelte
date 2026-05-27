<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	// Seeded LCG so server (prerender) and client (hydration) produce identical values.
	function seededRand(seed: number) {
		let s = seed;
		return () => {
			s = (s * 9301 + 49297) % 233280;
			return s / 233280;
		};
	}

	const VIEWBOX_W = 1000;
	const H = 28;
	const Y = 20; // baseline y
	const RIPPLE_PERIOD = 5; // seconds for one left-to-right ripple

	type Spike = { x: number; h: number };

	const rand = seededRand(137);
	const spikes: Spike[] = [];
	let px = rand() * 40;

	while (px < VIEWBOX_W - 10) {
		px += 50 + rand() * 100;
		if (px >= VIEWBOX_W - 10) break;
		const h = 6 + rand() * 12;
		spikes.push({ x: px, h });
		px += 8 + rand() * 12;
	}

	// Simple triangle: rise from baseline to peak, fall back. No undershoot —
	// clean for scaleY animation from the baseline.
	function spikePath(s: Spike): string {
		return [
			`M ${(s.x - 1).toFixed(1)},${Y}`,
			`L ${s.x.toFixed(1)},${(Y - s.h).toFixed(1)}`,
			`L ${(s.x + 5).toFixed(1)},${Y}`,
		].join(' ');
	}

	let spikePaths: SVGPathElement[] = [];

	onMount(() => {
		const mm = gsap.matchMedia();
		mm.add('(prefers-reduced-motion: no-preference)', () => {
			// Collapse all spikes to the baseline; GSAP will animate them up.
			spikes.forEach((spike, i) => {
				gsap.set(spikePaths[i], { scaleY: 0, svgOrigin: `${spike.x} ${Y}` });
			});

			// Single looping timeline: each spike fires at a time proportional to
			// its x position, creating the left-to-right ripple.
			const tl = gsap.timeline({ repeat: -1 });

			spikes.forEach((spike, i) => {
				const fireAt = (spike.x / VIEWBOX_W) * RIPPLE_PERIOD;
				const orig = `${spike.x} ${Y}`;
				tl.to(spikePaths[i], { scaleY: 1, duration: 0.15, ease: 'power3.out', svgOrigin: orig }, fireAt);
				tl.to(spikePaths[i], { scaleY: 0, duration: 0.35, ease: 'power2.in',  svgOrigin: orig }, fireAt + 0.15);
			});

			return () => tl.kill();
		});
		return () => mm.revert();
	});
</script>

<svg
	viewBox="0 0 {VIEWBOX_W} {H}"
	preserveAspectRatio="none"
	xmlns="http://www.w3.org/2000/svg"
	class="spike-rule"
	aria-hidden="true"
>
	<line x1="0" y1={Y} x2={VIEWBOX_W} y2={Y} stroke="var(--color-accent)" stroke-width="2" stroke-opacity="0.55" />
	{#each spikes as spike, i (spike.x)}
		<path
			bind:this={spikePaths[i]}
			class="spike"
			d={spikePath(spike)}
			fill="none"
			stroke="var(--color-accent)"
			stroke-width="1.5"
			stroke-linejoin="round"
		/>
	{/each}
</svg>

<style>
	.spike-rule {
		flex: 1;
		min-width: 0;
		height: 28px;
		display: block;
		overflow: visible;
	}

	.spike {
		opacity: 0.8;
	}

	@media (prefers-reduced-motion: reduce) {
		.spike {
			opacity: 0.45;
		}
	}
</style>
