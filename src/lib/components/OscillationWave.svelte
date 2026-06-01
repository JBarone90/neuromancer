<script lang="ts">
	import gsap from 'gsap';

	const REF_W = 1200;
	const H = 120;

	let containerW = $state(REF_W);

	type Band = {
		freq: number; amp: number; color: string; opacity: number; strokeWidth: number;
		phase: number; scrollSpeed: number;
		modFreq: number; modPhase: number; modDepth: number;
		phaseModFreq: number; phaseModDepth: number; phaseModOffset: number;
	};

	const bands: Band[] = [
		// δ (1–4 Hz)
		{ freq: 1,  amp: 36, color: 'var(--color-text-muted)', opacity: 0.15, strokeWidth: 1,   phase: 0,   scrollSpeed: 0.40, modFreq: 0.29, modPhase: 0,   modDepth: 0.40, phaseModFreq: 0.13, phaseModDepth: 0.5,  phaseModOffset: 0 },
		// θ (4–8 Hz)
		{ freq: 2,  amp: 26, color: 'var(--color-text-muted)', opacity: 0.20, strokeWidth: 1,   phase: 1.1, scrollSpeed: 0.70, modFreq: 0.47, modPhase: 1.2, modDepth: 0.35, phaseModFreq: 0.19, phaseModDepth: 0.9,  phaseModOffset: 2.1 },
		// α (8–12 Hz)
		{ freq: 4,  amp: 18, color: 'var(--color-text-muted)', opacity: 0.25, strokeWidth: 1,   phase: 2.3, scrollSpeed: 1.10, modFreq: 0.63, modPhase: 2.4, modDepth: 0.30, phaseModFreq: 0.25, phaseModDepth: 1.3,  phaseModOffset: 1.3 },
		// β (13–30 Hz) — highlighted: motor cortex signature
		{ freq: 7,  amp: 13, color: 'var(--color-accent)',     opacity: 0.80, strokeWidth: 1.5, phase: 0.7, scrollSpeed: 1.80, modFreq: 0.43, modPhase: 0.8, modDepth: 0.38, phaseModFreq: 0.19, phaseModDepth: 1.7,  phaseModOffset: 3.7 },
		// lγ (30–70 Hz)
		{ freq: 12, amp:  8, color: 'var(--color-text-muted)', opacity: 0.18, strokeWidth: 1,   phase: 1.8, scrollSpeed: 2.80, modFreq: 0.57, modPhase: 1.7, modDepth: 0.42, phaseModFreq: 0.33, phaseModDepth: 2.2,  phaseModOffset: 0.9 },
		// hγ (70–150 Hz)
		{ freq: 18, amp:  5, color: 'var(--color-text-muted)', opacity: 0.12, strokeWidth: 0.8, phase: 3.1, scrollSpeed: 4.00, modFreq: 0.81, modPhase: 3.0, modDepth: 0.45, phaseModFreq: 0.51, phaseModDepth: 2.8,  phaseModOffset: 5.2 },
	];

	const bandMeta = [
		{ label: 'δ',  range: '1–4',    color: 'var(--color-text-muted)' },
		{ label: 'θ',  range: '4–8',    color: 'var(--color-text-muted)' },
		{ label: 'α',  range: '8–12',   color: 'var(--color-text-muted)' },
		{ label: 'β',  range: '13–30',  color: 'var(--color-accent)'     },
		{ label: 'lγ', range: '30–70',  color: 'var(--color-text-muted)' },
		{ label: 'hγ', range: '70–150', color: 'var(--color-text-muted)' },
	];

	const timeTicks = Array.from({ length: 9 }, (_, i) => i);

	function sinePath(b: Band, t: number): string {
		const scaledFreq = b.freq * (containerW / REF_W);
		const steps = Math.ceil(containerW / 7);
		const pts: string[] = [];
		const phaseShift = b.phaseModDepth * Math.sin(b.phaseModFreq * t + b.phaseModOffset);
		for (let i = 0; i <= steps; i++) {
			const xt = i / steps;
			const x = xt * containerW;
			const envelope = 1 + b.modDepth * Math.sin(b.modFreq * t + b.modPhase);
			const y = H / 2 + b.amp * envelope * Math.sin(2 * Math.PI * scaledFreq * xt + b.phase + b.scrollSpeed * t + phaseShift);
			pts.push(i === 0 ? `M ${x.toFixed(1)},${y.toFixed(2)}` : `L ${x.toFixed(1)},${y.toFixed(2)}`);
		}
		return pts.join(' ');
	}

	function setupWave(node: HTMLDivElement) {
		containerW = node.getBoundingClientRect().width;

		const ro = new ResizeObserver(entries => {
			containerW = entries[0].contentRect.width;
		});
		ro.observe(node);

		const pathEls = Array.from(node.querySelectorAll<SVGPathElement>('path'));

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

		return () => {
			ro.disconnect();
			mm.revert();
		};
	}
