<script>
  import { timerStore } from "../stores";
  import { onMount, onDestroy } from "svelte";
  export let segment;
  let progressPercentage = 0;

  $: progressWidth = progressPercentage * 100 + "%"

  let tick

  onMount(() => {
    let updateProgress = () => {
      if ($timerStore) {
        progressPercentage = $timerStore.getProgress();
      } else {
        progressPercentage = 1
      }
      tick = requestAnimationFrame(updateProgress);
    };

    tick = requestAnimationFrame(updateProgress);
  });

  onDestroy(() => {
    if (tick) tick.cancel()
  })

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
  }

  li.link:hover, li.link.highlighted {
    background: var(--secondary);
    color: var(--background);
  }

  button {
    height: 1.2rem;
    width: 1.2rem;
  }

  button.disabled {
    visibility: hidden;
  }

  .progress-bar {
    height: 0;
    border-bottom: solid 2px var(--secondary);
    margin: 0.5rem 0;
  }

  /* mobile */
  @media only screen and (max-width: 480px) {
    .controls {
      display: none;
    }

    ul {
      font-size: 0.8rem;
    }

    .navigation {
      margin-top: 0.3rem;
    }
  }
</style>

<div class="navigation">
  <nav>
    <ul>
      <li class="link">
        <a href="/">Home</a>
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
        <!-- back button is a pain in the ass to build for now -->
        <!-- <button
          class={segment !== undefined ? 'disabled' : ''}
          style="background: url(/arrow-left-circle.svg)"
          on:click={() => {$timerStore.restart()}} /> -->
        <button
          class={segment !== undefined ? 'disabled' : ''}
          style="background: url(/pause-circle.svg)"
          on:click={() => {$timerStore.toggle()}} />
        <button
          class={segment !== undefined ? 'disabled' : ''}
          style="background: url(/arrow-right-circle.svg)"
          on:click={() => {$timerStore.end()}} />
      </li>
    </ul>
  </nav>
  <div class="progress-bar" style="width: {progressWidth}" />
</div>
