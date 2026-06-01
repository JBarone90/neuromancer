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

	while (px < VIEWBOX_W - 25) {
		px += 50 + rand() * 100;
		if (px >= VIEWBOX_W - 25) break;
		const h = 8 + rand() * 16; // 8–24px
		spikes.push({ x: px, h });
		px += 10 + rand() * 14;
	}

	// Separate seeded generator for background noise — doesn't affect spike positions.
	const noiseRand = seededRand(42);
	const noiseBaseline = (() => {
		const pts: string[] = [];
		for (let x = 0; x <= VIEWBOX_W; x += 5) {
			const n = (noiseRand() - 0.5) * 2.2;
			pts.push(x === 0 ? `M 0,${(Y + n).toFixed(1)}` : `L ${x},${(Y + n).toFixed(1)}`);
		}
		return pts.join(' ');
	})();

	// ECoG biphasic spike: small pre-deflection → sharp peak → undershoot → slow recovery.
	// Scaled via scaleY from origin (spike.x, Y) so it collapses cleanly to baseline.
	function spikePath(s: Spike): string {
		const { x, h } = s;
		const pre   = (Y + 1.4).toFixed(1);            // tiny downward pre-dip
		const peak  = (Y - h).toFixed(1);               // main upward deflection
		const under = (Y + h * 0.38).toFixed(1);        // slow-wave undershoot
		const c1y   = under;
		const c2y   = (Y + h * 0.14).toFixed(1);

		return [
			`M ${(x - 5).toFixed(1)},${Y}`,
			`L ${(x - 1.5).toFixed(1)},${pre}`,
			`L ${x.toFixed(1)},${peak}`,
			`L ${(x + 3.5).toFixed(1)},${under}`,
			`C ${(x + 9).toFixed(1)},${c1y} ${(x + 15).toFixed(1)},${c2y} ${(x + 22).toFixed(1)},${Y}`,
		].join(' ');
	}

	let spikePaths: SVGPathElement[] = [];

	onMount(() => {
		const mm = gsap.matchMedia();
		mm.add('(prefers-reduced-motion: no-preference)', () => {
			spikes.forEach((spike, i) => {
				gsap.set(spikePaths[i], { scaleY: 0, svgOrigin: `${spike.x} ${Y}` });
			});

			const tl = gsap.timeline({ repeat: -1 });

			spikes.forEach((spike, i) => {
				const fireAt = (spike.x / VIEWBOX_W) * RIPPLE_PERIOD;
				const orig = `${spike.x} ${Y}`;
				// Fast rise (neural spike) → slow return (slow-wave component)
				tl.to(spikePaths[i], { scaleY: 1, duration: 0.07, ease: 'power4.out', svgOrigin: orig }, fireAt);
				tl.to(spikePaths[i], { scaleY: 0, duration: 0.50, ease: 'power2.in',  svgOrigin: orig }, fireAt + 0.07);
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
	<!-- Noisy background trace mimicking broadband ECoG activity -->
	<path
		d={noiseBaseline}
		fill="none"
		stroke="var(--color-accent)"
		stroke-width="1"
		stroke-opacity="0.28"
		stroke-linejoin="round"
	/>
	{#each spikes as spike, i (spike.x)}
		<path
			bind:this={spikePaths[i]}
			class="spike"
			d={spikePath(spike)}
			fill="none"
			stroke="var(--color-accent)"
			stroke-width="1.5"
			stroke-linejoin="round"
			stroke-linecap="round"
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
		opacity: 0.85;
	}

	@media (prefers-reduced-motion: reduce) {
		.spike {
			opacity: 0.45;
		}
	}
</style>
