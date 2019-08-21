<script>
  import { slides, controls } from "../stores";
  import { onMount, onDestroy } from "svelte";
  export let segment;
  let progress = 0;

  $: progressWidth = progress * 100 + "%"

  let tick

  onMount(() => {
    let updateProgress = () => {
      progress = controls.getProgress();
      tick = requestAnimationFrame(updateProgress);
    };

    tick = requestAnimationFrame(updateProgress);
  });

  onDestroy(() => {
    if (tick) tick.cancel()
  })

  function reshuffle(e) {
    if (segment == undefined) {
      e.preventDefault();
      slides.reshuffle();
      controls.restart();
    }
  }

</script>

<style>
  .navigation {
    margin-top: -0.5rem;
  }

  nav {
    margin: -0.5rem 0.5rem 0 0.4rem;
  }

  ul {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    text-transform: uppercase;
    font-size: 1.1rem;
  }

  li {
    list-style-type: none;
    padding: 0.1rem 0.5rem;
    color: var(--secondary);
    border: solid 2px transparent;
  }

  li.link.highlighted:hover {
    border: 2px solid var(--secondary);
    background: none;
    color: var(--secondary);
  }

  li.link:hover, li.link.highlighted {
    background: var(--secondary);
    color: var(--background);
  }

  li.link:active, li.link.highlighted:active {
    color: var(--primary);
  }

  li.controls {
    padding: 0;
    display: flex;
  }

  button {
    height: 1.5rem;
    width: 1.5rem;
  }

  button.disabled {
    visibility: hidden;
  }

  button:hover {
    filter: brightness(125%);
  }

  .progress-bar {
    height: 0;
    border-bottom: solid 2px var(--secondary);
    margin: 0.5rem 0;
  }

  /* mobile */
  @media only screen and (max-width: 480px) {
    li {
      padding: 0;
    }

    ul {
      font-size: 0.8rem;
    }

    .navigation {
      margin-top: 0.3rem;
    }
  }

  @media only screen and (max-width: 320px) {
    li {
      font-size: 0.7rem;
    }
  }
</style>

<div class="navigation">
  <nav>
    <ul>
      <li class="link">
        <a href="/" on:click={reshuffle}>Home</a>
      </li>
      <li class="link">
        <a href="/archive">Archive</a>
      </li>
      <li class="link">
        <a href="/about">About</a>
      </li>
      <li class="link highlighted">
        <a
          class="external"
          target="_blank"
          href="https://secure.actblue.com/donate/dec-dc-action">
          Donate
        </a>
      </li>
      <li class="controls">
        <button
          class={segment == undefined ? '' : 'disabled'}
          style="background: url(/arrow-left-circle.svg)"
          on:click={() => {controls.prev()}} />
        <button
          class={segment == undefined ? '' : 'disabled'}
          style={$controls.playing ? "background: url(/pause-circle.svg)" : "background: url(/play-circle.svg)"}
          on:click={() => {controls.toggle()}} />
        <button
          class={segment == undefined ? '' : 'disabled'}
          style="background: url(/arrow-right-circle.svg)"
          on:click={() => {controls.next()}} />
      </li>
    </ul>
  </nav>
  <div class="progress-bar" style="width: {segment == undefined ? progressWidth : '100%'}" />
</div>
