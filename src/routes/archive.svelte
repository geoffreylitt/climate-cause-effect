<script>
  import { controls } from "../stores";
  import causesList from "../data/causes";
  import effectsList from "../data/effects";
  import { makeAerialMapUrl, makeStreetViewUrl } from '../lib/google-maps-urls'

  $: causes = sortCauses(causesList)
  $: effects = sortEffects(effectsList)

  function sortCauses(causes) {
    return causes.sort((a, b) => (a.ranking - b.ranking))
  }

  function sortEffects(effects) {
    return effects.sort((a, b) => {
      if(a.continent < b.continent) { return -1; }
      if(a.continent > b.continent) { return 1; }
      return 0;
    })
  }

</script>

<div class="archive">
  <div class="left-content">
      <div class="thumbs">
        {#each causes as cause}
          <div class="thumb-container">
            <button on:click={() => {controls.gotoCause(cause.name)}} class="thumb">
              <img src={makeStreetViewUrl(cause.location, cause.pano, cause.fov, cause.heading, cause.pitch)} alt={cause.name}>
            </button>
          </div>
        {/each}
      </div>
      <div class="names">
        {#each causes as cause}
          <p><button on:click={() => {controls.gotoCause(cause.name)}}>{cause.name}</button></p>
        {/each}
      </div>
  </div>
  <div class="right-content">
      <div class="thumbs">
        {#each effects as effect}
          <div class="thumb-container">
            <button class="thumb" on:click={() => {controls.gotoEffect(effect.name)}}>
              <img src={makeAerialMapUrl(effect.location, effect.zoom)} alt={effect.name}>
            </button>
          </div>
        {/each}
      </div>
      <div class="names">
        {#each effects as effect}
          <p><button on:click={() => {controls.gotoEffect(effect.name)}}>{effect.name}</button></p>
        {/each}
      </div>
  </div>
</div>

<style>
  .thumbs {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
  }

  .thumb-container {
    width: 33.33333%;
    padding-bottom: 0.5rem;
    padding-right: 0.5rem;
  }

  .thumb {
    width: 100%;
    padding-bottom: 66.66666%;
    position: relative;
    overflow: hidden;
    border: 2px solid transparent;
    display: block;
  }

  button:hover {
    text-decoration: underline;
  }

  button:active {
    text-decoration: inherit;
    color: var(--secondary);
  }

  .thumb:hover {
    border: 2px solid var(--primary);
  }

  .thumb:active {
    border: 2px solid var(--secondary);
  }

  .thumb img {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    max-width: 100%;
  }

  .left-content {
    grid-area: left-content;
    display: flex;
    align-items: flex-start;
  }
  .right-content {
    grid-area: right-content;
    display: flex;
    align-items: flex-start;
  }
  .archive {
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      "left-content right-content";
    gap: 0.5rem;
  }

  @media only screen and (max-width: 768px) {
    .names {
      display: none;
    }

    .thumbs {
      width: 100%;
    }

    .thumb-container {
      width: 50%;
    }
  }
</style>