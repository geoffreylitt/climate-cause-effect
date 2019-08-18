<script>
  import ImageAerial from "../components/ImageAerial.svelte";
  import ImageStreetView from "../components/ImageStreetView.svelte";
  import causes from "../data/causes";
  import effects from "../data/effects";

  let width = 640;
  let height = 640;

  let selectedCause = causes[0];
  let selectedEffect = effects[0];
</script>

<style>
  .image-section {
    display: inline-block;
  }
</style>

<svelte:head>
  <title>Maps Test</title>
</svelte:head>
<h1>Google Maps test</h1>
<div class="image-section">
  <div>
    Choose cause:
    <select bind:value={selectedCause}>
      {#each causes as cause}
        <option value={cause}>{cause.name}</option>
      {/each}
    </select>
    <div style="width: 640px; height: 480px">
      <ImageStreetView
        location={selectedCause.location}
        fov={selectedCause.fov}
        heading={selectedCause.heading}
        pitch={selectedCause.pitch} />
    </div>
  </div>
</div>

<div class="image-section">
  <div>
    Choose effect:
    <select bind:value={selectedEffect}>
      {#each effects as effect}
        <option value={effect}>{effect.name}</option>
      {/each}
    </select>
    <div style="width: 640px; height: 480px;">
      <ImageAerial
        center={selectedEffect.location}
        zoom={selectedEffect.zoom} />
    </div>
  </div>
</div>
