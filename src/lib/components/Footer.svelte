<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer>
	<div class="container">
		<p>&copy; {year} Jacopo Barone</p>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--color-border);
		padding-block: var(--space-6);
		text-align: center;
	}

	p {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
	}
</style>
