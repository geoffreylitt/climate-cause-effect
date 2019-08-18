<script>
  export let segment;
</script>

<svelte:head>
	<style>
		:root {
			--primary: #ffffff;
			--secondary: #af8a67;
			--image-background: #888888;
			--background: #000000;
		}

		body {
			background: var(--background); 
			color: var(--primary);
		}
	</style>
</svelte:head>

<slot {segment}></slot>