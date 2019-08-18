<script>
  import Logo from "../components/Logo.svelte";
  import ImageAerial from "../components/ImageAerial.svelte";
  import ImageStreetView from "../components/ImageStreetView.svelte";
  import PanelCause from "../components/PanelCause.svelte";
  import PanelEffect from "../components/PanelEffect.svelte";

  import causes from "../data/causes";
  import effects from "../data/effects";
  import { onMount } from "svelte";

  export let segment;

  let cause = causes[0];
  let effect = effects[0];

  function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function refreshCauseAndEffect() {
    let newCause = cause;
    let newEffect = effect;

    while (newCause === cause) {
      newCause = getRandomFromArray(causes);
    }

    while (newEffect === effect) {
      newEffect = getRandomFromArray(effects);
    }

    cause = newCause;
    effect = newEffect;
  }

  onMount(() => {
    const interval = setInterval(refreshCauseAndEffect, 10000);

    return () => {
      clearInterval(interval);
    };
  });
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
    grid-template-rows: auto minmax(0, 1fr) auto;
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
      location={cause.location}
      pano={cause.pano}
      fov={cause.fov}
      heading={cause.heading}
      pitch={cause.pitch} />
  </div>
  <div class="right-image">
    <ImageAerial center={effect.location} zoom={effect.zoom} copyright={effect.copyright} />
  </div>
  <div class="left-content">
    <PanelCause data={cause} />
  </div> 
  <div class="right-content">
    <PanelEffect data={effect} />
  </div>
</div>