</script>

<div class="wave-bleed" aria-hidden="true">
	<div class="wave-body" {@attach setupWave}>

		<!-- Left margin: frequency band names -->
		<div class="margin margin-l">
			{#each bandMeta as { label, color }, i (i)}
				<span
					class="band-lbl"
					style="top: {10 + (i / (bandMeta.length - 1)) * 80}%; color: {color};"
				>{label}</span>
			{/each}
			<div class="rule rule-r"></div>
		</div>

		<svg
			viewBox="0 0 {containerW} {H}"
			preserveAspectRatio="none"
			xmlns="http://www.w3.org/2000/svg"
			class="wave-svg"
		>
			<line
				x1="0" y1={H / 2} x2={containerW} y2={H / 2}
				stroke="var(--color-border)"
				stroke-width="0.5"
				stroke-opacity="0.5"
			/>
			{#each bands as band, i (i)}
				<path
					d={sinePath(band, 0)}
					fill="none"
					stroke={band.color}
					stroke-width={band.strokeWidth}
					stroke-opacity={band.opacity}
				/>
			{/each}
		</svg>

		<!-- Right margin: physiological frequency ranges in Hz -->
		<div class="margin margin-r">
			<div class="rule rule-l"></div>
			{#each bandMeta as { range, color }, i (i)}
				<span
					class="freq-lbl"
					style="top: {10 + (i / (bandMeta.length - 1)) * 80}%; color: {color};"
				>{range} Hz</span>
			{/each}
		</div>

	</div>

	<!-- Time axis -->
	<div class="time-row">
		{#each timeTicks as t (t)}
			<div class="ttick" style="left: {(t / (timeTicks.length - 1)) * 100}%">
				<div class="ttick-line"></div>
				<span class="ttick-text">{t} s</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.wave-bleed {
		width: 100vw;
		margin-left: calc(50% - 50vw);
	}

	.wave-body {
		position: relative;
		height: 120px;
	}

	.wave-svg {
		width: 100%;
		height: 100%;
		display: block;
	}

	.margin {
		position: absolute;
		top: 0;
		height: 100%;
		display: none;
	}

	/* 30rem = half content width (64rem mw8 − 4rem ph4 = 60rem → half = 30rem) */
	.margin-l {
		left: 0;
		right: calc(50% + 30rem);
	}

	.margin-r {
		left: calc(50% + 30rem);
		right: 0;
	}

	.rule {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--color-border);
		opacity: 0.45;
	}
	.rule-r { right: 0; }
	.rule-l { left: 0; }

	.band-lbl {
		position: absolute;
		right: 0.8rem;
		transform: translateY(-50%);
		font-family: var(--font-mono);
		font-size: 11px;
		opacity: 0.55;
		user-select: none;
	}

	.freq-lbl {
		position: absolute;
		left: 0.8rem;
		transform: translateY(-50%);
		font-family: var(--font-mono);
		font-size: 10px;
		opacity: 0.5;
		user-select: none;
	}

	.time-row {
		position: relative;
		height: 20px;
	}

	.ttick {
		position: absolute;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.ttick-line {
		width: 1px;
		height: 4px;
		background: var(--color-border);
		opacity: 0.5;
	}

	.ttick-text {
		font-family: var(--font-mono);
		font-size: 8px;
		color: var(--color-text-muted);
		opacity: 0.35;
		letter-spacing: 0.04em;
	}

	@media (min-width: 1280px) {
		.margin {
			display: block;
		}
	}
</style>
