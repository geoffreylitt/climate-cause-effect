<script>
  import Logo from "../components/Logo.svelte";
  import Nav from "../components/Nav.svelte";
  import ImageAerial from "../components/ImageAerial.svelte";
  import ImageStreetView from "../components/ImageStreetView.svelte";
  import PanelCause from "../components/PanelCause.svelte";
  import PanelEffect from "../components/PanelEffect.svelte";
  import { cause, effect, timerStore } from "../stores";
  import { onMount } from "svelte";
  import timer from "../lib/timer";

  export let segment;

  function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  onMount(() => {
    let startNewTimer = () => {
      return new timer(() => {
        $timerStore = startNewTimer();
      }, 5000);
    };

    $timerStore = startNewTimer();

    let updateProgress = () => {
      console.log($timerStore.getTimeLeft());
      requestAnimationFrame(updateProgress);
    };

    requestAnimationFrame(updateProgress);
  });

  function refreshCauseAndEffect() {
    // let newCause = cause;
    // let new$effect = $effect;
    // while (newCause === cause) {
    //   newCause = getRandomFromArray(causes);
    // }
    // while (new$effect === $effect) {
    //   new$effect = getRandomFromArray($effects);
    // }
    // cause = newCause;
    // $effect = new$effect;
  }
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
    grid-column-gap: 0.5rem;
  }
</style>

<div class="index">
  <div class="left-image">
    <ImageStreetView
      location={$cause.location}
      pano={$cause.pano}
      fov={$cause.fov}
      heading={$cause.heading}
      pitch={$cause.pitch} />
  </div>
  <div class="right-image">
    <ImageAerial
      center={$effect.location}
      zoom={$effect.zoom}
      copyright={$effect.copyright} />
  </div>
  <div class="left-content">
    <PanelCause data={$cause} />
  </div>
  <div class="right-content">
    <PanelEffect data={$effect} />
  </div>
</div>
