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

		hr {
	    margin: 0.5rem 0;
	    border: none;
	    border-top: 2px solid var(--secondary);
	  }
	</style>
</svelte:head>

<slot {segment}></slot>