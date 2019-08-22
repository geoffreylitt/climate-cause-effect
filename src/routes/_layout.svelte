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

  <title>HQ→CO2</title>
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="HQ→CO2: Corporate Cause, Climate Effect">
  <meta name="twitter:description" content="HQ→CO2 juxtaposes images of fossil fuel headquarters with places being affected by global warming.">
  <meta name="twitter:image" content="https://hqco2.org/hqco2-cover.jpg">

  <meta property="og:url"                content="https://hqco2.org" />
  <meta property="og:title"              content="HQ→CO2: Corporate Cause, Climate Effect" />
  <meta property="og:description"        content="HQ→CO2 juxtaposes images of fossil fuel headquarters with places being affected by global warming." />
  <meta property="og:image"              content="https://hqco2.org/hqco2-cover.jpg" />
</svelte:head>

<div class="container">
  <header>
    <Logo />
    <Nav {segment} />
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
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .container {
    height: 100%;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-areas:
      "header"
      "main";
    grid-template-columns: 100%;
    gap: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    /* avoid getting too wide on big screens */
    max-width: 1600px;
    margin: 0 auto;
  }
</style>