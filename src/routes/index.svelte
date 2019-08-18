<script>
  export let segment;
</script>

<div class="container">
  <header>
    <div class="header-cause">Cause</div>
    <div class="header-effect">Effect</div>
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
    text-transform: uppercase;
    font-size: 2rem;
    grid-area: header;
    display: flex;
    justify-content: space-between;
  }

  .header-effect {
    transform: scale(-1, 1);
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
    grid-column-gap: 0.2rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
</style>