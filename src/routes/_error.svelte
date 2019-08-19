<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	.error {
		display: flex;
		justify-content: center;
		text-align: center;
	}

	h1, p {
		margin: 0 auto;
	}

	h1 {
		font-size: 3em;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="error">
	<div>
		<h1>{status}</h1>

		<p>{error.message}</p>

		{#if dev && error.stack}
			<pre>{error.stack}</pre>
		{/if}
	</div>
</div>
