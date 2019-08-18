<script>
  import ImageAerial from "../components/ImageAerial.svelte";
  import ImageStreetView from "../components/ImageStreetView.svelte";

  let width = 640;
  let height = 640;

  let causes = [
    {
      name: "Exxon",
      streetViewParams: {
        location: "30.1051409,-95.4416778",
        fov: 50,
        heading: 218,
        pitch: 10
      }
    },
    {
      name: "ChevronTexaco",
      streetViewParams: {
        location: "37.7605002,-121.9554723",
        fov: 50,
        heading: 215,
        pitch: 10
      }
    },
    {
      name: "BP",
      streetViewParams: {
        location: "51.5076482,-0.1346956",
        fov: 90,
        heading: 50,
        pitch: 10
      }
    }
  ];

  let selectedCause = causes[0];

  let effects = [
    {
      name: "Amazon rainforest",
      mapsParams: {
        center: "-9.6077223,-64.6272964",
        zoom: 10
      }
    },
    {
      name: "Antarctica",
      mapsParams: {
        center: "-65.5882219,99.0944537",
        zoom: 10
      }
    }
  ];
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
    <div>
      <ImageStreetView
        {width}
        {height}
        location={selectedCause.streetViewParams.location}
        fov={selectedCause.streetViewParams.fov}
        heading={selectedCause.streetViewParams.heading}
        pitch={selectedCause.streetViewParams.pitch} />
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
    <div>
      <ImageAerial
        {width}
        {height}
        center={selectedEffect.mapsParams.center}
        zoom={selectedEffect.mapsParams.zoom} />
    </div>
  </div>
</div>
