<script>
  import Logo from "../components/Logo.svelte";
  import ImageAerial from "../components/ImageAerial.svelte";
  import ImageStreetView from "../components/ImageStreetView.svelte";

  export let segment;
</script>

<style>
  header {
    grid-area: header;
  }

  .left-image,
  .right-image {
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
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-rows: auto minmax(0, 1fr) 40%;
    grid-template-areas:
      "header header"
      "left-image right-image"
      "left-content right-content";
    grid-column-gap: 0.4rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
</style>

<div class="container">
  <header>
    <Logo />
  </header>
  <div class="left-image">
    <ImageStreetView
      location="37.7605002,-121.9554723"
      fov={50}
      heading={215}
      pitch={10} />
  </div>
  <div class="right-image">
    <ImageAerial center="-9.6077223,-64.6272964" zoom={10} />
  </div>
  <div class="left-content" />
  <div class="right-content" />
</div>
