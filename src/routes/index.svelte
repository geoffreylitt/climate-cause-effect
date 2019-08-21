<script>
  import Logo from "../components/Logo.svelte";
  import Nav from "../components/Nav.svelte";
  import ImageAerial from "../components/ImageAerial.svelte";
  import ImageStreetView from "../components/ImageStreetView.svelte";
  import PanelCause from "../components/PanelCause.svelte";
  import PanelEffect from "../components/PanelEffect.svelte";
  import { slides, controls } from "../stores";
  import { onMount, onDestroy } from "svelte";

  export let segment;

  function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  onMount(() => {
    controls.start()
  });

  onDestroy(() => {
    controls.pause()
  })
</script>

<style>
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
  .index {
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) auto;
    grid-template-areas:
      "left-image right-image"
      "left-content right-content";
    gap: 0.5rem;
  }
</style>

<div class="index">
  <div class="left-image">
    <ImageStreetView
      location={$slides.cause.location}
      pano={$slides.cause.pano}
      fov={$slides.cause.fov}
      heading={$slides.cause.heading}
      pitch={$slides.cause.pitch}
      camNumber={$slides.index + 1} />
  </div>
  <div class="right-image">
    <ImageAerial
      center={$slides.effect.location}
      zoom={$slides.effect.zoom}
      copyright={$slides.effect.copyright} />
  </div>
  <div class="left-content">
    <PanelCause data={$slides.cause} />
  </div>
  <div class="right-content">
    <PanelEffect data={$slides.effect} />
  </div>
</div>