<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	const W = 1200;
	const H = 80;
	const STEPS = 160;

	type Band = {
		freq: number; amp: number; color: string; opacity: number; strokeWidth: number;
		phase: number; scrollSpeed: number;
		modFreq: number; modPhase: number; modDepth: number;
	};

	// Temporal amplitude modulation: envelope = 1 + modDepth * sin(modFreq * t + modPhase)
	// scrollSpeed advances the spatial phase over time, creating the horizontal scroll effect.
	const bands: Band[] = [
		{ freq: 1, amp: 26, color: 'var(--color-text-muted)', opacity: 0.15, strokeWidth: 1,   phase: 0,   scrollSpeed: 0.50, modFreq: 0.29, modPhase: 0,   modDepth: 0.40 },
		{ freq: 2, amp: 18, color: 'var(--color-text-muted)', opacity: 0.20, strokeWidth: 1,   phase: 1.1, scrollSpeed: 0.80, modFreq: 0.53, modPhase: 1.2, modDepth: 0.35 },
		{ freq: 3, amp: 13, color: 'var(--color-text-muted)', opacity: 0.25, strokeWidth: 1,   phase: 2.3, scrollSpeed: 1.10, modFreq: 0.71, modPhase: 2.4, modDepth: 0.30 },
		{ freq: 5, amp: 10, color: 'var(--color-accent)',     opacity: 0.75, strokeWidth: 1.5, phase: 0.7, scrollSpeed: 1.70, modFreq: 0.43, modPhase: 0.8, modDepth: 0.38 },
		{ freq: 9, amp:  5, color: 'var(--color-text-muted)', opacity: 0.15, strokeWidth: 1,   phase: 1.8, scrollSpeed: 2.80, modFreq: 0.61, modPhase: 1.7, modDepth: 0.45 },
	];

	function sinePath(b: Band, t: number): string {
		const pts: string[] = [];
		for (let i = 0; i <= STEPS; i++) {
			const xt = i / STEPS;
			const x = xt * W;
			const envelope = 1 + b.modDepth * Math.sin(b.modFreq * t + b.modPhase);
			const y = H / 2 + b.amp * envelope * Math.sin(2 * Math.PI * b.freq * xt + b.phase + b.scrollSpeed * t);
			pts.push(i === 0 ? `M ${x.toFixed(1)},${y.toFixed(2)}` : `L ${x.toFixed(1)},${y.toFixed(2)}`);
		}
		return pts.join(' ');
	}

	let pathEls: SVGPathElement[] = [];

	onMount(() => {
		const mm = gsap.matchMedia();
		mm.add('(prefers-reduced-motion: no-preference)', () => {
			const t0 = gsap.ticker.time;
			const tick = (t: number) => {
				const rel = t - t0;
				bands.forEach((b, i) => {
					pathEls[i]?.setAttribute('d', sinePath(b, rel));
				});
			};
			gsap.ticker.add(tick);
			return () => gsap.ticker.remove(tick);
		});
		return () => mm.revert();
	});
</script>

<div class="wave-container" aria-hidden="true">
	<svg
		viewBox="0 0 {W} {H}"
		preserveAspectRatio="none"
		xmlns="http://www.w3.org/2000/svg"
		class="wave-svg"
	>
		{#each bands as band, i (i)}
			<path
				bind:this={pathEls[i]}
				d={sinePath(band, 0)}
				fill="none"
				stroke={band.color}
				stroke-width={band.strokeWidth}
				stroke-opacity={band.opacity}
			/>
		{/each}
	</svg>
</div>

<style>
	.wave-container {
		width: 100%;
		overflow: hidden;
		height: 80px;
	}

	.wave-svg {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
