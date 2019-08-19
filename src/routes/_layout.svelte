<script>
  import Logo from "../components/Logo.svelte";
  import Nav from "../components/Nav.svelte"

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

	  a[target=_blank]:after {
	  	content: '↗'
	  }
	</style>
</svelte:head>

<div class="container">
  <header>
    <Logo />
    <Nav />
  </header>
  <main>
  	<slot {segment}></slot>
  </main>
</div>

<style>
	header {
    grid-area: header;
  }

  main {
  	grid-area: main;
  }

  .container {
    height: 100%;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-areas:
      "header"
      "main";
    grid-column-gap: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
</style>