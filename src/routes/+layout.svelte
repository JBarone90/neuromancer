<script lang="ts">
	import 'tachyons/css/tachyons.css';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />
<main class="mw7 center ph4 w-100 flex-auto pt-nav">
	{@render children()}
</main>
<Footer />
