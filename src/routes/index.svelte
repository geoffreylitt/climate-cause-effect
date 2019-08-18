<script>
  import Logo from '../components/Logo.svelte'

  export let segment;
</script>

<div class="container">
  <header>
    <Logo />
  </header>
  <div class="left-image">
  
  </div>
  <div class="right-image">
  
  </div>
  <div class="left-content">
  </div>
  <div class="right-content">
  
  </div>
</div>

<style>
  header {
    grid-area: header;
  }

  .left-image, .right-image {
    background: #333;
  }

  .left-image {
    grid-area: left-image;
  }
  .right-image {
    grid-area: right-image;
  }
  .left-content {
    grid-area: left-content;
  }
  .right-content {
    grid-area: right-content;
  }
  .container {
    height: 100%;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto 1fr 40%;
    grid-template-areas: 
      "header header"
      "left-image right-image"
      "left-content right-content";
    grid-column-gap: 0.4rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
</style>