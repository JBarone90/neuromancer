<script lang="ts">
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
<main class="container">
	{@render children()}
</main>
<Footer />

<style>
	main {
		padding-top: calc(var(--nav-height) + var(--space-8));
		flex: 1;
	}
</style>
